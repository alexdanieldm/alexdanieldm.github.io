const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = "https://www.alexdanieldm.com",
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env

const isNetlifyProduction = NETLIFY_ENV === "production"
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

module.exports = {
  pathPrefix: "/alexdanieldm.github.io",
  siteMetadata: {
    title: `Alex Duran`,
    description: `I'm a passionate Software Developer, who loves using web-technologies to solve real world 
                  problems, and this website its made with React, Gatsby and coffee`,
    author: `Alex Duran`,
    twitter: `@alexdanieldm`,
    siteUrl: siteUrl,
    image: "./assets/images/header.png",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: "*" }],
          },
          "branch-deploy": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null,
          },
          "deploy-preview": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    `gatsby-plugin-preact`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Alex Duran · Software Developer`,
        short_name: `alexdanieldm`,
        start_url: `/`,
        background_color: `#021926`,
        theme_color: `#021926`,
        display: `minimal-ui`,
        icon: `src/assets/icons/terminal-solid.svg`, // This path is relative to the root of the site.
        cache_busting_mode: "none",
      },
    },
    {
      resolve: "gatsby-plugin-offline",
      options: {
        workboxConfig: {
          globPatterns: [`src/assets/icons/terminal-solid.svg`],
        },
      },
    },
    `gatsby-plugin-gatsby-cloud`,
  ],
}
