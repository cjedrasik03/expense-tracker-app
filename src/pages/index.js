import { useState } from "react";
import IncomeInput from "@/components/IncomeInput";
import ExpenseInput from "@/components/ExpenseInput";
import { PieChart, Pie, Cell, Tooltip } from "recharts"; // Import Recharts components

export default function Home() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);

  // Function to update expenses (Passed to ExpenseInput)
  const updateExpenses = (newExpenses) => {
    setExpenses(newExpenses);
  };

  // Calculate total expenses
  const totalExpenses = expenses.reduce((acc, expense) => acc + (parseFloat(expense.amount) || 0), 0);

  // Calculate remaining income
  const remainingIncome = income - totalExpenses;

  // Calculate percentage of income spent
  const incomeSpentPercentage = income > 0 ? ((totalExpenses / income) * 100).toFixed(2) : 0;

  // Define category colors
  const categoryColors = {
    Food: "#ff8000",
    Entertainment: "#0093ff",
    Bills: "#ff0000",
    Miscellaneous: "#ffd500",
  };

  // Group expenses by category
  const categorizedExpenses = expenses.reduce((acc, expense) => {
    if (expense.category && expense.amount) {
      acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
    }
    return acc;
  }, {});

  // Convert categorized expenses into chart data
  const chartData = Object.keys(categorizedExpenses).map((category) => ({
    name: category,
    value: categorizedExpenses[category],
    color: categoryColors[category],
  }));

  // Include remaining income in the chart
  if (income > 0) {
    chartData.push({
      name: "Remaining Income",
      value: remainingIncome > 0 ? remainingIncome : 0, // Prevents negative values
      color: "#16a34a", // Green (Matching submit button color)
    });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-200 text-gray-900 gap-6">
      <IncomeInput onSubmit={(value) => setIncome(parseFloat(value.replace(/[$,]/g, "")) || 0)} />

      {/* Row Layout: Monthly Income + Pie Chart */}
      {income > 0 && (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Income Summary Section */}
          <div className="bg-purple-300 text-gray-900 p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold">Your Monthly Income</h2>
            <p className="text-2xl font-bold text-blue-600 mt-2">${income.toLocaleString()}</p>

            {/* Display Monthly Expenses */}
            <h2 className="text-xl font-semibold mt-4">Your Monthly Expenses</h2>
            <p className="text-2xl font-bold text-red-600 mt-2">
              -${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>

            {/* Display Remaining Income */}
            <h2 className="text-xl font-semibold mt-4">Remaining Income</h2>
            <p className={`text-2xl font-bold mt-2 ${remainingIncome >= 0 ? "text-green-600" : "text-red-600"}`}>
              ${remainingIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          {/* Pie Chart Container */}
          <div className="bg-purple-300 text-gray-900 p-6 rounded-xl shadow-lg max-w-sm w-full flex flex-col items-center justify-center relative">
            <h2 className="text-xl font-semibold mb-2">Your Spending</h2>

            <div className="relative flex items-center justify-center">
              {/* Full Pie Chart */}
              <PieChart width={200} height={205}>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0} // Full circle
                  outerRadius={100} // Adjusted for better fit
                  fill="#8884d8"
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>

              {/* Centered % of Income Spent */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xl font-bold text-gray-800 text-center">
                  {incomeSpentPercentage}% Of Income Spent
                </p>
              </div>
            </div>

            {/* Legend (Now placed properly below) */}
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              {chartData.map((entry, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
                  <span className="text-sm font-medium">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Expense Input Component */}
      <ExpenseInput onExpensesChange={updateExpenses} />
    </div>
  );
}