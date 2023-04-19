import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class CustomDocument extends Document {
  static async getInitialProps(context: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = context.renderPage;
    try {
      context.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(context);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600&display=swap"
            rel="stylesheet"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="180x180"
            href="/favicons/apple-touch-icon-180x180.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="167x167"
            href="/favicons/apple-touch-icon-167x167.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="152x152"
            href="/favicons/apple-touch-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="144x144"
            href="/favicons/apple-touch-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="120x120"
            href="/favicons/apple-touch-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="114x114"
            href="/favicons/apple-touch-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="76x76"
            href="/favicons/apple-touch-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="72x72"
            href="/favicons/apple-touch-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="60x60"
            href="/favicons/apple-touch-icon-60x60.png"
          />

          <link
            rel="apple-touch-icon-precomposed"
            sizes="57x57"
            href="/favicons/apple-touch-icon-57x57.png"
          />

          <link rel="icon" type="image/png" href="/favicons/favicon-196x196.png" sizes="196x196" />
          <link rel="icon" type="image/png" href="/favicons/favicon-128x128.png" sizes="128x128" />
          <link rel="icon" type="image/png" href="/favicons/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/png" href="/favicons/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/favicons/favicon-16x16.png" sizes="16x16" />
          <link rel="manifest" href="/favicons/site.webmanifest" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
