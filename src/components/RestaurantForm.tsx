import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import validationSchema from "../validationSchema";
const RestaurantForm = ({
  initialValues,
  onSubmit,
  setRestoId,
}: {
  initialValues: Record<string, string | any>;
  onSubmit: (values: Record<string, string | any>) => Promise<void>;
  setRestoId?: Dispatch<SetStateAction<string>>;
}) => {
  const [previews, setPreviews] = useState<string>();

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const filePreviews = URL.createObjectURL(event.currentTarget.files[0]);
      setPreviews(filePreviews);
    }
  };

  useEffect(() => {
    if (initialValues.featuredImage) {
      setPreviews(initialValues.featuredImage);
    }
  }, []);

  return (
    <div className="restaurantForm">
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, action) => {
          console.log({ values });
          onSubmit(values);
          action.resetForm();
        }}
        enableReinitialize
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <div className="field">
              <label htmlFor="name">Restaurant Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage
                name="name"
                component="div"
                className="error-message"
              />
            </div>

            <div className="field">
              <label htmlFor="description">Description</label>
              <Field type="text" id="description" name="description" />
              <ErrorMessage
                name="description"
                component="div"
                className="error-message"
              />
            </div>

            <div className="field">
              <label htmlFor="location">Location</label>
              <Field type="text" id="location" name="location" />
              <ErrorMessage
                name="location"
                component="div"
                className="error-message"
              />
            </div>

            <div className="field">
              <label htmlFor="phoneNumber">Phone Number</label>
              <Field type="text" id="phoneNumber" name="phoneNumber" />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="error-message"
              />
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>

            {/* {!initialValues._id && ( */}
              <div className="field">
                <div className="file-input-container">
                  <label htmlFor="menu" className="custom-trigger">
                    {initialValues?.featuredImage ? "Update Featured Image" : "Add Featured Image"}
                  </label>
                  <input
                    type="file"
                    id="featuredImage"
                    name="featuredImage"
                    className="file-input"
                    accept="image/*"
                    onChange={(event) => {
                      handleFilesChange(event);
                      if (event.currentTarget.files) {
                        setFieldValue(
                          "featuredImage",
                          event.currentTarget.files[0]
                        );
                      }
                    }}
                  />
                  {previews ? (
                    <div className="thumbnails">
                      <div className="thumbnail">
                        <img src={previews} alt="Featured" />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            {/* )} */}

            <div className="field">
              <label htmlFor="openingTime">Opening Time</label>
              <Field type="time" id="openingTime" name="openingTime" />
              <ErrorMessage
                name="openingTime"
                component="div"
                className="error-message"
              />
            </div>

            <div className="field">
              <label htmlFor="closingTime">Closing Time</label>
              <Field type="time" id="closingTime" name="closingTime" />
              <ErrorMessage
                name="closingTime"
                component="div"
                className="error-message"
              />
            </div>

            <div className="text-end p-5">
              {initialValues.name ? (
                <button
                  type="button"
                  className="btn primary-btn secondary-btn me-4"
                  onClick={() => (setRestoId ? setRestoId("") : null)}
                >
                  Cancel
                </button>
              ) : null}
              <button type="submit" className="btn primary-btn">
                {initialValues.name ? "Update" : "Add"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RestaurantForm;
