<script setup>
import { getCurrentInstance, reactive, ref } from "vue";
import md5 from "js-md5";
import VueCookies from "vue-cookies";
import { useRouter } from "vue-router";

const { proxy } = getCurrentInstance();
const router = useRouter();
const formData = reactive({});
const api = {
  checkCode: "wqzae",
  login: "login",
};
const checkCodeUrl = ref(api.checkCode);

//更改验证码
const changeCheckCode = () => {
  checkCodeUrl.value = api.checkCode + "?" + new Date().getTime();
};
//表单相关
const formDataRef = ref(null);
const rules = {
  account: [
    {
      required: true,
      message: "请输入用户名",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
    },
  ],
  checkCode: [
    {
      required: true,
      message: "请输入验证码",
    },
  ],
};
//初始化登录界面获取cookie
const init = () => {
  const loginInfo = VueCookies.get("loginInfo");
  if (!loginInfo) {
    return;
  }
  Object.assign(formData);
};
init();
const login = () => {
  //简易验证登录功能
  if (
    formData.account === "admin" &&
    formData.password === "123" &&
    formData.checkCode === api.checkCode
  ) {
    proxy.message.success("登录成功！");
    setTimeout(() => {
      router.push("/home");
    }, 1500);
  }
  /* formDataRef.value.validate(async (valid) => {
     if (!valid) {
       return;
     }
     let cookieLoginInfo = VueCookies.get("loginInfo")
     let cookiePassworld = cookieLoginInfo == null ? null : cookieLoginInfo.password
     if (formData.password !== cookiePassworld) {
       formData.password = md5(formData.password)
     }
     let params = {
       account: formData.account,
       password: md5(formData.password),
       checkCode: formData.checkCode
     }
     let result = await proxy.Request({
       url: "localhos:5173",
       params: params,
       errorCallback: () => {
         changeCheckCode();
       }
     })
     /*proxy.message.success("登录成功！");
 
     setTimeout(()=>{
       router.push("/home");
     },1500);*!/
     const loginInfo = {
       account: params.account,
       password: md5(params.password),
       rememberMe: formData.rememberMe
     };
     VueCookies.set("usrInfo", loginInfo, 0);
     if (formData.rememberMe) {
       VueCookies.set("loginInfo", loginInfo, "7d")
     }
   });*/
};
</script>

<template>
  <div class="login-body">
    <div class="login-panel">
      <div class="login-title">用户登录</div>
      <el-form :model="formData" :rules="rules" ref="formDataRef">
        <el-form-item prop="account">
          <el-input placeholder="请输入账号" v-model="formData.account">
            <template #prefix>
              <span class="iconfont icon-zhanghao"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" v-model="formData.password">
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkCode">
          <div class="check-code-panel">
            <el-input
              placeholder="请输入验证码"
              v-model="formData.checkCode"
              class="input-panel"
              @keyup.enter.native="login"
            />
            <img src="../assets/login-checkCode.jpg" class="check-code" />
          </div>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox v-model="formData.rememberMe" :label="true">
            记住我
          </el-checkbox>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" :style="{ width: '100%' }" @click="login"
            >登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.login-body {
  width: 100%;
  height: calc(160vh);
  background-size: cover;
  background-position: center;
  background-image: url(../assets/login-bg.png);
}

.login-panel {
  width: 350px;
  float: right;
  padding: 10px;
  margin-top: 25%;
  margin-right: 37%;
  border-radius: 5px;
  box-shadow: 2px 2px 10px #ddd;
  background: #ffffff;
  background-color: rgba(255, 255, 255, 0.6);

  .login-title {
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
  }
}

.check-code-panel {
  display: flex;

  .input-panel {
    flex: 1;
    width: 245px;
    margin-right: 5px;
  }

  .check-code {
    height: 30px;
    cursor: pointer;
    border-radius: 5px;
  }
}
</style>