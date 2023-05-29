// framer motion
import { motion, AnimatePresence } from "framer-motion";

// components
import FeedbackItem from "./FeedbackItem";
import Spinner from "./shared/Spinner";

// hooks
import { useContext } from "react";

// context
import FeedbackContext from "../context/FeedbackContext";

const FeedbackList = () => {
  // 4. consume context
  const { feedback, isLoading } = useContext(FeedbackContext);

  if (!isLoading && (!feedback || feedback.length === 0)) {
    return <p>No Feedback yet!</p>;
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="feedback-list">
      <AnimatePresence>
        {feedback.map((fb) => (
          <motion.div
            key={fb.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem item={fb} key={fb.id} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  // return (
  //   <div className="feedback-list">
  //     {!feedback || feedback.length === 0 ? (
  //       <p>No Feedback Yet</p>
  //     ) : (
  //       feedback.map((fb) => (
  //         <FeedbackItem
  //           rating={fb.rating}
  //           text={fb.text}
  //           id={fb.id}
  //           key={fb.id}
  //           handleDelete={handleDelete}
  //         />
  //       ))
  //     )}
  //   </div>
  // );
};

export default FeedbackList;
