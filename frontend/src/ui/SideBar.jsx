import { NavLink } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import useUser from "../features/authentication/useUser";
import PersonIcon from "@mui/icons-material/Person";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Loading from "./Loading";
import toast from "react-hot-toast";
import { useEffect } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const links = [
  {
    to: "/owner/dashboard",
    label: "Dashboard",
    icon: <HomeOutlinedIcon fontSize="small" />,
  },
  {
    to: "/owner/projects",
    label: "Projects",
    icon: <BadgeOutlinedIcon fontSize="small" />,
  },
];

export default function SideBar({ onClose }) {
  const { data, isLoading, isError, error } = useUser();
  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Something went wrong!");
    }
  }, [isError, error]);

  if (isLoading) {
    return (
      <aside className="h-full flex items-center justify-center">
        <Loading />
      </aside>
    );
  }
  const handleLogout = () => {
    console.log("Log Out");
  };

  const name = data?.data?.user?.name || "User";
  const email = data?.data?.user?.email;

  return (
    <nav className="flex flex-col h-full overflow-hidden">
      {onClose && (
        <button
          aria-label="Close sidebar"
          onClick={onClose}
          className="md:hidden p-4 ml-auto block cursor-pointer hover:text-red-500 transition-color-custom"
        >
          <CloseOutlinedIcon />
        </button>
      )}
      <div className="flex-grow overflow-y-auto p-4">
        <ul className="space-y-2 ">
          {links.map(({ to, label, icon }) => (
            <li key={to}>
              <CustomNavLink to={to}>
                {icon}
                {label}
              </CustomNavLink>
            </li>
          ))}
        </ul>
      </div>

      <footer className="h-16 bg-surface border-t border-gray-200 px-4">
        <div className="flex items-center gap-3 h-full text-sm">
          <div className="rounded-full overflow-hidden w-9 h-9 flex items-center justify-center bg-gray-200 ">
            {data?.data?.user?.avatarUrl ? (
              <img
                src={data.data.user.avatarUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <PersonIcon fontSize="small" />
            )}
          </div>
          <div className="flex flex-col justify-center leading-tight truncate select-none">
            <h3 className="font-semibold truncate">{name}</h3>
            <p className="text-xs truncate">{email}</p>
          </div>
          <button
             title="Log out"
            className="ml-auto cursor-pointer hover:text-primary transition-colors duration-200"
            onClick={() => handleLogout()}
          >
            <LogoutOutlinedIcon fontSize="small"  />
          </button>
        </div>
      </footer>
    </nav>
  );
}

const base =
  "flex items-center gap-2 p-2 w-full rounded-lg transition-all-custom";
const active = "bg-primary text-white";

function CustomNavLink({ children, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${base} ${isActive ? active : "hover:bg-primary/10"}`
      }
    >
      {children}
    </NavLink>
  );
}
