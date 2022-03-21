import axios from "axios";
import store from "../store";
import { dispatchProfile } from "../store/auth-actions";
import { authActions } from "../store/auth-slice";

export async function getUserByToken(token: string) {
  console.log("GET USER BY TOKEN", token);
  await axios
    .post(
      `${process.env.NEXT_PUBLIC_NODE_URL}/user/getUser`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      store.dispatch(
        authActions.logIn({
          token: token,
          localId: response.data._id,
        })
      );
      store.dispatch(dispatchProfile(response.data));
    })
    .catch((error) => console.log("error: ", error.message));
}
