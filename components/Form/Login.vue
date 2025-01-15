<template>
  <div
    class="content"
  >
    <div class="">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>

      <el-form
        class="form-control"
        :model="loginForm"
        :rules="rules"
        ref="loginFormRef"
        label-position="top"
        @submit.prevent="handleLogin"
      >
        <el-form-item label="Email" prop="email">
          <el-input
            v-model="loginForm.email"
            type="email"
            placeholder="Enter your email"
          ></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="Enter your password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="button w-full" @click="handleLogin"
          >Login
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '~/store/auth.js'

useSeoMeta({ title: 'Rumdul | Sign In' })

const authStore = useAuthStore()

const loginForm = reactive({
  email: '',
  password: '',
  rememberMe: false,
})

const rules = {
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' },
    {
      type: 'email',
      message: 'Please enter a valid email address',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' },
    {
      min: 6,
      message: 'Password must be at least 6 characters',
      trigger: 'blur',
    },
  ],
}

const loginFormRef = ref(null)

const handleLogin = async () => {
  loginFormRef.value.validate(async (valid) => {
    if (valid) {
      await authStore.login({
        email: loginForm.email,
        password: loginForm.password,
      })
      navigateTo('dashboard')
      ElMessage.success('Login successful')
    } else {
      ElMessage.error('Please fill in the form correctly')
    }
  })
}

</script>

<style scoped lang="scss">
.content{
  font-family: Inter, sans-serif;
}
.button{
  display: flex;
  justify-content: center;
  justify-items: center ;
  align-items: center;
}
span{
  display: flex;
  justify-content: center;
  justify-items: center ;
  align-items: center;
  padding: 10px;
}
.form-control{
  height: 70px;
}

</style>
