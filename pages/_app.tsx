import './globals.css'
import React, {  useEffect } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';

function MyApp({ Component, pageProps }) {
  
    useEffect(() => {
        if (cookie.get('token') && Router.pathname === '/login') {
            Router.push('/');
        }
        else {
            Router.push('/login');
        }
    }, [])

  return <Component {...pageProps} >
  </Component>
}

export default MyApp
