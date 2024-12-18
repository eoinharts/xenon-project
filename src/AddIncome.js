// Author: Brian
import { incomeCategories, expenditureCategories } from "./constants";
import { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
export default function AddIncome({ show, handleClose, handleAddData }) {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  // record the current date
  const now = new Date();
  const formattedDate = now.toLocaleDateString();

  function handleSubmit(e) {
    e.preventDefault();
    if (!category || !subCategory || !amount) {
      return;
    }
    const newData = {
      id: crypto.randomUUID(),
      category,
      subCategory,
      amount: parseFloat(amount),
      date: formattedDate,
      type: category === "Income" ? "income" : "expense", // just added category type to differentiate for charts
    };
    handleAddData(newData);
    // empty the form
    setCategory("");
    setSubCategory("");
    setAmount("");
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        {/* Header and close Button */}
        <Modal.Header closeButton>
          <Modal.Title>New Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Category Group */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="category">Category</Form.Label>
            <select
              id="category"
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                -- Select Category --
              </option>
              <option value={"Income"}>Income</option>
              <option value={"Expenditure"}>Expenditure</option>
            </select>
          </Form.Group>
          {
            <Form.Group className="mb-3">
              <Form.Label htmlFor="subCategory">SubCategory</Form.Label>
              <select
                id="subCategory"
                className="form-select"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                required
              >
                <option value="" disabled>
                  -- Select SubCategory --
                </option>
                {category === "Expenditure" &&
                  expenditureCategories.map((e) => (
                    <option value={e}>{e}</option>
                  ))}
                {category === "Income" &&
                  incomeCategories.map((e) => <option value={e}>{e}</option>)}
              </select>
            </Form.Group>
          }

          {/* Amount Group */}
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min={0}
              step={1}
            />
          </Form.Group>
          {/* Add Button */}
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
