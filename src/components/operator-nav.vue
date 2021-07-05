<!--
 * @Author: your name
 * @Date: 2021-06-18 14:13:39
 * @LastEditTime: 2021-06-18 20:03:47
 * @LastEditors: sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \vue-dom1\src\components\operator-nav.vue
-->
  /**
  * @name: 
  * @test: test font
  * @msg: 
  * @param {*}
  * @return {*}
  */
/* 
  法律反馈侧边栏
 */

<template>
  <ul class="operator-nav">
    <li class="operator-nav-li">
      <i class="operator-nav-li-i el-icon-chat-dot-round"></i>
      反馈
    </li>
    <li class="operator-nav-li">
      <i class="operator-nav-li-i el-icon-chat-dot-round"></i>
      我的收藏
    </li>
    <li class="operator-nav-li">
      <i class="operator-nav-li-i el-icon-chat-dot-round"></i>
      点击排行
    </li>
  </ul>
</template>

<script>
export default {};
</script>

<style lang="less" scope>
.operator-nav {
  width: 46px;
  box-shadow: 0 0 10px rgb(0 0 0 / 10%);
  background: #fff;
  border-radius: 2px;
  // padding: 10px 6px;
  color: #637381;
  position: fixed;
  right: 20px;
  top: 40%;
  .operator-nav-li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 12px;
    border-bottom: 1px solid #eeeeee;
    padding: 10px 6px;
    cursor: pointer;
    .operator-nav-li-i {
      font-size: 18px;
      margin-bottom: 6px;
    }
  }
  .operator-nav-li:hover {
    color: #fff;
    background-color: #5077aa;
  }
  .operator-nav-li:nth-last-child(1) {
    border-bottom: none;
  }
}
</style>