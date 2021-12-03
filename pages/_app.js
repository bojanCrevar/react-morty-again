import "tailwindcss/tailwind.css";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-gray-400">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
