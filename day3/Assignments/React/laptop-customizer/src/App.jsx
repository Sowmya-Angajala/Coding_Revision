import React, { useState } from "react";
import ConfigForm from "./components/ConfigForm";
import PreviewPanel from "./components/PreviewPanel";
import SavedConfigurations from "./components/SavedConfigurations";

const App = () => {
  const basePrice = 60000;

  const [config, setConfig] = useState({
    processor: "",
    ram: "",
    storage: "",
    color: "",
    totalPrice: basePrice,
  });

  const [savedConfigs, setSavedConfigs] = useState([]);

  // Price mapping
  const priceList = {
    processor: { i5: 0, i7: 10000, i9: 20000 },
    ram: { "8GB": 0, "16GB": 4000, "32GB": 8000 },
    storage: { "512GB SSD": 0, "1TB SSD": 3000, "2TB HDD": 6000 },
    color: { Silver: 0, Black: 0, Blue: 0 },
  };

  // Update configuration
  const handleChange = (field, value) => {
    setConfig((prev) => {
      const updated = { ...prev, [field]: value };
      const newTotal =
        basePrice +
        (priceList.processor[updated.processor] || 0) +
        (priceList.ram[updated.ram] || 0) +
        (priceList.storage[updated.storage] || 0);
      return { ...updated, totalPrice: newTotal };
    });
  };

  // Save config
  const handleSave = () => {
    if (!config.processor || !config.ram || !config.storage || !config.color) {
      alert("Please select all options before saving.");
      return;
    }
    setSavedConfigs([...savedConfigs, config]);
    alert("Configuration saved!");
  };

  // Reset config
  const handleReset = () => {
    setConfig({
      processor: "",
      ram: "",
      storage: "",
      color: "",
      totalPrice: basePrice,
    });
  };

  // Load saved config
  const handleEdit = (index) => {
    setConfig(savedConfigs[index]);
  };

  // Delete saved config
  const handleDelete = (index) => {
    const updated = savedConfigs.filter((_, i) => i !== index);
    setSavedConfigs(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">💻 Laptop Customizer</h1>
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl">
        <ConfigForm config={config} onChange={handleChange} />
        <PreviewPanel config={config} onSave={handleSave} onReset={handleReset} />
      </div>

      <SavedConfigurations
        savedConfigs={savedConfigs}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
