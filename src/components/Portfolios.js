import React, {Component} from "react";
import {Grid } from "@material-ui/core";
import {withStyles} from "@material-ui/styles";

import Portfolio from "./Portfolio";

// Styling object for material-ui
// Sends classes as a props.
const useStyles = {
    root: {
        flexGrow: 1,
    },
    portfolioList: {
        padding: "12px",
        alignItems: "center",
        justifyContent: "center",
    },
    portfolio: {
        alignContent: "center",
        padding: "12px",
    }
};

class Portfolios extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // Removes the provided portfolio from the list.
    handleDeletePortfolio = (portfolio) => {
        const portfolios = this.props.portfolios;
        portfolios.splice(portfolios.indexOf(portfolio), 1);
        this.props.onUpdate(portfolios);
    };

    // Receives a portfolio as property and updates the current list of portfolio with the provided one.
    handleUpdatePortfolio = (portfolio) => {
        const portfolios = this.props.portfolios;
        portfolios[portfolios.indexOf(portfolio)] = portfolio;
        this.props.onUpdate(portfolios);
    };

    render() {
        const {portfolios, classes} = this.props;
        const portfolioList = portfolios.map((portfolio) =>
            <Grid item xs={12} sm={12} md={10} lg={6} key={portfolio.id} id={portfolio.id} className={classes.portfolio}>
                <Portfolio
                    portfolio={portfolio}
                    onDelete={this.handleDeletePortfolio}
                    onUpdate={this.handleUpdatePortfolio}
                />
            </Grid>
        );
        return (
            <div className={classes.root}>
                <Grid container className={classes.portfolioList}>
                    {portfolioList}
                </Grid>
            </div>
        )
    }
}

export default withStyles(useStyles)(Portfolios);