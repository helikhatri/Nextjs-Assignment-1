import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Button
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Alert, AlertTitle } from '@material-ui/lab';
import Router from 'next/router';
import Link from 'next/link';
import { useAppContext } from "./contextLib";
import axios from 'axios';
import Layout from './layout';

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
  const [alert, setAlert] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>('');
  const { isAuthenticated } = useAppContext();

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
      field: ' ',
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
    <Layout title="User List">
      {alert ?
        <Alert severity="success">
          <AlertTitle>{msg}</AlertTitle>
        </Alert> : null}
      <DataGrid rows={users}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </Layout>
  );
}

