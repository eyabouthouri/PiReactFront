import React from "react";
import ContenuLibrary from "../../components/NavbarModule";
import Topnav from "../../components/Topnav";

function Library() {
  return (
    <div>
      <Topnav />
      <div className="content-page">
        <ContenuLibrary />
      </div>
    </div>
  );
}

export default Library;
