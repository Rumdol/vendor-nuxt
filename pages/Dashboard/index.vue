<template>
  <div class="dashboard-container ">
    <div class="total-list flex ">
      <ul class="flex gap-[50px] ml-[5px]">
        <li>
          <TotalOrder :total="dashboardStore.dashboard.total_users"/>
        </li>

        <li>
          <TotalProducts :total="dashboardStore.dashboard.total_products"/>
        </li>
        <li>
          <TotalRevenue :total="dashboardStore.dashboard.total_revenue"/>
        </li>
      </ul>
    </div>
    <div class="flex gap-3">
      <TotalSaleCharts v-if="dashboardStore.dashboard.revenue_per_month" :revenue="dashboardStore.dashboard.revenue_per_month"/>
      <TotalTopPrduct v-if="dashboardStore.dashboard.top_products" :data="dashboardStore.dashboard.top_products"/>
    </div>
  </div>
</template>

<script setup>
import {onMounted } from 'vue';
import { useDashboardStore } from '~/store/dashboard.js';

useSeoMeta({
  titleTemplate: (title) => (title ? `${title} - Rumdul` : 'Rumdul'),
});
definePageMeta({
  middleware: ['authenticated'],
});

//init the store
const dashboardStore = useDashboardStore();

const fetchDashboard = async () => {
  try{
    await dashboardStore.getDashboard();
    console.log('Dashboard data loaded successfully.');
  }catch(error){
    console.log('Failed to fetch dashboardData',error);
  }
}


// Fetch data on component mount
onMounted(fetchDashboard);
</script>
<style scoped>
:root{
  font-family: Inter, sans-serif;
}
</style>
