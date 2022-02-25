import "tailwindcss/tailwind.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../_styles/App.css";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import store from "../store";
import { Provider, useDispatch, useSelector } from "react-redux";
import NavMenu from "../components/NavMenu.tsx";
import { filterActions } from "../store/filter-slice";
import { fetchUserOnReload } from "../store/auth-actions";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const resetQuery = useRef(false);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

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
    dispatch(fetchUserOnReload());
  }, []);

  return (
    <div className={"bg-gray-400 h-full " + (theme && "dark")}>
      <NavMenu />
      <div
        className="flex overflow-auto dark:bg-[#252E38] dark:opacity-80 dark:text-white"
        style={{ height: "calc(100% - 56px)" }}
      >
        <Component {...pageProps} />
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
