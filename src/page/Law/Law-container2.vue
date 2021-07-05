<template>
  <div class="contain">
    <div class="red"></div>
    <div class="green"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.contain{
  width: 300px;
  height: 200px;
  border: 1px solid #000;
  display: flex;
  .red{
    box-sizing: content-box;
    height: 100px;
    width: 100px;
    padding: 20px;
    background-color: red;
  }
  .green{
    // flex: 1;
    // width: calc(100% - 100px);
    height: 100%;
    background-color: green;
  }
}
</style>