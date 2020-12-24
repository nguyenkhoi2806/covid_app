import React from "react";

import TableData from "../../components/home/tableData";
import './index.scss';

class Home extends React.Component {
  render() {
    return (
      <div className="card covid-report">
        <div className="card-header">
            Covid Report
        </div>
        <div className="card-body">
            <TableData/>
        </div>
      </div>
    );
  }
}

export default Home;
