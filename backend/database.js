import fs from "fs";
import csv from "csv-parser";
import pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.prt
});

// const check = async () => {
//     try {
//         const client = await pool.connect();
//         await client.query(`SELECT * from users`);
//         console.log("Users table created successfully");
//         client.release();
//     } catch (error) {
//         console.error("Error creating users table:", error);
//     }
// };

// check();

export default pool;

// // SQL query to create the users table
// const createUsersTableQuery = `
//     CREATE TABLE IF NOT EXISTS users (
//         id SERIAL PRIMARY KEY,
//         username VARCHAR(50) UNIQUE NOT NULL,
//         password VARCHAR(100) NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )
// `;

// // Function to execute the SQL query
// const createUsersTable = async () => {
//     try {
//         const client = await pool.connect();
//         await client.query(createUsersTableQuery);
//         console.log('Users table created successfully');
//         client.release();
//     } catch (error) {
//         console.error('Error creating users table:', error);
//     }
// };

// // Call the function to create the users table
// createUsersTable();

// (async () => {
//     const client = await pool.connect();
//     try {
//         await client.query(`
//             CREATE TABLE sales_data (
//                 Store VARCHAR(255),
//                 Date DATE,
//                 Sales NUMERIC,
//                 Store_Size INTEGER,
//                 Num_Employees INTEGER,
//                 Returns_Pct NUMERIC,
//                 Num_Customers INTEGER,
//                 Pct_On_Sale NUMERIC,
//                 PRIMARY KEY (Store, Date)
//             )
//         `);
//         console.log('Table "sales_data" created successfully with composite primary key (Store, Date).');
//     } catch (error) {
//         console.error('Error creating table:', error);
//     } finally {
//         client.release();
//     }
// })();

// // Read the CSV file and parse it into an array
// const csvFilePath = "./sales_data.csv";
// const dataArray = [];

// // ------------------------------------------- Read CSV file and add Data to database -------------------------------------
// fs.createReadStream(csvFilePath)
//     .pipe(csv())
//     .on('data', (row) => {
//         // Convert the date format from 'MM/DD/YY' to 'YYYY-MM-DD' only for the Date column
//         row.Date = formatDate(row.Date);
//         dataArray.push(row);
//     })
//     .on('end', () => {
//         // Once all data is read and parsed, insert into the database
//         insertDataIntoDB(dataArray);
//     });

// // Function to format date from 'MM/DD/YY' to 'YYYY-MM-DD'
// function formatDate(dateString) {
//     const [month, day, year] = dateString.split('/');
//     const formattedYear = year.length === 2 ? `20${year}` : year; // Assuming year is in YY format, convert it to YYYY
//     return `${formattedYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
// }

// // Function to insert data into the database
// async function insertDataIntoDB(dataArray) {
//     let client;
//     try {
//         // Connect to the database
//         client = await pool.connect();

//         // Start a transaction
//         await client.query('BEGIN');

//         // Iterate through the data array and insert each row into the database
//         for (const rowData of dataArray) {
//             const query = `
//                 INSERT INTO sales_data (Store, Date, Sales, Store_Size, Num_Employees, Returns_Pct, Num_Customers, Pct_On_Sale)
//                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
//             `;

//             const values = [
//                 rowData.Store,
//                 rowData.Date,
//                 parseFloat(rowData.Sales),
//                 parseInt(rowData.Store_Size),
//                 parseInt(rowData.Num_Employees),
//                 parseFloat(rowData.Returns_Pct),
//                 parseInt(rowData.Num_Customers),
//                 parseFloat(rowData.Pct_On_Sale)
//             ];

//             await client.query(query, values);
//         }

//         // Commit the transaction
//         await client.query('COMMIT');
//         console.log('Data from CSV has been successfully inserted into the database.');
//     } catch (error) {
//         // If an error occurs, rollback the transaction and log the error
//         console.error('Error inserting data into the database:', error);
//         if (client) {
//             await client.query('ROLLBACK');
//         }
//     } finally {
//         // Release the client back to the pool
//         if (client) {
//             client.release();
//         }
//     }
// }
