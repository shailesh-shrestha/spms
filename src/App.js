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

    // invoked immediately after a component is mounted (inserted into the tree)
    // https://reactjs.org/docs/react-component.html#componentdidmount
    componentDidMount() {
        // Update Local Storage
        this.updateLocalStorage(this.state.portfolios);
    }

    // Update local storage and current state
    // Check if there is data in local storage
    // Pull the data to current state if there is
    // check whether the 'portfolio' data item is stored in web Storage
    updateLocalStorage = (portfolios) => {
        const portfoliosJSON = JSON.stringify(portfolios);
        // If the local storage has portfolios
        if (localStorage["portfolios"] ) {
            const portfoliosLOCAL = localStorage["portfolios"];
            // If the current state is empty and local has some data
            if (portfolios.length === 0) {
                const portfolios = JSON.parse(portfoliosLOCAL);
                if (portfolios !== "undefined") {
                    this.setState({
                        portfolios: portfolios,
                    });
                }
            } else if (portfoliosLOCAL !== portfoliosJSON) {
                // They are different change the local state to current state
                localStorage.clear();
                localStorage.setItem("portfolios", portfoliosJSON);
            }
        } else {
            localStorage.setItem("portfolios", portfoliosJSON);
        }
    };

    // This function checks the number of portfolios in current state
    //  Returns true or false according to maximum number of Portfolio met (10)
    checkPortfolioMax = () => {
        if (this.state.portfolios.length > 9) {
            //  Change the state to true
            this.setState({portfolioMax: true});
            return true;
        } else { // Change the state to false
            this.setState({portfolioMax: false});
            return false;
        }
    };

    //This function adds a portfolio to the state
    // If the maximum portfolios have reached alert the user
    handlePortfolioCreate = (title) => {
        if (title) {
            //Add portfolio to state.
            let portfolios = [
                    ...this.state.portfolios, // Spread the previous state
                    {
                        id: this.state.portfolios.length + 1,
                        title: title,
                    }];
            this.setState({
                portfolios: portfolios
            });
            // Update the local Storage with
            this.updateLocalStorage(portfolios);
        }
    };

    render() {
        const portfolios = this.state.portfolios;
        return (
            <Paper>
                <Typography variant="h2" align="center"> Portfolios </Typography>
                <Portfolios portfolios={portfolios}/>
                <Create onCreate={this.handlePortfolioCreate} portfolioMax={this.checkPortfolioMax}/>
            </Paper>
        );
    }
}