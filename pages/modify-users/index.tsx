import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import RMTable from "../../components/RMTable";
import { ActionContext } from "../../context/ActionContext";
import { RootState } from "../../model/storeModel";

function ModifyUsersPage() {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);

  const [users, setUsers] = useState([]);
  const usersColumns: any = [
    { key: "avatar", title: "Avatar" },
    { key: "displayName", title: "Display name" },
    { key: "email", title: "Email" },
    { key: "userType", title: "Type" },
  ];

  const fetchUsers = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_NODE_URL}/user/allUsers`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setUsers(response.data.users);
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  function handleUpdate(id: string) {
    router.push(`modify-users/edit/${id}`);
  }
  async function handleDelete(id: string) {
    console.log("delete ", id);
  }

  return (
    <div className="w-full">
      <div className="flex flex-col w-full items-center">
        <div className="w-full mt-3 mt-md-5 mb-3 md:w-3/4 lg:w-1/2 px-8 sm:px-16 md:px-8">
          <form className="bg-[#fff] dark:bg-[#6b707a] shadow-md rounded px-4 sm:px-16 md:px-8 pt-6 pb-8 md:w-full">
            <div className="flex justify-center md:justify-between md:px-4 mb-3 md:w-full">
              <div>
                <h1 className="pt-md-4 text-2xl">Modify all users</h1>
              </div>
            </div>

            <div className="w-full">
              {users.length && (
                <ActionContext.Provider value={{ handleUpdate, handleDelete }}>
                  <RMTable columnConfig={usersColumns} tableData={users} />
                </ActionContext.Provider>
              )}
            </div>

            <div className="flex items-center justify-between mt-4">
              <Link href="/">
                <span className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 dark:text-gray-200 dark:hover:text-gray-700 hover:cursor-pointer">
                  Go back
                </span>
              </Link>

              <Button
                variant="success"
                className="font-bold py-2 px-4 rounded "
                type="button"
              >
                Add new user
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModifyUsersPage;
