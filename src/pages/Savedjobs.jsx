import { getsavedjob } from "@/api/Jobsapi";
import Jobcard from "@/components/ui/Jobcard";
import useFetch from "@/hooks/usefetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const Savedjobs = () => {
  const { isLoaded } = useUser();

  const {
    loading: loadingsavedjobs,
    data: savedjobs,
    fn: fnsavedjobs,
  } = useFetch(getsavedjob);

  useEffect(() => {
    if (isLoaded) fnsavedjobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  if (!isLoaded || loadingsavedjobs) {
    return <BarLoader width={"100%"} className="mb-4" color="#36d7b7" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-slate-400 font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Saved Jobs
      </h1>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedjobs?.length > 0 ? (
          savedjobs.map((saved) => {
            return (
              <Jobcard
                key={saved.id}
                job={saved.job}
                savedInit={true}
                onJobSaved={fnsavedjobs}
              />
            );
          })
        ) : (
          <div className="text-gray-400 text-xl text-center col-span-full">
            No saved jobs found 🚩
          </div>
        )}
      </div>
    </div>
  );
};

export default Savedjobs;
