<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>首页</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">首页</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="home-content">
        <ion-button expand="block">去往二级页面</ion-button>
        <ion-button expand="block" color="secondary" @click="switchTab('goods')">跳转到商品页</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
import { useAppRouter } from '@/router/useAppRouter';

const { switchTab } = useAppRouter();
</script>

<style scoped>
.home-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
