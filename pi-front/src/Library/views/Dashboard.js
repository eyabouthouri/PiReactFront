import React, { useRef } from "react";
import Navbarback from "../../components/Navbarback";
import SideBar from "../../components/SideBar";
import DashboardAge from "./DashboardAge";
import StatDashbord from "./StatDashbord";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Dashboard(props) {
  const contentRef = useRef(null);

  function exportPDF() {
    const content = contentRef.current;
    const width = content.offsetWidth;
    const height = content.offsetHeight;
    const canvas = document.createElement("canvas");
    const scale = 2;

    canvas.width = width * scale;
    canvas.height = height * scale;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    const context = canvas.getContext("2d");
    context.scale(scale, scale);

    html2canvas(content, { canvas }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", [width, height]);
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("dashboard.pdf");
    });
  }

  return (
    <div class="content-page" ref={contentRef}>
      <Navbarback></Navbarback>
      <SideBar></SideBar>
      <div className="row">
        <div id="dashboard-content" className="col-md-9">
          <h1>age</h1>
          <DashboardAge />
        </div>
       
        <div  class="d-flex justify-content-center align-items-center">
        
          <button type="button" className="btn btn-danger "  onClick={exportPDF}>
            Export The statistics PDF{" "}
          </button>
        </div>

        <div id="stat-content" className="col-md-12">
          <StatDashbord />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
