import { SyncLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="text-center flex justify-center items-center">
      <SyncLoader color="#ff8d4d" size={12} speedMultiplier={0.8} />
    </div>
  );
}
