import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ProjectCard from './ProjectCard';

const ProjectsGrid = ({
  projects,
  files,
  darkMode,
  expandedDescriptions,
  setExpandedDescriptions,
  setModalImage,
  setHoverImage,
  setHoverPos
}) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const projectTypes = ['All', 'Frontend', 'Full-Stack', 'Design'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.type === activeFilter);

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Project Type Filters */}
      <div className="flex justify-center flex-wrap gap-2">
        {projectTypes.map((type) => (
          <motion.button
            key={type}
            onClick={() => setActiveFilter(type)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === type
                ? darkMode
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                : darkMode
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {type}
          </motion.button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div
        variants={containerAnimation}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            files={files}
            darkMode={darkMode}
            expanded={!!expandedDescriptions[project.title]}
            onToggleExpand={() =>
              setExpandedDescriptions((prev) => ({
                ...prev,
                [project.title]: !prev[project.title],
              }))
            }
            onImageHover={e => {
              if (!project.image) return;
              setHoverImage({ url: files.find(f => f.name === project.image)?.url, title: project.title });
              const rect = e.currentTarget.getBoundingClientRect();
              setHoverPos({
                x: (e.clientX - rect.left) / rect.width,
                y: (e.clientY - rect.top) / rect.height,
              });
            }}
            onImageLeave={() => setHoverImage(null)}
            onImageClick={() => {
              setModalImage({ url: files.find(f => f.name === project.image)?.url, title: project.title });
            }}
          />
        ))}
      </motion.div>

      {/* No Projects Message */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            No projects found for this category.
          </p>
        </motion.div>
      )}
    </div>
  );
};

ProjectsGrid.propTypes = {
  projects: PropTypes.array.isRequired,
  files: PropTypes.array.isRequired,
  darkMode: PropTypes.bool.isRequired,
  expandedDescriptions: PropTypes.object.isRequired,
  setExpandedDescriptions: PropTypes.func.isRequired,
  setModalImage: PropTypes.func.isRequired,
  setHoverImage: PropTypes.func.isRequired,
  setHoverPos: PropTypes.func.isRequired,
};

export default ProjectsGrid; 