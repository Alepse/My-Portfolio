import React from 'react';
import { projectsData } from '../data/projectsData';

// Helper function to truncate description
const truncateDescription = (desc, length = 120) =>
  desc.length > length ? desc.slice(0, length) + '...' : desc;

const ProjectCard = ({ project }) => (
  <div className="project-card">
    <h3>{project.title}</h3>
    <p>
      {project.hideReadMore
        ? project.description
        : truncateDescription(project.description)}
    </p>
    {!project.hideReadMore && (
      <button className="read-more-btn">Read More</button>
    )}
  </div>
);

export default function ProjectsList() {
  return (
    <div className="projects-list">
      {projectsData.map((project, idx) => (
        <ProjectCard key={idx} project={project} />
      ))}
    </div>
  );
}