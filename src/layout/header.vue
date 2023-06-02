<template>
  <div class="header-container">
    <div class="content">
      <el-icon :size="24" @click="emits('update:isCollapse', !isCollapse)">
        <icon-ep:fold v-if="!isCollapse" />
        <icon-ep:expand v-else />
      </el-icon>
      <el-breadcrumb separator="/">
        <template v-for="(item, index) in breadcrumbs" :key="item.path">
          <el-breadcrumb-item :to="{ path: item.path }" v-if="index !== breadcrumbs.length - 1">
            {{ item.title }}
          </el-breadcrumb-item>
          <el-breadcrumb-item v-else>{{ item.title }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <el-dropdown @command="handleCommand">
      <span class="outline-none">
        <el-image :src="require('../assets/images/avatar.png')"></el-image>
        <span class="username">{{ userInfo.username }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="logout">
            <icon-ep:switch-button style="margin-right: 4px" />
            登出
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { useLocalCache } from '@/hooks';

defineProps<{ isCollapse?: boolean }>();
const emits = defineEmits(['update:isCollapse']);

const { clearCache } = useLocalCache();
const route = useRoute();
const router = useRouter();
const layoutRoutes = computed(
  () => router.getRoutes().find((item) => item.name === 'layout')?.children
);
const breadcrumbs = computed(() => {
  const breadcrumbArr: Array<{ path: string; title: string }> = [];
  const findBreadcrumb = (
    routes: Array<RouteRecordRaw>,
    parentRoute: RouteRecordRaw | null = null
  ) => {
    for (let index = 0; index < routes.length; index++) {
      const item = routes[index];
      if (item.path === route.path && item.meta?.title) {
        parentRoute &&
          parentRoute.meta &&
          breadcrumbArr.push({
            title: parentRoute!.meta.title as string,
            path: parentRoute.path,
          });
        breadcrumbArr.push({
          title: item.meta.title as string,
          path: item.path,
        });
        break;
      } else if (item.children && item.children.length > 0) {
        findBreadcrumb(item.children, item);
      }
    }
  };
  layoutRoutes.value && findBreadcrumb(layoutRoutes.value);
  return breadcrumbArr;
});
const { userInfo } = storeToRefs(useStore().user);

const handleCommand = (command: string) => {
  if (command === 'logout') {
    console.log(1111);
    clearCache();
    window.location.reload();
  }
};
</script>

<style lang="scss" scoped>
.header-container {
  @include flex(center, space-between);
  height: 100%;
  .content {
    @include flex(center, center, center);
    .el-icon {
      cursor: pointer;
      margin-right: 14px;
    }
  }
  .outline-none {
    @include flex(center, center, center);
    outline: none;
  }
  .el-image {
    @include wh(40px, 40px);
    border-radius: 50%;
  }
  .username {
    margin-left: 4px;
  }
}
</style>
