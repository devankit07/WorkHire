import supabaseClient from "@/utils/superbase";

export async function getjobs(token){
const spabase = await supabaseClient(token);

let query = spabase.from("jobs").select("*")

const {data,error}= await query;

if(error){
    console.error("Error fetchng jobs:",error);
    return null;
    
}
return data;
}