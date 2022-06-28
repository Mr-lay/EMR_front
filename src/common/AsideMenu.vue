<template>
  <el-menu class="aside-menu" :collaspa="true" :router="true"
           active-text-color="#ffd04b" :default-active="$route.path">
    <el-menu-item index="/patient" :router="{path: '/patient'}">
      <el-icon><Edit></Edit></el-icon>
      <template #title>病历管理</template>
    </el-menu-item>
    <el-menu-item index="/setting" :router="{path:'/setting'}">
      <el-icon><setting></setting></el-icon>
      <template #title>设置</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import {BellFilled, ChatRound, Edit, HomeFilled, Setting, UserFilled, House, Avatar} from "@element-plus/icons-vue";

</script>

<style scoped>
.aside{
}

.aside .aside-menu{
  height: 100%;
}
</style>