import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import SplitLayout from '../layouts/Split';
import Seo from '../components/Seo';

const NotFoundPage = ({ data: { allImageSharp: { edges } } }) => {
  const featuredImage = edges.length > 0 ? edges[Math.floor(Math.random() * edges.length)].node.fluid : null;

  return (
    <SplitLayout featuredImage={featuredImage}>
      <Seo title="404" />

      <div className="content__main">
        <h1 className="h1">Uh oh. The page you're looking for left you at the altar.</h1>
        <p>Head on back to the <Link to="/">homepage</Link> for a story with a happy ending.</p>
      </div>
    </SplitLayout>
  );
};

NotFoundPage.propTypes = {
  data: PropTypes.shape({
    allImageSharp: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export const query = graphql`
{
  allImageSharp(filter: {original: {src: {glob: "/static/404-*"}}}) {
    edges {
      node {
        fluid(maxWidth: 680, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
}
`;

export default NotFoundPage;
