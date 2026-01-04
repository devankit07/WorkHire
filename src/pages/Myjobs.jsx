import CreatedApplication from "@/components/ui/CreatedApplication";
import CreatedJobs from "@/components/ui/CreatedJobs";
import { useUser } from "@clerk/clerk-react";

import { BarLoader } from "react-spinners";

const Myjobs = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  return (
    <div>
      <h1 className="text-slate-400 font-extrabold text-5xl sm:text-7xl text-center pb-8">
        {user?.unsafeMetadata?.role === "candidate"
          ? "My Applications"
          : "My Job"}
      </h1>
      {user?.unsafeMetadata?.role === "candidate" ? (
        <CreatedApplication />
      ) : (
        <CreatedJobs />
      )}
    </div>
  );
};

export default Myjobs;
