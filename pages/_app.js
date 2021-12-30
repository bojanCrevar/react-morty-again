import "tailwindcss/tailwind.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../_styles/App.css";
import "react-placeholder/lib/reactPlaceholder.css";

import NavMenu from "../components/NavMenu.tsx";
import LoaderOverlay from "../components/LoaderOverlay";
import OverlayContextProvider from "../context/OverlayContext";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-gray-400 h-full">
      <NavMenu />
      <OverlayContextProvider>
        <LoaderOverlay />
        <div
          className="flex overflow-auto"
          style={{ height: "calc(100% - 56px)" }}
        >
          <Component {...pageProps} />
        </div>
      </OverlayContextProvider>
    </div>
  );
}

export default MyApp;
