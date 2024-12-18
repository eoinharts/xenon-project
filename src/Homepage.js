import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Container, Row, Col, Card } from "react-bootstrap";
import presentationData from "./presentationData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

function Homepage({ data = [] }) {
  const currentData = data.length ? data : presentationData;

  // Separate income and expense data
  const incomeData = currentData.filter((item) => item.category === "Income");
  const expenseData = currentData.filter(
    (item) => item.category === "Expenditure"
  );

  // Calculate totals
  const totalIncome = incomeData.reduce((acc, item) => acc + item.amount, 0);
  const totalExpenses = expenseData.reduce((acc, item) => acc + item.amount, 0);
  const balance = totalIncome - totalExpenses;

  // Aggregate expenses by month
  const monthlyData = new Array(12).fill(0);
  expenseData.forEach((expense) => {
    const month = new Date(expense.date).getMonth();
    monthlyData[month] += expense.amount;
  });

  // Group expenses by subcategory
  const subCategoryData = {};
  expenseData.forEach((expense) => {
    const subCategory = expense.subCategory || "Other";
    subCategoryData[subCategory] =
      (subCategoryData[subCategory] || 0) + expense.amount;
  });

  // Prepare data for charts
  const barData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Monthly Expenses",
        data: monthlyData,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: Object.keys(subCategoryData),
    datasets: [
      {
        data: Object.values(subCategoryData),
        backgroundColor: [
          "#FF6384", // Red  //ai generated colors for pie chart
          "#36A2EB", // Blue
          "#FFCE56", // Yellow
          "#4BC0C0", // Teal
          "#9966FF", // Purple
          "#FF9F40", // Orange
          "#C9CBCF", // Grey
          "#FF6384", // Repeated color for additional categories
        ],
      },
    ],
  };

  const lineData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Monthly Expenses Trend",
        data: monthlyData,
        fill: false,
        backgroundColor: "rgba(153, 102, 255, 0.6)", // Purple for Line Chart
        borderColor: "rgba(153, 102, 255, 1)",
      },
    ],
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center text-primary">Overview</h1>
      <h4 className="text-center mb-4 text-muted">
        Monthly Spent: €{totalExpenses.toFixed(2)}
      </h4>
      <Row>
        <Col md={12}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h4 className="text-center">Summary</h4>
              <p className="text-muted">
                <strong>Total Income:</strong> €{totalIncome.toFixed(2)}
              </p>
              <p
                className="text-muted"
                style={{
                  fontSize: "1.5em",
                  fontWeight: "bold",
                  color: "#dc3545",
                }}
              >
                <strong>Total Expenses:</strong> €{totalExpenses.toFixed(2)}
              </p>
              <p className="text-muted">
                <strong>Balance:</strong> €{balance.toFixed(2)}
              </p>
              <p className="text-muted">
                <strong>Total Transactions:</strong> {currentData.length}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-primary text-white">
              Monthly Spending
            </Card.Header>
            <Card.Body style={{ height: "400px" }}>
              <Bar data={barData} options={{ maintainAspectRatio: false }} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-primary text-white">
              Spent By Category
            </Card.Header>
            <Card.Body style={{ height: "400px" }}>
              <Pie data={pieData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-primary text-white">
              Monthly Spending Trend
            </Card.Header>
            <Card.Body style={{ height: "400px" }}>
              <Line data={lineData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Homepage;
