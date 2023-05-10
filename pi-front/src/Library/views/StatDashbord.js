import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Chart from "chart.js/auto";
import { BarController } from "chart.js";
import Navbarback from "../../components/Navbarback";
import SideBar from "../../components/SideBar";
import DashboardAge from "./DashboardAge";
Chart.register(BarController);
axios.defaults.withCredentials = true;

function StatDashbord(props) {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    axios
      .get("/abonnement/total")
      .then((response) => {
        setData(response.data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  useEffect(() => {
    if (data) {
      if (chartRef.current) {
        chartRef.current.data.datasets[0].data = [data.totalLibraries, data.totalAbonnements, data.avgAbonnementsPerLibrary];
        chartRef.current.update();
      } else {
        const ctx = document.getElementById("myChart").getContext("2d");
        const newChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Total Libraries", "Total Abonnements", "AVG Abonnements Per Library"],
            datasets: [
              {
                label: "Library Statistics",
                data: [data.totalLibraries, data.totalAbonnements, data.avgAbonnementsPerLibrary],
                backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });

        chartRef.current = newChart;
      }
    }
  }, [data]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div class="content-page">
      <div className="col-md-3 ms-sm-auto col-lg-12 px-md-4">
        <div className="d-flex justify-content-center">
          <div id="stat-content" style={{ width: "900px", height: "700px" }}>
            <canvas id="myChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatDashbord;
