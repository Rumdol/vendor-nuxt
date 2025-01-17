<script setup>
import { ref } from "vue";
import { useRouter } from "nuxt/app";
import { useAuthStore } from '~/store/auth.js';
import { useCookies } from 'vue3-cookies'
defineProps({
  isLogin: Boolean,
});
const { cookies } = useCookies()
const searchQuery = ref("");
const router = useRouter();
const authStore = useAuthStore();
const user = ref(null);

const search = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: "/products",
      query: { title: searchQuery.value },
    });
  }
};

onMounted(async () => {
  const token = cookies.get('access_token')
  if (!token) {
    return
  }
  try {
    user.value = await authStore.getProfile(); // Fetch user data or use cached data
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
});
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
            <router-link to="/Setting" v-if="user" class="flex flex-row items-center gap-3">
              <img
                :src="user.image"
                alt="Profile Image"
                class="w-10 h-10 rounded-full object-cover"
              />
              <span>{{ user.email}}</span>
          </router-link>
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
