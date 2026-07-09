<template>
  <ion-page>
    <ion-header>
      <nav-bar>修改登录密码</nav-bar>
    </ion-header>
    <ion-content>
      <ion-list :inset="true">
        <ion-item>
          <ion-input label="旧密码" type="password" placeholder="请输入旧密码" />
        </ion-item>
        <ion-item>
          <ion-input label="新密码" type="password" placeholder="请输入新密码" />
        </ion-item>
        <ion-item>
          <ion-input label="确认密码" type="password" placeholder="请再次输入新密码" />
        </ion-item>
      </ion-list>
      <div class="form-actions">
        <ion-button expand="block" @click="submit">确认修改</ion-button>
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
    message: '密码修改成功',
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
