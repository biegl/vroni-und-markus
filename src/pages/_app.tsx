import { AppProps } from 'next/app';

import '../styles/fonts.css';
import '../styles/global.css';
import '../styles/polaroid.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default MyApp;
