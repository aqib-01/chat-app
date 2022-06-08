import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
const FeedbackModal = () => {
  const { dispatch } = useAppContext();
  const {
    state: { feedbackModal },
  } = useAppContext();
  useEffect(() => {
    if (feedbackModal.isOpen) {
      setTimeout(() => {
        dispatch({ type: "CLOSE_MODAL" });
      }, 2000);
    }
  }, [feedbackModal.isOpen]);
  return (
    <div
      className={`fixed max-w-2xl top-6 px-10 py-3 mx-auto left-4 right-4 w-fit
     bg-yellow-600 z-50 shadow-md text-white rounded-md transition-all ${
       feedbackModal.isOpen ? "translate-y-0" : "-translate-y-32"
     }`}
    >
      {feedbackModal.text}
    </div>
  );
};

export default FeedbackModal;
