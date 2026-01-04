import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleRoleSelection = async (role) => {
    try {
      await user.update({
        unsafeMetadata: { role },
      });

      navigate(role === "recruiter" ? "/postjobs" : "/jobs");
    } catch (err) {
      console.error("Error updating role:", err);
    }
  };

  useEffect(() => {
    if (!isLoaded) return;

    if (user?.unsafeMetadata?.role) {
      navigate(
        user.unsafeMetadata.role === "recruiter" ? "/postjobs" : "/jobs"
      );
    }
  }, [user, isLoaded, navigate]);

  if (!isLoaded) {
    return <BarLoader width={"100%"} color="#36d7b7" mb-4 />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-35">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl">
        I am a ...
      </h2>

      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          variant="blue"
          className="h-30 text-2xl"
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>

        <Button
          variant="destructive"
          className="h-30 text-2xl"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
