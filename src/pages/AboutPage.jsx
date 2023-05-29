import Card from "../components/shared/Card";

// router
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <Card>
      <div className="about">
        <h1>About this Project</h1>
        <p>React app to feedback something</p>
        <p>Version: 1.0.0</p>

        <p>
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    </Card>
  );
};

export default AboutPage;
