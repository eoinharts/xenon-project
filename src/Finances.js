import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Subtable from "./components/Subtable";
import ExpenditureTable from "./components/ExpenditureTable";
import NewSubtable from "./components/NewSubtable";
import Saving from "./components/Saving";
export default function Finances({ data = [], setData }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter Code
  function updateSearchTerm(event) {
    setSearchTerm(event.target.value.toLowerCase());
  }

  function filterBySearchTerm(items) {
    if (!searchTerm.trim()) return items;
    return items.filter((item) =>
      item.subCategory.toLowerCase().includes(searchTerm)
    );
  }

  const income = data.filter((item) => item.category === "Income");
  const expenditure = data.filter((item) => item.category === "Expenditure");
  const saving = data.filter((item) => item.category === "Saving");

  const filteredIncome = filterBySearchTerm(income);
  const filteredExpenditure = filterBySearchTerm(expenditure);
  const filteredSaving = filterBySearchTerm(saving);

  // subTotal
  const calculateTotal = (items) => {
    if (!Array.isArray(items) || items.length === 0) return 0;
    return items.reduce((total, item) => total + item.amount, 0).toFixed(2);
  };
  const totalSaving = calculateTotal(income) - calculateTotal(expenditure);

  return (
    <>
      <h1 className="text-primary text-center">Finances</h1>
      <br />

      {/* Search Bar Author Jonathan*/}
      <div className="container mt-4">
        <input
          type="text"
          placeholder="Search transactions..."
          onChange={updateSearchTerm}
          value={searchTerm}
          className="form-control mb-3 border-primary shadow-sm"
        />
      </div>

      {/* Income Table*/}
      <NewSubtable
        category="Income"
        data={filteredIncome}
        setData={setData}
        headerClass="bg-primary text-white"
      />
      {/* Expenditure Table */}
      <NewSubtable
        category="Expenditure"
        data={filteredExpenditure}
        setData={setData}
        headerClass="bg-primary text-white"
      />

      {/* Savings Section */}
      <Saving income={income} expenditure={expenditure} />
    </>
  );
}
