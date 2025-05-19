import { SyncLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="text-center">
      <SyncLoader color="#4a77ff" size={10} />
    </div>
  );
}
