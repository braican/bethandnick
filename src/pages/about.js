import React from 'react';
import { graphql } from 'gatsby';
import BaseLayout from '../layout/BaseLayout';

export default ({ data }) => (
  <BaseLayout>
    <div style={{ color: `teal` }}>
      <h1>About Gatsby</h1>
      <p>Such wow. Very React.</p>
      <p>{data.site.siteMetadata.title}</p>
    </div>
  </BaseLayout>
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
