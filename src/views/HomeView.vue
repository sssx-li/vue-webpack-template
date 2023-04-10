<template>
  <div class="home-container">
    {{ userInfo.username }} <br />
    <icon-sy-logo style="width: 18px; height: 18px" />
    <br />
    <div>用户名: {{ user.userInfo.username }}</div>
    <br />
    <span>{{ $filters.dateFormat(Date.now()) }}</span>
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
import { ThemeUnion, useLocalCache, useSwitchTheme } from '@/hooks';
// import { ThemeUnion, useSwitchTheme, useLocalCache, useHandleApiRes } from '@/hooks';
import { useStore } from '@/store';
// import { Login, responseStatusCode } from '@/service/api';
// import { ILoginRes } from '@/service/types';

interface ITheme {
  value: ThemeUnion;
  label: string;
}

const { user } = useStore();

const { getCache, setCache } = useLocalCache();
setCache('userInfo', {
  username: 'sy',
  avatar: '',
});
const userInfo = getCache('userInfo');

// 主题测试
const themeOptions: ITheme[] = [
  { label: '默认主题', value: 'defaultTheme' },
  {
    label: '自定义主题',
    value: 'customTheme',
  },
];
const el = ref(null);
const activeTheme = ref<ThemeUnion>(getCache('theme'));
const { switchColor } = useSwitchTheme(el, activeTheme);
switchColor();
// 接口调用示例1
// Login({ password: 'admin123', username: 'sy' }).then((res) => {
//   const { code, data } = res.data.value;
//   if (code === responseStatusCode.success) {
//     console.log('data', data);
//   }
// });
// 接口调用示例2：使用useHandleApiRes
// const submit = async () => {
//   const { code, data, abort } = await useHandleApiRes<ILoginRes>(
//     Login({ password: 'admin123', username: 'sy' })
//   );
//   abort(); // 取消请求
//   if (code === responseStatusCode.success) {
//     console.log('data', data);
//   }
// };
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
