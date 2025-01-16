<script setup>
const username = 'Yong';
const email = 'yong@gmail.com';
</script>

<template>
  <header class="">
    <div class="top-bar h-16 items-center top-0 border-b bg-background/80 backdrop-blur flex justify-end pr-[100px]">
      <div class="flex items-center gap-5">
        <button class="flex h-9 w-9  items-center justify-center rounded-full border bg-amber-50">
          <i class="fa-solid fa-bell"></i>
        </button>
        <!--Profile-->
        <div class="flex items-center gap-2">
          <Button class="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-amber-50">
            <img src="@/assets/image/profile.jpg" alt="profile login" class="loginProfile w-full h-full ">
          </Button>
          <div class="flex flex-col items-start">
            <h1><strong>{{username}}</strong></h1>
            <span>{{email}}</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.search:focus{
  border-color: #3182ce;
  outline: none;
}
.top-bar{
  box-shadow: 0 4px 8px 0 rgba(58, 53, 65, 0.1);
  width: 1620px;
  .search{
    width: 500px;
    border-radius: 10px;
    margin-left: 500px;
    margin-right: 100px;

  }
}

</style>
