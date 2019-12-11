import React, {Component} from "react";
import {Grid, Paper,} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";

// Styling object for material-ui
// Sends classes as a props.
const useStyles = theme => ({
    portfolio_list: {
        flexGrow: 1,
    },
    paper: {
        padding: '12px',
        margin: '12px',
    },
    portfolio: {
        height: '200px',
        padding: '12px',
        margin: '12px',
    }
});

class Portfolios extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {portfolios, classes} = this.props;
        const portfolioList = portfolios.map((portfolio) =>
            <Grid item  xs={12} sm={6} key={portfolio.id} id={portfolio.id}>
                <Paper className={classes.portfolio}>{portfolio.title}</Paper>
            </Grid>
        );
        return (
            <div className={classes.portfolio_list}>
                <Grid container className={classes.portfolio_list}>
                    {portfolioList}
                </Grid>
            </div>
        )
    }
}

export default withStyles(useStyles)(Portfolios);