import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pool from "./database.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3080;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.get("/api/data", async (req, res) => {
    const { year } = req.query;
    const query = `
    SELECT 
      EXTRACT(month FROM "date") AS month,
      SUM("sales") AS total_sales,
      AVG("returns_pct") AS avg_returns_pct,
      SUM("num_customers") AS total_customers,
      AVG("pct_on_sale") AS avg_pct_on_sale
    FROM 
      sales_data
    WHERE
      EXTRACT(year FROM "date") = $1
    GROUP BY 
      month
    ORDER BY 
      month;
  `;
    try {
        const queryResult = await pool.query(query, [year]);
        const dataArray = queryResult.rows;
        const dataByMonth = {};

        // Initialize data arrays for each column
        const columns = [
            "total_sales",
            "avg_returns_pct",
            "total_customers",
            "avg_pct_on_sale",
        ];
        columns.forEach((column) => {
            dataByMonth[column] = {};
        });

        // Fill in data by month
        dataArray.forEach((row) => {
            const month = row.month;
            columns.forEach((column) => {
                dataByMonth[column][month] = row[column];
            });
        });

        // Structure data as an object with keys as column names
        const structuredData = {
            month: [],
            total_sales: [],
            avg_returns_pct: [],
            total_customers: [],
            avg_pct_on_sale: [],
        };

        // // Fill the structured data object
        // dataArray.forEach((row) => {
        //     structuredData.month.push(row.month);
        //     structuredData.total_sales.push(row.total_sales);
        //     structuredData.avg_returns_pct.push(row.avg_returns_pct);
        //     structuredData.total_customers.push(row.total_customers);
        //     structuredData.avg_pct_on_sale.push(row.avg_pct_on_sale);
        // });

        // Fill structured data with values from dataByMonth
        for (let month = 1; month <= 12; month++) {
            structuredData.month.push(month);
            columns.forEach((column) => {
                structuredData[column].push(dataByMonth[column][month] || null);
            });
        }

        res.json(structuredData);
        // console.log(structuredData);
    } catch (error) {
        console.error("Error fetching grouped data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    // console.log(username, password);
    try {
        // Check if the user exists and the password matches
        const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
        const result = await pool.query(query, [username, password]);
        if (result.rows.length === 1) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Incorrect username or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if the username is already taken
        const checkQuery = 'SELECT * FROM users WHERE username = $1';
        const checkResult = await pool.query(checkQuery, [username]);
        if (checkResult.rows.length > 0) {
            res.status(409).json({ error: 'Username already exists' });
        } else {
            // Insert the new user into the database
            const insertQuery = 'INSERT INTO users (username, password) VALUES ($1, $2)';
            await pool.query(insertQuery, [username, password]);
            res.status(201).json({ message: 'Registration successful' });
        }
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
