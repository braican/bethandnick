/**
 * SEO component that queries for data.
 *
 * @note that since we are using the gatsby-source-prismic-graphql plugin to pull content, we are
 * unable to use the newer useStaticQuery hook from Gatsby.
 *
 * @link https://github.com/birkir/gatsby-source-prismic-graphql#staticquery-and-usestaticquery
 * @link https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

const SEO = ({ site, allFile, href, description, lang, title }) => {
  const metaTitle = title;
  const metaDescription = description || site.siteMetadata.description;
  const siteUrl = site.siteMetadata.siteUrl || 'https://bethandnick.us';
  const metaImage =
    allFile.totalCount > 0 ? `${siteUrl}${allFile.edges.slice(0, 1).pop().node.publicURL}` : '';


  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      titleTemplate={title === 'Home' ? site.siteMetadata.title : `%s | ${site.siteMetadata.title}`}
      title={metaTitle}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:url',
          content: href,
        },
        {
          property: 'og:title',
          content: metaTitle,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:image',
          content: metaImage,
        },
        {
          name: 'twitter:url',
          content: href,
        },
        {
          name: 'twitter:title',
          content: metaTitle,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          name: 'twitter:image',
          content: metaImage,
        },
      ]}
    />
  );
};

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  site: PropTypes.object,
  allFile: PropTypes.object,
  href: PropTypes.string,
  lang: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
};

const staticQuery = graphql`
  query SeoQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allFile(filter: { name: { eq: "bethandnick-social" } }) {
      totalCount
      edges {
        node {
          publicURL
        }
      }
    }
  }
`;

const SEOWithQuery = props => (
  <StaticQuery query={staticQuery} render={data => <SEO {...data} {...props} />} />
);

// export default SEO;
export default SEOWithQuery;
