import supabaseClient, { supabaseUrl } from "@/utils/superbase";

export async function applytojob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const filename = `resume-${random}-${jobData.candidate_id}`;

  // 1. Storage Upload (Aapne bataya bucket ka naam 'resume' hai)
  const { error: storageError } = await supabase.storage
    .from("resume") 
    .upload(filename, jobData.resume);

  if (storageError) {
    console.error("Error Uploading Resumes:", storageError);
    return null;
  }

  const resume = `${supabaseUrl}/storage/v1/object/public/resume/${filename}`;

  // 2. FIXED: Table name changed from 'applications' to 'application'
  const { data, error } = await supabase
    .from("application") // Yahan 's' hata diya hai
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

export async function updateapplicationStatus(token, { application_id }, status) {
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