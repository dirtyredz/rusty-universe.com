exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === "build-html") {
    config.loader("null", {
      test: /PaypalForm/,
      loader: "null-loader",
    });
  }
};

const path = require ('path');

exports.createPages = ({boundActionCreators, graphql}) => {
  const {createPage} = boundActionCreators;
  const sitePageTemplate = path.resolve (`src/layouts/sitePages.js`);

  return graphql (
    `{allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/sitePages/"}, frontmatter: {title: {ne: "Rusty"} }}) {
      edges {
        node {
          html
          frontmatter{
            title
            path
            description
            markdown
          }
        }
      }
  }}`
  ).then (result => {
    if (result.errors) {
      return Promise.reject (result.errors);
    }

    const sitePages = result.data.allMarkdownRemark.edges;

    sitePages.forEach (({node}, index) => {
      createPage ({
        path: node.frontmatter.path,
        component: sitePageTemplate,
      });
    });
  });
};