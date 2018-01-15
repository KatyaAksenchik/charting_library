function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var config = {};
(function () {
    // window.localStorage.
    var url = decodeURI(window.location.search);
    var items = url.substring(1).split('&');
    for (var i = 0; i < items.length; i++) {
        config[items[i].split('=')[0]] = items[i].split('=')[1];
    }
    config.url = config.type === 'mdc' ? 'https://mdc.wallstreetcn.com' : 'https://forexdata.wallstreetcn.com'
})()
TradingView.onready(function () {
    var widget = window.tvWidget = new TradingView.widget({
        fullscreen: true,
        symbol: config.symbol ? config.symbol : 'XAUUSD',
        interval: config.interval ? config.interval : 'D',
        container_id: "tv_chart_container",
        hideideas: true,
        allow_symbol_change: false,
        //	BEWARE: no trailing slash is expected in feed URL
        datafeed: new Datafeeds.UDFCompatibleDatafeed(config.url, 15000, config.type, config.description),
        library_path: "charting_library/charting_library/",
        locale: getParameterByName('lang') || "en",
        custom_css_url: 'custom.css',
        //	Regression Trend-related functionality is not implemented yet, so it's hidden for a while
        drawings_access: {
            type: 'black',
            tools: [{
                name: "Regression Trend"
            }]
        },
        // charts_storage_api_version: "1.1",
        overrides: {
            'mainSeriesProperties.candleStyle.upColor': '#d75442',
            'mainSeriesProperties.candleStyle.downColor': '#6ba583',
            'mainSeriesProperties.candleStyle.borderUpColor': '#5b1a13',
            'mainSeriesProperties.candleStyle.borderDownColor': '#225437'
        },
        disabled_features: ["header_screenshot"],
        timezone: 'Europa/Minsk',
    });
    widget.onChartReady(function () {
        $("iframe").contents().find(".onchart-tv-logo").remove();
    });
});