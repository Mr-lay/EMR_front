<template>
  <el-container class="container">
    <el-header>
      <Header></Header>
    </el-header>
    <el-divider></el-divider>
    <el-container>
      <el-aside class="aside" width="200px">
        <AsideMenu></AsideMenu>
      </el-aside>
      <el-main class="main">
        <Breadcrumb ></Breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Header from "../common/Header.vue";
import AsideMenu from "../common/AsideMenu.vue";
import Breadcrumb from "../common/Breadcrumb.vue"
import router from "../router.js"
import {onMounted} from "vue";

onMounted(()=>{
  router.push('/patient')
})

</script>

<style scoped>
.container{
  height: 98vh;
  width: 98vw;
}


.main{
  /*background-color: aqua;*/
}
</style>