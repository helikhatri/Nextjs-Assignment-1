import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
  Button
} from '@material-ui/core';
import {
  ExpandLess,
  ExpandMore,
  StarBorder
} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Alert, AlertTitle } from '@material-ui/lab';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';

interface IColumnNames {
  id: number
  name: string
  pantone_value: string
  color: string
  year: string
  col: Function
}
export default function DataTable() {
  const [users, setUsers] = useState<IColumnNames[]>([]);
  const apiurl = 'https://reqres.in/api/unknown';
  const theme = useTheme();
  const [open, setOpen] = React.useState<boolean>(false);
  const [nestopen, setnestOpen] = React.useState<boolean>(false);
  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState('');

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'color', headerName: 'Color', width: 130 },
    {
      field: 'year',
      headerName: 'year',
      type: 'number',
      width: 90,
    },
    {
      field: '',
      headerName: 'Action',
      width: 200,
      renderCell: (record: any) => (
        <strong>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={editRecord}
          >
            Edit
        </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => deleteRecord(record.id)}
          >
            Delete
      </Button>
        </strong>
      ),
    }
  ];

  const drawerWidth = 240;
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

  const classes = useStyles();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setnestOpen(!nestopen);
  };

  const editRecord = (props: any) => {
    setAlert(true);
    const user = [...users];
    setMsg('Record Edited successfully');
  }
  const deleteRecord = (index: number) => {
    debugger;
    const user = [...users];
    user.splice(index, 1);
    setAlert(true);
    setUsers(user);
    setMsg('Record Deleted successfully');
  }

  useEffect(() => {

    axios.get(apiurl)
      .then((response => {
        setUsers(response.data.data)
      }))
    console.log(users);
  }, [])

  useEffect(() => {
    setInterval(() => {
      alert ?
        setAlert(false)
        : setAlert(false)
    }, 2000);
  }, [])

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
            User list
        </Typography>
          <Typography variant="h6" noWrap style={{ marginLeft: 'auto' }}>
            Logout
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
            <Link href='/dashboard'>
              <ListItem button key='Dashboard'>
                <ListItemIcon> <InboxIcon /> </ListItemIcon>
                <ListItemText primary='Dashboard' />
              </ListItem>
            </Link>
            <ListItem button key='Manage User'>
              <ListItemIcon> <MailIcon /> </ListItemIcon>
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
                <ListItemIcon> <MailIcon /> </ListItemIcon>
                <ListItemText primary='User History' />
              </ListItem>
            </Link>
            <Link href='/Home'>
              <ListItem button key='Manage Documents'>
                <ListItemIcon> <MailIcon /> </ListItemIcon>
                <ListItemText primary='Manage Documents' />
              </ListItem>
            </Link>
          </div>

        </List>

      </Drawer>
      <main className={classes.content}>
        <div style={{ height: 400, width: '100%', float: 'right' }}>
          <div className={classes.toolbar} />
          {alert ?
            <Alert severity="success">
              <AlertTitle>{msg}</AlertTitle>
            </Alert> : null}
          <DataGrid rows={users}
            columns={columns}
            pageSize={5}
            checkboxSelection
          />
        </div>
      </main>
    </div>
  );
}

