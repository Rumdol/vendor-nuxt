<script setup>
definePageMeta({
  layout: 'auth',
  middleware: ['redirect-if-authenticated']
})
</script>

<template>
  <div class="background">
    <img src="@/assets/image/login.png" alt="login background">
  </div>
  <div class="logo">
    <img src="@/assets/image/logo.svg" alt="logo">
  </div>
  <div class="login-form">
    <FormLogin/>
  </div>
</template>

<style scoped lang="scss">
.background{
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  z-index:1;
  animation: login-page-animation 1s ease-in-out ;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: login-page-animation 1s ease-in-out ;

  }
}
.logo{
  display: flex;
  position: relative;
  z-index:2;
  width: 100%;
  height: 100%;
  align-items: center;
  animation: login-page-animation 1s ease-in-out ;
}
.login-form{
  font-family: Inter, sans-serif;
  position: absolute;
  z-index:3;
  background: #ffffff;
  border: 0.5px solid #2EC4B6;
  border-radius: 10px;
  padding: 20px;
  left: 1200px;
  width: 400px;
  height: 400px;
  animation: login-page-animation 1s ;
}
@keyframes login-page-animation {
  from {
    opacity: 0;
    transform: translateZ(20px);
  }
  to {
    opacity: 1;
    transform: translateZ(0);
  }
}


</style>
