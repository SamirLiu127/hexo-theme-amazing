const { Component, Fragment } = require('inferno');
const { cacheComponent } = require('../util/cache');

class GoogleTagManager extends Component {
    render() {
        const { tagId } = this.props;

        const js = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	        })(window,document,'script','dataLayer','${tagId}');`;

        return <Fragment>
            <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${tagId}`}
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
            <script dangerouslySetInnerHTML={{ __html: js }}></script>
        </Fragment>;
    }
}

module.exports = cacheComponent(GoogleTagManager, 'plugin.googletagmanager', props => {
    const { head, plugin } = props;
    if (!head || !plugin.tag_id) {
        return null;
    }
    return {
        tagId: plugin.tag_id
    };
});
