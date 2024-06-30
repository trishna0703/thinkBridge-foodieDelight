import React from "react";
import Layout from "../../components/layout";
import RestaurantForm from "@/components/RestaurantForm";
import useAddRestaurant from "@/hooks/useAddRestaurant";
import { useRouter } from "next/router";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterRestaurant = () => {
  const { mutateAsync } = useAddRestaurant();
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
    let addedRestaurant = await mutateAsync(values);
    if (addedRestaurant.status == 201) {
      toast.success(addedRestaurant.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } else if (addedRestaurant.status == 500) {
      toast.error(addedRestaurant.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Layout>
        <div className="bannerWrapper">
          <div className="banner pageHeading">
            <h1>Register New Restaurant</h1>
          </div>
          <div className="overlayImage"></div>
        </div>
        <RestaurantForm initialValues={initialValues} onSubmit={handleSubmit} />
      </Layout>
    </>
  );
};

export default RegisterRestaurant;
