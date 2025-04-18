import PropTypes from 'prop-types';
import ProjectCard from './ProjectCard';

const ProjectList = ({
  projects,
  files,
  darkMode,
  expandedDescriptions,
  setExpandedDescriptions,
  setModalImage,
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {projects.map((project) => (
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
        onImageClick={(imageData) => setModalImage(imageData)}
      />
    ))}
  </div>
);

ProjectList.propTypes = {
  projects: PropTypes.array.isRequired,
  files: PropTypes.array.isRequired,
  darkMode: PropTypes.bool.isRequired,
  expandedDescriptions: PropTypes.object.isRequired,
  setExpandedDescriptions: PropTypes.func.isRequired,
  setModalImage: PropTypes.func.isRequired,
};

export default ProjectList;
