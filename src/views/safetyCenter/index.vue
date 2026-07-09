<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>安全中心</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">安全中心</ion-title>
        </ion-toolbar>
      </ion-header>
      <div>修改登录密码</div>
      <div>设置头像</div>
      <div>修改昵称</div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
</script>
