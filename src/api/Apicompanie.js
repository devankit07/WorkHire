import supabaseClient from "@/utils/superbase";

export async    function getcompagnies(token) {
     const supabase = await supabaseClient(token);

   
    const { data, error } = await supabase
      .from("companies") 
      .select("*");

    if (error) {
      console.error("Error Fetching Companies:", error);
      return null;
    }  
    
    return data
}