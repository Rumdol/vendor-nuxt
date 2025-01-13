<template>
  <div class="h-[400px] w-[800px] rounded-md shadow p-[20px] m-4">
    <h1><strong>Order Range</strong></h1>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue';
import Chart from 'chart.js/auto';

// Define props with a default value to avoid undefined or null issues
const props = defineProps({
  order: {
    type: Object,
    required: false,
    default: () => ({})
  },
});

onMounted(() => {
  // Check if the revenue prop contains valid data
  if (!props.order || Object.keys(props.order).length === 0) {
    console.warn('Revenue data is empty or not provided.');
    return;
  }

  // Extract labels (months) and data (values) from the revenue prop
  const labels = Object.keys(props.order);
  const chartData = Object.values(props.order).map(value => parseFloat(value));

  // Chart.js configuration
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Total order per month',
        data: chartData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  // Initialize the Chart.js chart
  const ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, config);
});
</script>
