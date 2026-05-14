<script setup lang="ts">
import type { CustomerProfile } from "~/types/profile";

definePageMeta({
  layout: "auth",
});

const customerForm = ref<CustomerProfile>({
  dob: "",
  gender: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  occupation: "",
  annualIncome: 0,
});

const handleSave = () => {
  console.log(customerForm.value);
};
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-center mb-6">Complete Profile</h1>

    <form @submit.prevent="handleSave" class="space-y-4">
      <div class="mb-4">
        <label>DOB</label>
        <input
          v-model="customerForm.dob"
          type="date"
          class="w-full border rounded-lg p-3 mt-2"
        />
      </div>
      <div class="mb-4">
        <label>Gender</label>
        <select
          v-model="customerForm.gender"
          class="w-full border rounded-lg p-3 mt-2"
        >
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>
      <div class="mb-4">
        <label>Address</label>
        <input
          v-model="customerForm.address"
          placeholder="Address"
          class="w-full border rounded-lg p-3 mt-2"
        />
      </div>
      <div class="mb-4">
        <label>City</label>
        <input
          v-model="customerForm.city"
          placeholder="City"
          class="w-full border rounded-lg p-3 mt-2"
        />
      </div>
      <div class="mb-4">
        <label>State</label>
        <input
          v-model="customerForm.state"
          placeholder="State"
          class="w-full border rounded-lg p-3 mt-2"
        />
      </div>
      <div class="mb-4">
        <label>Pin Code</label>
        <input
          v-model="customerForm.pincode"
          placeholder="Pincode"
          class="w-full border rounded-lg p-3 mt-2"
        />
      </div>
      <div class="mb-4">
        <label>Occupation</label>
        <input
          v-model="customerForm.occupation"
          placeholder="Occupation"
          class="w-full border rounded-lg p-3 mt-2"
        />
      </div>
      <div class="mb-4">
        <label>Annual Income</label>
        <input
          v-model.number="customerForm.annualIncome"
          type="number"
          placeholder="Annual Income"
          class="w-full border rounded-lg p-3 mt-2"
        />
      </div>
      <button class="w-full bg-green-600 text-white p-3 rounded">
        Save Profile
      </button>
    </form>
  </div>
</template>
