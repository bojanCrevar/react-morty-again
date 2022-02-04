import Link from "next/link";

function Error() {
  return (
    <div className="error-container mx-auto p-4">
      <h1>404 - Page Not Found</h1>

      <img
        src="https://rickandmortyapi.com/api/character/avatar/234.jpeg"
        alt="a dead morty..."
        className="m-auto  rounded-full p-4"
      />

      <Link href="/">
        <div className="text-center text-blue-500 underline cursor-pointer">
          Go back home
        </div>
      </Link>
    </div>
  );
}

export default Error;
