import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function App() {
  // States for dropdowns, insights, and data
  const [houseChoice, setHouseChoice] = useState("");
  const [roomChoice, setRoomChoice] = useState("");
  const [familyChoice, setFamilyChoice] = useState("");
  const [ownershipChoice, setOwnershipChoice] = useState("");
  const [insights, setInsights] = useState([]);
  const [topTips, setTopTips] = useState([]);
  const [averageSpendData, setAverageSpendData] = useState({});
  const [jsonData, setJsonData] = useState([]);
  const [householdOptions, setHouseholdOptions] = useState([]);

  // Retrieve user spend data from localStorage
  const [userSpend, setUserSpend] = useState(() => {
    const localData = localStorage.getItem("items");
    if (localData) {
      const parsedData = JSON.parse(localData);
      // Aggregate user spend data by category
      return parsedData.reduce(
        (acc, item) => {
          if (item.category === "Expenditure") {
            switch (item.subCategory) {
              case "Rent":
                acc.housingSpend += item.amount;
                break;
              case "Mortgage":
                acc.housingSpend += item.amount;
                break;
              case "Electricity":
                acc.electricitySpend += item.amount;
                break;
              case "Food":
                acc.foodSpend += item.amount;
                break;
              case "Internet":
                acc.internetSpend += item.amount;
                break;
              default:
                break;
            }
          }
          return acc;
        },
        { housingSpend: 0, electricitySpend: 0, foodSpend: 0, internetSpend: 0 }
      );
    }
    return {
      housingSpend: 0,
      electricitySpend: 0,
      foodSpend: 0,
      internetSpend: 0,
    };
  });

  // Fetch JSON data
  useEffect(() => {
    fetch(
      // JSON data is partially AI generated (ChatGPT)
      "https://raw.githubusercontent.com/B1AI5E/API_Test/refs/heads/main/Example_API.json"
    )
      .then((response) => response.json())
      .then((data) => setJsonData(data.Households))
      .catch((error) => console.error("Error fetching JSON data:", error));
  }, []);

  // Restricting household size based on amount of bedrooms (max 2 per bedroom)
  useEffect(() => {
    if (roomChoice) {
      const maxPeople = Number(roomChoice) * 2;
      const options = [];
      for (let i = 1; i <= maxPeople; i++) {
        options.push(i);
      }
      setHouseholdOptions(options);
    } else {
      setHouseholdOptions([]);
    }
  }, [roomChoice]);

  // Generate Insights
  const generateInsights = () => {
    if (!jsonData.length) {
      console.error("No JSON data loaded.");
      return;
    }

    // Match selected values to JSON object
    const matchingHouse = jsonData.find(
      (house) =>
        house["house type"] === houseChoice &&
        house["bedrooms"] === roomChoice &&
        house["family size"] === familyChoice &&
        house["ownership"] === ownershipChoice
    );

    if (matchingHouse) {
      console.log("Matching house found:", matchingHouse);

      const { averageSpend } = matchingHouse;

      // Save average spend data
      setAverageSpendData(averageSpend);

      // Generate insights based on comparisons
      const insightsArray = [
        `Your monthly housing spend is ${
          userSpend.housingSpend === averageSpend.housingSpend
            ? "the same as the national average for your household type."
            : userSpend.housingSpend > averageSpend.housingSpend
            ? `higher than average by €${Math.abs(
                userSpend.housingSpend - averageSpend.housingSpend
              )}.`
            : `lower than average by €${Math.abs(
                userSpend.housingSpend - averageSpend.housingSpend
              )}.`
        }`,
        `Your monthly electricity spend is ${
          userSpend.electricitySpend === averageSpend.electricitySpend
            ? "the same as the national average for your household type."
            : userSpend.electricitySpend > averageSpend.electricitySpend
            ? `higher than average by €${Math.abs(
                userSpend.electricitySpend - averageSpend.electricitySpend
              )}.`
            : `lower than average by €${Math.abs(
                userSpend.electricitySpend - averageSpend.electricitySpend
              )}.`
        }`,
        `Your monthly food spend is ${
          userSpend.foodSpend === averageSpend.foodSpend
            ? "the same as the national average for your household type."
            : userSpend.foodSpend > averageSpend.foodSpend
            ? `higher than average by €${Math.abs(
                userSpend.foodSpend - averageSpend.foodSpend
              )}.`
            : `lower than average by €${Math.abs(
                userSpend.foodSpend - averageSpend.foodSpend
              )}.`
        }`,
        `Your monthly internet spend is ${
          userSpend.internetSpend === averageSpend.internetSpend
            ? "the same as the national average for your household type."
            : userSpend.internetSpend > averageSpend.internetSpend
            ? `higher than average by €${Math.abs(
                userSpend.internetSpend - averageSpend.internetSpend
              )}.`
            : `lower than average by €${Math.abs(
                userSpend.internetSpend - averageSpend.internetSpend
              )}.`
        }`,
      ];

      setInsights(insightsArray);

      // Generate top tips
      const tips = [];

      if (Number(familyChoice) < Number(roomChoice)) {
        tips.push(
          <span>
            Since you have more bedrooms than household members, consider
            renting out a room for extra tax-free income. More information{" "}
            <a
              href="https://www.citizensinformation.ie/en/housing/owning-a-home/home-owners/renting-out-a-room-in-your-home/"
              target="_blank"
              rel="noopener noreferrer"
            >
              HERE
            </a>
          </span>
        );
      }

      if (userSpend.internetSpend > averageSpend.internetSpend) {
        tips.push(
          <span>
            Since you are paying more than average for your internet, consider
            looking at other available options{" "}
            <a
              href="https://switcher.ie/broadband/"
              target="_blank"
              rel="noopener noreferrer"
            >
              HERE
            </a>
            .
          </span>
        );
      }
      if (userSpend.electricitySpend > averageSpend.electricitySpend) {
        tips.push(
          <span>
            Since you are paying more than average for electricity, consider
            looking at other available options{" "}
            <a
              href="https://switcher.ie/gas-electricity/"
              target="_blank"
              rel="noopener noreferrer"
            >
              HERE
            </a>
            .
          </span>
        );
        tips.push(
          <span>
            Consider turning off devices when not in use and using LED bulbs to
            save on electricity costs.
          </span>
        );
      }
      if (userSpend.foodSpend > averageSpend.foodSpend) {
        tips.push(
          <span>
            Reduce spending on unnecessary food items or consider buying
            own-brand alternatives.
          </span>
        );
      }

      // General budgeting tips
      tips.push(
        <span>Try meal planning to reduce food waste and save money.</span>,
        <span>
          Wash clothes in cold water whenever possible to save on electricity
          costs.
        </span>,
        <span>
          Unplug appliances not in use to avoid phantom electricity usage.
        </span>
      );

      setTopTips(tips);
    } else {
      setInsights(["No matching data found in the database."]);
      setAverageSpendData({});
      setTopTips([]);
    }
  };

  // Bar Chart Data and Options
  const barData = {
    labels: ["Rent/Mortgage", "Electricity", "Food", "Internet"],
    datasets: [
      {
        label: "Average Spend",
        data: [
          averageSpendData.housingSpend || 0,
          averageSpendData.electricitySpend || 0,
          averageSpendData.foodSpend || 0,
          averageSpendData.internetSpend || 0,
        ],
        backgroundColor: "#6c757d",
        hoverBackgroundColor: "#5a6268",
      },
      {
        label: "Your Spend",
        data: [
          userSpend.housingSpend,
          userSpend.electricitySpend,
          userSpend.foodSpend,
          userSpend.internetSpend,
        ],
        backgroundColor: "#007bff",
        hoverBackgroundColor: "#0056b3",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Expense Categories",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount (€)",
        },
        beginAtZero: true,
        max: 3000,
      },
    },
  };

  return (
    <div className="container-fluid">
      <h1>Financial Insights</h1>
      <h2>Please enter some more details to receive insights and tips</h2>
      <form>
        {/* House Type Dropdown */}
        <label htmlFor="myHouseList" className="form-label">
          House Type
        </label>
        <select
          onChange={(e) => setHouseChoice(e.target.value)}
          className="form-control"
          id="myHouseList"
          value={houseChoice}
        >
          <option value="">Select...</option>
          <option value="Apartment">Apartment</option>
          <option value="Detached house">Detached house</option>
          <option value="Semi-detached house">Semi-detached house</option>
          <option value="Terraced house">Terraced house</option>
        </select>

        {/* Bedrooms Dropdown */}
        <label htmlFor="myRoomList" className="form-label">
          Bedrooms
        </label>
        <select
          onChange={(e) => setRoomChoice(e.target.value)}
          className="form-control"
          id="myRoomList"
          value={roomChoice}
        >
          <option value="">Select...</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>

        {/* Household Size Dropdown */}
        <label htmlFor="myFamilyList" className="form-label">
          Household Size
        </label>
        <select
          onChange={(e) => setFamilyChoice(e.target.value)}
          className="form-control"
          id="myFamilyList"
          value={familyChoice}
        >
          <option value="">Select...</option>
          {householdOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        {/* Ownership Dropdown */}
        <label htmlFor="myOwnershipList" className="form-label">
          Ownership
        </label>
        <select
          onChange={(e) => setOwnershipChoice(e.target.value)}
          className="form-control"
          id="myOwnershipList"
          value={ownershipChoice}
        >
          <option value="">Select...</option>
          <option value="Rented">Rented</option>
          <option value="Owned">Owned</option>
        </select>
      </form>

      {/* Button to generate insights */}
      <button
        type="button"
        className={`btn ${
          !houseChoice || !roomChoice || !familyChoice || !ownershipChoice
            ? "btn-secondary"
            : "btn-primary"
        } mt-3`}
        onClick={generateInsights}
        disabled={
          !houseChoice || !roomChoice || !familyChoice || !ownershipChoice
        }
      >
        Get Insights
      </button>

      {/* Insights Section */}
      {insights.length > 0 && (
        <div className="mt-4">
          <h3>Your Financial Insights:</h3>
          <ul>
            {insights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>

          {/* Top Tips Section */}
          {topTips.length > 0 && (
            <div className="mt-3">
              <h3>Top Tips:</h3>
              <ul>
                {topTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Bar Chart */}
      <div className="mt-5">
        <h3>Monthly Expense Comparison</h3>
        <div style={{ width: "75%", margin: "0 auto" }}>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
}

export default App;
