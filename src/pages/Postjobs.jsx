import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "country-state-city";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/usefetch";
import { getcompagnies } from "@/api/Apicompanie";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { Navigate, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { addnewjob } from "@/api/Jobsapi";

// 1. FIXED SCHEMA: Requirements string honi chahiye kyunki ye Markdown text hai
const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  company_id: z.string().min(1, { message: "Company selection is required" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
});

const Postjobs = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      company_id: "",
      requirements: "",
    },
    resolver: zodResolver(schema),
  });

  const {
    fn: fncompanies,
    data: companies,
    loading: loadingCompanies,
  } = useFetch(getcompagnies);

  const {
    loading: loadingcreatejob,
    error: errorcreatingjob, // Changed from errors to error to match hook
    data: datacreatejob,
    fn: fncreatejob,
  } = useFetch(addnewjob);

  // 2. FIXED NAVIGATION: data milne par navigate karein, Navigate component use nahi hota yahan
  useEffect(() => {
    if (datacreatejob?.length > 0) navigate("/jobs");
  }, [loadingcreatejob, datacreatejob, navigate]);

  useEffect(() => {
    if (isLoaded) fncompanies();
  }, [isLoaded]);

  const onSubmit = (data) => {
    fncreatejob({
      ...data,
      recruiter_id: user.id,
      isOpen: true,
    });
  };

  if (!isLoaded || loadingCompanies) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to="/jobs" />;
  }

  return (
    <div className="p-10">
      <h1 className="text-gray-300 font-extrabold text-5xl sm:text-7xl text-center pb-8">
        Post a Job
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 pb-0">
        <Input placeholder="Job Title" {...register("title")} />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

        <Textarea placeholder="Job Description" {...register("description")} />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* Location Select */}
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Job Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {State.getStatesOfCountry("IN").map(({ name }) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {/* Company Select */}
          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Company">
                    {field.value
                      ? companies?.find((com) => com.id === Number(field.value))?.name
                      : "Select Company"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies?.map(({ name, id }) => (
                      <SelectItem key={id} value={id.toString()}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
            <div className="flex gap-4">
                {errors.location && <p className="text-red-500 text-sm flex-1">{errors.location.message}</p>}
                {errors.company_id && <p className="text-red-500 text-sm flex-1">{errors.company_id.message}</p>}
            </div>
        </div>

        {/* 3. FIXED MDEditor: Requirements text editor */}
        <div data-color-mode="dark">
            <Controller
            name="requirements"
            control={control}
            render={({ field }) => (
                <MDEditor value={field.value} onChange={field.onChange} />
            )}
            />
        </div>
        {errors.requirements && (
          <p className="text-red-500 text-sm">{errors.requirements.message}</p>
        )}

        {errorcreatingjob?.message && (
          <p className="text-red-500 text-sm">{errorcreatingjob?.message}</p>
        )}
        
        {loadingcreatejob && <BarLoader width={"100%"} color="#36d7b7" />}

        <Button type="submit" variant="blue" size="lg" className="mt-2">
          Submit Job
        </Button>
      </form>
    </div>
  );
};

export default Postjobs;