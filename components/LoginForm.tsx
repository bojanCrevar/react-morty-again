import React, { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store/auth-slice";
import { profileActions } from "../store/profile-slice";
import ImageUpload from "./ImageUpload";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginRegisterModel } from "../model/loginRegisterModel";

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [warnings, setWarnings] = useState("");

  const backendEndpoint = `${process.env.NEXT_PUBLIC_NODE_URL}/auth/${
    isLogin ? "login" : "register"
  }`;

  const dispatch = useDispatch();

  const initialValues: loginRegisterModel = {
    email: "",
    password: "",
    image: undefined,
  };

  const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Field is required"),
    password: Yup.string()
      .min(6, "Must be 6 characters or more")
      .required("Password is required"),
    image: Yup.mixed().test("imageCheck", "Invalid image type", (value) => {
      console.log("value", value);
      if (value && !value.type.includes("image")) {
        setWarnings("Select proper image file");
        return false;
      } else {
        setWarnings("");
      }
      return true;
    }),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: submitHandler,
  });

  async function submitHandler(submittedLoginData: loginRegisterModel) {
    const formData = new FormData();
    formData.append("email", submittedLoginData.email);
    formData.append("password", submittedLoginData.password);
    if (submittedLoginData.image) {
      formData.append("image", submittedLoginData.image);
    }

    axios
      .post(
        backendEndpoint,
        isLogin
          ? {
              email: submittedLoginData.email,
              password: submittedLoginData.password,
            }
          : formData
      )
      .then((response) => {
        console.log(response.data);
        dispatch(authActions.logIn(response.data.token));
        dispatch(
          profileActions.setProfile({
            displayName: response.data.user.username,
            userEmail: response.data.user.email,
            avatar: response.data.user.avatar,
            isDarkTheme: response.data.user.isDarkTheme,
          })
        );
      })
      .catch(function (error) {
        console.log(error.response);
        setWarnings(error.response.data.msg);
      });
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="w-full">
        <h3 className="text-center">
          {isLogin ? `Enter your login credentials!` : "Registration form"}
        </h3>
        <div className="flex flex-col place-items-center space-y-2 mt-8">
          <FloatingLabel label="Email" className="mb-3">
            <Form.Control
              name="email"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!(formik.touched.email && formik.errors.email)}
              defaultValue={formik.values.email}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </FloatingLabel>

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

          {!isLogin && (
            <ImageUpload
              id="image"
              name="image"
              onChange={(e: any) => {
                formik.setFieldValue("image", e);
              }}
              value={formik.values.image}
            />
          )}

          {formik.errors.image && (
            <span className="text-sm text-red-600">{formik.errors.image}</span>
          )}
          {warnings && <span className="text-sm text-red-600">{warnings}</span>}

          <div className="flex space-x-4">
            <button
              className="py-2 hover:cursor-pointer underline underline-offset-2 decoration-blue-500 text-blue-500 decoration-1"
              onClick={() => setIsLogin((prev) => !prev)}
              type="button"
            >
              {isLogin ? "Create new user" : "Login"}
            </button>
            <Button
              className="btn btn-secondary py-2 px-4 dark:bg-[#585B62]"
              type="submit"
              disabled={!formik.isValid}
            >
              {isLogin ? "Login" : "Register"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
