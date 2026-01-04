import { Link, useSearchParams } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
  useUser,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { BriefcaseBusiness, PenBox, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

const Header = () => {
  const [showSignin, setShowSignin] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useUser();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (searchParams.get("sign-in") === "true") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowSignin(true);
    }
  }, [searchParams]);

  const openSignin = () => setSearchParams({ "sign-in": "true" });

  const closeSignin = (e) => {
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
            className="h-40 w-auto object-contain dark:invert-0 invert"
          />
        </Link>

        <div className="flex gap-4 items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full transition-all duration-300"
          >
            {theme === "dark" ? (
              <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-400" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem] text-slate-900" />
            )}
          </Button>

          <SignedOut>
            <Button
              variant="outline"
              className="h-10 px-6"
              onClick={openSignin}
            >
              Login
            </Button>
          </SignedOut>

          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/postjobs">
                <Button variant="destructive" className="rounded-full">
                  <PenBox size={18} className="mr-2" />
                  Post Job
                </Button>
              </Link>
            )}

            <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }}>
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  href="/myjobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                />
                <UserButton.Link
                  label="Saved Jobs"
                  href="/savedjobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignin && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={closeSignin}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
