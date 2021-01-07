
import clsx from 'clsx';
import {
    Drawer,
    AppBar,
    Toolbar,
    List,
    CssBaseline,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    makeStyles,
    useTheme
} from '@material-ui/core';
import {
    ExpandLess,
    ExpandMore,
    StarBorder
} from '@material-ui/icons';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HistoryIcon from '@material-ui/icons/History';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MenuIcon from '@material-ui/icons/Menu';
import ListIcon from '@material-ui/icons/List';
import GroupIcon from '@material-ui/icons/Group';
import Link from 'next/link';
import React from 'react';


export default function layout(props) {
    const theme = useTheme();
    const drawerWidth = 240;
    const [nestopen, setnestOpen] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState<boolean>(false);
    const useStyles = makeStyles((theme) => ({

        root: {
            display: 'flex',
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }));
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleClick = () => {
        setnestOpen(!nestopen);
    };


    const classes = useStyles();
    console.log(props);
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap style={{ textAlign: 'center' }}>
                        {props.title}
                    </Typography>
                    <Typography variant="h6" noWrap style={{ marginLeft: 'auto' }}>
                        <Link href='/login'>Logout </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>

                    <div>
                        <Link href='/'>
                            <ListItem button key='Dashboard'>
                                <ListItemIcon> <DashboardIcon /> </ListItemIcon>
                                <ListItemText primary='Dashboard' />
                            </ListItem>
                        </Link>
                        <ListItem button key='Manage User'>
                            <ListItemIcon> <GroupIcon /> </ListItemIcon>
                            <ListItemText primary='Manage User' onClick={handleClick} />
                            {nestopen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={nestopen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <Link href='/Userlist'>
                                        <ListItemText primary="User List" />
                                    </Link>
                                </ListItem>
                            </List>
                        </Collapse>
                        <Link href='/Home'>
                            <ListItem button key='User History'>
                                <ListItemIcon> <HistoryIcon /> </ListItemIcon>
                                <ListItemText primary='User History' />
                            </ListItem>
                        </Link>
                        <Link href='/Home'>
                            <ListItem button key='Manage Documents'>
                                <ListItemIcon> <AssignmentIcon /> </ListItemIcon>
                                <ListItemText primary='Manage Documents' />
                            </ListItem>
                        </Link>
                    </div>

                </List>
            </Drawer>
            <main className={classes.content}>
                <div style={{ height: 400, width: '100%', float: 'right' }}>
                    <div className={classes.toolbar} />
                    {props.children}
                </div>
            </main>
        </div >
    );
}
