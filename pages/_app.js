import "tailwindcss/tailwind.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../_styles/App.css";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import store from "../store";
import { Provider, useDispatch, useSelector } from "react-redux";
import NavMenu from "../components/NavMenu.tsx";
import { filterActions } from "../store/filter-slice";
import { fetchUserOnReload } from "../store/auth-actions";
import { authActions } from "../store/auth-slice";
import axios from "axios";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  let token;
  //it doesn't work without this IF
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      if (!shallow) {
        store.dispatch(filterActions.resetKeywordandFilter());
      }
    };
    router.events.on("routeChangeStart", handleRouteChange);
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .post(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE}`,
          { idToken: token }
        )
        .then((response) => {
          console.log("response", response);
          store.dispatch(
            authActions.logIn({
              token: token,
              username: response.data.users[0].email,
            })
          );
        })
        .catch((error) => console.log("error: ", error.message));
    }
  }, [token]);

  return (
    <Provider store={store}>
      <div className="bg-gray-400 h-full">
        <NavMenu />
        <div
          className="flex overflow-auto"
          style={{ height: "calc(100% - 56px)" }}
        >
          <Component {...pageProps} />
        </div>
      </div>
    </Provider>
  );
}

export default MyApp;
