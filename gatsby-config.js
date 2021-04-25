module.exports = {
    siteMetadata: {
        title: "Is It 100k Yet?",
    },
    plugins: [
        'gatsby-plugin-postcss',
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Is BTC 100k yet?`,
                short_name: `Is BTC 100k yet?`,
                start_url: `/`,
                background_color: `#f7f0eb`,
                theme_color: `#ff9140`,
                display: `standalone`,
                icon: `src/images/bitcoin.png`
            },
        }
    ],
};
