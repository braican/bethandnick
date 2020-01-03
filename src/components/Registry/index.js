import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import styles from './Registry.module.scss';

const logoAltMap = name => {
  switch (name) {
    case 'reg-2-crate-and-barrel':
      return 'Crate and Barrel logo';
    case 'reg-1-zola':
      return 'Zola logo';
    default:
      return '';
  }
};

const registryLinkMap = name => {
  switch (name) {
    case 'reg-2-crate-and-barrel':
      return 'https://www.crateandbarrel.com/gift-registry/beth-bardsley-and-nick-braica/r6058920';
    case 'reg-1-zola':
      return 'https://www.zola.com/registry/bethandnickoctober17';
    default:
      return '';
  }
};

const Registry = ({ allFile }) => {

  useEffect(() => {
    !function(e, t, n){let s; const a = e.getElementsByTagName(t)[0];e.getElementById(n) || (s = e.createElement(t), s.id = n, s.async = !0, s.src = 'https://widget.zola.com/js/widget.js', a.parentNode.insertBefore(s, a));}(document, 'script', 'zola-wjs');
  }, []);


  return (
    <div>
      {allFile.edges && allFile.edges.length > 0 && (
        <ul className={styles.sites}>
          {allFile.edges.map(source => (
            <li key={source.node.name}><a target="_blank" rel="noopener noreferrer" href={registryLinkMap(source.node.name)}><img src={source.node.publicURL} alt={logoAltMap(source.node.name)} /></a></li>
          ))}
        </ul>
      )}

      <a className="zola-registry-embed" href="https://www.zola.com/registry/bethandnickoctober17" data-registry-key="bethandnickoctober17">&nbsp;</a>
    </div>
  );
};

Registry.propTypes = {
  allFile: PropTypes.shape({
    edges: PropTypes.arrayOf(PropTypes.shape({
      node: PropTypes.shape({
        publicURL: PropTypes.string,
      }),
    })),
  }),
};

export const registryQuery = graphql`
query RegistryQuery {
  allFile(sort: {fields: name}, filter: {name: {in: ["reg-1-zola", "reg-2-crate-and-barrel"]}}) {
    edges {
      node {
        name
        publicURL
      }
    }
  }
}
`;

const RegistryWithQuery = props => (
  <StaticQuery query={registryQuery} render={data => <Registry {...data} {...props} />} />
);

export default RegistryWithQuery;
