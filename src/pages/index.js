import React from 'react';
import { Link } from 'gatsby';
import Layout from '../layout/Base';

const IndexPage = () => (
  <Layout>
    <h1>Hellooo</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/about">About</Link>
  </Layout>
);

export default IndexPage;
