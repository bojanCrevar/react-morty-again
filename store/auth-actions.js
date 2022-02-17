import { db } from "../firebase/index";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { authActions } from "./auth-slice";

const users = collection(db, "users");

const fetchData = async (q) => {
  let document;
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    throw new Error("Wrong Credentials");
  }
  querySnapshot.forEach((doc) => {
    document = { id: doc.id, data: doc.data(), ref: doc.ref };
  });

  return document;
};

export const fetchUserOnReload = () => {
  const q = query(users, where("isAuthenticated", "==", true));
  return async (dispatch) => {
    try {
      const userData = await fetchData(q);
      dispatch(
        authActions.replaceLogin({
          isAuthenticated: userData.data.isAuthenticated,
          userName: userData.data.userName,
          password: userData.data.password,
        })
      );
    } catch (error) {
      if (!(error instanceof TypeError)) {
        console.log("Error", error);
      }
    }
  };
};

export const validateAuth = (auth) => {
  const q = query(
    users,
    where("userName", "==", auth.userName),
    where("password", "==", auth.password)
  );
  return async (dispatch) => {
    try {
      const userData = await fetchData(q);
      updateDoc(userData.ref, { isAuthenticated: true });
      dispatch(
        authActions.replaceLogin({
          isAuthenticated: true,
          userName: userData.data.userName,
          password: userData.data.password,
        })
      );
    } catch (error) {
      if (!(error instanceof TypeError)) {
        dispatch(
          authActions.warningUserLogin({
            warningMessage: error.message,
          })
        );
      }
    }
  };
};

export const updateBaseOnLogout = (auth) => {
  const q = query(users, where("userName", "==", auth.userName));
  return async (dispatch) => {
    try {
      const userData = await fetchData(q);
      const userDocRef = userData.ref;
      await updateDoc(userDocRef, { isAuthenticated: false });
      dispatch(
        authActions.replaceLogin({
          isAuthenticated: false,
          userName: "",
          password: "",
        })
      );
    } catch (error) {
      console.log("error", error);
    }
  };
};
