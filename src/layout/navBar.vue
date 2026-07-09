<template>
  <div class="nav-bar" :class="{ 'desktop-padding': !isMobile }">
    <div class="left">
      <div
        v-if="showBack"
        class="back ion-activatable"
        role="button"
        :aria-label="backAriaLabel"
        @click="handleBack"
      >
        <ion-icon :icon="chevronBackOutline" />
        <ion-ripple-effect />
      </div>
    </div>
    <div class="title">
      <slot />
    </div>
    <div class="right">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonIcon, IonRippleEffect, getPlatforms } from '@ionic/vue';
import { chevronBackOutline } from 'ionicons/icons';
import { computed } from 'vue';
import { useAppRouter } from '@/router/useAppRouter';

const props = defineProps({
  showBack: {
    type: Boolean,
    default: true,
  },
  /** 返回按钮的无障碍标签 */
  backAriaLabel: {
    type: String,
    default: '返回',
  },
  /** 浏览器历史栈为空时的回退路由 */
  fallbackRoute: {
    type: String,
    default: '/tabs/home',
  },
  /** 显式指定返回路由（用 replace 跳转），解决跨 outlet 时 router.back() 只改 URL 不切视图的问题 */
  backRoute: {
    type: String,
    default: '',
  },
});

const emit = defineEmits<{
  back: [];
}>();

const { replace: routerReplace, back: routerBack } = useAppRouter();

// 检测是否为移动设备
const isMobile = computed(() => {
  const platforms = getPlatforms();
  return (
    platforms.includes('mobile') ||
    platforms.includes('android') ||
    platforms.includes('ios')
  );
});

const handleBack = () => {
  emit('back');

  if (props.backRoute) {
    routerReplace(props.backRoute);
    return;
  }

  routerBack(props.fallbackRoute);
};
</script>

<style scoped>
.nav-bar {
  --nav-bar-height: 46px;
  --nav-bar-bg: #141825;
  --nav-bar-text-color: #ffffff;

  display: flex;
  align-items: center;
  height: var(--nav-bar-height);
  background: var(--nav-bar-bg);
  position: relative;
}

/* 桌面端增加状态栏高度 */
.nav-bar.desktop-padding {
  padding-top: var(--status-bar-height, env(safe-area-inset-top, 0));
  height: calc(var(--nav-bar-height) + var(--status-bar-height, env(safe-area-inset-top, 0px)));
}

.left {
  width: 50px;
  padding-left: 5px;
  display: flex;
  align-items: center;
}

.back {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: 34px;
  height: 34px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.back ion-icon {
  color: var(--nav-bar-text-color);
  font-size: 20px;
}

.right {
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: var(--nav-bar-height);
}

.title {
  flex: 1;
  text-align: center;
  line-height: var(--nav-bar-height);
  font-size: 16px;
  font-weight: bold;
  color: var(--nav-bar-text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
