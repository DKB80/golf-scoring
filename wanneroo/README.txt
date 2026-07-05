Wanneroo Golf Club - Members' Scoring PWA
=================================================

WHAT'S IN HERE
  index.html              the whole app (scoring, handicaps, GPS shot plotting)
  manifest.webmanifest    install metadata (name, icons, colours)
  sw.js                   service worker: offline caching, auto-updating
  icons/                  home-screen and splash icons

DEPLOY IN 60 SECONDS (pick one)
  Netlify:     drag this folder onto https://app.netlify.com/drop
  Cloudflare:  Pages > Create > Upload assets > drop this folder
  Vercel:      `npx vercel --prod` from inside this folder
  GitHub:      push folder to a repo > Settings > Pages

All of these serve over https automatically, which is what unlocks the GPS
shot-marking (browsers only allow location on secure origins).

INSTALL ON A PHONE
  iPhone:  open the URL in Safari > Share > Add to Home Screen
  Android: open in Chrome > install prompt, or menu > Add to Home screen
  Opens full-screen with its own icon, and works offline mid-round.

UPDATING
  Re-deploy a new build to the same URL. The service worker picks up the new
  version in the background and applies it the next time the app opens.
  (Cache name is stamped with the build hash: f49fa4fb)

DATA
  Everything is stored on-device via localStorage under the "wgc:" prefix.
  Nothing is sent anywhere. Clearing site data resets the app.
