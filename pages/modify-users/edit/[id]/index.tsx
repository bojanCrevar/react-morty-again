import axios from "axios";
import { GetServerSidePropsContext } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditSkeleton from "../../../../components/skeletons/EditSkeleton";
import ProfileFormComponent from "../../../../components/ProfileFormComponent";
import Wrapper from "../../../../components/Wrapper";
import { RootState } from "../../../../model/storeModel";
import { userProfileModel } from "../../../../model/userProfileModel";

type EditUserProps = {
  id: string;
};

function EditUser({ id: userId }: EditUserProps) {
  const [user, setUser] = useState<userProfileModel>();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const token = useSelector((state: RootState) => state.auth.token);

  const fetchUser = async (userId: string) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_NODE_URL}/user/getUser/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setTimeout(() => {
      setUser(response.data);
    }, 1000);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      Router.push("/");
      return;
    }

    fetchUser(userId);
  }, []);

  console.log("user", user);

  return user ? (
    <Wrapper title={`Modify user: ${user.displayName || user.email}`}>
      <ProfileFormComponent profile={user} admin={true} />
    </Wrapper>
  ) : (
    <div className="m-auto">
      <EditSkeleton count={4} />
    </div>
  );
}

export default EditUser;

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const id = params!.id;

  return { props: { id } };
}
