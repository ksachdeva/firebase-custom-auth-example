import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import {FIREBASE_PROVIDERS, defaultFirebase} from 'angularfire2';
import { HTTP_PROVIDERS } from '@angular/http';

const FB_API_KEY = '';
const FB_AUTH_DOMAIN = '';
const FB_DB_URL = '';
const FB_STORAGE_BUCKET = '';

if (FB_API_KEY === '' ||
  FB_AUTH_DOMAIN === '' ||
  FB_DB_URL === '' ||
  FB_STORAGE_BUCKET === '') {
  console.error('Need to provide your web credentials');
  alert('Please update main.ts and provide your web credentials');
} else {

  bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    FIREBASE_PROVIDERS,
    defaultFirebase({
      apiKey: FB_API_KEY,
      authDomain: FB_AUTH_DOMAIN,
      databaseURL: FB_DB_URL,
      storageBucket: FB_STORAGE_BUCKET,
    })
  ]);

}
