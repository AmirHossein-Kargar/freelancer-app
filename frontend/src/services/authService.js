import http from "./httpService";

// * Get OTP
export function getOtp(phoneNumber) {
    return http.post('/user/get-otp', phoneNumber).then(({data}) => data.data)
}

// * Check OTP
export function checkOtp({phoneNumber, otp}) {
    return http.post('/user/check-otp', {phoneNumber, otp}).then((data) => data.data)
}