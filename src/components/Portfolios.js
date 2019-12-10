import React, { Component, Fragment } from "react";
import { Grid,Paper, } from "@material-ui/core";

class Portfolios extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const portfolios = this.props.portfolios;
    const portfolioList = portfolios.map((portfolio) =>
          <Grid item xs={12} sm={6} key={portfolio.id} id={portfolio.id}>
            <Paper className={'paper'}>{portfolio.title}</Paper>
          </Grid>
    );
    return (
        <Fragment>
          <Grid container spacing={3}>
            {portfolioList}
          </Grid>
        </Fragment>
    )
  }
}
export default Portfolios;