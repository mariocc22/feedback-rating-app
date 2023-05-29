import { createContext, useState } from "react";

// uuid
import { v4 as uuidv4 } from "uuid";

// 1. create context
const FeedbackContext = createContext();

// 2. create a provider to pass our new context to all the children
// 3. Point 3 is on the App.jsx
export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "This is feedback item 1",
      rating: 10,
    },
    {
      id: 2,
      text: "This is feedback item 2",
      rating: 8,
    },
    {
      id: 3,
      text: "This is feedback item 3",
      rating: 5,
    },
  ]);
  // edit flag
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  // we install a library of uuid to add keys for our objects (ratings)
  // add item
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  // delet item
  const handleDelete = (id) => {
    // a pop up comeout and you must confirm if yes or no
    if (window.confirm("Are you sure you want to delete this feedback? "))
      setFeedback(() => feedback.filter((fb) => fb.id !== id));
  };

  // set item to update
  const editFeedback = (item) => {
    setFeedbackEdit({
      item: item,
      edit: true,
    });
  };

  // update feedback
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        handleDelete,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
