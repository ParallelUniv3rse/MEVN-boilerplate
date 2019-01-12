const path = require('path');
const vue = require('rollup-plugin-vue');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');
const nodeResolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const visualizer = require('rollup-plugin-visualizer');
const inject = require('rollup-plugin-inject');
const replace = require('rollup-plugin-replace');

const config = require('./general.config');

module.exports = (options) => {
  options = {
    analyze: false,
    ...options,
  };

  return {
    input: [path.join(config.paths.vue.src, config.paths.vue.entryFile)], // has to be an array in order for the code splitting to work
    experimentalDynamicImport: true,
    experimentalCodeSplitting: true,
    plugins: [
      // inject({
      // inject plugins into all files here
      // }),
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      nodeResolve({
        browser: true,
      }),
      commonjs(),
      json(),
      vue({
        css: true,
        scss: require('./nodesass.config'),
        postcss: require('./postcss.config'),
      }),
      babel({
        exclude: 'node_modules/**',
      }),
      ...(process.env.NODE_ENV === 'production' ? [uglify()] : []),
      ...(options.analyze ? [visualizer()] : []),
    ],
    output: {
      format: 'system',
      sourcemap: true,
      dir: config.paths.vue.dist,
    },
  };
};
