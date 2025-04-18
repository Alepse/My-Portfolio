import Loader from '../Loader';
import PropTypes from 'prop-types';

const LoaderOverlay = ({ darkMode }) => (
  <div className={`fixed inset-0 z-50 flex items-center justify-center ${darkMode ? 'bg-gray-900/80' : 'bg-white/80'}`}>
    <Loader darkMode={darkMode} />
  </div>
);

LoaderOverlay.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default LoaderOverlay;
