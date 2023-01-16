import "../styles/globals.scss";

import localFont from "@next/font/local";
const textile = localFont({ src: "./Textile-Regular.ttf" });

export default function App({ Component, pageProps }) {
  return (
    <main className={textile.className}>
      <Component {...pageProps} />
    </main>
  );
}
