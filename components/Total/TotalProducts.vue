<script setup>
import {defineProps } from 'vue'

const props = defineProps({
  total: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="total-product-container flex w-[350px] h-[100px] p-4 md-4 justify-center items-center">
    <div class="w-[200px]">
      <span><strong class="text-xl">Total Products:</strong> <br>{{total}}</span>
    </div>
    <div>
      <i class="flex fa-solid fa-basket-shopping rounded-md border ml-4 p-4  justify-center items-center text-primary"></i>
    </div>
  </div>
</template>

<style scoped lang="scss">
.total-product-container {
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
