import React from "react";

const ProjectDetailModal = ({ project, onClose, onDelete }) => {
  return (
    <>
      {/* Background Overlay with Blur */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-2">{project.projectName}</h2>
          <p className="text-sm text-gray-500 mb-4">by {project.userName}</p>

          {/* Description */}
          <p className="text-gray-700 mb-4">{project.description}</p>

          {/* Technologies */}
          {project.technologies?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
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

          {/* Links + Delete */}
          <div className="flex flex-wrap gap-3 mb-4">
            {project.projectLink && (
              <a
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                View Project
              </a>
            )}
            {project.fileUrl && (
              <a
                href={project.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                View File
              </a>
            )}
            {/* Delete Button */}
            <button
              onClick={() => onDelete(project.id)}
              className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Delete Project
            </button>
          </div>

          {/* Dates */}
          <div className="text-xs text-gray-400">
            Created:{" "}
            {project.createdAt?.toDate?.() &&
              project.createdAt.toDate().toLocaleString()}
            <br />
            Updated:{" "}
            {project.updatedAt?.toDate?.() &&
              project.updatedAt.toDate().toLocaleString()}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailModal;
