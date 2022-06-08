import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import MainLoading from "../components/loading/MainLoading";
import { useAppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const router = useRouter();
  const { currentUser, logIn } = useAuth();
  const { dispatch } = useAppContext();
  const [initialLoading, setInitialLoading] = useState(true);
  const [logInLoading, setLogInLoading] = useState(false);
  const handleUserLogIn = async (e) => {
    e.preventDefault();
    if (emailRef.current.value && pwdRef.current.value) {
      try {
        setLogInLoading(true);
        await logIn(emailRef.current.value, pwdRef.current.value);
        router.push("/");
        emailRef.current.value = "";
        pwdRef.current.value = "";
      } catch (err) {
        let errMsg = err.message.split("Firebase:")[1];
        dispatch({ type: "SET_MODAL_TEXT", payload: errMsg });
      }
      setLogInLoading(false);
    }
  };
  const emailRef = useRef();
  const pwdRef = useRef();

  useEffect(() => {
    if (currentUser) {
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
            <title>Log In</title>
          </Head>
          {logInLoading && <MainLoading />}
          <div className="wrapper-sm">
            <h1 className="text-3xl text-center mt-6">Log In</h1>
            <form
              onSubmit={(e) => handleUserLogIn(e)}
              className="bg-white mt-6 py-12 px-8 shadow-md rounded-md flex flex-col gap-6"
            >
              <div>
                <label
                  htmlFor="login-email"
                  className="block mb-2 text-lg text-gray-500 font-semibold"
                >
                  Email
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  id="login-email"
                  placeholder="Email"
                  className="py-2 px-5 w-full border rounded-md focus:border-gray-600 outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="signup-pwd"
                  className="block mb-2 text-lg text-gray-500 font-semibold"
                >
                  Password
                </label>
                <input
                  ref={pwdRef}
                  type="password"
                  id="signup-pwd"
                  placeholder="Password"
                  required
                  className="py-2 px-5 w-full border rounded-md focus:border-gray-600 outline-none"
                />
              </div>

              <button type="submit" className="btn-blue mt-5">
                Log In
              </button>
            </form>
            <p className="text-center mb-6">
              Don't have an account?{" "}
              <button
                onClick={() => router.push("/signup")}
                className="text-blue-600 hover:underline mt-4 "
              >
                Sign Up
              </button>
            </p>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Login;
