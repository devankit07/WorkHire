import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/usefetch";
import { Addnewcompany } from "@/api/Apicompanie";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  logo: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "image/png" || file[0].type === "image/jpeg"),
      { message: "Only Images are allowed" }
    ),
});

const Addcompanydrawer = ({ fetchCompanies }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingAddCompany,
    error: errorAddCompany,
    data: dataAddCompany,
    fn: fnAddCompany,
  } = useFetch(Addnewcompany);

  const onSubmit = (data) => {
    fnAddCompany({
      ...data,
      logo: data.logo[0],
    });
  };

  useEffect(() => {
    if (dataAddCompany?.length > 0) fetchCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingAddCompany]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button type="button" size="sm" variant="secondary">
          Add Company
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add new Company</DrawerTitle>
        </DrawerHeader>

        <form className="flex gap-2 p-4 pb-0" onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Company name" {...register("name")} />
          <Input
            type="file"
            accept="image/*"
            className="file:text-gray-500"
            {...register("logo")}
          />
          <Button type="submit" variant="destructive" className="w-40">
            Add
          </Button>
        </form>

        <div className="px-4">
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
          {errors.logo && (
            <p className="text-red-500 text-sm">{errors.logo.message}</p>
          )}
          {errorAddCompany?.message && (
            <p className="text-red-500 text-sm">{errorAddCompany?.message}</p>
          )}
        </div>

        {loadingAddCompany && <BarLoader width={"100%"} color="#36d7b7" />}

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="secondary" type="button">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
export default Addcompanydrawer;
