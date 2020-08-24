import React, {Component, forwardRef} from "react";
import MaterialTable from "material-table";

import {makeStyles, withStyles} from "@material-ui/styles";
import {
    AddBox,
    ArrowDownward,
    Check,
    Remove,
    ViewColumn,
    Search,
    Clear,
    ChevronLeft,
    ChevronRight,
    LastPage,
    FirstPage,
    FilterList,
    SaveAlt,
    Edit,
    DeleteOutline
} from "@material-ui/icons";

// Styling object for material-ui
// Sends classes as a props.
const useStyles = makeStyles(theme => ({
    root: {
        padding: '12px',
        '& .MuiTextField-root': {
            color: 'primary',
    },
    },
    table: {
        padding: '12px',
    }
}));

// Icons used with Material table
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [ // Columns used to display data for each stocks
                // The columns represent properties fo stocks
                {title: 'Symbol', field: 'symbol'},
                {title: 'Quantity', field: 'quantity', type: 'numeric', sorting: false},
                {title: 'Purchased Date', field: 'purchaseDate', type: 'date'},
                {title: 'Purchased Value', field: 'unitValue', editable: 'never', type: 'currency', sorting: false},
                {title: 'Current Value', field: 'unitValue', editable: 'never', type: 'currency', sorting: false},
                {title: 'Total Value', field: 'totalValue', editable: 'never', type: 'currency', sorting: false},
            ],
            stocks: [],
        };
    }

    componentDidMount() {
        // Update Starting state of stocks to that of portfolio.
        const portfolio = this.props.portfolio;
        if (typeof (portfolio.stocks) !== "undefined") {
            // get initial stocks lists from the portfolio property
            this.getStockList(portfolio);
            this.setState({
                stocks: portfolio.stocks,
            });
        }
    }

    // Changes the stock array into object with Date object
    getStockList = (portfolio) => {
        if (typeof (portfolio.stocks) !== "undefined") {
            const stocksText = portfolio.stocks;
            // Change each purchaseDate field into Date object.
            return stocksText.forEach(stock => {
                stock.purchaseDate = new Date(stock.purchaseDate)
            });
        }

    };

    getUnitValue = (symbol) => {
        if (symbol) {
            const value = "100";
            return value;
        }
    };

    getTotalValue = (u, q) => {
        return u * q;
    };

    handleUpdateStock = () => {
        const portfolio = this.props.portfolio;
        portfolio.stocks = this.state.stocks;
        this.props.onUpdate(portfolio);
    };

    // When Delete button is pressed, this sends the portfolio as props to Portfolios
    handleDeletePortfolio = () => {
        const portfolio = this.props.portfolio;
        this.props.onDelete(portfolio);
    };

    render() {
        const state = this.state;
        const {portfolio, classes} = this.props;
        return (
            // source: https://material-ui.com/components/tables/#material-table
            // https://github.com/mbrn/material-table
            <div className={classes.root}>
                <MaterialTable
                    icons={tableIcons}
                    title={portfolio.title}
                    columns={state.columns}
                    data={state.stocks}
                    options={{
                        addRowPosition: 'first',
                        pageSizeOptions: [],
                        pageSize: 7,
                        paginationType: "stepped",
                        minBodyHeight: 460,
                        maxBodyHeight: 460,
                        searchFieldStyle: {color: "primary"},
                        headerStyle: {
                            backgroundColor: '#01579b',
                            color: '#FFF',
                            padding: '1em',
                        }
                    }}
                    actions={[
                        { // Delete Portfolio
                            icon: tableIcons.Delete,
                            tooltip: 'Delete Portfolio',
                            isFreeAction: true,
                            onClick: this.handleDeletePortfolio
                        },
                        // { // Add Stock to portfolio
                        //     icon: tableIcons.Add,
                        //     tooltip: 'Add Stock',
                        //     isFreeAction: true,
                        //     onClick: this.handleAddStock
                        // }
                    ]}
                    editable={{
                        onRowAdd: newData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    newData.unitValue = this.getUnitValue(newData.symbol);
                                    newData.totalValue = this.getTotalValue(newData.unitValue, newData.quantity);
                                    resolve();
                                    this.setState(prevState => {
                                        const stocks = [...prevState.stocks];
                                        stocks.push(newData);
                                        return {...prevState, stocks};
                                    });
                                    // Update the stock in portfolio.
                                    this.handleUpdateStock();
                                }, 600);
                            }),
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    this.setState(prevState => {
                                        const stocks = [...prevState.stocks];
                                        stocks.splice(stocks.indexOf(oldData), 1);
                                        return {...prevState, stocks};
                                    });
                                    // Update the Stocks in Portfolio.
                                    this.handleUpdateStock();
                                }, 600);
                            }),
                    }}
                />
            </div>
        );
    }
}

export default withStyles(useStyles)(Portfolio);