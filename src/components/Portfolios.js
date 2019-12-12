import React, {Component} from "react";
import {Grid } from "@material-ui/core";
import {withStyles} from "@material-ui/styles";

import Portfolio from "./Portfolio";

// Styling object for material-ui
// Sends classes as a props.
const useStyles = {
    portfolio_list: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        padding: "12px",
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

    handleDeletePortfolio = (portfolio) => {
        const portfolios = this.props.portfolios;
        alert("Portfolio.js  " + portfolio.id + "  Number" + portfolios.length);
        portfolios.splice(portfolios.indexOf(portfolio), 1);
        alert("Portfolio.js Delete " + portfolio.id + "  Number" + portfolios.length);
        this.props.onUpdate(portfolios);
    };

    render() {
        const {portfolios, classes} = this.props;
        const portfolioList = portfolios.map((portfolio) =>
            <Grid item xs={12} sm={12} md={10} lg={6} key={portfolio.id} id={portfolio.id} className={classes.portfolio}>
                <Portfolio portfolio={portfolio} onDelete={this.handleDeletePortfolio}/>
            </Grid>
        );
        return (
            <Grid container className={classes.portfolio_list}>
                {portfolioList}
            </Grid>
        )
    }
}

export default withStyles(useStyles)(Portfolios);