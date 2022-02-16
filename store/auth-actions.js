import { authActions } from "./auth-slice";
import axios from "axios";
import { db } from "../firebase/index";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

const users = collection(db, "users");

export const fetchUserOnReload = () => {
  const q = query(users, where("isAuthenticated", "==", true));
  return async (dispatch) => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(q);
      let document;
      querySnapshot.forEach((doc) => {
        document = { id: doc.id, data: doc.data() };
      });
      console.log("doc", document);
      return document;
    };

    try {
      const userData = await fetchData();
      if (!userData) {
        throw new Error("Whoops!");
      }
      dispatch(
        authActions.replaceLogin({
          isAuthenticated: userData.data.isAuthenticated,
          userName: userData.data.userName,
          changed: "",
        })
      );
    } catch (error) {
      console.log("Cannot find the user: ", error);
    }
  };
};

export const validateAuth = (auth) => {
  const q = query(users, where("userName", "==", auth.userName));
  console.log("auth validate");
  return async (dispatch) => {
    const sendRequest = async () => {
      const querySnapshot = await getDocs(q);
      let document;
      querySnapshot.forEach((doc) => {
        document = { id: doc.id, data: doc.data() };
      });

      return document;
    };
    try {
      const { id, data } = await sendRequest();
      const userDocRef = doc(db, "users", id);
      updateDoc(userDocRef, { isAuthenticated: true });
      dispatch(
        authActions.replaceLogin({
          isAuthenticated: true,
          userName: data.userName,
          changed: "login",
        })
      );

      console.log("success");
    } catch (error) {
      // dispatch(
      //   uiActions.showNotification({
      //     status: "error",
      //     title: "Error!",
      //     message: "Fetching cart data failed!",
      //   })
      // );
      console.log("error", error);
    }
  };
};

export const updateBaseOnLogout = (auth) => {
  const q = query(users, where("userName", "==", auth.userName));
  return async (dispatch) => {
    const updateReq = async () => {
      console.log("isAuth update", auth);
      const querySnapshot = await getDocs(q);
      let document;
      querySnapshot.forEach((doc) => {
        document = { id: doc.id, data: doc.data() };
      });

      return document;
    };
    try {
      const { id, data } = await updateReq();
      const userDocRef = doc(db, "users", id);
      updateDoc(userDocRef, { isAuthenticated: false });
      dispatch(
        authActions.replaceLogin({
          isAuthenticated: false,
          userName: "",
          changed: "",
        })
      );

      console.log("success");
    } catch (error) {
      console.log("error", error);
    }
  };
};
