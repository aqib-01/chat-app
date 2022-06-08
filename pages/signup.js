import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import MainLoading from "../components/loading/MainLoading";
import { useAppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { firebaseAuth } from "../firebase/firebaseConfig";
const SignUp = () => {
  const router = useRouter();
  const { signUp, currentUser } = useAuth();
  const { dispatch } = useAppContext();
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  //  ===================================== Ref Values =============================================
  const nameRef = useRef();
  const emailRef = useRef();
  const pwdRef = useRef();
  const confPwdRef = useRef();

  // ===================================== Event Handlers ==========================================

  const handleUserSignUp = async (e) => {
    e.preventDefault();
    if (
      nameRef.current.value &&
      emailRef.current.value &&
      pwdRef.current.value &&
      confPwdRef.current.value
    ) {
      if (pwdRef.current.value !== confPwdRef.current.value) {
        dispatch({
          type: "SET_MODAL_TEXT",
          payload: "Password don't match!!!",
        });
      } else {
        try {
          setSignUpLoading(true);
          await signUp(emailRef.current.value, pwdRef.current.value);
          await updateProfile(firebaseAuth.currentUser, {
            displayName: nameRef.current.value,
          });
          router.push("/");

          emailRef.current.value = "";
          nameRef.current.value = "";
          pwdRef.current.value = "";
          confPwdRef.current.value = "";
        } catch (err) {
           let errMsg = err.message.split("Firebase:")[1];
           dispatch({ type: "SET_MODAL_TEXT", payload: errMsg });
        }
        setSignUpLoading(false);
      }
    }
  };
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
          {signUpLoading && <MainLoading />}
          <Head>
            <title>Sign Up</title>
          </Head>
          <div className="wrapper-sm">
            <h1 className="text-3xl text-center mt-6">Sign Up</h1>
            <form
              onSubmit={(e) => handleUserSignUp(e)}
              className="bg-white mt-6 py-12 px-8 shadow-md rounded-md flex flex-col gap-6"
            >
              <div>
                <label
                  htmlFor="signup-name"
                  className="block mb-2 text-lg text-gray-500 font-semibold"
                >
                  Name
                </label>
                <input
                  ref={nameRef}
                  type="text"
                  id="signup-name"
                  placeholder="Name"
                  className="py-2 px-5 w-full border rounded-md focus:border-gray-600 outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="signup-email"
                  className="block mb-2 text-lg text-gray-500 font-semibold"
                >
                  Email
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  id="signup-email"
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
                  className="py-2 px-5 w-full border rounded-md focus:border-gray-600 outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="signup-conf-pwd"
                  className="block mb-2 text-lg text-gray-500 font-semibold"
                >
                  Confirm Password
                </label>
                <input
                  ref={confPwdRef}
                  type="password"
                  id="signup-conf-pwd"
                  placeholder="Confirm Password"
                  className="py-2 px-5 w-full border rounded-md focus:border-gray-600 outline-none"
                  required
                />
              </div>
              <button type="submit" className="btn-blue mt-5">
                Sign Up
              </button>
            </form>
            <p className="text-center mb-6">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-blue-600 hover:underline mt-4 "
              >
                Log In
              </button>
            </p>
          </div>
        </>
      ) : null}
    </>
  );
};

export default SignUp;
