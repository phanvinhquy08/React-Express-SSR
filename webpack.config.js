const path = require('path');

const srcPath = path.resolve(__dirname, 'src');
const buildPath = path.resolve(__dirname, 'build');
const serverPath = path.resolve(__dirname, 'server');
const nodeExternals = require('webpack-node-externals');

const clientConfig = {
  devtool: 'source-map',
  mode: 'development',
  name: 'client',
  entry: {
    client: path.resolve(srcPath, 'index.tsx'),
  },
  output: {
    publicPath: '/',
    path: buildPath,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: srcPath,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: srcPath,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [['@babel/preset-env', { targets: { node: '8' } }]],
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        // Loads the javascript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            //options: { minimize: true }
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
};

const serverConfig = {
  target: 'node',
  name: 'server',
  entry: {
    server: path.resolve(serverPath, 'index.ts'),
  },
  externals: [nodeExternals()],
  output: {
    publicPath: '/',
    path: buildPath,
    filename: 'server.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        include: path.resolve(serverPath, 'index.ts'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [['@babel/preset-env', { targets: { node: '8' } }]],
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: srcPath,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [['@babel/preset-env', { targets: { node: '8' } }]],
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  devtool: 'inline-source-map',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: true, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
  },
  // plugins: [new NodePolyfillPlugin()],
};

module.exports = clientConfig;
