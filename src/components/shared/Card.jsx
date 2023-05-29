// prop types
import PropTypes from "prop-types";

// this is great to have common styles for a reusable component
// DARK MODE: this is a great way to implemenent dark mode with conditional styles
const Card = ({ children, reverse }) => {
  return <div className={`card ${reverse && "reverse"}`}>{children}</div>;
};

Card.defaultProps = {
  reverse: false,
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool,
};

export default Card;
