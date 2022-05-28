import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import favicon from '../public/favicon.ico';
import { ChakraProvider } from '@chakra-ui/react';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" type="image/x-icon" href={favicon.src} />
        <title>VaultPass</title>
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
