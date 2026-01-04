import supabaseClient, { supabaseUrl } from "@/utils/superbase";

export async function applytojob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const filename = `resume-${random}-${jobData.candidate_id}`;

  const { error: storageError } = await supabase.storage
    .from("resume")
    .upload(filename, jobData.resume);

  if (storageError) {
    console.error("Error Uploading Resumes:", storageError);
    return null;
  }

  const resume = `${supabaseUrl}/storage/v1/object/public/resume/${filename}`;

  const { data, error } = await supabase
    .from("application")
    .insert([
      {
        ...jobData,
        resume,
      },
    ])
    .select();

  if (error) {
    console.error("Error Submitting Application:", error);
    return null;
  }

  return data;
}

export async function updateapplicationStatus(
  token,
  { application_id },
  status
) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("application")
    .update({ status })
    .eq("id", application_id)
    .select();

  if (error) {
    console.error("Error Updating Application status:", error);
    return null;
  }

  return data;
}

export async function getapplications(token, { user_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("application")
    
    .select("*,job:jobs(title,company:companies(name))")
    .eq("candidate_id", user_id);

  if (error) {
    console.error("Error Fetching Applications:", error);
    return null;
  }

  return data;
}
