import React, {Component, forwardRef} from "react";
import MaterialTable from "material-table";
// import {makeStyles, withStyles} from "@material-ui/styles";
// import {Paper} from "@material-ui/core";
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
// const useStyles = makeStyles(theme => ({
//     root: {
//         padding: '12px',
//     },
//     table: {
//         padding: '12px',
//     }
// }));

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
            columns: [
                {title: 'Symbol', field: 'symbol'},
                {title: 'Quantity', field: 'quantity', type: 'numeric'},
                {title: 'Purchased Date', field: 'purchaseDate'},
                {
                    title: 'Unit Value',
                    field: 'unitValue',
                    editable: 'never',
                    type: 'currency',
                    // render: rowData => <span>{this.getUnitValue(rowData.symbol)}</span>,
                },
                {
                    title: 'Total Value',
                    field: 'totalValue',
                    editable: 'never',
                    type: 'currency',
                    // render: rowData => <span>{rowData.quantity * this.getUnitValue(rowData.symbol)}</span>,
                },
            ],
            data: [
                {
                    symbol: "NOK",
                    quantity: 10,
                    purchaseDate: "10/10/2010",
                },
                {
                    symbol: "APL",
                    quantity: 10,
                    purchaseDate: "10/10/2010",
                },

            ],
        };
    }

    getUnitValue = (symbol) => {
        if (symbol) {
            const value = 100;
            return value;
        }
    };

    getTotalValue = () => {
        return 2234;
    };

    handleAddStock = newData => {
        this.setState(prevState => {
            const data = [...prevState.data];
            data.push(newData);
            return {...prevState, data};
        });
    };


    handleDeletePortfolio = () => {
        const portfolio = this.props.portfolio;
        alert("Portfolio.js  " + portfolio.id);
        this.props.onDelete(portfolio);
    };

    render() {
        const state = this.state;
        const {portfolio} = this.props;
        return (
            // source: https://material-ui.com/components/tables/#material-table
            // https://github.com/mbrn/material-table
                <MaterialTable
                    color={"primary"}
                    icons={tableIcons}
                    title={portfolio.title}
                    columns={state.columns}
                    data={state.data}
                    options={{
                        addRowPosition: 'first',
                        pageSizeOptions: [],
                        pageSize: 7,
                        paginationType: "stepped",
                        selection: true,
                    }}
                    actions={[
                        { // Delete Portfolio
                            icon: tableIcons.Delete,
                            tooltip: 'Delete Portfolio',
                            isFreeAction: true,
                            onClick: this.handleDeletePortfolio
                        },
                        { // Add Stock to portfolio
                            icon: tableIcons.Add,
                            tooltip: 'Add Stock',
                            isFreeAction: true,
                            onClick: this.handleAddStock
                        }
                    ]}
                    editable={{
                        // onRowAdd: newData =>
                        //     new Promise(resolve => {
                        //         setTimeout(() => {
                        //             resolve();
                        //             this.setState(prevState => {
                        //                 const data = [...prevState.data];
                        //                 data.push(newData);
                        //                 return {...prevState, data};
                        //             });
                        //         }, 600);
                        //     }),
                        // onRowUpdate: (newData, oldData) =>
                        //     new Promise(resolve => {
                        //         setTimeout(() => {
                        //             resolve();
                        //             if (oldData) {
                        //                 this.setState(prevState => {
                        //                     const data = [...prevState.data];
                        //                     data[data.indexOf(oldData)] = newData;
                        //                     return {...prevState, data};
                        //                 });
                        //             }
                        //         }, 600);
                        //     }),
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    this.setState(prevState => {
                                        const data = [...prevState.data];
                                        data.splice(data.indexOf(oldData), 1);
                                        return {...prevState, data};
                                    });
                                }, 600);
                            }),
                    }}
                />
        );
    }
}

export default Portfolio;