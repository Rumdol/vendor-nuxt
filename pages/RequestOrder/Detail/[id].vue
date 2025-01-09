<template>
  <div class="p-8 bg-white shadow-lg rounded-lg">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">ORDER</h1>

    <!-- Order Details -->
    <div class="mb-6">
      <p class="text-lg font-semibold text-gray-700">
        Order Number:
        <span class="font-normal">{{ orderDetail.orderNumber }}</span>
      </p>
      <p class="text-lg font-semibold text-gray-700">
        Date: <span class="font-normal">{{ orderDetail.date }}</span>
      </p>
    </div>

    <!-- Customer Details -->
    <div class="mb-6 border-b pb-6">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Customer Detail</h2>
      <p class="text-lg text-gray-700">
        Customer Name:
        <span class="font-normal">{{ customerDetail.name }}</span>
      </p>
      <p class="text-lg text-gray-700">
        Email: <span class="font-normal">{{ customerDetail.email }}</span>
      </p>
      <p class="text-lg text-gray-700">
        Phone Number:
        <span class="font-normal">{{ customerDetail.phoneNumber }}</span>
      </p>
      <p class="text-lg text-gray-700">
        Address: <span class="font-normal">{{ customerDetail.address }}</span>
      </p>
      <p class="text-lg text-gray-700">
        Order Date:
        <span class="font-normal">{{ customerDetail.orderDate }}</span>
      </p>
    </div>

    <!-- Order Summary Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-900">
              Description
            </th>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-900">
              Qty
            </th>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-900">
              Unit Price
            </th>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-900">
              Amount
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr>
            <td class="px-6 py-4 text-gray-700">
              {{ orderItems[0].description }}
            </td>
            <td class="px-6 py-4 text-gray-700">
              {{ orderItems[0].quantity }}
            </td>
            <td class="px-6 py-4 text-gray-700">
              ${{ orderItems[0].unitPrice }}
            </td>
            <td class="px-6 py-4 text-gray-700">${{ orderItems[0].amount }}</td>
          </tr>
          <tr>
            <td class="px-6 py-4 text-gray-700">
              {{ orderItems[1].description }}
            </td>
            <td class="px-6 py-4 text-gray-700">
              {{ orderItems[1].quantity }}
            </td>
            <td class="px-6 py-4 text-gray-700">
              ${{ orderItems[1].unitPrice }}
            </td>
            <td class="px-6 py-4 text-gray-700">${{ orderItems[1].amount }}</td>
          </tr>
          <tr>
            <td class="px-6 py-4 text-gray-700">
              {{ orderItems[2].description }}
            </td>
            <td class="px-6 py-4 text-gray-700">
              {{ orderItems[2].quantity }}
            </td>
            <td class="px-6 py-4 text-gray-700">
              ${{ orderItems[2].unitPrice }}
            </td>
            <td class="px-6 py-4 text-gray-700">${{ orderItems[2].amount }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Order Total -->
    <div class="mt-6 border-t pt-6 text-gray-700">
      <p class="flex justify-between text-lg">
        <span>Subtotal:</span>
        <span>${{ total.subtotal }}</span>
      </p>
      <p class="flex justify-between text-lg">
        <span>Shipping:</span>
        <span>${{ total.shipping }}</span>
      </p>
      <p class="flex justify-between text-lg text-red-600">
        <span>Discount:</span>
        <span>{{ total.discount }}</span>
      </p>
      <p class="flex justify-between text-xl font-bold text-gray-900">
        <span>Total:</span>
        <span>${{ total.total }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
// Mock order and customer data
const orderDetail = {
  orderNumber: 'ORD-2024-000001',
  date: '2024-12-25',
}

const customerDetail = {
  name: 'Moew Moew',
  email: 'moew@gmail.com',
  phoneNumber: '005457485',
  address: 'Phnom Penh, Pochentong, Cambodia',
  orderDate: '2024-12-25',
}

const orderItems = [
  {
    description: 'perfume 1',
    quantity: 2,
    unitPrice: 99.99,
    amount: 199.98,
  },
  {
    description: 'perfume 2',
    quantity: 1,
    unitPrice: 149.99,
    amount: 149.99,
  },
  {
    description: 'perfume 3',
    quantity: 3,
    unitPrice: 49.99,
    amount: 149.97,
  },
]

const total = {
  subtotal: 499.94,
  shipping: 15.0,
  discount: '-$25.00',
  total: 489.94,
}
</script>

<style scoped>
table th,
table td {
  padding: 16px;
  text-align: left;
}
</style>
