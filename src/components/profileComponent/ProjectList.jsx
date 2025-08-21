import React, { useState } from 'react'
import ProjectDetailModal from './ProjectDetailModal'
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../Shared/firebaseConfig";
const ProjectList = ({ projects, setProjects }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "projects", id));
      setProjects(prev => prev.filter(p => p.id !== id)); // now works
      setSelectedProject(null);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-6">Your Projects</h2>

      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white shadow-lg rounded-xl p-5 border hover:shadow-2xl transition duration-300 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {project.projectName}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                by <span className="font-medium">{project.userName}</span>
              </p>
              <p className="text-gray-600 line-clamp-2">{project.description}</p>

              {project.technologies?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No projects found.</p>
      )}

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default ProjectList
