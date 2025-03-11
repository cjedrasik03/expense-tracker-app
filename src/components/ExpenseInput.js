import { useState, useEffect } from "react";
import { FaTrash, FaCheck, FaTimes } from "react-icons/fa";

export default function ExpenseInput({ onExpensesChange }) {
  const [expenses, setExpenses] = useState([]);
  const [deletingIndex, setDeletingIndex] = useState(null); // Track which expense is being deleted

  // Categories for the dropdown
  const categories = ["Food", "Entertainment", "Bills", "Miscellaneous"];

  // Function to add a new expense entry
  const addExpense = () => {
    setExpenses([...expenses, { id: Date.now(), title: "", amount: "", category: "" }]);
  };

  // Function to update expense title, amount, or category
  const updateExpense = (index, field, value) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index][field] = value;
    setExpenses(updatedExpenses);
  };

  // Function to confirm deletion
  const confirmDeleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
    setDeletingIndex(null);
  };

  // Sync expenses with parent component
  useEffect(() => {
    onExpensesChange(expenses);
  }, [expenses, onExpensesChange]);

  return (
    <div className="bg-purple-300 text-gray-900 p-6 rounded-xl shadow-lg max-w-sm w-full">
      <h2 className="text-xl font-semibold text-center mb-4">Expenses</h2>

      {/* List of dynamically added expenses */}
      {expenses.map((expense, index) => (
        <div key={expense.id} className="w-full bg-purple-200 p-3 rounded-lg mb-3">
          
          {/* If deleting, show only confirmation buttons */}
          {deletingIndex === expense.id ? (
            <div className="flex justify-center items-center py-4">
              <button
                className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition mx-2"
                onClick={() => confirmDeleteExpense(expense.id)}
              >
                <FaCheck size={20} />
              </button>
              <button
                className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition mx-2"
                onClick={() => setDeletingIndex(null)}
              >
                <FaTimes size={20} />
              </button>
            </div>
          ) : (
            <>
              {/* Expense Title Input (Centered Above) */}
              <input
                type="text"
                value={expense.title}
                onChange={(e) => updateExpense(index, "title", e.target.value)}
                placeholder="Expense Name"
                className="w-full p-2 text-lg font-semibold text-center rounded-lg border border-gray-400 bg-purple-100 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex items-center justify-between w-full">
                {/* Expense Amount Input */}
                <div className="relative w-2/5">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">$</span>
                  <input
                    type="text"
                    value={expense.amount}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9.]/g, ""); // Allow only numbers & decimal
                      if (value.length <= 5) updateExpense(index, "amount", value); // Limit to 7 characters
                    }}
                    placeholder="0.00"
                    className="w-full pl-7 p-2 h-12 text-lg rounded-lg border border-gray-400 text-center bg-purple-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Category Dropdown */}
                <select
                  value={expense.category}
                  onChange={(e) => updateExpense(index, "category", e.target.value)}
                  className="p-2 h-12 w-2/5 text-lg rounded-lg border border-gray-400 bg-purple-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>Select Category</option>
                  {categories.map((category, idx) => (
                    <option key={idx} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                {/* Delete Button */}
                <button
                  className="p-2 h-12 w-12 flex items-center justify-center bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  onClick={() => setDeletingIndex(expense.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      {/* Add Expense Button */}
      <button
        className="mt-4 w-full bg-blue-500 text-white py-3 text-lg rounded-lg font-semibold transition duration-250 ease-in-out hover:scale-108 active:scale-97 hover:bg-blue-600"
        onClick={addExpense}
      >
        Add Expense
      </button>
    </div>
  );
}