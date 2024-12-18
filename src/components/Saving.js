import React from "react";

export default function Saving({ income = [], expenditure = [] }) {
  const tableStyle = {
    width: "100%", // Ensure the table uses all available space
    tableLayout: "fixed", // Fixes the column widths to be equal
  };
  const rightAlignStyle = {
    textAlign: "right",
    paddingRight: "2px",
  };

  const incomeTotal = income.reduce((total, item) => total + item.amount, 0);

  const expenditureTotal = expenditure.reduce(
    (total, item) => total + item.amount,
    0
  );

  const saving = (incomeTotal - expenditureTotal).toFixed(2);

  return (
    <>
      <h1 className="text-primary text-center">Saving</h1>
      <div className="container mt-4">
        <table
          className="table table-striped table-bordered"
          style={tableStyle}
        >
          <tbody className="bg-primary text-white">
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td>
                <strong>${saving}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
