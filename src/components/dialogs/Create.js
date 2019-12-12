import React, {Component} from "react";
import {
    Fab,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {withStyles} from "@material-ui/styles";


// Styling object for material-ui
// Sends classes as a props.
const useStyles = {
    fav_root: {
    position: 'relative',
  },
    fab: {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 100,
  },
};

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Open and close state of Dialogue
            open: false,
            // Change the state if portfolios objects changes
            title: "",
            // Change the button to disabled
            disable: true,
            // Flag for maximum number of portfolio reached.
            maxReached: false,
            //  Change message of ghe dialog box
            message: "You can create an empty portfolio with portfolio name."
        };
    }

    // Changes the state value property during input
    handleChange = ({target: {value}}) => this.setState({title: value, disable: false});

    // Toggle the state of the Dialog with form
    handleToggle = () => this.setState({open: !this.state.open});

    // Toggle the state of the Dialog when closed
    handleClose = () => {
        this.setState({open: false, title: ""});
    };

    // Toggle the state of the Message in Dialog box
    handleMessage = (message) => {
        this.setState({message: message});
    };

    // Handle the create button and send the title to App
    handleCreate = () => {
        const title = this.state.title;
        const max = this.props.portfolioMax();
        if (title.trim() === "") {
            const m = "You need to specify a name to create a new Portfolio.";
            this.setState({title: "", disable: true});
            this.handleMessage(m);
        } else if (max) {
            this.setState({maxReached: true, title: "", disable: true});
            const m = "You have reached maximum number of Portfolio allowed.";
            this.handleMessage(m);
        } else {
            this.props.onCreate(title);
            const m = "Your Portfolio was created. You can add more if you like.";
            // Change the state of title to empty after adding.
            this.setState({title: "", disable: true});
            this.handleMessage(m);
        }
    };

    render() {
        const {open, title, disable, message, maxReached} = this.state;
        const {classes,} = this.props;
        return (
            <div className={classes.fav_root}>
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={this.handleToggle}
                    disabled={maxReached}
                    className={classes.fab}
                >
                    <AddIcon/>
                </Fab>

                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    // aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Create Portfolio</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {message}
                        </DialogContentText>
                        <TextField
                            required
                            label="Enter a name."
                            value={title}
                            variant="outlined"
                            onChange={this.handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={this.handleClose}
                        >
                            Cancel
                        </Button><Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleCreate}
                        disabled={disable}
                    >
                        Create
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(useStyles)(Create);
