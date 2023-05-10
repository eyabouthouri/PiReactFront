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
      .get('/abonnement/age')
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
<div id="content-page" class="content-page">
<div  id="stat-content" style={{ width: '1000px', height: '500px' }}>

                {error && <div className="error">{error}</div>}
                 <canvas ref={chartRef} />
</div>
            </div>
     
  );
}

export default DashboardAge;
