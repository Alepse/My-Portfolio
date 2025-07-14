import { motion } from 'framer-motion';
import { CiLink } from "react-icons/ci";
import PropTypes from 'prop-types';

const ProjectCard = ({
  project,
  files,
  darkMode,
  expanded,
  onToggleExpand,
  onImageClick,
}) => {
  // Find file if image exists
  const file = project.image ? files.find(f => f.name === project.image) : null;
  const ext = file ? file.name.split('.').pop().toLowerCase() : '';
  const isImage = ["png", "jpg", "jpeg", "gif", "webp"].includes(ext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.018, boxShadow: '0 8px 24px 0 #c7d2fe80', rotate: 0.5 }}
      whileTap={{ scale: 0.98, rotate: -0.5 }}
      transition={{ type: 'spring', stiffness: 180, damping: 18 }}
      className={`${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-2xl shadow-md overflow-hidden group border border-transparent hover:border-blue-100 dark:hover:border-blue-900`}
    >
      <div className="relative">
        {/* Media Preview */}
        {project.videoUrl ? (
          <div className="relative w-full h-48 sm:h-56 md:h-64">
            <iframe
              src={`${project.videoUrl}?autoplay=0&rel=0&modestbranding=1`}
              title={project.title}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : file && isImage ? (
          <div className="relative">
            <img
              className="w-full h-48 sm:h-56 md:h-64 object-cover cursor-pointer"
              src={file.url}
              alt={project.title}
              onClick={() => onImageClick({ url: file.url, title: project.title })}
            />
          </div>
        ) : (
          <div className={`w-full h-48 sm:h-56 md:h-64 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
            <span className={`text-3xl sm:text-4xl ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>{project.title[0]}</span>
          </div>
        )}
        {/* Role label */}
        <motion.div
          className={`absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-blue-900/60 text-blue-200' : 'bg-blue-50 text-blue-700'}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
        >
          Role: {project.type}
        </motion.div>
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-blue-500 transition-colors duration-300 tracking-tight">
          {project.title}
        </h3>
        {project.date && (
          <div className="mb-2">
            <span className={`text-xs sm:text-sm font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
              📅 {project.date}
            </span>
          </div>
        )}
        <div className="mb-3 sm:mb-4">
          {/* Use a ref to determine if text is visually truncated */}
          <TruncatableText
            text={project.description}
            expanded={expanded}
            darkMode={darkMode}
            onToggleExpand={onToggleExpand}
          />
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {project.tech.map((tech) => (
            <motion.span
              key={tech}
              className={`text-xs px-2 sm:px-3 py-1 rounded-full ${darkMode ? 'bg-gray-800 text-blue-200' : 'bg-blue-50 text-blue-700'}`}
              whileHover={{ scale: 1.13, backgroundColor: darkMode ? '#3b82f6' : '#e0e7ff', color: darkMode ? '#fff' : '#7c3aed' }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
        {(project.link && (!project.image || (project.image && !["mp4","webm","ogg"].includes((project.image.split('.').pop() || '').toLowerCase())))) && (
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium ${darkMode ? 'text-blue-200' : 'text-blue-600'} group-hover:gap-3 transition-all duration-300 relative overflow-hidden`}
            whileHover={{ color: darkMode ? '#a5b4fc' : '#3b82f6' }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          >
            <span className="relative z-10">View Project</span>
            <motion.span
              className="absolute left-0 bottom-0 h-0.5 w-full bg-blue-200 dark:bg-blue-900"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ originX: 0 }}
            />
            <motion.span
              className="z-10"
              whileHover={{ x: 3, scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              <CiLink className="text-lg sm:text-xl" />
            </motion.span>
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

import { useRef, useLayoutEffect, useState as useReactState } from 'react';

function TruncatableText({ text, expanded, darkMode, onToggleExpand }) {
  const pRef = useRef(null);
  const [truncated, setTruncated] = useReactState(false);

  useLayoutEffect(() => {
    if (!expanded && pRef.current) {
      setTruncated(pRef.current.scrollHeight > pRef.current.clientHeight + 2); // allow for rounding
    } else {
      setTruncated(false);
    }
  }, [expanded, text]);

  return (
    <>
      <p
        ref={pRef}
        className={`text-sm ${expanded ? '' : 'line-clamp-2'} ${darkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}
        style={{ display: '-webkit-box', WebkitLineClamp: expanded ? 'unset' : 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
      >
        {text}
      </p>
      {truncated && (
        <button
          className={`text-xs mt-1 font-medium ${darkMode ? 'text-blue-300' : 'text-blue-500'} underline focus:outline-none`}
          onClick={onToggleExpand}
        >
          {expanded ? 'Show Less' : 'Read More'}
        </button>
      )}
    </>
  );
}

TruncatableText.propTypes = {
  text: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
  darkMode: PropTypes.bool,
  onToggleExpand: PropTypes.func,
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tech: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string,
    videoUrl: PropTypes.string,
    link: PropTypes.string,
    date: PropTypes.string
  }).isRequired,
  files: PropTypes.array.isRequired,
  darkMode: PropTypes.bool.isRequired,
  expanded: PropTypes.bool,
  onToggleExpand: PropTypes.func,
  onImageClick: PropTypes.func,
};

export default ProjectCard;
