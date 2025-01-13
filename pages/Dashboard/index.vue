<template>
  <div class="dashboard-container">
    <div class="total-list flex">
      <ul class="flex gap-[50px] ml-[5px]">
        <li>
          <TotalOrder :total="dashboardStore.dashboard.total_order"/>
        </li>
        <li>
          <TotalProducts :total="dashboardStore.dashboard.total_product"/>
        </li>
        <li>
          <TotalRevenue :total="dashboardStore.dashboard.total_revenue"/>
        </li>
      </ul>
    </div>
    <div class="flex gap-3">
      <TotalSaleCharts v-if="dashboardStore.dashboard.order_chart" :order="dashboardStore.dashboard.order_chart"/>
      <TotalTopProduct v-if="dashboardStore.dashboard.top_product" :data="dashboardStore.dashboard.top_product"/>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useDashboardStore } from '~/store/dashboard.js';

useSeoMeta({
  titleTemplate: (title) => (title ? `${title} - Rumdul` : 'Rumdul'),
});

definePageMeta({
  middleware: ['authenticated'],
});

const dashboardStore = useDashboardStore();

const fetchDashboard = async () => {
  try {
    await dashboardStore.getDashboard();
    // Add success message if needed
    console.log('Dashboard data loaded successfully.');
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
  }
};

onMounted(fetchDashboard);
</script>

<style scoped>
:root {
  font-family: Inter, sans-serif;
}
</style>
