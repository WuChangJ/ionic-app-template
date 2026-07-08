<template>
  <div class="nav-bar" :class="{ 'desktop-padding': !isMobile }">
    <div class="left">
      <div v-if="showBack" class="back ion-activatable" @click="back">
        <ion-icon :icon="chevronBackOutline"></ion-icon>
        <ion-ripple-effect></ion-ripple-effect>
      </div>
    </div>
    <div class="title">
      <slot></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonIcon, IonRippleEffect, getPlatforms } from "@ionic/vue";
import { chevronBackOutline } from "ionicons/icons";
import { computed } from "vue";

// 检测是否为移动设备
const isMobile = computed(() => {
  const platforms = getPlatforms();
  return (
    platforms.includes("mobile") ||
    platforms.includes("android") ||
    platforms.includes("ios")
  );
});

defineProps({
  showBack: {
    type: Boolean,
    default: true,
  },
});

const back = () => {

};
</script>
<style scoped lang="less">
.nav-bar {
  background: #141825;
  display: flex;
  align-items: center;
  gap: 0px;
  position: relative;

  // 桌面端设置状态栏高度
  &.desktop-padding {
    padding-top: var(--status-bar-height, env(safe-area-inset-top, 0));
  }

  .left {
    width: 50px;
    padding-left: 5px;
  }

  .back {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    width: 30px;
    height: 20px;
    position: relative;
    overflow: hidden;

    ion-icon {
      color: #fff;
      font-size: 18px;
    }

    left: 0;
    cursor: pointer;
  }

  .right {
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: end;
    height: 46px;
    right: 0;
  }

  .title {
    flex: 1;
    text-align: center;
    line-height: 46px;
    font-size: 16px;
    font-weight: bold;
    color: @text-color-white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    /* 确保max-width生效 */
  }
}
</style>
