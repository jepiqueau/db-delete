import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'db-delete',
  webDir: 'dist/db-delete',
  bundledWebRuntime: false,
  plugins: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    CapacitorSQLite: {
      electronWindowsLocation: 'C:\\ProgramData\\CapacitorDatabases',
      electronMacLocation: '/Volumes/Development_Lacie/Development/CapacitorDatabases',
      electronLinuxLocation: 'Databases'
    }
  }

};

export default config;
