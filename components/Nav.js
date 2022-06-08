import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { firebaseAuth } from "../firebase/firebaseConfig";
import { useClickOutside } from "../hooks/useClickOutside";
const Nav = () => {
  const [userModalOpen, setUserModalOpen] = useState(false);

  const { currentUser, logOut, setCurrentUser } = useAuth();

  const router = useRouter();

  const userBtnRef = useRef();
  const userModalRef = useRef();
  const toggleUserModal = () => {
    setUserModalOpen(!userModalOpen);
  };
  const handleUserLogOut = () => {
    logOut();
    setCurrentUser(null);
    setUserModalOpen(false);
    router.push("/login");
  };
  useClickOutside(
    () => {
      setUserModalOpen(false);
    },
    userModalRef,
    userBtnRef
  );

  return (
    <header className="bg-gray-600 text-white py-5">
      <div className="wrapper relative">
        <div className="flex items-center gap-10">
          <div className="flex items-center ">
            <button
              onClick={() => router.push("/")}
              className="font-semibold hover:opacity-50"
            >
              Chat Room
            </button>
            <button
              onClick={() => router.push("/about")}
              className="font-semibold hover:opacity-50 ml-8"
            >
              About
            </button>
          </div>
          {!currentUser ? (
            <div className="ml-auto">
              <button
                onClick={() => router.push("/signup")}
                className="bg-blue-500 hidden md:inline-block  text-white px-4 py-2 font-semibold rounded-md  hover:bg-blue-700"
              >
                Sign Up
              </button>
              <button
                onClick={() => router.push("/login")}
                className="hover:underline font-semibold ml-4"
              >
                Log In
              </button>
            </div>
          ) : (
            <>
              <div className=" ml-auto">
                <button
                  ref={userBtnRef}
                  onClick={toggleUserModal}
                  className=" font-semibold hover:opacity-50 py-2 bg-pink-500 rounded-md px-4"
                >
                  {currentUser.displayName}
                </button>

                {userModalOpen && (
                  <div
                    ref={userModalRef}
                    className="absolute top-12 z-50 rounded-md right-0 bg-white shadow-md px-4 text-gray-600 py-6 flex flex-col gap-5"
                  >
                    <button
                      onClick={() => {
                        router.push("/profile");
                        setUserModalOpen(false);
                      }}
                      className="btn-blue"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={handleUserLogOut}
                      className="bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded-md"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Nav;
