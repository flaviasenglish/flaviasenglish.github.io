/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require("react");
const withPrefix = require("./src/utils/withPrefix").default;

exports.onRenderBody = function({ setHeadComponents, setPostBodyComponents }) {

    setHeadComponents([
        <link rel="shortcut icon" type="image/png"  href="./favicon.png" />
    ]);

    setPostBodyComponents([
        <React.Fragment>
            <script src={withPrefix('assets/js/plugins.js')}/>
            <script src={withPrefix('assets/js/main.js')}/>
            
        </React.Fragment>
    ]);

};
