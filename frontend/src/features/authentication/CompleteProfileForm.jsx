import { useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";

export default function CompleteProfileForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <form action="" className="container p-8 select-none">
      <section className="flex justify-center items-center">
        <img
          className="w-[300px] h-[246px]"
          src="../../../public/images/personal2.svg"
          alt=""
        />
      </section>
      <h2 className="mt-10 md:text-center dark:text-white">
        Complete Your Profile
      </h2>
      <div className="flex flex-col gap-y-8 mt-4 md:items-center md:justify-center md:w-full">
        <TextField
          label="Full Name"
          className="md:w-1/2"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
          type="text"
          InputProps={{
            startAdornment: (
              <span style={{ paddingRight: 8, display: "flex", alignItems: "center" }}>
                <PersonIcon color="primary" />
              </span>
            ),
          }}
        />

        <TextField
          label="Email"
          className="md:w-1/2"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          type="email"
          InputProps={{
            startAdornment: (
              <span style={{ paddingRight: 8, display: "flex", alignItems: "center" }}>
                <MailIcon color="primary" />
              </span>
            ),
          }}
        />
        <FormControl>
          <FormLabel>Role</FormLabel>
          <RadioGroup row defaultValue="female" name="radio-buttons-group">
            <FormControlLabel
              value="Freelancer"
              control={<Radio />}
              label="Freelancer"
            />
            <FormControlLabel value="Owner" control={<Radio />} label="Owner" />
          </RadioGroup>
        </FormControl>
        <Button variant="contained" sx={{ color: "#fff" }} className="md:w-1/2">
          Confirm
        </Button>
      </div>
    </form>
  );
}
