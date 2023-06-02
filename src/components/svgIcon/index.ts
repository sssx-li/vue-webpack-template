import SvgIcon from './svgIcon.vue'; // svg component
import type { App } from 'vue';
export default function (app: App) {
  app.component('SvgIcon', SvgIcon);
  const req = (require as any).context('../../assets/svgs', false, /\.svg$/);
  const requireAll = (requireContext: any) => requireContext.keys().map(requireContext);
  requireAll(req);
}
