import  {useState}  from "react";
import { useSession } from "@clerk/clerk-react";

const useFetch = (cb, Options = {}) => {
  const [data, setdata] = useState(undefined);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  const { session } = useSession();

  const fn = async (...args) => {
    setloading(true);
    seterror(null);

    try {
      const superbaseAccessToken = await session.getToken({
        template: "supabase",
      });

      const result = await cb(
        superbaseAccessToken,
        Options,
        ...args
      );

      setdata(result);
    } catch (error) {
      seterror(error);
    } finally {
      setloading(false);
    }
  };

  return { fn, data, loading, error };
};

export default useFetch;
