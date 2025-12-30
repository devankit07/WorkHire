import { Link, useSearchParams } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
  useUser,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { BriefcaseBusiness, PenBox } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const [showSignin, setShowSignin] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (searchParams.get("sign-in")) {

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowSignin(true);
    }
  }, [searchParams]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignin(false);
      setSearchParams({});
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between px-6 h-25">
        <Link to="/" className="flex items-center h-full">
          <img
            src="/logo.png"
            alt="WorkHire Logo"
            className="h-40 w-auto object-contain"
          />
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            <Button
              variant="outline"
              className="h-10 px-6"
              onClick={() => setShowSignin(true)}
            >
              Login
            </Button>
          </SignedOut>

          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/Postjobs">
                <Button variant="destructive" className="rounded-full">
                  <PenBox size={20} className="mr-2" />
                  Post Job
                </Button>
              </Link>
            )}

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  href="/Myjobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                />
                <UserButton.Link
                  label="Saved Jobs"
                  href="/SavedJobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignin && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/Onboarding"
            fallbackRedirectUrl="/Onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
