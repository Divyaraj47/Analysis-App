import React from "react";

const Chart5 = (props) => {
    const {sales} = props;
    let sum = 0;
    if(sales)
    {
        for(let i = 0; i < sales.length; i++)
        {
            sum += parseFloat(sales[i]);
        }
    }

    sum /= 1000000;
    sum = sum.toFixed(2)
    
    return <div className="sales">Annual Sales: <span className="figure">${sum}M</span></div>;
};

export default Chart5;
