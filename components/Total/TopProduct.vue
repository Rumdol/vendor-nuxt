<script setup>
import { ref, onMounted, defineProps } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

const tableData = ref([]);

const fetchProducts = async () => {
  try {
    // Bind the data prop to tableData
    tableData.value = props.data;
  } catch (error) {
    console.log('Failed to fetch dashboardData', error);
  }
};

onMounted(fetchProducts);
</script>

<template>
  <div class="flex-row rounded-md border w-[700px] h-[400px] p-[20px] m-4">
    <div class="font-bold text-xl mb-4">
      Top Product
    </div>
    <div>
      <el-table
        :data="tableData"
        ref="multipleTableRef"
        class="max-w-lg"
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="Product Name" width="400" />
        <el-table-column prop="total" label="Total" width="120" />
      </el-table>
    </div>
  </div>
</template>
