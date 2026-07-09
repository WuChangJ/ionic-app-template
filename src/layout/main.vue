<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon aria-hidden="true" :icon="home" />
          <ion-label>首页</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="goods" href="/tabs/goods">
          <ion-icon aria-hidden="true" :icon="bag" />
          <ion-label>商品</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="my" href="/tabs/my">
          <ion-icon aria-hidden="true" :icon="person" />
          <ion-label>我的</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { home, bag, person } from 'ionicons/icons';
</script>
