import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart1 from "./charts/Chart1";
import Chart2 from "./charts/Chart2";
import Chart3 from "./charts/Chart3";
import Chart4 from "./charts/Chart4";
import Chart5 from "./charts/Chart5";

const Dashboard = () => {
    const [dataObject, setDataObject] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Send request to backend API
                const response = await axios.get(
                    "http://localhost:3080/api/data",
                    {
                        params: {
                            year: 2013, // Specify the year here
                        },
                    }
                );
                // Receive structured data object from backend
                setDataObject(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []); // Fetch data when component mounts

    // Access dataObject keys and corresponding arrays
    const {
        month,
        total_sales,
        avg_returns_pct,
        total_customers,
        avg_pct_on_sale,
    } = dataObject;
    // console.log(dataObject)
    const labels = [
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
    ];

    let sales = total_sales,
        customers = total_customers,
        return_percentage = avg_returns_pct
            ? avg_returns_pct.map((item) => parseFloat(item).toFixed(2))
            : [],
        sales_percentage = avg_pct_on_sale
            ? avg_pct_on_sale.map((item) => parseFloat(item).toFixed(2))
            : [];
    console.log(typeof return_percentage);
    console.log((sales_percentage, return_percentage));

    return (
        <div className="dashboard">
            <div className="row-1">
                <div className="column">
                    <span className="sales--data">Sales: </span>
                    <Chart1 sales={sales} labels={labels} label="Sales" text="Sales per Month" />
                </div>
                <div className="column">
                    <Chart2
                        data={customers}
                        labels={labels}
                        label="Number of Customer Visited"
                        text="Number of Customer Visited per Month"
                    />
                </div>
            </div>
            <div className="row-2">
                {/* {return_percentage} */}
                <div className="column">
                    <Chart2
                        data={return_percentage}
                        labels={labels}
                        label="Return Percentage"
                        text="Return Percentage per Month"
                    />
                </div>

                <div className="column">
                    <Chart2
                        data={sales_percentage}
                        labels={labels}
                        label="Sales Percentage"
                        text="Sales Percentage per Month"
                    />
                </div>
                <div className="column">
                    <Chart5 sales={sales} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
