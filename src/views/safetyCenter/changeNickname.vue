<template>
  <ion-page>
    <ion-header>
      <nav-bar>修改昵称</nav-bar>
    </ion-header>
    <ion-content>
      <ion-list :inset="true">
        <ion-item>
          <ion-input label="昵称" placeholder="请输入新昵称" :maxlength="20" :counter="true" />
        </ion-item>
      </ion-list>
      <div class="form-actions">
        <ion-button expand="block" @click="submit">保存</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonContent, IonList, IonItem, IonInput, IonButton, toastController } from '@ionic/vue';
import NavBar from '@/layout/navBar.vue';
import { useAppRouter } from '@/router/useAppRouter';

const { back } = useAppRouter();

const submit = async () => {
  const toast = await toastController.create({
    message: '昵称修改成功',
    duration: 1500,
    color: 'success',
  });
  await toast.present();
  back();
};
</script>

<style scoped>
.form-actions {
  padding: 16px;
}
</style>
