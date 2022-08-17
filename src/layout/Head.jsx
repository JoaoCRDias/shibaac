import React from 'react';

import NextHead from 'next/head';
import Script from 'next/script';
import { NextSeo } from 'next-seo';

const Head = ({ title, keyword, description }) => {
  return (
    <>
      <NextHead>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link rel="icon" href={`/favicon4.ico`} key="favicon" />
      </NextHead>
      <NextSeo
        title={title}
        description={description}
        keyword={keyword}
        //anonical={properties.canonical}
        openGraph={{
          title: title,
          description: description,
          //url: properties.canonical,
          locale: 'en',
          site_name: 'Kingsman OT',
        }}
      />
    </>
  );
};

Head.defaultProps = {
  title: 'Kingsman OT',
  keywords: 'tibia, aac, ots, account creator',
  description: 'Automatic Account Creator',
};

export default Head;
