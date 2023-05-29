import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// components
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutPage from "./pages/AboutPage";
import AboutIconLink from "./components/AboutIconLink";

// hooks
import { FeedbackProvider } from "./context/FeedbackContext";

// css
// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";

function App() {
  return (
    <>
      {/* 3. wrap all your app in the Provider */}
      <FeedbackProvider>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              {/* the exact property is to match exactly the path */}
              <Route
                exact
                path="/"
                element={
                  <>
                    <FeedbackForm />
                    <FeedbackStats />
                    <FeedbackList />
                  </>
                }
              ></Route>
              <Route path="/about" element={<AboutPage />}></Route>
            </Routes>
            <AboutIconLink />
          </div>
        </Router>
      </FeedbackProvider>
    </>
  );
}

export default App;
