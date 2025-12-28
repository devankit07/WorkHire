import { Link } from "react-router-dom"
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react";
import { Button } from "./ui/button";


const Header = () => {
  return (
    <nav className="flex items-center justify-between px-6 h-25">

  <Link to="/" className="flex items-center h-full">
    <img
      src="/logo.png"
      alt="WorkHire Logo"
      className="h-40 w-auto object-contain"
    />
  </Link>

  
  <Button variant="outline" className="h-10 px-6">
    Login
  </Button>
</nav>

  );
};

export default Header;
