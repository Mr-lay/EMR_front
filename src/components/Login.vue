<template>
  <el-container class="container">
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-main class="main">
        <div class="steps">
          <el-steps :active="steps" finish-status="success" align-center>
            <el-step title="登录"/>
            <el-step title="上传密钥"/>
            <el-step title="成功"/>
          </el-steps>
        </div>
        <div class="pane-container">
          <div class="pane-main">
            <div class="pane-center center-container">
              <template v-if="steps===0">
                <el-row :gutter="20" class="row-input">
                  <el-col class="center-container" :span="6">
                    <div>
                      <span>用户名</span>
                    </div>
                  </el-col>
                  <el-col :span="18">
                    <el-input v-model="username"
                              placeholder="Please input username" ></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="row-input">
                  <el-col class="center-container" :span="6">
                    <div>
                      <span>密码</span>
                    </div>
                  </el-col>
                  <el-col :span="18">
                    <el-input v-model="password"
                              type="password"
                              placeholder="Please input password"
                              show-password></el-input>
                  </el-col>
                </el-row>
              </template>
              <template v-else-if="steps===1">
                <div class="center-container">
                  <div>
                    <span>上传密钥凭证</span>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="center-container">
                  <div>
                    <span>完成</span>
                  </div>
                </div>
              </template>
            </div>
            <div class="pane-footer">
              <template v-if="steps===0">
                <el-button class="pane-button" type="primary" @click="login">
                  登录
                </el-button>
              </template>
              <template v-else-if="steps===1">
                <el-button class="pane-button" type="primary" @click="upload">
                  上传
                </el-button>
                <el-button class="pane-button" type="primary" @click="lastStep">
                  上一步
                </el-button>
              </template>
              <template v-else>
                <el-button class="pane-button" type="primary" @click="finish">
                  进入
                </el-button>
                <el-button class="pane-button" type="primary" @click="lastStep">
                  上一步
                </el-button>

              </template>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Header from "../common/Header.vue";
import {http} from '../js/back_post.js'
import {ref} from 'vue'
import axios from "axios";
import VueAxios from "vue-axios";
import {ElMessage} from 'element-plus'
import store from '../store.js'
import router from "../router.js"


const steps = ref(0)
const username = ref('lxl')
const password = ref('123')

function login() {
  http.post('/api/login',{
    'user_name':username.value,
    'password':password.value
  }).then((response)=>{
    if(response.code==='200'){
      steps.value = 1
      ElMessage({
        type: 'success',
        message: response.msg,
        showClose: true
      })
    }else {
      ElMessage({
        type: 'warning',
        message: response.msg,
        showClose: true
      })
    }
  })
}

function lastStep(){
  if(steps.value-- <0) steps.value=0
}

function upload() {
  steps.value = 2
  ElMessage({
    type: 'success',
    message: '上传成功',
    showClose: true
  })
}

function finish(){
  store.dispatch('loginStatus',{'isLogin':true}).then(()=>{
    store.dispatch('updateUserData',{
      'userData':{
        'user_name':username.value,
        'password':password.value
      }}).then(()=>{
      router.push('/patient')
    })
  })
}
</script>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  height: 98vh;
  width: 98vw;
}

.main {
  position: relative;
  width: 100%;
  height: 100%;
}

.steps {
  position: absolute;
  width: 800px;
  height: 200px;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.pane-container {
  position: absolute;
  width: 500px;
  height: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*background-color: rgba(37, 161, 231, 0.76);*/
}

.pane-center {
  position: relative;
  width: 100%;
  height: 100%;
}

.pane-center {
  position: absolute;
  width: 400px;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*background-color: rgb(49, 192, 192);*/
  flex-direction: column;
}

.pane-footer {
  position: absolute;
  width: 400px;
  height: 50px;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*background-color: rgb(156, 49, 192);*/
}

.pane-button {
  float: right;
  width: 100px;
  height: 40px;
  margin: 10px;
}

.row-input{
  margin: 20px 40px;
  width: 400px;
}
</style>