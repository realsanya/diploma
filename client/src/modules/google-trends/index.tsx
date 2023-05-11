// @ts-nocheck
import React, { useCallback } from 'react';
import Script from 'react-load-script';

const MAX_WIDGETS = 6;

const GoogleTrends = (props) => {
  const { type, comparison, keyword, geo, time, property } = props;

  const handleScriptLoad = useCallback(() => {
    if (document.getElementById(`trends-widget-${MAX_WIDGETS}`)) return;
    window.trends.embed.renderExploreWidgetTo(
      document.getElementById('widget'),
      type,
      {
        comparisonItem: comparison,
        category: 0,
        property,
      },
      {
        exploreQuery: `q=${decodeURI(keyword)}&geo=${geo}&date=${time}&gprop=${property}`,
        questPath: "https://trends.google.com:443/trends/embed/",
      }
    );
  }, [comparison, geo, keyword, property, time, type]);

  const renderGoogleTrend = () => (
    <Script url="https://ssl.gstatic.com/trends_nrtr/2051_RC11/embed_loader.js" onLoad={handleScriptLoad} />
  );

  return renderGoogleTrend();
};

export default GoogleTrends;