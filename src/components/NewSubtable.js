import { Button } from "react-bootstrap";
import { incomeCategories, expenditureCategories } from "../constants";
export default function NewSubtable({ category, data, setData, searchTerm }) {
  const rows =
    category === "Income"
      ? getSubTotalArr(incomeCategories, data)
      : getSubTotalArr(expenditureCategories, data);
  const handleDelete = (subCategory) => {
    setData((curData) =>
      curData.filter((item) => item.subCategory !== subCategory)
    );
  };
  // Inline CSS for equal column width
  const tableStyle = {
    width: "100%", // Ensure the table uses all available space
    tableLayout: "fixed", // Fixes the column widths to be equal
  };
  const rightAlignStyle = {
    textAlign: "right",
    paddingRight: "2px",
  };

  return (
    <>
      <h1 className="text-primary text-center">{category}</h1>
      <div className="container mt-4">
        <table
          className="table table-striped table-bordered"
          style={tableStyle}
        >
          <colgroup>
            <col style={{ width: "50%" }} />
            <col style={{ width: "50%" }} />
            <col style={{ width: "0%" }} />
          </colgroup>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{row.subCategory}</td>
                <td style={{ borderRight: "none" }}>
                  €{row.amount.toFixed(2)}
                </td>
                <td style={{ borderLeft: "none" }}>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDelete(row.subCategory)}
                  >
                    -
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot className="bg-primary text-white">
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td style={{ borderRight: "none" }}>
                <strong>€{rows.reduce((sum, e) => sum + e.amount, 0)}</strong>
              </td>
              <td style={{ borderLeft: "none" }}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

function getSubTotalRow(subCategory, data) {
  const subAmount = data
    .filter((e) => e.subCategory === subCategory)
    .reduce((acc, e) => acc + e.amount, 0);
  return { subCategory, amount: subAmount };
}
function getSubTotalArr(subCategories, data) {
  const rows = subCategories;
  return rows
    .map((subCategory) => getSubTotalRow(subCategory, data))
    .filter((e) => e.amount > 0); // only show rows with value
}
