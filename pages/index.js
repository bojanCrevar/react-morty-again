import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="mx-auto w-3/4 mt-1">
      <h4 className="text-center">Welcome to Rick and Morty app</h4>
      <div className="my-10">
        Select link:
        <ul className="list-disc">
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
