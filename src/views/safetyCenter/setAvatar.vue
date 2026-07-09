<template>
  <ion-page>
    <ion-header>
      <nav-bar>设置头像</nav-bar>
    </ion-header>
    <ion-content>
      <div class="avatar-preview">
        <ion-avatar>
          <img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="头像" />
        </ion-avatar>
        <p>当前头像</p>
      </div>
      <ion-list :inset="true">
        <ion-item button @click="takePhoto">
          <ion-icon :icon="camera" slot="start" color="primary" />
          <ion-label>拍照</ion-label>
        </ion-item>
        <ion-item button @click="pickFromAlbum">
          <ion-icon :icon="images" slot="start" color="primary" />
          <ion-label>从相册选择</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonContent, IonList, IonItem, IonLabel, IonIcon, IonAvatar, toastController } from '@ionic/vue';
import { camera, images } from 'ionicons/icons';
import NavBar from '@/layout/navBar.vue';

const takePhoto = async () => {
  const toast = await toastController.create({
    message: '拍照功能开发中',
    duration: 1500,
  });
  await toast.present();
};

const pickFromAlbum = async () => {
  const toast = await toastController.create({
    message: '相册功能开发中',
    duration: 1500,
  });
  await toast.present();
};
</script>

<style scoped>
.avatar-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0 16px;
}
.avatar-preview ion-avatar {
  width: 80px;
  height: 80px;
  margin-bottom: 8px;
}
.avatar-preview p {
  color: var(--ion-color-medium);
  font-size: 14px;
}
</style>
