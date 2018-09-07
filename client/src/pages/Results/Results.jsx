import React from "react";
import "./Results.css";
import API from "../../utils/API";
import Typeahead from "../../components/Typeahead";
import ResultsTab from "../../components/ResultsTab";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      canMake: [],
      almostMake: [],
    };
    this.ingredientCB = this.ingredientCB.bind(this);
  }

  // Callback to get ingredients from typeahead and store in state
  ingredientCB(selectValue) {
    var ingId;
    var ingArray = selectValue;
    var canMake = [];
    var almostMake = [];

    // Construct query based on length of ids array
    if (ingArray.length === 1) {
      ingId = ingArray.map((ing) => {
        return ing.value;
      });
    } else if (ingArray.length > 1) {
      ingId = ingArray.map((ing) => {
        return ing.value;
      }).join("&");
    }
    // API call to get drinks by ingredient id
    API.getDrinksByIngs(ingId)
      .then((res) => {
        if (res) {
          res.data.drinks.forEach((drink) => {
            // Return drinks user can make
            if (drink.missingIngCount === 0) {
              canMake.push(drink);
            } else if (drink.missingIngCount < 2 && drink.missingIngCount > 0) {
              // Return drinks user can almost make
              almostMake.push(drink);
            }
          });
        } else {
          console.log("no results found");
        }
        this.setState({ ingredients: selectValue, canMake: canMake, almostMake: almostMake });
      });
  }

  render() {
    console.log(this.state.ingredients, this.state.canMake, this.state.almostMake);
    return (
      <div className="resultsPage">
        <div className="row resultsTypeahead justify-content-center">
          <div className="col-12">
            <Typeahead ingredientCB={this.ingredientCB} ingredients={this.props.ingredients} />
          </div>
        </div>
        <ResultsTab canMake={this.state.canMake} almostMake={this.state.almostMake}/>
      </div>
    );
  }
}

export default Results;