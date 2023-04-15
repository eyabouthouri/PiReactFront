import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import Navbarback from '../../components/Navbarback';
import SideBar from '../../components/SideBar';

function DashboardAge() {
  const [ageStats, setAgeStats] = useState([]);
  const [error, setError] = useState(null);
  const [chartInstance, setChartInstance] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current && chartRef.current.getContext('2d');
    if (ctx) {
      if (chartInstance) {
        chartInstance.destroy();
      }
      const newChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            label: 'Pourcentage d ages',

          labels: Object.keys(ageStats),
          datasets: [
            {
                label: 'Pourcentage d ages',

              data: Object.values(ageStats),
              backgroundColor: ['#008080', '#FFCE56', '#36A2EB', '#FF6384', '#2F4F4F'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
      setChartInstance(newChartInstance);
    }
  }, [ageStats]);
  
  useEffect(() => {
    axios
      .get('http://localhost:5000/abonnement/age')
      .then((response) => {
        setAgeStats(response.data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, []);
  

  return (
    <div >

                {error && <div className="error">{error}</div>}
                 <canvas ref={chartRef} />

            </div>
     
  );
}

export default DashboardAge;
