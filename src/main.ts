import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  document.addEventListener('DOMContentLoaded', function() {
  // add padding top to show content behind navbar
  const navbar_height = document.querySelector('.navbar').scrollHeight;
  document.body.style.paddingTop = (navbar_height - 15) + 'px';
});
