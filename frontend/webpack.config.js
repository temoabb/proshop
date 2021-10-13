const path = require("path"); // absolute path to the output;
const HtmlPlugin = require('html-webpack-plugin');


module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',

    // This will create an absolute path to 'build'; We do not have 'build', but it will create 'build' folder for us; 
    // By default it is 'dist', but we want to name it 'build';
  },
  module: {
    rules: [ // rules are how we are gonna handle certain file types
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader', // This package (babel-loader) allows transpiling JavaScript files using Babel and webpack.
          }
        ]

      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new HtmlPlugin({
      filename: 'index.html',
      template: './public/index.html'
    })
  ],

  devServer: {
    historyApiFallback: true, // this have to be true, if you ever running into the issues like react-router-dom
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000'
    },
  }
}