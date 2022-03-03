import axios from "axios";
import store from "../store";
import { dispatchProfile } from "../store/auth-actions";
import { authActions } from "../store/auth-slice";

export function getUserByToken(token: string) {
  axios
    .post(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE}`,
      { idToken: token }
    )
    .then((response) => {
      store.dispatch(
        authActions.logIn({
          token: token,
          userEmail: response.data.users[0].email,
          localId: response.data.users[0].localId,
          refreshToken: localStorage.getItem("refresh_token"),
        })
      );
      store.dispatch(dispatchProfile(response.data.users[0].localId));
    })
    .catch((error) => console.log("error: ", error.message));
}
