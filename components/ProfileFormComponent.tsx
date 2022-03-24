import React from "react";
import { userProfileModel } from "../model/userProfileModel";
import { useFormik } from "formik";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import Link from "next/link";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../model/storeModel";
import Router from "next/router";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { profileActions } from "../store/profile-slice";
import { notificationActions } from "../store/notification-slice";

type ProfileFormComponentProps = {
  profile: userProfileModel;
  admin?: boolean;
};

function ProfileFormComponent({ profile, admin }: ProfileFormComponentProps) {
  const token = useSelector((state: RootState) => state.auth.token);

  const dispatch = useDispatch();

  const initialValues: userProfileModel = {
    _id: profile._id,
    displayName: profile.displayName,
    email: profile.email,
    avatar: profile.avatar,
    userType: profile.userType,

    ...(!admin && {
      isDarkTheme: profile.isDarkTheme,
      password: "",
      passwordConfirm: "",
    }),
  };

  const profileSchema = Yup.object({
    displayName: Yup.string().min(3, "Must be 3 character or more"),
    password: Yup.string().min(6, "Must be 6 character or more"),
    passwordConfirm: Yup.string().when("password", {
      is: (value: string) => !!value,
      then: Yup.string()
        .required("Field is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
      otherwise: Yup.string().oneOf(["", null], "Passwords must match"),
    }),
    avatar: Yup.string().matches(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
      "Please enter a valid URL"
    ),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: profileSchema,
    onSubmit: admin ? submitHandlerAdmin : submitHandler,
  });

  function themeHandler() {
    dispatch(profileActions.toggleTheme(!profile.isDarkTheme));
  }

  async function submitHandler(submittedProfileData: userProfileModel) {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_NODE_URL}/user/updateUser`,
        {
          password: submittedProfileData.password,
          avatar: submittedProfileData.avatar,
          displayName: submittedProfileData.displayName,
          isDarkTheme: profile.isDarkTheme,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(
        profileActions.setProfile({
          email: submittedProfileData.email,
          displayName: submittedProfileData.displayName,
          avatar: submittedProfileData.avatar,
          isDarkTheme: profile.isDarkTheme,
          userType: profile.userType,
        })
      );

      dispatch(
        notificationActions.setNotification({
          bgColor: "success",
          header: "Success!",
          body: "Updated user!",
          isShown: true,
        })
      );
    } catch (error: any) {
      console.log("Error", error.response);
    }

    Router.push("/");
  }

  async function submitHandlerAdmin(submittedProfileData: userProfileModel) {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_NODE_URL}/user/updateUserAdmin`,
      {
        userId: submittedProfileData._id,
        avatar: submittedProfileData.avatar,
        displayName: submittedProfileData.displayName,
        userType: submittedProfileData.userType,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status === 200) {
      dispatch(
        notificationActions.setNotification({
          bgColor: "success",
          header: "Success!",
          body: `Updated user ${
            submittedProfileData.displayName || submittedProfileData.email
          }!`,
          isShown: true,
        })
      );
    }

    Router.push("/modify-users");
  }

  return (
    <form
      className="bg-[#fff] dark:bg-[#6b707a] shadow-md rounded px-4 sm:px-16 md:px-8 pt-6 pb-8 md:w-full"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex justify-center md:justify-between md:px-4 mb-3 md:w-full">
        <div className="flex justify-start md:w-1/3">
          <h1 className="pt-md-4 text-2xl hidden md:block">
            Profile:{" "}
            <span className="text-[#989aa0] dark:text-[#243038]">
              {profile.displayName?.length
                ? profile.displayName
                : profile.email}
            </span>
          </h1>
        </div>
        <div className="flex justify-center md:w-1/3">
          <div className="w-24 h-24 relative rounded-full">
            {profile.avatar?.length && (
              <Image
                src={profile.avatar}
                layout="fill"
                className="rounded-full"
              />
            )}
          </div>
        </div>
        {!admin && (
          <div className="flex justify-end md:w-1/3">
            <div className="hidden md:block">
              <button
                className={`${
                  profile.isDarkTheme ? "bg-gray-600" : "bg-yellow-200"
                } rounded-full py-2 px-2.5 mt-4`}
                onClick={themeHandler}
                type="button"
              >
                <FontAwesomeIcon icon={profile.isDarkTheme ? faMoon : faSun} />
              </button>
            </div>
          </div>
        )}
      </div>

      <FloatingLabel label="Email" className="mb-3">
        <Form.Control
          name="userEmail"
          type="text"
          defaultValue={formik.values.email}
          readOnly
        />
      </FloatingLabel>

      <FloatingLabel label="Display name" className="mb-3">
        <Form.Control
          name="displayName"
          type="text"
          value={formik.values.displayName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={
            !!(formik.touched.displayName && formik.errors.displayName)
          }
          autoComplete="off"
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.displayName}
        </Form.Control.Feedback>
      </FloatingLabel>

      {!admin && (
        <>
          <FloatingLabel label="Password" className="mb-3">
            <Form.Control
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!(formik.touched.password && formik.errors.password)}
              autoComplete="off"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel label="Confirm password" className="mb-3">
            <Form.Control
              name="passwordConfirm"
              type="password"
              value={formik.values.passwordConfirm}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                !!(
                  formik.touched.passwordConfirm &&
                  formik.errors.passwordConfirm
                )
              }
              autoComplete="off"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.passwordConfirm}
            </Form.Control.Feedback>
          </FloatingLabel>
        </>
      )}

      <FloatingLabel label="Change avatar" className="mb-3">
        <Form.Control
          name="avatar"
          type="text"
          value={formik.values.avatar}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={!!(formik.touched.avatar && formik.errors.avatar)}
          autoComplete="off"
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.avatar}
        </Form.Control.Feedback>
      </FloatingLabel>
      {admin && (
        <FloatingLabel
          controlId="floatingInput"
          label="User type"
          className="mb-3"
        >
          <Form.Select
            data-testid="userType"
            name="userType"
            onChange={formik.handleChange}
            value={formik.values.userType}
            onBlur={formik.handleBlur}
            isInvalid={!!(formik.touched.userType && formik.errors.userType)}
          >
            {["Standard", "Advanced", "Admin"].map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formik.errors.userType}
          </Form.Control.Feedback>
        </FloatingLabel>
      )}

      <div className="flex justify-center ">
        <div className="md:hidden">
          <button
            className={`${
              profile.isDarkTheme ? "bg-gray-600" : "bg-yellow-200"
            } rounded-full py-2 px-2.5 mt-3`}
            onClick={themeHandler}
            type="button"
          >
            <FontAwesomeIcon icon={profile.isDarkTheme ? faMoon : faSun} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <Link href={admin ? "/modify-users" : "/"}>
          <span className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 dark:text-gray-200 dark:hover:text-gray-700 hover:cursor-pointer">
            Go back
          </span>
        </Link>

        <Button
          variant="success"
          className="font-bold py-2 px-4 rounded "
          type="submit"
          disabled={!formik.isValid}
        >
          Save settings!
        </Button>
      </div>
    </form>
  );
}

export default ProfileFormComponent;
