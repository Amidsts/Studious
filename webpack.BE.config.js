/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path')

module.exports = {
    target: "node",
    entry: "./src/app.ts",
    module: {
        rules: [
            {
              test: /\.tsx?$/,
              use: 'ts-loader',
              exclude: /node_modules/
            },
          ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle_back.js'
   
    },
    external: [nodeExternals()],
    mode: process.env.NODE_ENV === "production" ? "production" : "development"
}

