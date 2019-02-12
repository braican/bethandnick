module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-svg-sprite`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/static/img`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'beth-and-nick',
        short_name: 'beth-and-nick',
        start_url: '/',
        background_color: '#035d69',
        theme_color: '#035d69',
        display: 'minimal-ui',
        icon: 'src/static/img/favicon.png', // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        // baseUrl: `api.bethandnick.us`,
        // protocol: `https`,

        baseUrl: `bethandnick.ups.dock`,
        protocol: `http`,

        // is the site hosted on WordPress.com
        hostingWPCOM: false,

        // does the site use ACF?
        useACF: false,

        verboseOutput: true,

        includedRoutes: ['**/*/*/pages', '**/bethandnick/v2/info'],
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
