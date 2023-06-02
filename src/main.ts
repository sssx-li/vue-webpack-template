import 'normalize.css';
import './styles/index.scss';
import './hooks/useSwitchTheme/src/theme.scss';

import router from './permission';
import store from './store';
import directives from './directives';
import filters from './filters';
import icons from './components/svgIcon';

import App from './App.vue';
import { setupMock } from '../mock';

(() => {
  if (process.env.VUE_APP_MOCK_ENV) {
    setupMock();
  }
  const app = createApp(App);
  app.use(icons);
  app.use(store);
  app.use(router);
  app.use(directives);
  app.use(filters);
  app.mount('#app');
})();
