# Db delete

Process to install
```bash
git clone https://github.com/jepiqueau/db-delete.git
cd db_delete
npm install
npm audit fix
cd electron
npm install
npm run build
cd ..
npm run build
npx cap sync
npx cap sync @capacitor-community/electron
npm run build
npx cap copy
npx cap copy @capacitor-community/electron
```

To run on browser

```bash
npm run start
```
open http://localhost:4300/ in your prefered browser


To run on electron

```bash
npx cap open @capacitor-community/electron
```

or 
```bash
cd electron
npm run electron:start
```

if you modify the location of your databases in the app capacitor.config.ts you MUST run again

```
npx cap sync @capacitor-community/electron
npm run build
npx cap copy
npx cap copy @capacitor-community/electron
```

to make sure that the capacitor-config.ts in the electron folder is updated

hope this will clarify



