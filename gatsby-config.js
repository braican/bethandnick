require('dotenv').config();

const { NODE_ENV, URL = 'https://bethandnick.us', DEPLOY_PRIME_URL = URL } = process.env;

const isProduction = NODE_ENV === 'production';
const siteUrl = isProduction ? URL : DEPLOY_PRIME_URL;

module.exports = {
  siteMetadata: {
    title: 'Beth & Nick are getting married',
    description: 'Beth & Nick are getting married on December 18, 2021 in Groton, Massachusetts.',
    siteUrl,
  },
  proxy: {
    prefix: '/.netlify/functions',
    url: 'http://localhost:34567',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /svg/,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/img`,
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layouts/Base.js`),
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'beth-and-nick',
        short_name: 'beth-and-nick',
        start_url: '/',
        background_color: '#531827',
        theme_color: '#531827',
        display: 'minimal-ui',
        icon: 'src/img/favicon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        typekit: {
          id: 'azi6wkt',
        },
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        baseUrl: process.env.WORDPRESS_SOURCE_URL,
        protocol: `https`,

        // is the site hosted on WordPress.com
        hostingWPCOM: false,

        // does the site use ACF?
        useACF: true,

        verboseOutput: false,

        includedRoutes: [
          '**/*/*/pages',
          '**/*/*/media',
          '**/bethandnick/v1/info',
          '**/bethandnick/v1/gallery',
        ],
        minimizeDeprecationNotice: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-20596099-20',
      },
    },
  ],
};
