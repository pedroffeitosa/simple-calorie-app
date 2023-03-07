import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";
import { AlertProvider } from "../contexts/AlertContext";
import { AuthProvider } from "../contexts/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AlertProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AlertProvider>
    </AuthProvider>
  );
}

export default MyApp;
