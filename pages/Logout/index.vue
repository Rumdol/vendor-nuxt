<script setup>
import {useAuthStore} from '~/store/auth.js'

definePageMeta({
  middleware: ['authenticated'],
})
const authStore = useAuthStore()
const {logout} = useAuthStore()

const handleLogout = async () => {
  await logout()
  navigateTo('./login')
}

// Confirm logout function
const confirmLogout = () => {
  // Show confirmation dialog
  ElMessageBox.confirm(
    'Are you sure you want to log out?',
    'Confirm Logout',
    {
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      // If confirmed, call the handleLogout function
      handleLogout();
    })
    .catch((error) => {
      if (error !== 'cancel') {
        ElMessage.error('Error while confirming logout: ' + error.message);
        console.error('Error while confirming logout:', error);
      } else {
        ElMessage.info('Logout cancelled');
      }
    });
};
</script>

<template>
  <div class="w-[1000px] h-[500px] shadow border-b-blue-200 flex flex-col justify-center items-center">
    <h1 class="text-3xl pb-[100px]">Are you sure to Log Out your account?</h1>
    <button class="bg-primary p-3 rounded text-lg hover:bg-opacity-50 active:bg-opacity-100" @click="confirmLogout">Logout</button>
  </div>
</template>

<style scoped lang="scss">
.icon{
  width: 300px;
  height: 300px;
}
</style>
