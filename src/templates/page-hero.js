import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import HeroLayout from '../layouts/HeroImage';
import Seo from '../components/Seo';

const Page = ({ data, pageContext }) => {
  const location = pageContext.slug || 'home';
  const { content, acf, title } = data.wordpressPage;
  const featuredImage = acf.page_featured_image ? acf.page_featured_image.localFile.childImageSharp.fluid : null;

  return (
    <HeroLayout location={location} featuredImage={featuredImage} pageTitle={title}>
      <Seo title={title} />
      <div className="content__main" dangerouslySetInnerHTML={{ __html: content }} />
    </HeroLayout>
  );
};

Page.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string,
  }),
  data: PropTypes.shape({
    wordpressPage: PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string,
      acf: PropTypes.shape({
        page_featured_image: PropTypes.object,
      }),
    }),
  }),
};

export default Page;

export const query = graphql`
  query($slug: String!) {
    wordpressPage(slug: { eq: $slug }) {
      title
      content
      acf {
        page_featured_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1600, quality: 90) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
  }
`;
