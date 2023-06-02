<template>
  <div class="home-container">
    当前时间: {{ currentTime }} <br />
    <svg-icon name="logo" />
    {{ cacheUserInfo.username }} <br />
    <icon-sy-logo style="width: 18px; height: 18px" />
    <br />
    {{ userInfo.username }}
    <br />
    <input type="text" v-focus placeholder="指令测试" />
    <br />
    <div class="theme-box" ref="el">
      <div class="text">主题测试区域</div>
    </div>
    <br />
    <select placeholder="切换主题" v-model="activeTheme" @change="switchColor">
      <option v-for="theme in themeOptions" :key="theme.value" :value="theme.value">
        {{ theme.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ThemeUnion, useHandleApiRes, useLocalCache, useSwitchTheme } from '@/hooks';
import { useStore } from '@/store';

import { Login, getUserInfo } from '@/service/api';
import { IUserInfo } from '@/service/types/user';

const { userInfo } = storeToRefs(useStore().user);
const { getCache } = useLocalCache();

const currentTime = useDateFormat(useNow(), 'YYYY-MM-DD hh:mm:ss');
const cacheUserInfo = getCache('userInfo');
// 主题测试
const themeOptions: {
  value: ThemeUnion;
  label: string;
}[] = [
  { label: '默认主题', value: 'defaultTheme' },
  {
    label: '自定义主题',
    value: 'customTheme',
  },
];
const el = ref(null);
const activeTheme = ref<ThemeUnion>(getCache('theme'));
const { switchColor } = useSwitchTheme(el, activeTheme);
nextTick(() => {
  switchColor();
});

// 接口使用示例
const getInfo = async () => {
  await Login({ username: 'sssx', password: '123456' });
  const { abort } = getUserInfo();
  setTimeout(() => {
    // 取消本次请求
    abort();
  }, 300);
  const { code, data, message } = await useHandleApiRes<IUserInfo>(getUserInfo());
  userInfo.value = data;
  console.log(code, data, message);
};
if (process.env.VUE_APP_MOCK_ENV) {
  getInfo();
}
</script>

<style lang="scss" scoped>
.home-container {
  @include fvc;
  height: 100%;
  font: {
    size: 20px;
    weight: 600;
  }
  .theme-box {
    @include wh(180px, 40px);
    @include fvc;
    border: 1px solid #ccc;
    background-color: var(--sy-primary-bg-color);
    color: var(--sy-primary-title-color);
  }
}
</style>
