import { getjobs } from "@/api/Jobsapi";
import usefetch from "@/hooks/usefetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import Jobcard from "@/components/ui/Jobcard";

const Joblistening = () => {
  const [searchquery, setsearchquery] = useState("");
  const [location, setlocation] = useState("");
  const [company_id, setcompany_id] = useState("");
  const { isLoaded } = useUser();

  const {
    fn: fnjobs,
    data: jobs,
    loading: loadingjobs,
  } = usefetch(getjobs, { location, company_id, searchquery });

  useEffect(() => {
    if (isLoaded) fnjobs();
  }, [isLoaded, location, company_id, searchquery]);

  if (!isLoaded) {
    return <BarLoader width={"100%"} color="#36d7b7" className="mb-4" />;
  }

  return (
    <div>
      <h1 className="text-gray-300 font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      {/*add filter here*/}

      {loadingjobs && (
        <BarLoader width={"100%"} color="#36d7b7" className="mt-4" />
      )}
      {loadingjobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => {
              return <Jobcard key={job.id} job={job}
              savedInit={job?.saved?.length>0}
              />;
            })
          ) : (
            <div>No jobs found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Joblistening;
