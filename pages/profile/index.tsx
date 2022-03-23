import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../model/storeModel";
import { useRouter } from "next/router";
import ProfileFormComponent from "../../components/ProfileFormComponent";

function Profile() {
  const profile = useSelector((state: RootState) => state.profile);
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (auth.isLoggedIn === false) {
      router.push("/");
    }
  }, [auth]);

  return (
    <div className="w-full">
      <div className="flex flex-col w-full items-center">
        <h1 className="pt-2 pt-md-4 text-3xl text-center md:hidden">
          Profile:{" "}
          {profile.displayName.length > 0 ? profile.displayName : profile.email}
        </h1>
        <div className="w-full mt-3 mt-md-5 mb-3 md:w-3/4 lg:w-1/2 px-8 sm:px-16 md:px-8">
          <ProfileFormComponent profile={profile} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
