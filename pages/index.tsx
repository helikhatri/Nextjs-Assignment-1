import Head from 'next/head'
import styles from '../Home.module.css'
import Layout from './layout';

const index = () => {
  return(
  <Layout title="Welcome User">
    <h1>Hello world</h1>
  </Layout>
  );
}
export default index;
