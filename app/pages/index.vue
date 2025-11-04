<script setup lang="ts">
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const carsStore = useStore();
await carsStore.fetchCars();
</script>

<template>
  <div v-if="carsStore.cars.length">
    <ul
      class="grid p-4 gap-4 mb-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
    >
      <li v-for="car in carsStore.cars" :key="car.id">
        <Card>
          <CardHeader>
            <CardTitle>{{ car.manufacturer }} {{ car.model }}</CardTitle>
            <CardDescription
              >Year of manufacture: {{ car.year }}</CardDescription
            >
          </CardHeader>
        </Card>
      </li>
    </ul>
  </div>
</template>
