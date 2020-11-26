<template>
  <button class="paginate-btn" type="button">
    <slot></slot>
  </button>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>
    .paginate-btn {
        width:29px;
        height: 29px;
        background: #FFFFFF;
        border: 1px solid #C1C1C1;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
    }
</style>
