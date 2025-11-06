<script setup lang="ts">
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const carsStore = useStore();
await carsStore.fetchCars();

const filteredCars = computed(() => {
  return carsStore.cars.filter((car) => checkFilter(car, carsStore.filter));
});

const goToCarInfo = (id: number) => {
  navigateTo(`/info/${id}`);
};
</script>

<template>
  <div v-if="filteredCars.length">
    <ul
      class="grid p-4 gap-4 mb-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
    >
      <li v-for="car in filteredCars" :key="car.id">
        <Card
          class="shadow hover:shadow-lg hover:cursor-pointer active:shadow transition-shadow"
          @click="goToCarInfo(car.id)"
        >
          <CardHeader>
            <CardTitle>{{ car.make }} {{ car.model }}</CardTitle>
            <CardDescription
              >Year of manufacture: {{ car.year }}</CardDescription
            >
          </CardHeader>
        </Card>
      </li>
    </ul>
  </div>
</template>
