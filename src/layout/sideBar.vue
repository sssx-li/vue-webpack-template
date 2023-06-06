<template>
  <el-menu
    :collapse="isCollapse"
    width="250px"
    :default-active="defaultActive"
    background-color="#545c64"
    text-color="#b7bdc3"
    router
  >
    <div class="icon">
      <el-icon :size="isCollapse ? 30 : 40">
        <icon-sy-vue />
      </el-icon>
    </div>
    <MenuItem :routes="routes" v-if="routes" />
  </el-menu>
</template>

<script setup lang="ts">
import MenuItem from './menuItem.vue';

defineProps<{ isCollapse?: boolean }>();

const route = useRoute();
const router = useRouter();

const routes = computed(() => {
  function _noHidden(_routes: RouteRecordRaw[]) {
    const filterRoute: RouteRecordRaw[] = [];
    _routes.forEach((_route) => {
      if (!_route?.meta?.isHidden) {
        if (!_route.children || _route.children.length === 0) {
          filterRoute.push(_route);
        } else {
          filterRoute.push({
            ..._route,
            children: _noHidden(_route.children)! || [],
          });
        }
      }
    });
    return filterRoute;
  }
  return _noHidden(router.getRoutes().find((item) => item.name === 'layout')!.children);
});
const defaultActive = computed(() => route.path);
</script>

<style lang="scss" scoped>
.el-menu--vertical:not(.el-menu--collapse) {
  width: 250px;
}

.el-menu {
  height: 100%;
  border-right: none;

  .icon {
    padding: 10px;
    text-align: center;
  }
}
</style>
