import { getjobs } from "@/api/Jobsapi";
import usefetch from "@/hooks/usefetch";
import { useEffect } from "react";


const Joblistening = () => {

 const {fn:fnjobs,data:datajobs,loading:loadingjobs} = usefetch(getjobs,{});


 useEffect(()=>{
  fnjobs()
 },[])
  return <div>Joblistening</div>;
};

export default Joblistening;
