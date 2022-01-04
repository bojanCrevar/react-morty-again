import "tailwindcss/tailwind.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../_styles/App.css";
import "react-loading-skeleton/dist/skeleton.css";

import NavMenu from "../components/NavMenu.tsx";
import "react-loading-skeleton/dist/skeleton.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-gray-400 h-full">
      <NavMenu />
      <div
        className="flex overflow-auto"
        style={{ height: "calc(100% - 56px)" }}
      >
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
