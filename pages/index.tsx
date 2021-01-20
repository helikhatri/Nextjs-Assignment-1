import Head from 'next/head'
import styles from '../Home.module.css'
import Layout from './layout';
import cookie from 'js-cookie';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';

const index = () => {
 

  return(
    !cookie.get('token') ?
    <h1>access denied</h1>
  : <Layout title="Welcome User">
    <h1>Hello world</h1>
  </Layout>
  );
}
export default index;
