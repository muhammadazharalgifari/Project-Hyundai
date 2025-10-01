import React from "react";
import CreateForm from "@/components/admin/cars/Create-Form";

const CreateCar = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 text-gray-900">
        Create{" "}
        <span className="bg-gradient-to-r from-indigo-500 to-indigo-800 bg-clip-text text-transparent">
          New Car
        </span>
      </h1>
      <CreateForm />
    </div>
  );
};

export default CreateCar;
