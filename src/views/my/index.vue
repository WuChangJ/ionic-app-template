<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>我的</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">我的</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="my-content">
        <ion-button expand="block" @click="goToSafetyCenter">去往安全中心页面</ion-button>
        <ion-button expand="block" color="danger" @click="logout">退出登录</ion-button>
        {{ num }}
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, alertController } from '@ionic/vue';
import { ref } from 'vue';
import { useAppRouter } from '@/router/useAppRouter';

const { push, replace } = useAppRouter();

const num = ref(1);

const goToSafetyCenter = () => {
  num.value++;
  push('/safetyCenter');
};

const logout = async () => {
  num.value++;
  const alert = await alertController.create({
    header: '确认退出',
    message: '确定要退出登录吗？',
    buttons: [
      { text: '取消', role: 'cancel' },
      {
        text: '确定',
        handler: () => {
          replace('/tabs/home');
        }
      }
    ]
  });
  await alert.present();
};
</script>

<style scoped>
.my-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
