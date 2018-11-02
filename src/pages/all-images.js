import React from 'react';
import { graphql } from 'gatsby';
import BaseLayout from '../layout/BaseLayout';

export default ({ data }) => {
  console.log(data);
  return (
    <BaseLayout>
      <div>Hello world</div>
    </BaseLayout>
  );
};

export const query = graphql`
  query {
    allFile {
      edges {
        node {
          relativePath
          prettySize
          extension
          birthTime(fromNow: true)
        }
      }
    }
  }
`;
