// hooks
import { useContext } from "react";

// context
import FeedbackContext from "../context/FeedbackContext";

const FeedbackStats = () => {
  const { feedback } = useContext(FeedbackContext);
  // calculate ratings avg
  let average =
    feedback.reduce((acc, cur) => {
      return acc + cur.rating;
    }, 0) / feedback.length;

  // this expression help us to remove unnecessary 0's
  average = average.toFixed(1).replace(/[.,]0$/, "");

  return (
    <div className="feedback-stats">
      <h4>{feedback.length}</h4>
      <h4>Average rating: {feedback.length && average}</h4>
    </div>
  );
};

export default FeedbackStats;
