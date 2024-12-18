export default function Subtable({ title, data, calculateTotal }) {
  return (
    <>
      <h1 className="text-primary text-center">{title}</h1>
      <div className="container mt-4">
        <table className="table table-striped table-bordered">
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="2" className="text-center text-muted">
                  No results found
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={index}>
                  <td>{row.item}</td>
                  <td>€{row.amount.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>

          <tfoot className="bg-primary text-white">
            <tr>
              <td>Total</td>
              <td>€{calculateTotal(data)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <br />
    </>
  );
}
