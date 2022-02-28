import "tailwindcss/tailwind.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../_styles/App.css";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import store from "../store";
import { Provider } from "react-redux";
import NavMenu from "../components/NavMenu.tsx";
import { filterActions } from "../store/filter-slice";
import { getUserByToken } from "../utils/getUserByToken";
import { useDispatch, useSelector } from "react-redux";
import BootstrapToast from "../components/BootstrapToast";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const resetQuery = useRef(false);
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.profile.isDarkTheme);

  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      if (!shallow) {
        resetQuery.current = true;
      }
    };
    router.events.on("routeChangeStart", handleRouteChange);
  }, []);

  if (resetQuery.current) {
    resetQuery.current = false;
    dispatch(filterActions.resetKeywordandFilter());
  }

  useEffect(() => {
    if (token) {
      getUserByToken(token);
    }
  }, [token]);

  return (
    <div className={"bg-gray-400 h-full " + (isDarkTheme && "dark")}>
      <NavMenu />
      <div
        className="flex overflow-auto dark:bg-[#252E38] dark:opacity-80 dark:text-white"
        style={{ height: "calc(100% - 56px)" }}
      >
        <Component {...pageProps} />

        <BootstrapToast />
      </div>
    </div>
  );
};

function MyAppWithProvider({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <MyApp Component={Component} pageProps={pageProps} />
    </Provider>
  );
}

export default MyAppWithProvider;
