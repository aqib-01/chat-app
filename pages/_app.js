import AuthProvider from "../context/AuthContext";
import AppContext from "../context/AppContext";
import FeedbackModal from "../components/FeedbackModal";

import "../styles/css/globals.css";
import "../styles/css/main.css";
import Nav from "../components/Nav";
function MyApp({ Component, pageProps }) {
  return (
    <AppContext>
      <AuthProvider>
        <FeedbackModal />

        <Nav />

        <Component {...pageProps} />
      </AuthProvider>
    </AppContext>
  );
}

export default MyApp;
