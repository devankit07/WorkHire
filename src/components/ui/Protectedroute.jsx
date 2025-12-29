import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const Protectedroute = ({ children }) => {
  const { isSignedIn, user,isLoaded } = useUser();
  const {pathname} = useLocation();


  if (!isSignedIn && isLoaded && isSignedIn !== undefined) {
    return <Navigate to="/?sign-in=true" replace />;
  }

  //check onboarding status

  return children;
};

export default Protectedroute;
