import PropTypes from 'prop-types';

const TechBadge = ({ tech, darkMode }) => (
  <span
    className={`text-xs px-3 py-1 rounded-full ${
      darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
    }`}
  >
    {tech}
  </span>
);

TechBadge.propTypes = {
  tech: PropTypes.string.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default TechBadge;
