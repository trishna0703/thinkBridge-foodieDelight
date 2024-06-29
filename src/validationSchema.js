import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Restaurant name is required"),
  description: Yup.string().required("Description is required"),
  location: Yup.string().required("Location is required"),
  featuredImage: Yup.mixed(),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  openingTime: Yup.string().required("Opening time is required"),
  closingTime: Yup.string().required("Closing time is required"),
});

export default validationSchema;
