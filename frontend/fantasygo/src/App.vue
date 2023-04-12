<template>
  <div class="flex">
    <main class="flex flex-col w-full bg-white overflow-x-hidden overflow-y-auto mb-14 pt-10 pl-20">
      <router-view />
      <side-bar />
    </main>
  </div>
</template>

<script >
import SideBar from './components/SideBar.vue';

export default {
  components: {
    SideBar
  },
}
</script>

