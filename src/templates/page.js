import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import { contentFilter, className } from '../util';

import SplitLayout from '../layouts/Split';
import Seo from '../components/Seo';
// import Promo from '../components/Promo';

const Page = ({ data, pageContext: { slug } }) => {
  const {
    content,
    title,
    acf: { page_featured_image },
  } = data.wordpressPage;
  const featuredImage = page_featured_image
    ? page_featured_image.localFile.childImageSharp.fluid
    : null;
  const filteredContent = contentFilter(content);

  const cleanTitle = title.replace('&#8217;', '’');

  return (
    <SplitLayout
      featuredImage={featuredImage}
      bigHeader={slug === 'home'}
      pageTitle={slug !== 'home' ? cleanTitle : ''}
    >
      <Seo title={cleanTitle} />

      {/* {slug === 'home' && <Promo />} */}

      <div
        {...className('content__main', slug === 'home' && 'content__main--has-promo')}
        dangerouslySetInnerHTML={{ __html: filteredContent }}
      />
    </SplitLayout>
  );
};

Page.propTypes = {
  data: PropTypes.shape({
    wordpressPage: PropTypes.shape({
      content: PropTypes.string,
      title: PropTypes.string,
      acf: PropTypes.shape({
        page_featured_image: PropTypes.object,
      }),
    }),
  }),
  pageContext: PropTypes.shape({
    slug: PropTypes.string,
  }),
};

export default Page;

export const query = graphql`
  query ($slug: String!) {
    wordpressPage(slug: { eq: $slug }) {
      title
      content
      acf {
        page_featured_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 680, quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;
