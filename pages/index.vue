<template>
  <div class="background">
    <img src="@/assets/image/homePage.png" alt="home page background">
  </div>
  <div  class="content">
    <div>
      <img src="@/assets/image/logo.svg" alt="logo">
    </div>
    <div>
      <span>
        The beauty of fragrance is that <br>
        it speaks to your heart and <br>
        hopefully someone else's.
      </span>
    </div>
    <div>
      <button v-on:click="navigateTo('login')">Login</button>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({ title: 'Rumdul | Home' })

definePageMeta(
  {
    layout: 'auth',
  }
)
</script>

<style scoped>
.background {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  z-index:1;
  animation: page-animation 2s;
}
.background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.content {
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  z-index: 2;
  font-family: Inter, sans-serif;


  img {
    width: 210px;
    height: 210px;
    animation: page-animation 2s;
  }

  span {
    display: block;
    color: white;
    font-size: 32px;
    text-align: center;
    padding: 20px 0 400px 1000px ;
    animation: page-animation 2s infinite;
  }

  button {
    background: none;
    border: 1px solid #00B69B;
    width: 260px;
    height: 70px;
    text-align: center;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    margin-left: 100px;
    animation: page-animation 0.6s ease-in-out;
  }

  button:active {
    opacity: 0.7;
    box-shadow: 0 4px 10px 0 #00B69B;
    animation: page-animation 2s;

  }
}

@keyframes page-animation {
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
