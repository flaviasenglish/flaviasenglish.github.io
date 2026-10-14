import type { i18n } from 'i18next';
import { I18nextProvider } from 'react-i18next';

import { Base } from './templates/Base';

const App = ({ i18n }: { i18n: i18n }) => (
  <I18nextProvider i18n={i18n}>
    <Base />
  </I18nextProvider>
);

export { App };
