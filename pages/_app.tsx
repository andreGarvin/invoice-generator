import type { AppProps } from "next/app";

// components
import Head from 'components/Common/Head';

// styles
import "styles/global.css";

import { getProjectConfig } from "services/getProjectConfig";

function MyApp({ Component, pageProps }: AppProps) {
  const config = getProjectConfig();

  return (
    <>
      <Head
        title={config.displayName}
        description={config.description}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
