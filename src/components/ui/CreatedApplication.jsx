import { getapplications } from '@/api/apiapplication';
import useFetch from '@/hooks/usefetch';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react'
import ApplicationCard from '../ApplicationCard';
import { BarLoader } from 'react-spinners';

const CreatedApplication = () => {
  const { user, isLoaded } = useUser();

  const {
    loading: loadingApplication,
    data: Application,
    fn: fnApplications,
  } = useFetch(getapplications, {
    user_id: user?.id,
  });

  useEffect(() => {
    if (isLoaded && user) {
      fnApplications();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded,user]);

  // DEBUG: Inspect karein ki kya data aa raha hai
  console.log("My Applications Data:", Application);

  if (!isLoaded || loadingApplication) {
    return <BarLoader width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-4 px-4 sm:px-0 max-w-5xl mx-auto w-full">
      {Application && Application.length > 0 ? (
        Application.map((app) => (
          <ApplicationCard
            key={app.id}
            application={app}
            isCandidate={true}
          />
        ))
      ) : (
        <div className="text-gray-400 text-center">
          You haven't applied to any jobs yet. 
          <br /> 
        </div>
      )}
    </div>
  );
};

export default CreatedApplication