import { getjobs } from "@/api/Jobsapi";
import usefetch from "@/hooks/usefetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import Jobcard from "@/components/ui/Jobcard";
import { getcompagnies } from "@/api/Apicompanie";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "country-state-city";

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

  const { fn: fncompanies, data: companies } = usefetch(getcompagnies);

  useEffect(() => {
    if (isLoaded) fncompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnjobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, location, company_id, searchquery]);

  const handlesearch = (e) => {
    e.preventDefault();

    let formdata = new FormData(e.target);
    const query = formdata.get("search-query");
    if (query) setsearchquery(query);
  };

  const clearFilters = () => {
    setsearchquery("");
    setcompany_id("");
    setlocation("");
  };

  if (!isLoaded) {
    return <BarLoader width={"100%"} color="#36d7b7" className="mb-4" />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
      <h1 className="text-gray-300 font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      <form
        onSubmit={handlesearch}
        className="h-10 flex w-full gap-2 items-center mb-3"
      >
        <Input
          type="text"
          placeholder="Search Job by Title.."
          name="search-query"
          className="h-full flex-1 px-4 text-md"
        />
        <Button variant="blue" type="submit" className="h-full sm:w-28">
          Search
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value) => setlocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter By Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={company_id}
          onValueChange={(value) => setcompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter By Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          type="button"
          onClick={clearFilters}
          className="sm:w-1/2"
          variant="destructive"
        >
          Clear Filters
        </Button>
      </div>

      {loadingjobs && (
        <BarLoader width={"100%"} color="#36d7b7" className="mt-4" />
      )}
      {loadingjobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => {
              return (
                <Jobcard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />
              );
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
