import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  MdDriveFileRenameOutline,
  MdLocationPin,
  MdOutlineAlternateEmail,
  MdOutlinePhoneInTalk,
} from "react-icons/md";
import { MdTextFields } from "react-icons/md";

import validationSchema from "../validationSchema";
import { IoIosTimer } from "react-icons/io";
import { Spinner } from "react-bootstrap";
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

  //set featured image thumbnails
  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files?.length > 0) {
      console.log(event.currentTarget.files);
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
          setPreviews("");
          action.resetForm();
        }}
      >
        {({ setFieldValue, isSubmitting }) =>
          isSubmitting ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) : (
            <Form>
              <div className="fieldWrapper">
                <div className="field">
                  <div className="inner-field">
                    <span className="field-icon">
                      <MdDriveFileRenameOutline />
                    </span>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder="It must have a name..."
                    />
                  </div>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="field">
                  <div className="inner-field">
                    <span className="field-icon">
                      <MdTextFields />
                    </span>
                    <Field
                      type="text"
                      id="description"
                      name="description"
                      placeholder="Describe the food..."
                    />
                  </div>
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>
              <div className="fieldWrapper">
                <div className="field">
                  <div className="inner-field">
                    <span className="field-icon">
                      <MdOutlinePhoneInTalk />
                    </span>
                    <Field
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Any contact detail?"
                    />
                  </div>
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="field">
                  <div className="inner-field">
                    <span className="field-icon">
                      <MdOutlineAlternateEmail />
                    </span>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Where can we write to them?"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>

              <div className="fieldWrapper location">
                <div className="field ">
                  <div className="inner-field">
                    <span className="field-icon">
                      <MdLocationPin />
                    </span>
                    <Field
                      type="text"
                      id="location"
                      name="location"
                      placeholder="Where to find it?"
                    />
                  </div>
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>

              <div className="fieldWrapper operationalHours">
                <div className="field">
                  <label htmlFor="openingTime">Opening Time</label>
                  <div className="inner-field">
                    <span className="field-icon">
                      <IoIosTimer />
                    </span>
                    <Field
                      type="time"
                      id="openingTime"
                      name="openingTime"
                      placeholder="When does it open?"
                    />
                  </div>
                  <ErrorMessage
                    name="openingTime"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="field">
                  <label htmlFor="closingTime">Closing Time</label>
                  <div className="inner-field">
                    <span className="field-icon">
                      <IoIosTimer />
                    </span>
                    <Field
                      type="time"
                      id="closingTime"
                      name="closingTime"
                      placeholder="Till when is it open?"
                    />
                  </div>
                  <ErrorMessage
                    name="closingTime"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>

              <div className="field fileField">
                <div className="file-input-container">
                  <label htmlFor="menu" className="custom-trigger">
                    {initialValues?.featuredImage
                      ? "Update Featured Image"
                      : "Add Featured Image"}
                  </label>

                  <input
                    type="file"
                    id="featuredImage"
                    name="featuredImage"
                    className="file-input"
                    accept="image/*"
                    onChange={(event) => {
                      handleFilesChange(event);
                      if (
                        event.currentTarget.files &&
                        event.currentTarget.files?.length > 0
                      ) {
                        setFieldValue(
                          "featuredImage",
                          event.currentTarget.files[0]
                        );
                      }
                    }}
                  />
                  <ErrorMessage
                    name="featuredImage"
                    component="div"
                    className="error-message"
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
                <button
                  type="submit"
                  className="btn primary-btn"
                  disabled={isSubmitting}
                >
                  {initialValues.name ? "Update" : "Add"}
                </button>
              </div>
            </Form>
          )
        }
      </Formik>
    </div>
  );
};

export default RestaurantForm;
