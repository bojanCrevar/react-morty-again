import "tailwindcss/tailwind.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../_styles/App.css";
import "react-loading-skeleton/dist/skeleton.css";
import store from "../store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import NavMenu from "../components/NavMenu.tsx";
import "react-loading-skeleton/dist/skeleton.css";
import { filterActions } from "../store/filter-slice";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      if (!shallow) {
        store.dispatch(filterActions.resetKeywordAndFilter());
      }

      console.log(
        `App is changing to ${url} ${
          shallow ? "with" : "without"
        } shallow routing`
      );
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
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
