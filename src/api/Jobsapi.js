import supabaseClient from "@/utils/superbase";

export async function getjobs(token, { location, company_id, searchquery }) {
  const supabase = await supabaseClient(token);

  let query = supabase
    .from("jobs")
    .select("*,company:companies(name,logo_url),saved:saved_jobs(id)");

  if (location) {
    query = query.eq("location", location);
  }
  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchquery) {
    query = query.ilike("title", `%${searchquery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetchng jobs:", error);
    return null;
  }
  return data;
}

export async function savejob(token, { alreadysaved }, saveddata) {
  const supabase = await supabaseClient(token);

  if (alreadysaved) {
    const { data, error: deletError } = await supabase
      .from("saved_jobs") 
      .delete()           
      .eq("job_id", saveddata.job_id)
      .eq("user_id", saveddata.user_id);

    if (deletError) {
      console.error("Error Deleting Saved job:", deletError);
      return null;
    }
    return data;
  } else {
    const { data, error: insertError } = await supabase
      .from("saved_jobs")
      .insert([saveddata])
      .select();

    if (insertError) {
      console.error("Error fetchng jobs:", insertError);
      return null;
    }
    return data;
  }
}
