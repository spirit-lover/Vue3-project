<script setup>
import {getCurrentInstance, reactive, ref} from "vue";
const {proxy}=getCurrentInstance();
const formData = reactive({});

const formDataRef = ref(null);
const rules = {
  account: [
    {
      required: true,
      message: "请输入用户名",
    },
  ],
};

const login = () => {
  formDataRef.value.validate(async (valid) => {
    if (!valid) {
      return;
    }
    let result=await proxy.Request({

    })
  });
};
</script>

<template>
  <div class="login-body">
    <div class="login-panel">
      <div class="login-title">用户登录</div>
      <el-form :model="formData"
               :rules="rules"
               ref="formDataRef">
        <el-form-item prop="account">
          <el-input placeholder="请输入账号"
                    v-model="formData.account">
            <template #prefix>
              <span class="iconfont icon-zhanghao"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码"
                    v-model="formData.password">
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkcode">
          <div class="check-code-panel">
            <el-input
              placeholder="请输入验证码"
              v-model="formData.checkcode"
              class="input-panel"
            />
            <img src="../assets/login-checkCode.jpg" class="check-code" />
          </div>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox v-model="formData.rememberMe"
                       :label="true">
            记住我
          </el-checkbox>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary"
                     :style="{ width: '100%' }"
                     @click="login"
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
