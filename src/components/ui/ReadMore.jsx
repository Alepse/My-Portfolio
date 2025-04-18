import PropTypes from 'prop-types';

const ReadMore = ({ text, expanded, onToggle, darkMode, length }) => (
  <div className="mb-4">
    <p className={`text-sm ${expanded ? '' : 'line-clamp-2'} ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{text}</p>
    {text.length > length && (
      <button
        className={`text-xs mt-1 font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'} underline focus:outline-none`}
        onClick={onToggle}
      >
        {expanded ? 'Show Less' : 'Read More'}
      </button>
    )}
  </div>
);

ReadMore.propTypes = {
  text: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  length: PropTypes.number.isRequired,
};

export default ReadMore;
