<template>
  <div class="page 404">
    <h1>Error 404</h1>
  </div>
</template>

<script>
  export default {
    name: 'PageNotFound',
    metaInfo: {
      title: '404 - Page not found',
    },
    data() {
      return {
        title: 'Error 404',
      };
    },
    head: {
      title() {
        return {
          inner: this.title,
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
  h1, h2 {
    font-weight: normal;
  }
</style>
