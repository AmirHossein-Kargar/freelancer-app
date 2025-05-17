import CheckOTPForm from "../features/authentication/CheckOTPForm";
import SendOTPForm from "../features/authentication/SendOTPForm";

export default function Auth() {
  return (
    <div className="w-full sm:max-w-sm">
      <SendOTPForm />
      <CheckOTPForm/>
    </div>
  );
}
