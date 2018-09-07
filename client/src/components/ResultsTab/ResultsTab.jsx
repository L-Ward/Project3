import React from "react";
import "./ResultsTab.css";
import API from "../../utils/API";

class ResultsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: true,
    };
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row resultsTabs">
            <div className="col-6 ready">
              <h2>Ready to enjoy</h2>
            </div>
            <div className="col-6 almost">
              <h2>Almost there</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResultsTab;