import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga4';

import './i18n';
import { Base } from './templates/Base';

import 'material-icons/iconfont/material-icons.css';
import 'react-multi-carousel/lib/styles.css';
import './styles/main.css';

ReactGA.initialize('G-1XW09QDNP6');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Base />
  </StrictMode>,
);
