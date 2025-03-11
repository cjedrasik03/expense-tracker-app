import { useState } from "react";

export default function IncomeInput({ onSubmit }) {
  const [income, setIncome] = useState("");

  // Function to format numbers with commas and decimals
  const formatCurrency = (value) => {
    if (!value) return ""; // Return empty if no input

    const number = parseFloat(value.replace(/,/g, "")); // Remove existing commas

    if (isNaN(number)) return ""; // Prevent invalid input

    return number.toLocaleString("en-US", {
      minimumFractionDigits: number >= 100000 ? 2 : 0, // Add decimals for large numbers
    });
  };

  // Handle input change, ensuring only valid numbers are entered
  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, ""); // Remove non-numeric characters
    if (/^\d{0,4}(\.\d{0,2})?$/.test(rawValue)) {
      setIncome(rawValue);
    }
  };

  // Handle submission by formatting the final output
  const handleSubmit = () => {
    onSubmit("$" + formatCurrency(income)); // Adds $ to the displayed income
  };

  return (
    <div className="bg-purple-300 text-gray-900 p-6 rounded-xl shadow-lg max-w-sm w-full">
      <h1 className="text-xl font-semibold text-center mb-7">
        Enter your monthly income to get started!
      </h1>
      <div className="relative w-full">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-lg">$</span>
        <input
          type="text"
          value={income}
          onChange={handleChange}
          placeholder="Enter income"
          className="w-full pl-7 p-3 rounded-lg border border-gray-400 bg-purple-200 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />
      </div>
      <button
        className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-semibold transition duration-250 ease-in-out hover:bg-green-700 hover:scale-108 active:scale-97"
        onClick={handleSubmit}
        disabled={!income}
      >
        Submit
      </button>
    </div>
  );
}