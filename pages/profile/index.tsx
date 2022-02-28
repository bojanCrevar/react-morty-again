import { doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase";
import { RootState } from "../../model/storeModel";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userProfileModel } from "../../model/userProfileModel";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { profileActions } from "../../store/profile-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useRouter } from "next/router";
import { notificationActions } from "../../store/notification-slice";
import { authActions } from "../../store/auth-slice";

function Profile() {
  const profile = useSelector((state: RootState) => state.profile);
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isLoggedIn === false) {
      router.push("/");
    }
  }, [auth]);

  const initialValues: userProfileModel = {
    displayName: profile.displayName,
    userEmail: profile.userEmail,
    avatar: profile.avatar,
    isDarkTheme: profile.isDarkTheme,
    password: "",
    passwordConfirm: "",
  };

  const profileSchema = Yup.object({
    displayName: Yup.string().min(3, "Must be 3 character or more"),
    password: Yup.string().min(6, "Must be 6 character or more"),
    passwordConfirm: Yup.string().when("password", {
      is: (value: string) => !!value,
      then: Yup.string()
        .required("Field is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    avatar: Yup.string().matches(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
      "Please enter a valid URL"
    ),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: profileSchema,
    onSubmit: submitHandler,
  });

  function themeHandler() {
    dispatch(profileActions.toggleTheme(!profile.isDarkTheme));
  }

  async function submitHandler(submittedProfileData: any) {
    console.log("submittedProfileData", submittedProfileData);

    try {
      if (submittedProfileData.password) {
        const passwordResetAPI = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.NEXT_PUBLIC_FIREBASE}`;

        const response = await axios.post(passwordResetAPI, {
          idToken: auth.token,
          password: submittedProfileData.password,
          returnSecureToken: true,
        });
        if (response.status === 200) {
          submittedProfileData.password = "";
          submittedProfileData.passwordConfirm = "";
        }
        console.log("Changed password!", response);

        dispatch(
          authActions.replaceToken({
            token: response.data.idToken,
            refreshToken: response.data.refreshToken,
          })
        );
      }

      const docRef = doc(db, "users", auth.localId);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, {
          displayName: submittedProfileData.displayName,
          avatar: submittedProfileData.avatar,
          isDarkTheme: profile.isDarkTheme,
        });

        dispatch(
          profileActions.setProfile({
            userEmail: submittedProfileData.userEmail,
            displayName: submittedProfileData.displayName,
            avatar: submittedProfileData.avatar,
            isDarkTheme: profile.isDarkTheme,
          })
        );

        dispatch(
          notificationActions.setNotification({
            bgColor: "success",
            header: "Success!",
            body: "Updated user in firestore!",
            isShown: true,
          })
        );
        console.log("Updated user in firestore!");
      }
    } catch (error: any) {
      console.log("Error", error.response.data.error.message);

      dispatch(
        notificationActions.setNotification({
          bgColor: "danger",
          header: "Error!",
          body: `Updating failed! ${error.response.data.error.message}`,
          isShown: true,
        })
      );
    }

    router.push("/");
  }

  return (
    <div className="w-full">
      <div className="flex flex-col w-full items-center">
        <h1 className="p-4 text-4xl text-center">
          Profile:{" "}
          {profile.displayName.length > 0
            ? profile.displayName
            : profile.userEmail}
        </h1>

        <div className="w-full md:w-3/4 lg:w-1/2 px-8 sm:px-16 md:px-8">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <FloatingLabel label="Email" className="mb-3">
              <Form.Control
                name="userEmail"
                type="text"
                className="input form-control hover:cursor-not-allowed shadow"
                defaultValue={formik.values.userEmail}
                readOnly
              />
            </FloatingLabel>

            <FloatingLabel label="Display name" className="mb-3">
              <Form.Control
                name="displayName"
                type="text"
                className="input form-control shadow"
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

            <FloatingLabel label="Password" className="mb-3">
              <Form.Control
                name="password"
                type="password"
                className="input form-control shadow"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  !!(formik.touched.password && formik.errors.password)
                }
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
                className="input form-control shadow"
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

            <FloatingLabel label="Change avatar" className="mb-3">
              <Form.Control
                name="avatar"
                type="text"
                className="input form-control shadow"
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

            <div className="flex justify-between px-16">
              <div>
                <button
                  className={`${
                    profile.isDarkTheme ? "bg-gray-200" : "bg-yellow-200"
                  } rounded px-2 py-3 mt-3`}
                  onClick={themeHandler}
                  type="button"
                >
                  <FontAwesomeIcon
                    icon={profile.isDarkTheme ? faMoon : faSun}
                  />{" "}
                  Change theme
                </button>
              </div>

              <div className="w-24 h-24 relative rounded-full mt-3 ">
                {profile.avatar.length && (
                  <Image
                    src={profile.avatar}
                    layout="fill"
                    className="rounded-full"
                  />
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <Link href="/">
                <span className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 hover:cursor-pointer">
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
        </div>
      </div>
    </div>
  );
}

export default Profile;
