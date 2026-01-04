import supabaseClient from "@/utils/superbase";

export async function getjobs(token, { location, company_id, searchquery }) {
  const supabase = await supabaseClient(token);

  let query = supabase
    .from("jobs")
    .select("*, company:companies(name,logo_url), saved:saved_jobs(id)");

  if (location) query = query.eq("location", location);
  if (company_id) query = query.eq("company_id", company_id);
  if (searchquery) query = query.ilike("title", `%${searchquery}%`);

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching jobs:", error);
    return null;
  }
  return data;
}

export async function savejob(token, { alreadysaved }, saveddata) {
  const supabase = await supabaseClient(token);

  if (alreadysaved) {
    const { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveddata.job_id)
      .eq("user_id", saveddata.user_id);

    if (deleteError) {
      console.error("Error Deleting Saved job:", deleteError);
      return null;
    }
    return data;
  } else {
    const { data, error: insertError } = await supabase
      .from("saved_jobs")
      .insert([saveddata])
      .select();

    if (insertError) {
      console.error("Error saving job:", insertError);
      return null;
    }
    return data;
  }
}

export async function getSinglejob(token, { job_id }) {
  const supabase = await supabaseClient(token);


  const { data: job, error: jobError } = await supabase
    .from("jobs")
    .select("*, company:companies(name, logo_url)")
    .eq("id", job_id)
    .single();

  if (jobError) {
    console.error("Error Fetching job:", jobError);
    return null;
  }


  const { data: applications, error: appError } = await supabase
    .from("application") // singular table name
    .select("*")
    .eq("job_id", job_id);

  if (appError) {
    console.error("Error Fetching applications:", appError);
    
    return { ...job, applications: [] };
  }

 
  return { ...job, applications };
}

export async function Updatehiringstatus(token, { job_id }, isOpen) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select()
    .single();

  if (error) {
    console.error("Error Updating job:", error);
    return null;
  }

  return data;
}

{/*post a new job */}

export async function addnewjob(token,_,jobData) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select()

  if (error) {
    console.error("Error Creating  job:", error);
    return null;
  }

  return data;
}
