import React from "react";

const ConfigForm = ({ config, onChange }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block font-semibold mb-1">Processor</label>
        <select
          value={config.processor}
          onChange={(e) => onChange("processor", e.target.value)}
          className="border rounded w-full p-2"
        >
          <option value="">Select Processor</option>
          <option value="i5">Intel i5</option>
          <option value="i7">Intel i7</option>
          <option value="i9">Intel i9</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">RAM</label>
        <select
          value={config.ram}
          onChange={(e) => onChange("ram", e.target.value)}
          className="border rounded w-full p-2"
        >
          <option value="">Select RAM</option>
          <option value="8GB">8GB</option>
          <option value="16GB">16GB</option>
          <option value="32GB">32GB</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Storage</label>
        <select
          value={config.storage}
          onChange={(e) => onChange("storage", e.target.value)}
          className="border rounded w-full p-2"
        >
          <option value="">Select Storage</option>
          <option value="512GB SSD">512GB SSD</option>
          <option value="1TB SSD">1TB SSD</option>
          <option value="2TB HDD">2TB HDD</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Color</label>
        <select
          value={config.color}
          onChange={(e) => onChange("color", e.target.value)}
          className="border rounded w-full p-2"
        >
          <option value="">Select Color</option>
          <option value="Silver">Silver</option>
          <option value="Black">Black</option>
          <option value="Blue">Blue</option>
        </select>
      </div>
    </div>
  );
};

export default ConfigForm;
