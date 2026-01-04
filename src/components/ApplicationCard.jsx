import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import useFetch from "@/hooks/usefetch";
import { updateapplicationStatus } from "@/api/apiapplication";
import { BarLoader } from "react-spinners";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Key Fix: Props ko destructure kiya { application }
const ApplicationCard = ({ application, isCandidate = false }) => {
  
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  // Key Fix: status update ke liye application.id bheji hai
  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateapplicationStatus,
    {
      application_id: application.id, 
    }
  );

  const handlestatuschange = (status) => {
    fnHiringStatus(status).then(() => {
        // Status badalne ke baad UI refresh zaroori hai
        // Aap yahan parent se pass kiya hua fetchJob() bhi call kar sakte hain
    });
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />}
      <CardHeader>
        <CardTitle className="flex justify-between font-bold text-gray-100">
          {isCandidate
            ? `${application?.job?.title} at ${application?.job?.company?.name}`
            : application?.name}
          <Download
            size={18}
            className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer hover:bg-gray-300"
            onClick={handleDownload}
          />
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1 text-gray-300">
        <div className="flex flex-col md:flex-row justify-between gap-2">
          <div className="flex gap-2 items-center">
            <BriefcaseBusiness size={15} />
            {application?.experience} Years of Experience
          </div>
          <div className="flex gap-2 items-center">
            <School size={15} />
            {application?.education}
          </div>
          <div className="flex gap-2 items-center">
            <Boxes size={15} />
            Skills: {application?.skills}
          </div>
        </div>
        <hr className="border-gray-700" />
      </CardContent>

      <CardFooter className="flex justify-between items-center text-gray-400">
        <span className="text-sm">
          {new Date(application?.created_at).toLocaleString()}
        </span>
        
        {isCandidate ? (
          <span className="capitalize font-bold text-blue-400">
            Status: {application?.status}
          </span>
        ) : (
          <Select onValueChange={handlestatuschange} defaultValue={application.status}>
            <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="interviewing">Interviewing</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;