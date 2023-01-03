import Document, { Html, Head, Main, NextScript } from 'next/document';

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="body">
          <Main />
          <NextScript />
        </body>
        <style>
          {`
            .body::-webkit-scrollbar-track {
              border-radius: 0px;
              @apply bg-bg_white-0;
            }

            .body::-webkit-scrollbar {
              width: 12px;
              @apply bg-bg_blue-0;
            }

            .body::-webkit-scrollbar-thumb {
              @apply bg-bg_blue-0;
              border-radius: 16px;
            }
          `}
        </style>
      </Html>
    );
  }
}

export default MyDocument;
