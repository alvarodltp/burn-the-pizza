import React from 'react';
import {Segment} from 'semantic-ui-react'

class SearchResults extends React.Component {
  render(){
    return(
      <React.Fragment>
        <div>
          {this.props.resultsArr && this.props.search !== "" ? this.props.resultsArr.map(result =>
            <Segment style={{background: "orange", color: "white"}} vertical onClick={() => this.props.addItemToArr(result)}> {`${result.item_name} - ${result.brand_name}`} {`${result.nf_serving_size_qty} ${result.nf_serving_size_unit} - ${result.nf_calories} Cal | ${result.nf_total_carbohydrate} Carb | ${result.nf_total_fat} Fat | ${result.nf_protein} Protein`}</Segment>
          ) : null }
        </div>
      </React.Fragment>
    )
  }
}

export default SearchResults;
