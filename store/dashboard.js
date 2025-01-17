// stores/dashboard.js
import { defineStore } from 'pinia';
import DashboardService from '~/services/DashboardService.js'; // Correctly import the service

export const useDashboardStore = defineStore('dashboard', () => {
  const dashboard = ref({});

  // Create an instance of the service
  const dashboardService = new DashboardService();

  // Action to fetch dashboard data
  const getDashboard = async (params = {}) => {
    try {
      const { data } = await dashboardService.getDashboard(params); // Call the service method
      dashboard.value = data || {}; // Store the response data in the state
    } catch (error) {
      ElMessage.error('Failed to get dashboard');
      throw new Error(`Failed to get dashboard: ${error.message || 'Unknown error'}`);
    }
  };

  return {
    dashboard: computed(() => dashboard.value), // Expose the dashboard state
    getDashboard, // Expose the getDashboard action
  };
});
