import { incomeCategories, expenditureCategories } from "../constants";
export default function ExpenditureTable({ data, calculateTotal, searchTerm }) {
  const rows = getSubTotalTable(expenditureCategories, data, searchTerm);

  return (
    <>
      <h1 className="text-primary text-center">Expenditure</h1>
      {/* Light Themed Square Table */}
      <div className="container mt-4">
        <table className="table table-striped table-bordered">
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan="2" className="text-center text-muted">
                  No results found
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.subCategory}</td>
                  <td>€{row.amount.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>

          <tfoot className="bg-primary text-white">
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td>
                <strong>€{calculateTotal(data)}</strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

function getSubTotalRow(subCategory, data) {
  const amount = data
    .filter((data) => data.subCategory === subCategory)
    .reduce((sum, cur) => sum + cur.amount, 0);
  return { subCategory, amount };
}

function getSubTotalTable(subCategories, data, searchTerm) {
  let rows = [];
  subCategories.forEach((subCategory) => {
    const filteredData = data.filter((item) => {
      return item.subCategory?.toLowerCase().includes(searchTerm.toLowerCase());
    });
    rows = [...rows, getSubTotalRow(subCategory, filteredData)];
  });
  return rows.filter((row) => row.amount > 0); // Remove rows with zero amounts
}
