<script setup>

</script>

<template>
  <div>
    <h1 class="text-3xl mb-4">Single Product</h1>
    <div class="flex justify-between align-center items-center">
      <div class="relative w-full max-w-sm">
        <!-- Input Box -->
        <input
          type="text"
          placeholder="Search Product by name"
          class="w-full p-3 pr-10 border rounded-md focus:outline-none"
        />
        <i
          class="fa-solid fa-magnifying-glass absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        ></i>
      </div>
      <button class="bg-primary p-3 rounded hover:opacity-50 active:opacity-100" @click="navigateTo('/singleProduct/create')">Create Compound</button>
    </div>
    <div class="border border-gray-200 mt-1.5 rounded">
      <el-table :data="singleProduct" >
        <el-table-column prop="product_code" label="Product code" width="200" />
        <el-table-column label="Image" width="200">
          <template slot-scope="scope">
            <el-image :src="scope.row.imageUrl"  />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Title" width="300" />
        <el-table-column prop="name" label="Category" width="200" />
        <el-table-column prop="name" label="Price" width="200" />
        <el-table-column prop="name" label="Date" width="200" />
        <el-table-column prop="name" label="Status" width="280" />
        <el-button>
          <i class="fa-solid fa-pen-to-square"></i>
        </el-button>
        <el-button>
          <i class="fa-regular fa-trash"></i>
        </el-button>
      </el-table>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
