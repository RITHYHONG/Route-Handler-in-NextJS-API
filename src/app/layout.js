import NavbarComponent from "@/components/NavbarComponent";
import "./globals.css"

const Layout = ({ children }) => {
  return (
    <div>
      <NavbarComponent/>
      <main>{children}</main>
    </div>
  );
};

export default Layout;