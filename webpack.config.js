require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
 
module.exports = {
  entry: './client/js/loadTools.js',
  mode: process.env.MODE,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/dist')
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env': {
            'LOCAL_NODE': JSON.stringify(process.env.LOCAL_NODE),
            'MODE':JSON.stringify(process.env.MODE),
            'PORT':JSON.stringify(process.env.PORT)
        }
    })
  ],
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  externals:[{
    xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
}]
};