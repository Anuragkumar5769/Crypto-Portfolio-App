import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './CoinDetails.css';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function CoinDetails({ coinId }) {
  const [coinDetails, setCoinDetails] = useState({});
  const [chartData, setChartData] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const coinDetailsResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}?x_cg_demo_api_key=CG-ZjBJTGESqy2YVi29DD7vFQMN`);
        setCoinDetails(coinDetailsResponse.data);

        const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        const marketDataResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?x_cg_demo_api_key=CG-ZjBJTGESqy2YVi29DD7vFQMN`, {
          params: {
            vs_currency: 'inr',
            days: daysDiff,
          },
        });

        const prices = marketDataResponse.data.prices.map(price => price[1]);
        const dates = marketDataResponse.data.prices.map(price => {
          const date = new Date(price[0]);
          return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        });

        setChartData({
          labels: dates,
          datasets: [
            {
              label: 'Price (INR)',
              data: prices,
              fill: false,
              backgroundColor: 'rgb(75, 192, 192)',
              borderColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCoinDetails();
  }, [coinId, startDate, endDate]);

  return (
    <div className="coin-details">
      <h2>{coinDetails.name} Details</h2>
      <div className="coin-info">
        <p><strong>Rank:</strong> {coinDetails.market_cap_rank}</p>
        <p><strong>Current Price:</strong> ₹{coinDetails.market_data?.current_price?.inr?.toLocaleString()}</p>
        <p><strong>Market Cap:</strong> ₹{coinDetails.market_data?.market_cap?.inr?.toLocaleString()}</p>
        <p><strong>Total Volume:</strong> ₹{coinDetails.market_data?.total_volume?.inr?.toLocaleString()}</p>
      </div>
      <div className="date-picker">
        <h3>Select Date Range</h3>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>
      <div className="chart">
        <h3>Historical Prices</h3>
        {chartData && <Line data={chartData} />}
      </div>
    </div>
  );
}

export default CoinDetails;
