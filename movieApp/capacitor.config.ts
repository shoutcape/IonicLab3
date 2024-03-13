import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'movieApp',
  webDir: 'dist',
  server: {
    androidScheme: 'http',
    cleartext : true,
    // remember to run npx cap sync after changing these values
  }
};

export default config;
