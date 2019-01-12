<template>
  <div class="page dashboard">
    <div>Dashboard</div>
    <signout/>
    <transition name="el-fade-in-linear">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  /**
   * Import Component
   */
  import Signout from '../../components/buttons/Signout.vue';

  /**
   * Export
   */
  export default {
    name: 'Dashboard',
    metaInfo: {
      title: 'Dashboard',
    },
    components: {
      signout: Signout,
    },
    data() {
      return {};
    },
  };
</script>
