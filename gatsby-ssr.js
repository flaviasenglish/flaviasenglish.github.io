/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require("react");
const withPrefix = require("./src/utils/withPrefix").default;

exports.onRenderBody = function({ setHeadComponents, setPostBodyComponents }) {

    setHeadComponents([
        <link rel="shortcut icon" type="image/png"  href="./favicon.png" />,
        <meta property="og:title" content="Flávia's English" />,
        <meta property="og:image" content="https://www.flaviasenglish.com.br/images/logo_social.jpg" />,
        <meta property="og:description" content="English related services: tradução, revisão e ensino / translation, proofreading, tutoring. Acesse e saiba mais." />
    ]);

    setPostBodyComponents([
        <React.Fragment>
            <script src={withPrefix('assets/js/plugins.js')}/>
            <script src={withPrefix('assets/js/main.js')}/>
            
        </React.Fragment>
    ]);

};
