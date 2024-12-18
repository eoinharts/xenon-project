import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

function News() {
  console.log("News component is mounted!");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "3078ee2921b14697b612332a2c772e6c";

  const fallbackArticles = [
    {
      title: "4 Tips for Budgeting Success",
      description:
        "Learn how to master your finances with these practical and effective budgeting tips.",
      url: "https://personalbanking.bankofireland.com/articles/financial-wellbeing/plan/4-tips-for-budgeting-success/",
      urlToImage: "https://unsplash.it/400/300?image=100",
      source: { name: "Bank of Ireland" },
    },
    {
      title: "Why You Need an Emergency Fund Now",
      description:
        "An emergency fund can save you in unexpected situations. Learn why and how to start one.",
      url: "https://www.investopedia.com/terms/e/emergency_fund.asp",
      urlToImage: "https://unsplash.it/400/300?image=200", // Used https://unsplash.it to provide random images for each article.
      source: { name: "Investopedia" },
    },
    {
      title: "Best Apps to Track Your Expenses in 2024",
      description:
        "Explore the top apps that help you manage and track your daily expenses efficiently.",
      url: "https://www.cnet.com/personal-finance/best-budgeting-apps/",
      urlToImage: "https://unsplash.it/400/300?image=300",
      source: { name: "CNET" },
    },
    {
      title: "Managing Your Money",
      description:
        "While managing your money effectively may seem difficult, there are lots of benefits to staying in control of your finances.",
      url: "https://www.ccpc.ie/consumers/money/budgeting/managing-your-money/",
      urlToImage: "https://unsplash.it/400/300?image=400",
      source: { name: "CPCC" },
    },
    {
      title: "Understanding the 50/30/20 Rule for Budgeting",
      description:
        "The 50-30-20 rule involves splitting your after-tax income into three categories of spending.",
      url: "https://www.investopedia.com/ask/answers/022916/what-502030-budget-rule.asp",
      urlToImage: "https://unsplash.it/400/300?image=500",
      source: { name: "Investopedia" },
    },
    {
      title: "How to Budget Money in 5 Steps",
      description:
        "It’s easy to get overwhelmed by the many details included in the budgeting process. Here are five steps to follow.",
      url: "https://www.nerdwallet.com/article/finance/how-to-budget",
      urlToImage: "https://unsplash.it/400/300?image=600",
      source: { name: "Nerdwallet" },
    },
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      console.log("Fetching articles...");
      try {
        const response = await fetch("http://localhost:5000/api/news");

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API Error Response:", errorData);
          throw new Error(`Error fetching articles: ${response.status}`);
        }

        const data = await response.json();
        console.log("Full response data:", data);

        const articles = data.articles || [];
        console.log("Fetched articles:", articles);

        if (articles.length === 0) {
          console.log("No articles found. Using fallback articles.");
          setArticles(fallbackArticles);
        } else {
          setArticles(articles);
        }
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError(err.message);
        setArticles(fallbackArticles);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Top Articles</h1>

      <Row>
        {articles.map((article, index) => (
          <Col md={4} className="mb-4" key={index}>
            <Card className="h-100 shadow-sm">
              {article.urlToImage && (
                <Card.Img
                  variant="top"
                  src={article.urlToImage}
                  alt={article.title}
                />
              )}
              <Card.Body>
                <Card.Title>{article.title || "Untitled Article"}</Card.Title>
                <Card.Text>
                  {article.description || "No description available."}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  Source: {article.source?.name || "Unknown"}
                </small>
                <br />
                <a
                  href={article.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm mt-2"
                >
                  Read More
                </a>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      <h3 className="text-center mt-5">Additional Resources</h3>
      <Row className="mt-3">
        <Col md={6} className="text-center mb-4">
          <a
            href="https://www.numbeo.com/cost-of-living/rankings_by_country.jsp"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Cost of Living Charts
          </a>
        </Col>
        <Col md={6} className="text-center mb-4">
          <a
            href="https://www.mortgagecalculator.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Mortgage Calculator
          </a>
        </Col>
      </Row>
    </Container>
  );
}

export default News;
