import React from "react";
import Layout from "../../components/layout";
import RestaurantForm from "@/components/RestaurantForm";
import useAddRestaurant from "@/hooks/useAddRestaurant";
import { useRouter } from "next/router";

const RegisterRestaurant = () => {
  const { mutateAsync } = useAddRestaurant();
  const router = useRouter();
  const initialValues = {
    name: "",
    description: "",
    location: "",
    featuredImage: null,
    phoneNumber: "",
    email: "",
    openingTime: "",
    closingTime: "",
  };

  const handleSubmit = async (values: Record<string, any>) => {
    console.log({ values });
    let addedRestaurant = await mutateAsync(values);
    if (addedRestaurant.status == 201) {
      router.push("/");
      console.log("Submitting new restaurant:", addedRestaurant);
    }
  };

  return (
    <Layout>
      <div className="bannerWrapper">
        <div className="banner pageHeading">
          <h1>Register New Restaurant</h1>
        </div>
        <div className="overlayImage"></div>
      </div>
      <RestaurantForm initialValues={initialValues} onSubmit={handleSubmit} />
    </Layout>
  );
};

export default RegisterRestaurant;
