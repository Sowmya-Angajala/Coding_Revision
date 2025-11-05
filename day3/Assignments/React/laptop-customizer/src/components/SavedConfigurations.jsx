import React from "react";

const SavedConfigurations = ({ savedConfigs, onEdit, onDelete }) => {
  return (
    <div className="mt-10 w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Saved Configurations</h2>
      {savedConfigs.length === 0 ? (
        <p className="text-gray-500">No configurations saved yet.</p>
      ) : (
        savedConfigs.map((cfg, index) => (
          <div
            key={index}
            className="border-b py-3 flex justify-between items-center"
          >
            <div>
              <p>
                <strong>{cfg.processor}</strong> | {cfg.ram} | {cfg.storage} |{" "}
                {cfg.color}
              </p>
              <p className="text-green-700 font-semibold">
                ₹{cfg.totalPrice}
              </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => onEdit(index)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(index)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedConfigurations;
