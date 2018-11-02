import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layout/Base';

export default ({ data }) => (
  <Layout>
    <div style={{ color: `teal` }}>
      <h1>About Gatsby</h1>
      <p>Such wow. Very React.</p>
      <p>{data.site.siteMetadata.title}</p>
    </div>
  </Layout>
);

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
