import type { AppProps } from "next/app";

// components
import Head from 'components/meta-data/Head';

// styles
import "styles/global.css";

import { getConfig } from "lib/config";

function MyApp({ Component, pageProps }: AppProps) {
  const config = getConfig();

  return (
    <>
      <Head
        title={config.name}
        description={config.description}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
