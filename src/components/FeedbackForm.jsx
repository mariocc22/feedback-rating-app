// reusable components
import Button from "./shared/Button";
import Card from "./shared/Card";
import RatingSelect from "./RatingSelect";

// hooks
import { useState, useContext, useEffect } from "react";

// context
import FeedbackContext from "../context/FeedbackContext";

const FeedbackForm = () => {
  const { handleAdd, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setbtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);

  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [btnDisabled, setbtnDisabled] = useState(true);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setText(value);
    setbtnDisabled(!value || value.length <= 10);
    setMessage(
      () => !value || (value.length <= 10 && "Must be at leat 10 characters")
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      // this is like saying: newFeedBack  = {text: text, select: select}
      const newFeedback = {
        text,
        rating,
      };
      // this will check if you are editing an existing task or adding a NEW task
      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback);
      } else {
        handleAdd(newFeedback);
      }
      setText("");
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect
          select={(select) => setRating(select)}
          selected={rating}
        />
        <div className="input-group">
          <input
            type="text"
            placeholder="Write a review"
            value={text}
            onChange={handleChange}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        <div className="message">{message}</div>
      </form>
    </Card>
  );
};

export default FeedbackForm;
