import supabaseClient, { supabaseUrl } from "@/utils/superbase";

export async function getcompagnies(token) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase.from("companies").select("*");

  if (error) {
    console.error("Error Fetching Companies:", error);
    return null;
  }

  return data;
}

export async function Addnewcompany(token, _, companydata) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const filename = `logo-${random}-${companydata.name}`;

  const { error: storageError } = await supabase.storage
    .from("company-logo")
    .upload(filename, companydata.logo);

  if (storageError) {
    console.error("Error Uploading Company Logo:", storageError);
    return null;
  }

  const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${filename}`;

  const { data, error } = await supabase
    .from("companies")
    .insert([
      {
        name: companydata.name,
        logo_url,
      },
    ])
    .select();

  if (error) {
    console.error("Error Submting Company:", error);
    return null;
  }

  return data;
}
