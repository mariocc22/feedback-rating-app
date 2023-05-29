// props
import PropTypes from "prop-types";

// hooks
import { useContext, useEffect } from "react";

// context
import FeedbackContext from "../context/FeedbackContext";

function RatingSelect({ select, selected }) {
  const { feedbackEdit } = useContext(FeedbackContext);

  // this will update the local state "selected" whenever the feedbackEdit changes
  useEffect(() => {
    select(feedbackEdit.item.rating);
  }, [feedbackEdit]);

  const handleChange = (e) => {
    select(+e.currentTarget.value);
  };

  // NOTE: simplified with iteration
  return (
    <ul className="rating">
      {/* here you create an Array, the {length: 10} is the desired length of the array
      and the (_, i) is the maping initial values to iterate through the 10 elements, it returns a ew array */}
      {Array.from({ length: 10 }, (_, i) => (
        <li key={`rating-${i + 1}`}>
          <input
            type="radio"
            id={`num${i + 1}`}
            name="rating"
            value={i + 1}
            onChange={handleChange}
            checked={selected === i + 1}
          />
          <label htmlFor={`num${i + 1}`}>{i + 1}</label>
        </li>
      ))}
    </ul>
  );
}

RatingSelect.propTypes = {
  selected: PropTypes.number,
  select: PropTypes.func,
};

export default RatingSelect;
