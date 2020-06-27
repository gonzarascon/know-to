import Document, { Html, Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';
import { mediaStyles } from 'utils/mediaRender';

class MyDocument extends Document {
  render() {
    const styles = flush();
    return (
      <Html>
        <Head>
          <style
            type="text/css"
            dangerouslySetInnerHTML={{ __html: mediaStyles }}
          />
          {styles}
          <title>Know-To</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
