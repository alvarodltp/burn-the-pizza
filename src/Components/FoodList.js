import React from 'react';
import { Button, Image, List, Icon } from 'semantic-ui-react'

class FoodList extends React.Component {
  render() {
  return (
    <React.Fragment>
      <div id="result-list">
        <h1>Your Cheat Foods</h1>
        <List divided verticalAlign='middle'>
        {this.props.arrOfItems.map(item =>
          <List.Item>
            <List.Content style={{margin: '0 auto', fontSize: "20px", marginBottom: "15px", marginTop: "15px"}}>{`${item.item_name} - ${item.brand_name}`} <Icon onClick={() => {this.props.removeItem(item)}} name="trash" size="small"/></List.Content>
            <List.Content style={{margin: '0 auto', fontSize: "16px", marginBottom: "15px"}}>{`${item.nf_serving_size_qty} ${item.nf_serving_size_unit} - ${item.nf_calories} Cal | ${item.nf_total_carbohydrate} Carb | ${item.nf_total_fat} Fat | ${item.nf_protein} Protein`}</List.Content>
          </List.Item>)}
        </List>
      </div>
      <div>
        <Button id="calculate-button" onClick={this.props.calculateMacros}>
          Calculate Guilt
        </Button>
      </div>
    </React.Fragment>
    );
  }
}


export default FoodList;
