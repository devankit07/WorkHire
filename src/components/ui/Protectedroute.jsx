import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const Protectedroute = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { pathname } = useLocation();

  // wait for clerk
  if (!isLoaded) return null;

  // not signed in
  if (!isSignedIn) {
    return <Navigate to="/?sign-in=true" replace />;
  }

  // onboarding check
  if (
    isSignedIn &&
    user &&
    !user.unsafeMetadata?.role &&
    pathname !== "/onboarding"
  ) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default Protectedroute;
