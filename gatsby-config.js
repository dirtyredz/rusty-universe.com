module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
        {
          resolve: `gatsby-source-filesystem`,
          options: {
            path: `${__dirname}/rewards`,
            name: "markdown-pages",
          },
        },
        {
          resolve: `gatsby-source-filesystem`,
          options: {
            path: `${__dirname}/ranks`,
            name: "markdown-pages",
          },
        },
        {
          resolve: `gatsby-source-filesystem`,
          options: {
            path: `${__dirname}/servers`,
            name: "markdown-pages",
          },
        },
        `gatsby-transformer-remark`,
        `gatsby-plugin-netlify-cms`,
        'gatsby-plugin-react-helmet',
        `gatsby-plugin-styled-components`
  ],
};