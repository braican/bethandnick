import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

import './header.scss';

// const fontFamilies = [
//   'Abril Fatface',
//   'Playfair Display',
//   'Vidaloka',
//   'Ovo',
//   'Goudy',
//   'Gilda Display',
//   'Suranna',
//   'Headland One',
//   'Katibeh',
//   'Cormorant Upright'
// ];

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      fontFamily: 'Goudy Bookletter 1911'
    };

    this.updateFontFamily = this.updateFontFamily.bind(this);
  }

  updateFontFamily(family) {
    this.setState({
      fontFamily: family
    });
  }

  render() {
    const { siteTitle } = this.props;

    console.log(this.state.fontFamily);

    return (
      <StaticQuery
        query={graphql`
          query {
            allWordpressPage(sort: { fields: [menu_order], order: ASC }) {
              edges {
                node {
                  id
                  title
                  slug
                }
              }
            }
          }
        `}
        render={data => (
          <div>
            <h1
              className="header__banner"
              style={this.state.fontFamily !== 'Goudy' ? { fontFamily: this.state.fontFamily } : {}}
            >
              {siteTitle.split(' ').map(part => (
                <span key={part}>{part}</span>
              ))}
            </h1>

            <nav>
              <Link to="/">Home</Link>
              {data.allWordpressPage.edges
                .filter(({ node }) => node.slug !== 'home')
                .map(({ node }) => (
                  <Link key={node.id} to={`/${node.slug}`}>
                    {node.title}
                  </Link>
                ))}
            </nav>

            {/* <div className="font-switcher">
              font selector:
              <ul>
                {fontFamilies.map(family => (
                  <li key={family} onClick={() => this.updateFontFamily(family)}>
                    {family}
                  </li>
                ))}
              </ul>
            </div> */}
          </div>
        )}
      />
    );
  }
}

export default Header;
