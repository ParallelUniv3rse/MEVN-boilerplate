module.exports = {
  /**
   * Paths to the scss packages from node_modules go below.
   */
  includePaths: [
    'node_modules/bootstrap',
  ],
  outputStyle: 'compressed',
  /*
   * Applicable output styles are showcased below:
   *
   ------- nested:(indented like scss)-------

   .widget-social {
   text-align: right; }
   .widget-social a,
   .widget-social a:visited {
   padding: 0 3px;
   color: #222222;
   color: rgba(34, 34, 34, 0.77); }

   ------- expanded:(classic css) -------

   .widget-social {
   text-align: right;
   }
   .widget-social a,
   .widget-social a:visited {
   padding: 0 3px;
   color: #222222;
   color: rgba(34, 34, 34, 0.77);
   }

   ------- compact -------

   .widget-social { text-align: right; }
   .widget-social a, .widget-social a:visited { padding: 0 3px; color: #222222; color: rgba(34, 34, 34, 0.77); }

   ------- compressed:(minified) -------

   .widget-social{text-align:right}.widget-social a,.widget-social a:visited{padding:0 3px;color:#222222;color:rgba(34,34,34,0.77)}
   */
};
