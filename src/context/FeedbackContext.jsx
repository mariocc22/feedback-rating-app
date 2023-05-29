import { createContext, useState, useEffect } from "react";

// 1. create context
const FeedbackContext = createContext();

// 2. create a provider to pass our new context to all the children
// 3. Point 3 is on the App.jsx
export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);

  // fetch
  useEffect(() => {
    fetchFeedback();
    console.log(feedback);
  }, []);

  // fetch feedback
  const fetchFeedback = async () => {
    // this is the endpoint for the json server
    const response = await fetch(
      `http://localhost:5000/feedback?_sort=id&_order=desc`
    );
    const data = await response.json();

    setFeedback(data);
    setIsLoading(false);
  };

  // edit flag
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  // we install a library of uuid to add keys for our objects (ratings)
  // add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch("http://localhost:5000/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();

    setFeedback([data, ...feedback]);
  };

  // delete item
  const handleDelete = async (id) => {
    // a pop up comeout and you must confirm if yes or no
    if (window.confirm("Are you sure you want to delete this feedback? ")) {
      await fetch(`http://localhost:5000/feedback/${id}`, {
        method: "DELETE",
      });
      setFeedback(feedback.filter((fb) => fb.id !== id));
    }
  };

  // set item to update
  const editFeedback = (item) => {
    setFeedbackEdit({
      item: item,
      edit: true,
    });
  };

  // update feedback
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`http://localhost:5000/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updItem),
    });

    const data = await response.json();

    // NOTE: no need to spread data and item
    setFeedback(feedback.map((item) => (item.id === id ? data : item)));

    setFeedbackEdit({
      item: {},
      edit: false,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
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
