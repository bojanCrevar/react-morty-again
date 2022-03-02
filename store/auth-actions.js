import { db } from "../firebase/index";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { profileActions } from "./profile-slice";

export const getUserProfile = async (userLocalId, userResponse) => {
  const docRef = doc(db, "users", userLocalId);
  try {
    let docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, {
        displayName: userResponse.displayName ?? "",
        email: userResponse.email,
        avatar: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        isDarkTheme: false,
      });
      docSnap = await getDoc(docRef);
    }

    return docSnap.data();
  } catch (error) {
    console.log("Error", error);
  }
};

export const dispatchProfile = (userLocalId, userResponse) => {
  return async (dispatch) => {
    try {
      const userData = await getUserProfile(userLocalId, userResponse);

      dispatch(
        profileActions.setProfile({
          displayName: userData.displayName,
          userEmail: userData.email,
          avatar: userData.avatar,
          isDarkTheme: userData.isDarkTheme,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };
};
