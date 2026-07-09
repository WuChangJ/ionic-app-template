<template>
  <ion-page>
    <ion-header>
      <nav-bar>安全中心</nav-bar>
    </ion-header>
    <ion-content>
      <ion-list :inset="true">
<ion-item button @click="push('/safetyCenter/changePassword')">
      <ion-label>修改登录密码</ion-label>
      <ion-icon :icon="chevronForward" slot="end" color="medium" />
    </ion-item>
    <ion-item button @click="push('/safetyCenter/setAvatar')">
      <ion-label>设置头像</ion-label>
      <ion-icon :icon="chevronForward" slot="end" color="medium" />
    </ion-item>
    <ion-item button @click="push('/safetyCenter/changeNickname')">
          <ion-label>修改昵称</ion-label>
          <ion-icon :icon="chevronForward" slot="end" color="medium" />
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/vue';
import { chevronForward } from 'ionicons/icons';
import NavBar from '@/layout/navBar.vue';
import { useAppRouter } from '@/router/useAppRouter';

const { push } = useAppRouter();
</script>
