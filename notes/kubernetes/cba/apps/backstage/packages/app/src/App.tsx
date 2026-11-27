import { createApp } from '@backstage/frontend-defaults';
import catalogPlugin from '@backstage/plugin-catalog/alpha';
import techdocsPlugin from '@backstage/plugin-techdocs/alpha';
import { navModule } from './modules/nav';
import { homeModule } from './modules/home';

export default createApp({
  features: [catalogPlugin, techdocsPlugin, navModule, homeModule],
});
