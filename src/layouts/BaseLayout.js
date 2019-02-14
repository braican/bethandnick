import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { decodeHtmlEntities } from '../util/strings';

import Nav from '../components/Nav';
import Header from '../components/Header';
import Footer from '../components/Footer';

class BaseLayout extends React.Component {
  componentDidMount() {
    document.body.classList.remove('prevent-scroll');
  }

  render() {
    const { location, featuredImage, pageTitle, data, children } = this.props;
    const { wordpressSiteMetadata, wordpressBethandnickInfo } = data;
    const { name: siteName } = wordpressSiteMetadata;
    const { wedding_date: weddingDate, venue_name: venueName } = wordpressBethandnickInfo;

    const title = location === 'home' ? null : pageTitle;
    const linkTitle = location === 'home' ? false : true;

    return (
      <div className={`main page--${location || 'base'}`}>
        <Helmet
          title={decodeHtmlEntities(siteName)}
          meta={[{ name: 'description', content: 'Beth and Nick are getting married.' }]}
        >
          <html lang="en" />
        </Helmet>

        <div className="splitpane__img">
          {featuredImage ? (
            <Img src={featuredImage.src} size={featuredImage} fluid={featuredImage} />
          ) : null}
        </div>

        <div className="splitpane__content">
          <Nav weddingDate={weddingDate} venueName={venueName} />
          <Header
            contextClass="header--main"
            pageTitle={title}
            weddingDate={weddingDate}
            venueName={venueName}
            linkTitle={linkTitle}
          />
          {children}
          <Footer />
        </div>
      </div>
    );
  }
}

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.string,
  featuredImage: PropTypes.object,
  pageTitle: PropTypes.string,

  // The following come from the static query below
  data: PropTypes.shape({
    wordpressSiteMetadata: PropTypes.shape({
      name: PropTypes.string,
    }),
    wordpressBethandnickInfo: PropTypes.shape({
      wedding_date: PropTypes.string,
      venue_name: PropTypes.string,
    }),
  }),
};

const BaseLayoutStatic = props => (
  <StaticQuery
    query={graphql`
      {
        wordpressSiteMetadata {
          name
        }
        wordpressBethandnickInfo {
          wedding_date
          venue_name
        }
      }
    `}
    render={data => <BaseLayout data={data} {...props} />}
  />
);

export default BaseLayoutStatic;
