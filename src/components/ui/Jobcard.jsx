import { useUser } from "@clerk/clerk-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { deletejob, savejob } from "@/api/Jobsapi";
import useFetch from "@/hooks/usefetch";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const Jobcard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onSavedJob = () => {},
}) => {
  const [saved, setsaved] = useState(savedInit);

  const { user } = useUser();

  const {
    fn: fnSavedjob,
    data: savedjob,
    loading: loadingsavedjobs,
  } = useFetch(savejob, {
    alreadysaved: saved,
  });

  const handlesavejob = async () => {
    if (!user) return;

    await fnSavedjob({
      user_id: user.id,
      job_id: job.id,
    });

    onSavedJob();
  };

  const { loading: loadingDeletjob, fn: fnDeletejob } = useFetch(deletejob, {
    job_id: job.id,
  });

  const handledeletejob = async () => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      await fnDeletejob();
      onSavedJob();
    }
  };

  useEffect(() => {
    if (savedjob !== undefined) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setsaved(savedjob?.length > 0);
    }
  }, [savedjob]);

  return (
    <Card className="flex flex-col">
      {loadingDeletjob && (
        <BarLoader width={"100%"} color="#36d7b7" className="mt-4" />
      )}
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job.title}
          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
              onClick={handledeletejob}
            />
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && <img src={job.company.logo_url} className="h-6" />}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} /> {job.location}
          </div>
        </div>
        <hr />
        {job.description.substring(0, job.description.indexOf("."))}
      </CardContent>

      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More details
          </Button>
        </Link>

        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handlesavejob}
            disabled={loadingsavedjobs}
          >
            {saved ? (
              <Heart size={20} stroke="red" fill="red" />
            ) : (
              <Heart size={20} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Jobcard;
