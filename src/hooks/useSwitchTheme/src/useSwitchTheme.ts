import { useCssVar } from '@vueuse/core';

import { CssVarUnion, ThemeUnion } from './type';
import { Themes } from './theme';

export function useSwitchTheme(el: HTMLElement | Ref<any>) {
  const colors: Record<CssVarUnion | string, Ref<any>> = {};
  Object.keys(Themes.defaultTheme).forEach((item) => {
    colors[item] = useCssVar(item, el);
  });
  const switchColor = (type: ThemeUnion = 'defaultTheme') => {
    Object.keys(Themes[type]).forEach((item) => {
      colors[item].value = Themes[type][item as CssVarUnion];
    });
  };
  return {
    switchColor,
  };
}
