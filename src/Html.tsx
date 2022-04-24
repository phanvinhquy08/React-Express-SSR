import React from 'react';

export type Props = {
  content: string;
  scripts?: string[];
};

const Html: React.FC<Props> = ({ content, scripts = [] }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Server Side Rendered React App !</title>
      </head>

      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
        <script src="bundle.js" />
        {scripts.map((script, index) => (
          <script key={index} src={script} />
        ))}
      </body>
    </html>
  );
};

export default Html;
