import axios from "axios";
import store from "../store";
import { profileActions } from "../store/profile-slice";
import { authActions } from "../store/auth-slice";

export function getUserByToken(token: string) {
  if (token) {
    axios
      .post(`${process.env.NEXT_PUBLIC_NODE_URL}/user/getUser`, null, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        store.dispatch(authActions.logIn(token));

        store.dispatch(
          profileActions.setProfile({
            displayName: response.data.user.username || "",
            userEmail: response.data.user.email,
            avatar: response.data.user.avatar,
            isDarkTheme: response.data.user.isDarkTheme,
          })
        );
      })
      .catch((error) => console.log("error: ", error.message));
  }
}
