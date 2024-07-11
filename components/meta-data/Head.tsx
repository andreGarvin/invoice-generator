import NextHead from "next/head";

type AppHeadType = {
  title: string;
  description: string;
}

const AppHead: React.FC<AppHeadType> = (props) => {
  const { title, description } = props;

    const information = `${title} - ${description}`;

  return (
    <NextHead>
      <meta charSet="utf-8" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>{information}</title>
      <meta name="description" content={description} />

      <meta property="og:site_name" content={title} />
      <meta property="og:locale" content="en_us" />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@garvin_co" />

      <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
    </NextHead>
  );
}

export default AppHead;
