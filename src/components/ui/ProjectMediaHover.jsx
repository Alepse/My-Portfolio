import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const ProjectMediaHover = ({ hoverImage, hoverPos, onClose }) => {
  if (!hoverImage) return null;
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center cursor-pointer"
      onMouseLeave={onClose}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        style={{
          boxShadow: '0 0 80px 10px #60a5fa, 0 0 0 8px #fff',
          borderRadius: '1rem',
          background: '#fff',
          perspective: 1200,
          transform: `rotateX(${(hoverPos.y - 0.5) * 18}deg) rotateY(${(hoverPos.x - 0.5) * 18}deg) scale(1.08)`,
          maxWidth: '90vw',
          maxHeight: '70vh',
          width: 'auto',
          margin: '0 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={hoverImage.url}
          alt={hoverImage.title}
          className="pointer-events-none w-auto max-w-full max-h-[70vh] object-contain rounded-lg border-4 border-white"
          style={{ boxShadow: '0 0 36px 6px #3b82f6, 0 0 0 2px #fff' }}
        />
      </motion.div>
    </div>
  );
};

ProjectMediaHover.propTypes = {
  hoverImage: PropTypes.object,
  hoverPos: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default ProjectMediaHover;
