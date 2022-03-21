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
import { profileActions } from "../store/profile-slice";
import BootstrapToast from "../components/BootstrapToast";
import { paginationActions } from "../store/pagination-slice";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const resetQuery = useRef(false);
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.profile.isDarkTheme);

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      if (!shallow) {
        resetQuery.current = true;
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);
  }, [dispatch, router.events]);

  if (resetQuery.current) {
    resetQuery.current = false;
    dispatch(filterActions.resetKeywordAndFilter());
    dispatch(paginationActions.resetActivePage());
    dispatch(
      profileActions.toggleTheme(localStorage.getItem("isDarkTheme") === "true")
    );
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      getUserByToken(localStorage.getItem("token"));
      dispatch(
        profileActions.toggleTheme(
          localStorage.getItem("isDarkTheme") === "true"
        )
      );
    }
  }, [dispatch]);

  return (
    <div className={"h-full" + (isDarkTheme ? " dark" : "")}>
      <NavMenu />
      <div
        className="flex overflow-auto bg-gray-400 dark:bg-[#414b55] dark:text-white"
        style={{ height: "calc(100% - 62.05px)" }}
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
