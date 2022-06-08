
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import MainLoading from "../components/loading/MainLoading";
import { useAppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";


const Profile = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const { dispatch } = useAppContext();
  const router = useRouter();
  const [initialLoading, setInitialLoading] = useState(true);
 
  

  
  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    } else {
      setInitialLoading(false);
    }
  }, []);
  return (
    <>
      {!initialLoading ? (
        <>
          <Head>
            <title>Profile</title>
          </Head>
         
          <div className="wrapper my-10">
            <div className="bg-white px-6 py-10 rounded-md shadow-md">
              <div>
                <div className="flex items-center gap-5 justify-center">
                  <h2 className="font-semibold text-slate-600">
                    Display Name:{" "}
                  </h2>
                  <p className="text-lg font-bold">
                    {currentUser && currentUser.displayName}
                  </p>
                </div>
                <div className="flex items-center gap-5 justify-center mt-6">
                  <h2 className="font-semibold text-slate-600">Email:</h2>
                  <p className="text-lg font-bold">
                    {currentUser && currentUser.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Profile;
