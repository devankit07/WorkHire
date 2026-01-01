import { useUser } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
import useFetch from "@/hooks/usefetch";
import { getSinglejob, Updatehiringstatus } from "@/api/Jobsapi";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Job = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();

  const { loading, data: job, fn: fetchJob } = useFetch(getSinglejob, {
    job_id: id,
  });

  useEffect(() => {
    if (isLoaded) fetchJob();
  }, [isLoaded]);

  const handleStatusChange = async (value) => {
    const isOpen = value === "open";
    await Updatehiringstatus(user?.id, { job_id: id }, isOpen);
    fetchJob();
  };

  if (!isLoaded || loading) {
    return <BarLoader className="mb-4" width="100%" color="#36d7b7" />;
  }

  if (!job) {
    return <p className="text-center text-red-400">Job not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <h1 className="text-gray-200 font-extrabold text-4xl sm:text-6xl">{job.title}</h1>

        {job.company?.logo_url && (
          <img src={job.company.logo_url} alt={job.title} className="h-12 w-fit" />
        )}
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-6 text-gray-300">
        <div className="flex gap-2 items-center">
          <MapPinIcon size={18} />
          {job.location}
        </div>

        <div className="flex gap-2 items-center">
          <Briefcase size={18} />
          {job.applications?.length || 0} Applicants
        </div>

        <div className="flex gap-2 items-center">
          {job.isOpen ? <><DoorOpen size={18} /> Open</> : <><DoorClosed size={18} /> Closed</>}
        </div>
      </div>

      {/* Hiring Status (Recruiter only) */}
      {job.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger className={`w-full ${job.isOpen ? "bg-green-950" : "bg-red-950"}`}>
            <SelectValue placeholder={`Hiring Status (${job.isOpen ? "Open" : "Closed"})`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      {/* About Job */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-200 mb-2">About The Job</h2>
        <p className="text-gray-300 sm:text-lg">{job.description}</p>
      </div>

      {/* Requirements */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-200 mb-2">What we are looking for</h2>
        <MDEditor.Markdown source={job.requirements} className="bg-transparent text-gray-300 sm:text-lg" />
      </div>
    </div>
  );
};

export default Job;
