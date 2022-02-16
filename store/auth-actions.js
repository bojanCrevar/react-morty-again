import { db } from "../firebase/index";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { authActions } from "./auth-slice";

const users = collection(db, "users");

const fetchData = async (q, auth) => {
  let document;
  const querySnapshot = await getDocs(q);
  if (auth && querySnapshot.empty) {
    throw new Error("No user found in database!");
  }
  querySnapshot.forEach((doc) => {
    if (auth) {
      if (doc.data().password === auth.password) {
        document = { id: doc.id, data: doc.data() };
      } else {
        throw new Error("Wrong password");
      }
    } else {
      document = { id: doc.id, data: doc.data() };
    }
  });

  return document;
};

export const fetchUserOnReload = () => {
  const q = query(users, where("isAuthenticated", "==", true));
  return async (dispatch) => {
    //fetchData(q);
    // const fetchData = async () => {
    //   let document;
    //   const querySnapshot = await getDocs(q);
    //   querySnapshot.forEach((doc) => {
    //     document = { id: doc.id, data: doc.data() };
    //   });

    //   return document;
    // };

    try {
      const userData = await fetchData(q);
      dispatch(
        authActions.replaceLogin({
          isAuthenticated: userData.data.isAuthenticated,
          userName: userData.data.userName,
          password: userData.data.password,
          changed: "",
        })
      );
    } catch (error) {
      if (error instanceof TypeError) {
        return;
      } else {
        console.log("Error", error);
      }
    }
  };
};

export const validateAuth = (auth) => {
  const q = query(users, where("userName", "==", auth.userName));
  return async (dispatch) => {
    // const sendRequest = async () => {
    //   // let document;
    //   // const querySnapshot = await getDocs(q);
    //   // querySnapshot.forEach((doc) => {
    //   //   if (doc.data().password === auth.password) {
    //   //     document = { id: doc.id, data: doc.data() };
    //   //   } else {
    //   //     throw new Error("Wrong password!");
    //   //   }
    //   });

    //   return document;
    //};
    try {
      const userData = await fetchData(q, auth);
      const userDocRef = doc(db, "users", userData.id);
      updateDoc(userDocRef, { isAuthenticated: true });
      dispatch(
        authActions.replaceLogin({
          isAuthenticated: true,
          userName: userData.data.userName,
          password: userData.data.password,
          changed: "login",
        })
      );
    } catch (error) {
      if (error instanceof TypeError) {
        return;
      } else {
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
    // const updateReq = async () => {
    //   const querySnapshot = await getDocs(q);
    //   let document;
    //   querySnapshot.forEach((doc) => {
    //     document = { id: doc.id, data: doc.data() };
    //   });

    //   return document;
    // };
    try {
      const userData = await fetchData(q);
      const userDocRef = doc(db, "users", userData.id);
      updateDoc(userDocRef, { isAuthenticated: false });
      dispatch(
        authActions.replaceLogin({
          isAuthenticated: false,
          userName: "",
          password: "",
          changed: "",
        })
      );
    } catch (error) {
      console.log("error", error);
    }
  };
};
