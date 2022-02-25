import "tailwindcss/tailwind.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../_styles/App.css";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import store from "../store";
import { Provider } from "react-redux";
import NavMenu from "../components/NavMenu.tsx";
import { filterActions } from "../store/filter-slice";
import { getUserByToken } from "../utils/getUserByToken";

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
      getUserByToken(token);
    }
  }, [token]);

  return (
    <Provider store={store}>
      <div className="bg-gradient-to-b from-white via-gray-400 to-gray-700 h-full">
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
