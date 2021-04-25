import * as React from "react"

module.exports = {
    onRenderBody: ({setHeadComponents}) => {
        setHeadComponents([
            <script async defer data-domain="isbtc100kyet.com"
                    src="https://stats.isbtc100kyet.com/js/index.js"></script>,
        ])
    }
};
