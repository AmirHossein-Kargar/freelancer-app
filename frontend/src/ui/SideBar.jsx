import { NavLink } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import useUser from "../features/authentication/useUser";
import PersonIcon from '@mui/icons-material/Person';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function SideBar() {
  const {data, isLoading, isError} = useUser();

  
const name = data?.data?.user?.name || "User";
const email = data?.data?.user?.email 

  return (
    <ul className="space-y-2 text-title dark:text-white h-full relative px-4">
      <li>
        <CustomNavLink to="/owner/dashboard">
          <HomeOutlinedIcon fontSize="small" />
          DashBoard
        </CustomNavLink>
      </li>
      <li>
        <CustomNavLink to="/owner/projects">
          <BadgeOutlinedIcon fontSize="small" />
          Projects
        </CustomNavLink>
      </li>
      <div
        className="absolute bottom-0 inset-x-0 h-16"
        style={{ backgroundColor: "rgba(9,36,75,0.03)" }}
      >
        <div className="flex items-center gap-2 h-full px-4 text-sm">
          <div className="rounded-full overflow-hidden w-8 h-8 flex items-center justify-center bg-gray-200">
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
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-xs text-gray-500">{email}</div>
          </div>
          <span className="ml-auto">
            <LogoutOutlinedIcon fontSize="small"/>
          </span>
        </div>
      </div>
    </ul>
  );
}

function CustomNavLink({ children, to }) {
  const activeClass =
    "bg-primary text-white rounded-lg transition-colors duration-200";
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 p-2 w-full ${isActive ? activeClass : ""}`
      }
    >
      {children}
    </NavLink>
  );
}
