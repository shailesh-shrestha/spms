import React, {Component} from 'react';
import {Paper, Typography} from "@material-ui/core";
import './App.css';
import Create from "./components/dialogs/Create";
import Portfolios from "./components/Portfolios";


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolios: [], // List of portfolios
      portfolioMax: false, // Will be true when maximum number of portfolio is reached.
    };
  }

  checkPortfolioMax = () => {
    if (this.state.portfolios.length > 9){
      console.log(this.state.portfolios.length);
      //  Change the state to true
      this.setState({portfolioMax: true});
      return true;
    } else{ // Change the state to false
      this.setState({portfolioMax: false});
      return false;
    }
  };

  handlePortfolioCreate = (title) =>
    //This function adds a portfolio to the state
    //If the maximum portfolios have reached alert the user
    {
      if (title){
        //Add portfolio to state.
        this.setState({portfolios: [
            // Spread the previous state
            ...this.state.portfolios,
                {
                    id: this.state.portfolios.length + 1,
                    title: title,
                }]});
      }
    };

  render() {
    const portfolios = this.state.portfolios;
    return (
      <Paper>
        <Typography variant="h2" align="center"> Portfolios </Typography>
        <Portfolios portfolios={portfolios}/>
        <Create onCreate={this.handlePortfolioCreate} portfolioMax={this.checkPortfolioMax} />
      </Paper>
    );
  }
}