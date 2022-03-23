import { profileActions } from "./profile-slice";

export const dispatchProfile = (user) => {
  return async (dispatch) => {
    console.log("dispatchProfile", user);
    try {
      const { displayName, email, avatar, isDarkTheme, userType } = user;

      dispatch(
        profileActions.setProfile({
          displayName,
          email,
          avatar,
          isDarkTheme,
          userType,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };
};
