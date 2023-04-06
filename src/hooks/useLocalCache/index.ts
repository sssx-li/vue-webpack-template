import { useLocalStorage } from '@vueuse/core';
import { ILocalCache, Keys, TGetCache, TUserInfo } from './type';
import { ThemeUnion } from '../useSwitchTheme';

const defCache: ILocalCache = {
  token: '',
  theme: 'defaultTheme',
  userInfo: { username: '', avatar: '' },
};

export function useLocalCache() {
  // 1.获取cache
  function getCache(key: Exclude<Keys, 'userInfo'>): string;
  function getCache(key: 'userInfo'): TUserInfo;
  function getCache(key: Keys): TGetCache {
    return toRaw(useLocalStorage(key, defCache[key]).value);
  }
  // 2.设置cache
  function setCache(key: 'token', value: string): void;
  function setCache(key: 'theme', value: ThemeUnion): void;
  function setCache(key: 'userInfo', value: TUserInfo): void;
  function setCache(key: Keys, value: any) {
    useLocalStorage(key, defCache[key]).value = value;
  }
  // 3.移除cache
  function removeCache(key: Keys) {
    useLocalStorage(key, defCache[key]).value = null;
  }
  // 4.清除所有cache
  function clearCache() {
    localStorage.clear();
  }
  return { getCache, setCache, removeCache, clearCache };
}
