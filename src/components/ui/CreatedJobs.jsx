import { Myjob } from "@/api/Jobsapi";
import useFetch from "@/hooks/usefetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import Jobcard from "./Jobcard";

const CreatedJobs = () => {
  const { user, isLoaded } = useUser();

  const {
    loading: loadingcreatedjobs,
    data: createdjobs,
    fn: fncreatedjobs,
  } = useFetch(Myjob, {
    recruiter_id: user?.id,
  });

  useEffect(() => {
    if (isLoaded) {
      fncreatedjobs();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  if (!isLoaded || loadingcreatedjobs) {
    return <BarLoader width={"100%"} color="#36d7b7" className="mb-4" />;
  }

  return (
    <div>
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 lg:p-7">
        {createdjobs?.length ? (
          createdjobs.map((job) => (
            <Jobcard
              key={job.id}
              job={job}
              isMyJob
              onSavedJob={fncreatedjobs}
            />
          ))
        ) : (
          <div className="text-gray-400">No jobs found </div>
        )}
      </div>
    </div>
  );
};

export default CreatedJobs;
