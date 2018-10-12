import React, { Component } from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import MenuItem from "@material-ui/core/MenuItem";
import FlatButton from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import * as actionCreators from "../../actions/auth";

const drawerWidth = 240;
function mapStateToProps(state) {
    return {
        token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const styles = theme => ({
    root: {
        flexGrow: 0
    },
    appFrame: {
        height: "100%",
        zIndex: 1,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        width: "100%"
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`
    },
    "appBar-left": {
        marginLeft: drawerWidth
    },
    "appBar-right": {
        marginRight: drawerWidth
    },
    drawerPaper: {
        position: "relative",
        marginRight: "0",
        width: drawerWidth
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3
    }
});

@connect(
    mapStateToProps,
    mapDispatchToProps
)
export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    dispatchNewRoute(route) {
        browserHistory.push(route);
        this.setState({
            open: false
        });
    }

    toggleNav() {
        this.setState({
            open: !this.state.open
        });
    }

    logout(e) {
        e.preventDefault();
        this.props.logoutAndRedirect();
        this.setState({
            open: false
        });
    }

    render() {
        const { classes } = this.props;
        const drawer = (
            <Drawer
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper
                }}
                anchor={"left"}
            >
                <div className={classes.toolbar} />
                <Divider />
                <div> Home </div>
                <Divider />
                <div> Editor</div>
            </Drawer>
        );
        return (
            <div className={classes.root}>
                <AppBar
                    position="absolute"
                    className={classNames(
                        classes.appBar,
                        classes[`appBar-left`]
                    )}
                >
                    <Toolbar>
                        <Typography variant="h4" color="inherit" noWrap>
                            Permanent drawer
                        </Typography>
                    </Toolbar>
                </AppBar>
                {drawer}
            </div>
        );
    }
}

export default withStyles(styles)(Header);
