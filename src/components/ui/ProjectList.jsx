import PropTypes from 'prop-types';
import ProjectCard from './ProjectCard';

const ProjectList = ({
  projects,
  files,
  darkMode,
  expandedDescriptions,
  setExpandedDescriptions,
  setModalImage,
  setHoverImage,
  setHoverPos
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {projects.map((project, index) => (
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
  </div>
);

ProjectList.propTypes = {
  projects: PropTypes.array.isRequired,
  files: PropTypes.array.isRequired,
  darkMode: PropTypes.bool.isRequired,
  expandedDescriptions: PropTypes.object.isRequired,
  setExpandedDescriptions: PropTypes.func.isRequired,
  setModalImage: PropTypes.func.isRequired,
  setHoverImage: PropTypes.func.isRequired,
  setHoverPos: PropTypes.func.isRequired,
};

export default ProjectList;
