import "tailwindcss/tailwind.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavMenu from "../components/NavMenu";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-gray-400">
      <NavMenu />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
