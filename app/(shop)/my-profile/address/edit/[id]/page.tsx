"use client";

// Modules
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

// Icons
import { ArrowLeft } from "lucide-react";

// Components
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/shop/home/Footer";
import Navbar from "@/components/shop/home/Navbar";
import ComboBox from "@/components/shared/form/Combobox";
import TextArea from "@/components/shared/form/TextArea";
import TextInput from "@/components/shared/form/TextInput";
import NumberInput from "@/components/shared/form/NumberInput";

// Libraries
import { cn } from "@/lib/utils";
import { ParamsProps } from "@/types";
import { UpdateUserAddressSchema } from "@/lib/validations";

// Queries
import { useGetAllProvincesQuery } from "@/services/provinces";
import { useGetRegencyByIdQuery } from "@/services/regencies";
import { useGetDistrictByIdQuery } from "@/services/districts";
import { useGetVillageByIdQuery } from "@/services/villages";
import {
  useUpdateAddressMutation,
  useGetAddressByIdQuery,
} from "@/services/address";

const defaultValues = {
  id: "",
  label: "",
  address: "",
  province: "",
  city: "",
  district: "",
  village: "",
  zipCode: 0,
  phoneNumber: 0,
};

export default function Page(params: ParamsProps) {
  const { toast } = useToast();
  const router = useRouter();

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedRegency, setSelectedRegency] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");

  const { data: provinces } = useGetAllProvincesQuery();
  const { data: regencies } = useGetRegencyByIdQuery({
    provinceId: selectedProvince,
  });
  const { data: districts } = useGetDistrictByIdQuery({
    regencyId: selectedRegency,
  });
  const { data: villages } = useGetVillageByIdQuery({
    districtId: selectedDistrict,
  });
  const { data: address } = useGetAddressByIdQuery(params.params.id);
  const [updateAddress, { isLoading }] = useUpdateAddressMutation();

  const form = useForm<z.infer<typeof UpdateUserAddressSchema>>({
    resolver: zodResolver(UpdateUserAddressSchema),
    defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof UpdateUserAddressSchema>) => {
    try {
      await updateAddress({
        id: params.params.id,
        label: data.label,
        address: data.address,
        provinceId: data.province,
        regencyId: data.city,
        districtId: data.district,
        villageId: data.village,
        zipCode: data.zipCode.toString(),
        phoneNumber: `+62${data.phoneNumber}`,
      }).unwrap();

      toast({
        title: "Address Created!",
        description: "You have successfully update address.",
        className: "rounded-xl bg-emerald-50 text-emerald-800",
      });

      router.push("/my-profile");
    } catch (error) {
      toast({
        title: "Create New Address Failed!",
        description:
          "There was an error when updating address. Please try again later.",
        className: "rounded-xl bg-pink-50 text-pink-800",
      });
    }
  };

  useEffect(() => {
    if (address) {
      // Reset form data with existing data
      form.reset({
        id: params.params.id,
        label: address?.data?.label || "",
        address: address?.data?.address || "",
        province: address?.data?.provinceId || "",
        city: address?.data?.regencyId || "",
        district: address?.data?.districtId || "",
        village: address?.data?.villageId || "",
        zipCode: parseInt(address?.data?.zipCode || ""),
        phoneNumber: address?.data?.phone_number
          ? parseInt(address?.data?.phone_number.replace("+62", ""))
          : 0,
      });
    }

    // Set selected values for dropdowns
    setSelectedProvince(address?.data?.provinceId || "");
    setSelectedRegency(address?.data?.regencyId || "");
    setSelectedDistrict(address?.data?.districtId || "");
    setSelectedVillage(address?.data?.villageId || "");
  }, [address, form, params.params.id]);

  return (
    <section className="flex min-h-screen w-full flex-col items-center gap-8 bg-white md:gap-10 xl:gap-[72px]">
      <Navbar />

      <div className="flex w-full max-w-screen-2xl flex-col gap-8 p-6 md:p-10 xl:p-16">
        <h1 className="font-poppins text-2xl font-bold text-primary lg:text-3xl">
          Update Address
        </h1>

        <Button
          className="flex-center flex w-fit gap-2 rounded-full bg-primary px-8 py-6 font-poppins text-white hover:bg-secondary"
          onClick={() => router.push("/my-profile")}
        >
          <ArrowLeft size={16} /> <p>Back</p>
        </Button>

        <div className="flex w-full flex-col gap-8 rounded-2xl bg-white p-6 shadow-2xl shadow-slate-100 md:w-2/3 md:p-10 xl:p-16">
          <div className="flex w-full flex-col">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 py-8"
              >
                <TextInput
                  control={form.control}
                  name="label"
                  label="Label"
                  placeholder="Type address label"
                  required
                  className="bg-white py-7"
                />

                <div className="flex items-center gap-6">
                  <ComboBox
                    control={form.control}
                    name="province"
                    label="Province"
                    placeholder="Select a province"
                    width="full"
                    required
                    defaultValue={selectedProvince}
                    options={provinces?.data?.map((province) => ({
                      label: province.name,
                      value: province.id,
                    }))}
                    onChange={(value) => {
                      setSelectedProvince(value);

                      form.resetField("city");
                      form.resetField("district");
                      form.resetField("village");
                      setSelectedRegency("");
                      setSelectedDistrict("");
                      setSelectedVillage("");
                    }}
                  />

                  <ComboBox
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Select a city"
                    width="full"
                    required
                    defaultValue={selectedRegency}
                    options={regencies?.data?.map((regency) => ({
                      label: regency.name,
                      value: regency.id,
                    }))}
                    onChange={(value) => {
                      setSelectedRegency(value);

                      form.resetField("district");
                      form.resetField("village");
                      setSelectedDistrict("");
                      setSelectedVillage("");
                    }}
                  />
                </div>

                <div className="flex flex-col items-center gap-6 lg:flex-row">
                  <ComboBox
                    control={form.control}
                    name="district"
                    label="District"
                    placeholder="Select a distrct"
                    width="full"
                    required
                    defaultValue={selectedDistrict}
                    options={districts?.data?.map((district) => ({
                      label: district.name,
                      value: district.id,
                    }))}
                    onChange={(value) => {
                      setSelectedDistrict(value);

                      form.resetField("village");
                      setSelectedVillage("");
                    }}
                  />

                  <ComboBox
                    control={form.control}
                    name="village"
                    label="Village"
                    placeholder="Select a village"
                    width="full"
                    required
                    defaultValue={selectedVillage}
                    options={villages?.data?.map((village) => ({
                      label: village.name,
                      value: village.id,
                    }))}
                    onChange={(value) => {
                      setSelectedVillage(value);
                    }}
                  />
                </div>

                <div className="flex flex-col items-center gap-6 lg:flex-row">
                  <NumberInput
                    control={form.control}
                    name="zipCode"
                    label="Zip Code"
                    placeholder="Type zip code"
                    required
                    className="bg-white py-5"
                  />

                  <NumberInput
                    control={form.control}
                    name="phoneNumber"
                    label="Phone Number"
                    placeholder="Type phone number"
                    unit="+62"
                    unitPosition="left"
                    required
                    className="bg-white py-5"
                  />
                </div>

                <TextArea
                  control={form.control}
                  name="address"
                  label="Address"
                  placeholder="Type address"
                  required
                  className="bg-white py-7"
                />

                <Button
                  type="submit"
                  className={cn(
                    "w-fit bg-accent-purple hover:bg-accent-purple/90 text-white cursor-pointer text-center rounded-2xl font-lexend font-semibold mt-6",
                    isLoading && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update Address"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}
