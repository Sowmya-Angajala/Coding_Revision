import React from "react";

const PreviewPanel = ({ config, onSave, onReset }) => {
  return (
    <div
      className={`mt-6 p-4 border-4 rounded-xl text-center transition-all duration-300 ${
        config.color === "Silver"
          ? "border-gray-400"
          : config.color === "Black"
          ? "border-black"
          : config.color === "Blue"
          ? "border-blue-400"
          : "border-gray-200"
      }`}
    >
      <h2 className="text-xl font-semibold mb-2">Laptop Preview</h2>
      <p>Processor: {config.processor || "-"}</p>
      <p>RAM: {config.ram || "-"}</p>
      <p>Storage: {config.storage || "-"}</p>
      <p>Color: {config.color || "-"}</p>
      <h3 className="text-lg font-bold mt-3 text-green-700">
        Total Price: ₹{config.totalPrice}
      </h3>

      <div className="mt-4 flex justify-center gap-3">
        <button
          onClick={onSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Configuration
        </button>
        <button
          onClick={onReset}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PreviewPanel;
