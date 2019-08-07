import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import SplitLayout from '../layouts/SplitLayout';

const RsvpPage = ({ data }) => {
  console.log(data);
  const featuredImage = data.file ? data.file.childImageSharp.fluid : null;

  return (
    <SplitLayout featuredImage={featuredImage} pageTitle={'Come celebrate with us.'}>
      <div className="content__main">
        If you
      </div>

    </SplitLayout>
  );
};

RsvpPage.propTypes = {
  data: PropTypes.shape({
    file: PropTypes.object,
  }),
};

export const query = graphql`
  query RsvpPageQuery {
    file(relativePath: {eq: "bethandnick-rsvp.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 800, quality: 90) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;

export default RsvpPage;
