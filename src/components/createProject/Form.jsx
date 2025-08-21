/**
 * PROJECT FORM COMPONENT
 * This component creates a form to add new projects to our database
 * It handles user input, file uploads, and saves everything to Firebase
 */

"use client";
import { Technology } from "../../Data/index"; // Import our list of technologies
import { useState } from "react"; // React hook for managing component state
import { collection, addDoc } from "firebase/firestore"; // Firebase functions for database
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase functions for file storage
import { db, storage } from "../../../Shared/firebaseConfig"; // Our Firebase configuration
import { useSession } from "next-auth/react";

export default function Form() {
  // STATE: This holds all our form data
  // Think of it like a container that remembers what the user typed
  const [formData, setFormData] = useState({
    projectName: "",     // The name of the project
    description: "",     // What the project does
    technologies: [],    // Which technologies were used (can be multiple)
    projectLink: "",     // URL where people can see the project
    file: null,          // The file the user wants to upload
    fileUrl: "",         // Where the uploaded file will be stored online
  });
  const { data: session } = useSession();
  // STATE: This tracks whether we're currently submitting the form
  // We use this to disable buttons and show loading states
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * FUNCTION: Handle Technology Selection
   * This runs when someone clicks a technology checkbox
   * It either adds or removes the technology from our list
   */
  const handleTechChange = (techName) => {
    setFormData((previousData) => {
      // Check if this technology is already selected
      const isAlreadySelected = previousData.technologies.includes(techName);
      let newTechnologies;

      if (isAlreadySelected) {
        // Remove it from the list (user unchecked it)
        newTechnologies = previousData.technologies.filter((name) => name !== techName);
      } else {
        // Add it to the list (user checked it)
        newTechnologies = [...previousData.technologies, techName];
      }

      // Return the updated form data
      return {
        ...previousData, // Keep everything else the same
        technologies: newTechnologies, // Update only the technologies
      };
    });
  };

  /**
   * FUNCTION: Handle Form Submission
   * This runs when the user clicks the Submit button
   * It validates the data, uploads the file, and saves everything to the database
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from refreshing
    
    // VALIDATION: Check if required fields are filled
    if (!formData.projectName || !formData.description) {
      alert("Please fill in the project name and description!");
      return; // Stop here if validation fails
    }

    // Show loading state
    setIsSubmitting(true);

    try {
      let fileUrl = ""; // This will store the URL of the uploaded file
      
      // STEP 1: Upload file if user selected one
      if (formData.file) {
        console.log("📁 Uploading file:", formData.file.name);
        
        // Create a unique name for the file using current timestamp
        const fileName = `${Date.now()}_${formData.file.name}`;
        const storageRef = ref(storage, `projects/${fileName}`);
        
        try {
          // Upload the file to Firebase Storage
          const snapshot = await uploadBytes(storageRef, formData.file);
          
          // Get the public URL where people can download the file
          fileUrl = await getDownloadURL(snapshot.ref);
          console.log("✅ File uploaded successfully! URL:", fileUrl);
        } catch (uploadError) {
          console.error("❌ File upload failed:", uploadError);
          alert("Sorry, there was an error uploading your file. Please try again.");
          setIsSubmitting(false);
          return; // Stop here if file upload fails
        }
      }

      // STEP 2: Prepare the data to save to database
      const projectData = {
        projectName: formData.projectName.trim(),    // Remove extra spaces
        description: formData.description.trim(),    // Remove extra spaces
        technologies: formData.technologies,         // Array of selected technologies
        projectLink: formData.projectLink.trim(),    // Remove extra spaces
        fileUrl: fileUrl,                           // URL of uploaded file (empty if no file)
        createdAt: new Date(),                      // When this project was created
        updatedAt: new Date(),                       // When this project was last updated
        userId: session?.user?.id ?? null,         // ID of the user who created the project
        userName: session?.user?.name ?? null
      };

      // DEBUG: Log what we're about to save (helpful for troubleshooting)
      console.log("💾 Saving project data:", projectData);

      // STEP 3: Save to Firebase Database
      const docRef = await addDoc(collection(db, "projects"), projectData);
      console.log("✅ Project saved successfully! ID:", docRef.id);

      // STEP 4: Reset the form (clear all fields)
      setFormData({
        projectName: "",
        description: "",
        technologies: [],
        projectLink: "",
        file: null,
        fileUrl: "",
      });

      // Also clear the file input field visually
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';

      // Show success message
      alert("🎉 Project submitted successfully!");
      
    } catch (error) {
      // Something went wrong - show helpful error messages
      console.error("❌ Error saving project:", error);
      
      let errorMessage = "Oops! Something went wrong while saving your project.";
      
      // Provide specific error messages based on the type of error
      if (error.code === 'permission-denied') {
        errorMessage = "Permission denied. Please check if you're allowed to save projects.";
      } else if (error.code === 'invalid-argument') {
        errorMessage = "Some of the data you entered is invalid. Please check your inputs.";
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      
      alert(errorMessage);
      
    } finally {
      // Always hide loading state, whether success or failure
      setIsSubmitting(false);
    }
  };

  // THE ACTUAL FORM UI
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-6">
      <h2 className="text-xl font-semibold">Create New Project</h2>

      {/* PROJECT NAME INPUT */}
      <div>
        <label className="block text-sm font-medium">Project Name *</label>
        <input
          type="text"
          required
          className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          value={formData.projectName}
          onChange={(e) =>
            setFormData({ ...formData, projectName: e.target.value })
          }
          placeholder="Enter your awesome project name"
          disabled={isSubmitting} // Disable when submitting
        />
        <p className="mt-1 text-xs text-gray-500">* This field is required</p>
      </div>

      {/* PROJECT DESCRIPTION INPUT */}
      <div>
        <label className="block text-sm font-medium">Description *</label>
        <textarea
          required
          className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          rows="4"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Describe what your project does and what makes it special..."
          disabled={isSubmitting}
        ></textarea>
        <p className="mt-1 text-xs text-gray-500">* This field is required</p>
      </div>

      {/* TECHNOLOGY SELECTION */}
      <div>
        <label className="block text-sm font-medium mb-2">Technologies Used</label>
        <p className="text-sm text-gray-600 mb-3">Check all the technologies you used in this project:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Technology?.map((tech) => {
            const Icon = tech.icon; // Get the icon component for this technology
            return (
              <label key={tech.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="technologies"
                  value={tech.name}
                  checked={formData.technologies.includes(tech.name)}
                  onChange={() => handleTechChange(tech.name)}
                  disabled={isSubmitting}
                />
                {Icon && <Icon className="text-xl" />}
                <span>{tech.name}</span>
              </label>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-gray-500">Select as many as you want (optional)</p>
      </div>

      {/* PROJECT LINK INPUT */}
      <div>
        <label className="block text-sm font-medium">Project Link</label>
        <input
          type="url"
          value={formData.projectLink}
          className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="https://your-awesome-project.com"
          onChange={(e) =>
            setFormData({ ...formData, projectLink: e.target.value })
          }
          disabled={isSubmitting}
        />
        <p className="mt-2 text-sm text-gray-500">
          Where can people see your project? (GitHub, live website, etc.) - Optional
        </p>
      </div>

      {/* FILE UPLOAD */}
      <div>
        <label className="block text-sm font-medium">Upload Project File</label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.zip"
          onChange={(e) =>
            setFormData({ ...formData, file: e.target.files[0] })
          }
          className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring focus:ring-blue-300"
          disabled={isSubmitting}
        />
        <p className="mt-2 text-sm text-gray-500">
          Upload a screenshot, demo video, or project files (optional)<br/>
          Accepted: .jpg, .png, .pdf, .doc, .docx, .zip (Max 10MB)
        </p>
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full p-3 rounded-md font-medium transition ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white`}
      >
        {isSubmitting ? "⏳ Submitting..." : "🚀 Submit Project"}
      </button>
      
      {/* HELPFUL NOTE */}
      <p className="text-center text-sm text-gray-500">
        Fields marked with * are required. Everything else is optional but helpful!
      </p>
    </form>
  );
};