import Head from "next/head";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
const About = () => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <div className="wrapper">
        <div className="bg-white py-8 px-6 mt-10 rounded-md shadow-md">
          <div>
            <h2 className="text-2xl font-semibold text-center">
              Welcome to the Chat App
            </h2>
            <p className="mt-3 text-center text-gray-500">
              This App lets you send messages and these messages will be visible
              to everyone and you need to be signed in to send a message. You
              cannot delete or edit a message so think before sending a message.
              Please be nice and do not say anything rude.
            </p>
          </div>
        </div>
      </div>
      <footer className="bg-blue-900 py-10 mt-20">
        <div className="wrapper">
          <div>
            <p className="mt-3 text-center text-gray-200">
              Hi! I am <span className="font-bold">Aqib Ali</span> , the
              developer of this app. Hope you have liked my app. If you wanna
              contact me, my contact info is given below.
            </p>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl text-white font-semibold text-center">
              Contact Info
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center mt-5">
              <div className=" flex items-center">
                <span className="text-cyan-400 text-lg ">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>

                <a
                  className="font-bold text-white ml-4 hover:underline"
                  href="mailto: aqib10.aa@gmail.com"
                >
                  aqib10.aa@gmail.com
                </a>
              </div>
              <div className="mt-3 sm:ml-8 sm:mt-0 flex items-center">
                <span className="text-cyan-400 text-lg ">
                  <FontAwesomeIcon icon={faPhone} />{" "}
                </span>

                <a
                  className="font-bold text-white ml-4 hover:underline"
                  href="tel:+92 302 5750039"
                >
                  +92 302 5750039
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl text-white font-semibold text-center">
              Social Links
            </h2>
            <div className="flex items-center gap-10 justify-center mt-5">
              <a
                target={"_blank"}
                rel="noreferrer"
                href="https://www.instagram.com/aqib.ali.01/"
              >
                <FontAwesomeIcon
                  className="text-white text-3xl hover:opacity-50"
                  icon={faInstagram}
                />
              </a>
              <a
                target={"_blank"}
                rel="noreferrer"
                href="https://twitter.com/aqib_ali_01"
              >
                <FontAwesomeIcon
                  className="text-white text-3xl hover:opacity-50"
                  icon={faTwitter}
                />
              </a>
              <a
                target={"_blank"}
                rel="noreferrer"
                href="https://github.com/aqib-01"
              >
                <FontAwesomeIcon
                  className="text-white text-3xl hover:opacity-50"
                  icon={faGithub}
                />
              </a>
              <a
                target={"_blank"}
                rel="noreferrer"
                href="https://www.linkedin.com/in/aqib-ali-601191189/"
              >
                <FontAwesomeIcon
                  className="text-white text-3xl hover:opacity-50"
                  icon={faLinkedin}
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default About;
