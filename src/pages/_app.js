import { ProviderAuth } from '@hooks/useAuth.js';
import MainLayout from '@layout/MainLayout.js';
import '@styles/tailwind.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ProviderAuth>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ProviderAuth>
    </>
  );
}

export default MyApp;
