import Form from "@/components/createProject/Form";

export default function CreateProject() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Project
        </h1>
        <Form />
      </div>
    </div>
  );
}
