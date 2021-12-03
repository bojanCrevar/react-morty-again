import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="container mx-auto w-full mt-1">
      <h4 className="text-center">Welcome to Rick and Morty app</h4>
      <div className="my-10">
        Select link:
        <ul>
          <li>
            <Link href="/locations">Locations</Link>
          </li>
          <li>
            <Link href="/episodes">Episodes</Link>
          </li>
          <li>
            <Link href="/characters">Characters</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
