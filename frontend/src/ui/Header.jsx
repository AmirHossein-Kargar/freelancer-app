import MenuIcon from "@mui/icons-material/Menu";

export default function Header({ onMenuClick }) {

  return (
    <div className="flex items-center justify-between">
      <button className="md:hidden cursor-pointer hover:text-primary transition-color-custom " onClick={onMenuClick}>
        <MenuIcon />
      </button>
      <h1 className="text-xl font-bold">Header</h1>
    </div>
  );
}
