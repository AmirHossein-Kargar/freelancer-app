const Controller = require("./controller");
const {
  generateRandomNumber,
  toPersianDigits,
  setAccessToken,
  setRefreshToken,
  verifyRefreshToken,
} = require("../../../utils/functions");
const createError = require("http-errors");
const { UserModel } = require("../../models/user");
const Kavenegar = require("kavenegar");
const CODE_EXPIRES = 90 * 1000; //90 seconds in milliseconds
const { StatusCodes: HttpStatus } = require("http-status-codes");
const {
  completeProfileSchema,
  updateProfileSchema,
  checkOtpSchema,
} = require("../validators/user.schema");

class UserAuthController extends Controller {
  constructor() {
    super();
    this.code = 0;
    this.phoneNumber = null;
  }
  async getOtp(req, res) {
    let { phoneNumber } = req.body;

    if (!phoneNumber)
      throw createError.BadRequest("Please enter a valid phone number");

    phoneNumber = phoneNumber.trim();
    this.phoneNumber = phoneNumber;
    this.code = generateRandomNumber(6);

    const result = await this.saveUser(phoneNumber);
    if (!result) throw createError.Unauthorized("Login was not successful.");

    if (process.env.IS_TESTING_MODE_OTP) {
      return res.status(HttpStatus.OK).send({
        statusCode: HttpStatus.OK,
        data: {
          message: `Verification code: ${this.code}`,
          expiresIn: CODE_EXPIRES,
          phoneNumber,
        },
      });
    } else {
      this.sendOTP(phoneNumber, res);
    }
  }
  async checkOtp(req, res) {
    await checkOtpSchema.validateAsync(req.body);
    const { otp: code, phoneNumber } = req.body;

    const user = await UserModel.findOne(
      { phoneNumber },
      { password: 0, refreshToken: 0, accessToken: 0 }
    );

    if (!user) throw createError.NotFound("No user found with these details");

    if (user.otp.code != code)
      throw createError.BadRequest("The verification code is incorrect");

    if (new Date(`${user.otp.expiresIn}`).getTime() < Date.now())
      throw createError.BadRequest("The verification code has expired");

    user.isVerifiedPhoneNumber = true;
    await user.save();

    await setAccessToken(res, user);
    await setRefreshToken(res, user);
    let WELLCOME_MESSAGE = `Code verified. Welcome to your panel`;
    if (!user.isActive)
      WELLCOME_MESSAGE = `Code verified. Please complete your profile`;

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: WELLCOME_MESSAGE,
        user,
      },
    });
  }
  async saveUser(phoneNumber) {
    const otp = {
      code: this.code,
      expiresIn: Date.now() + CODE_EXPIRES,
    };

    const user = await this.checkUserExist(phoneNumber);
    if (user) return await this.updateUser(phoneNumber, { otp });

    return await UserModel.create({
      phoneNumber,
      otp,
    });
  }
  async checkUserExist(phoneNumber) {
    const user = await UserModel.findOne({ phoneNumber });
    return user;
  }
  async updateUser(phoneNumber, objectData = {}) {
    Object.keys(objectData).forEach((key) => {
      if (["", " ", 0, null, undefined, "0", NaN].includes(objectData[key]))
        delete objectData[key];
    });
    const updatedResult = await UserModel.updateOne(
      { phoneNumber },
      { $set: objectData }
    );
    return !!updatedResult.modifiedCount;
  }
  sendOTP(phoneNumber, res) {
    const kaveNegarApi = Kavenegar.KavenegarApi({
      apikey: `${process.env.KAVENEGAR_API_KEY}`,
    });
    kaveNegarApi.VerifyLookup(
      {
        receptor: phoneNumber,
        token: this.code,
        template: "registerVerify",
      },
      (response, status) => {
        if (response && status === 200)
          return res.status(HttpStatus.OK).send({
            statusCode: HttpStatus.OK,
            data: {
              message: `Verification code sent to ${phoneNumber}`,
              expiresIn: CODE_EXPIRES,
              phoneNumber,
            },
          });

        return res.status(status).send({
          statusCode: status,
          message: "Failed to send verification code",
        });
      }
    );
  }
  async completeProfile(req, res) {
    await completeProfileSchema.validateAsync(req.body);
    const { user } = req;
    const { name, email, role } = req.body;

    if (!user.isVerifiedPhoneNumber)
      throw createError.Forbidden("Please verify your phone number.");

    const duplicateUser = await UserModel.findOne({ email });
    if (duplicateUser)
      throw createError.BadRequest(
        "A user with this email is already registered."
      );

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { name, email, isActive: true, role } },
      { new: true }
    );
    await setAccessToken(res, updatedUser);
    await setRefreshToken(res, updatedUser);

    return res.status(HttpStatus.OK).send({
      statusCode: HttpStatus.OK,
      data: {
        message: "Your profile has been completed successfully",
        user: updatedUser,
      },
    });
  }
  async updateProfile(req, res) {
    const { _id: userId } = req.user;
    await updateProfileSchema.validateAsync(req.body);
    const { name, email, biography, phoneNumber } = req.body;

    const updateResult = await UserModel.updateOne(
      { _id: userId },
      {
        $set: { name, email, biography, phoneNumber },
      }
    );
    if (updateResult.modifiedCount === 0)
      throw createError.BadRequest("Profile was not updated");
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: "Profile updated successfully",
      },
    });
  }
  async refreshToken(req, res) {
    const userId = await verifyRefreshToken(req);
    const user = await UserModel.findById(userId);
    await setAccessToken(res, user);
    await setRefreshToken(res, user);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        user,
      },
    });
  }
  async getUserProfile(req, res) {
    const { _id: userId } = req.user;
    const user = await UserModel.findById(userId, { otp: 0 });

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        user,
      },
    });
  }
  logout(req, res) {
    const cookieOptions = {
      maxAge: 1,
      expires: Date.now(),
      httpOnly: true,
      signed: true,
      sameSite: "Lax",
      secure: true,
      path: "/",
      domain: process.env.DOMAIN,
    };
    res.cookie("accessToken", null, cookieOptions);
    res.cookie("refreshToken", null, cookieOptions);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      roles: null,
      auth: false,
      message: "You have been logged out successfully",
    });
  }
}

module.exports = {
  UserAuthController: new UserAuthController(),
};
