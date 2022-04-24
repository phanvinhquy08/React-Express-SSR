// @ts-ignore
const express = require('express');
const React = require('react');
// @ts-ignore
const ReactDOMServer = require('react-dom/server');

const app = express();

require('dotenv').config();
require('@babel/register').default({
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
});

const ClientApp = require('../src/App.tsx').default;
const HTML = require('../src/Html.tsx').default;
// const config = require('../webpack.config.js');
// const middleware = require('webpack-dev-middleware');
const port = process.env.PORT;
// const compiler = webpack(config);

app.set('port', port);

// app.use(
//   middleware(compiler, {
//     publicPath: config.output.publicPath,
//   }),
// );

app.get('/', (req, res) => {
  const content = ReactDOMServer.renderToString(React.createElement(ClientApp));
  const html = ReactDOMServer.renderToStaticMarkup(
    React.createElement(HTML, { content }),
  );

  res.send(html);
});

app.get('/api', (req, res) => {
  res.send('<p>This is a api Data</p>');
});

app.listen(app.get('port'), () => {
  console.log('App running as port: ' + app.get('port'));
});
