import Document, { Html, Head, Main, NextScript } from "next/document";
// Next Strict Content Security Policy
import { NextStrictCSP } from "next-strict-csp";

// Enable Head Strict CSP in production mode only
const HeadCSP = process.env.NODE_ENV === "production" ? NextStrictCSP : Head;
class MyDocument extends Document {
  render() {
    return (
      <Html className="h-full bg-gray-100">
        <HeadCSP>
          {process.env.NODE_ENV === "production" && (
            <meta httpEquiv="Content-Security-Policy" />
          )}
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
            rel="stylesheet"
          />
        </HeadCSP>
        <body className="h-full overflow-hidden">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
