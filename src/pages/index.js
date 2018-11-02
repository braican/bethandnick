import React from 'react';
import { Link } from 'gatsby';
import BaseLayout from '../layout/BaseLayout';

const IndexPage = () => (
  <BaseLayout>
    <h1>Hellooo</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/about">About</Link>
  </BaseLayout>
);

export default IndexPage;
