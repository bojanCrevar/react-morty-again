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
import { fetchUserOnReload, updateAuthData } from "../store/auth-actions";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  //const dispatch = useDispatch();
  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      if (!shallow) {
        store.dispatch(filterActions.resetKeywordandFilter());
      }
    };
    router.events.on("routeChangeStart", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    // return () => {
    //   router.events.off("routeChangeStart", handleRouteChange);
    // };
  }, []);

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
