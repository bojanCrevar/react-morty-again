import "tailwindcss/tailwind.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../_styles/App.css";
import "react-loading-skeleton/dist/skeleton.css";
import {useEffect, useRef} from "react";
import { useRouter } from "next/router";
import store from "../store";
import { Provider } from "react-redux";
import NavMenu from "../components/NavMenu.tsx";
import { filterActions } from "../store/filter-slice";
import { fetchUserOnReload } from "../store/auth-actions";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const resetQuery = useRef(false);

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      if (!shallow) {
        resetQuery.current = true;
      }
    };
    router.events.on("routeChangeStart", handleRouteChange);
  }, []);
  if(resetQuery.current) {
    resetQuery.current = false;
    store.dispatch(filterActions.resetKeywordandFilter());
  }

  useEffect(() => {
    store.dispatch(fetchUserOnReload());
  }, []);

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
