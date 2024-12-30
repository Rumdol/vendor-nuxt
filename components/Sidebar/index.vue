<script setup>

</script>

<template>
  <div class="text-black">
    <aside class="sidebar flex flex-col h-screen p-4 text-black">
      <nav>
        <ul class="space-y-2">
          <li class="flex items-center gap-3">
            <!--Logo-->
            <img src="@/assets/image/logo-v2.svg" alt="logo">
          </li>
          <li>
            <router-link to="/Dashboard" class="flex items-center p-2 rounded-md hover:bg-primary hover:bg-opacity-30 hover:text-opacity-30 active:bg-opacity-100">
              <i class="fas fa-tachometer-alt mr-2 h-4 w-4"></i> Dashboard
            </router-link>
          </li>
          <li>
            <!-- Products with Submenu -->
            <div class="group">
              <div class="flex items-center justify-between p-2 rounded-md hover:bg-primary hover:bg-opacity-30 cursor-pointer">
                <div class="flex items-center">
                  <i class="fa-solid fa-shop mr-2 h-4 w-4"></i> Products
                </div>
                <i class="fas fa-chevron-down group-hover:rotate-180 transition-transform"></i>
              </div>
              <ul class="hidden group-hover:block pl-6 mt-1 space-y-1">
                <li>
                  <router-link to="/singleProduct" class="flex items-center p-2 rounded-md hover:bg-primary hover:bg-opacity-30 active:bg-opacity-100">
                    Single Product
                  </router-link>
                </li>
                <li>
                  <router-link to="/compoundProduct" class="flex items-center p-2 rounded-md hover:bg-primary hover:bg-opacity-30 active:bg-opacity-100">
                    Compound Product
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <router-link to="/Promotions" class="flex items-center p-2 rounded-md hover:bg-primary hover:bg-opacity-30 hover:text-opacity-30 active:bg-opacity-100">
              <i class="fa-solid fa-file-invoice mr-2 h-4 w-4"></i> Promotions
            </router-link>
          </li>
           <li>
            <!-- Products with Submenu -->
            <div class="group">
              <div class="flex items-center justify-between p-2 rounded-md hover:bg-primary hover:bg-opacity-30 cursor-pointer">
                <div class="flex items-center">
                  <i class="fa-solid fa-cart-shopping mr-2 h-4 w-4"></i> Orders
                </div>
                <i class="fas fa-chevron-down group-hover:rotate-180 transition-transform"></i>
              </div>
              <ul class="hidden group-hover:block pl-6 mt-1 space-y-1">
                <li>
                  <router-link to="/RequestOrder" class="flex items-center p-2 rounded-md hover:bg-primary hover:bg-opacity-30 active:bg-opacity-100">
                    Request Order
                  </router-link>
                </li>
                <li>
                  <router-link to="/HistoryOrder" class="flex items-center p-2 rounded-md hover:bg-primary hover:bg-opacity-30 active:bg-opacity-100">
                    History Orders
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
          <li class="setting">
            <router-link to="/Setting" class="flex items-center p-2 rounded-md hover:bg-primary hover:bg-opacity-30 hover:text-opacity-30 active:bg-opacity-100">
              <i class="fa-solid fa-wrench mr-2 h-4 w-4"></i> Setting
            </router-link>
          </li>
          <li>
            <router-link to="/Logout" class="flex items-center p-2 rounded-md hover:bg-primary hover:bg-opacity-30 hover:text-opacity-30 active:bg-opacity-100">
              <i class="fa-solid fa-arrow-right-from-bracket mr-2 h-4 w-4"></i> Logout
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  box-shadow: 0 4px 8px 0 rgba(58, 53, 65, 0.1);
  width: 300px;
}
.setting {
  border-top: 1px solid #00B69B;
}
.group {
  position: relative;
}
.group ul {
  background-color: white;
}
</style>
