import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { BarController } from 'chart.js';
import Navbarback from '../../components/Navbarback';
import SideBar from '../../components/SideBar';

Chart.register(BarController);
axios.defaults.withCredentials = true;

function AbonnementStat(props) {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const { Libraryid } = useParams();
  const chartRef = useRef(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/abonnement/stat/${Libraryid}`)
      .then((response) => {
        setData(response.data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, [Libraryid]);

  useEffect(() => {
    if (Object.keys(data).length === 0) {
      return;
    }

    const ctx = chartRef.current;

    if (!ctx) {
      console.error('Canvas element not found');
      return;
    }

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: 'Number of abonnements',
            data: Object.values(data),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="content-page" class="content-page">
      <Navbarback />
      <div className="container-fluid">
        <div className="row">
          <SideBar />
          <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-center">
              <div className="" style={{ width: '800px', height: '500px' }}>
                <canvas ref={chartRef} id="abonnement-chart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AbonnementStat;
