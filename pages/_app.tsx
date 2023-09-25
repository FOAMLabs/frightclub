import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import { 
  getDefaultWallets, 
  RainbowKitProvider, 
  darkTheme, 
  Theme
 } from '@rainbow-me/rainbowkit';

import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';

import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  base,
  zora,
} from 'wagmi/chains';

import { publicProvider } from 'wagmi/providers/public';
import merge from 'lodash.merge';


const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: '#8c0017',
  },
} as Theme);


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={myTheme}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
