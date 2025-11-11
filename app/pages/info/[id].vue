<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { AlertCircle } from "lucide-vue-next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { carFields, carDetailsFields } from "@/utils/dataStructure";

const carsStore = useStore();

if (!carsStore.cars.length) {
  await carsStore.fetchCars();
}

const carId = parseInt(useRoute().params.id as string);

const carInfo = computed(() => {
  return carsStore.cars.find((car) => car.id === carId);
});

const {
  data: carData,
  pending: carPending,
  error: carError,
  execute: carExecute,
} = useLazyFetch(() => `/api/carInfo`, {
  params: computed(() =>
    carInfo.value
      ? {
          make: carInfo.value.make,
          model: carInfo.value.model,
          year: carInfo.value.year,
        }
      : undefined
  ),
  immediate: false,
});

watch(
  carInfo,
  (info) => {
    if (info && !info.fetched) {
      carExecute();
    }
  },
  { immediate: true }
);

watch(
  () => carData.value,
  (newVal) => {
    console.log("Car data fetched:", newVal);

    if (!newVal?.Trims?.[0]) return;

    const targetCar = carsStore.cars.find((c) => c.id === carId);

    if (targetCar) {
      Object.assign(targetCar, { fetched: true, ...newVal.Trims[0] });
    }

    if (import.meta.client) {
      localStorage.setItem("carsData", JSON.stringify(carsStore.cars));
      console.log("Updated cars data saved to localStorage");
    }
  }
);

const details = computed(() => {
  if (carInfo.value?.fetched) return carInfo.value;
  return carData.value?.Trims?.[0];
});
</script>

<template>
  <div class="flex gap-8 px-8 py-4 max-[600px]:block max-[600px]:px-4">
    <div class="w-1/2 max-[600px]:w-full">
      <Card class="shadow mb-4">
        <CardHeader>
          <CardTitle class="text-xl"
            >{{ carInfo?.make }} {{ carInfo?.model }}</CardTitle
          >
        </CardHeader>
        <CardContent>
          <div
            v-for="(item, index) in carFields"
            :key="index"
            class="flex justify-between"
          >
            <b class="text-gray-500">{{ item.label }}:</b>
            <b>{{ carInfo?.[item.key] }}</b>
          </div>
        </CardContent>
      </Card>

      <Loader v-if="carPending" />
      <Alert
        v-else-if="carError || carData?.error"
        variant="destructive"
        class="shadow"
      >
        <AlertCircle class="w-4 h-4" />
        <AlertTitle>{{
          carData?.error || carError?.message || "Error"
        }}</AlertTitle>
        <AlertDescription>
          Error loading car details. Please try again later.
        </AlertDescription>
      </Alert>

      <Card v-else-if="details" class="shadow">
        <CardContent>
          <div
            v-for="(item, index) in carDetailsFields"
            :key="index"
            class="flex justify-between"
          >
            <b class="text-gray-500">{{ item.label }}:</b>
            <b>
              {{ details?.[item.key] ?? "—" }}
              <span v-if="item.label === 'Weight'"> kg</span>
            </b>
          </div>
        </CardContent>
      </Card>
      <Card v-else class="shadow">
        <CardContent>
          <div class="text-center text-gray-500">
            No additional details available for this car.
          </div>
        </CardContent>
      </Card>
    </div>

    <div class="w-1/2 flex justify-center items-center max-[600px]:hidden">
      <NuxtImg
        src="/images/NoImage.jpg"
        alt="No image"
        class="rounded-xl shadow w-full h-auto max-w-[450px] max-h-[450px] object-cover"
      />
    </div>
  </div>
  <div class="flex justify-center pl-8 mb-8">
    <Button class="cursor-pointer w-2xs" @click="navigateTo(`/`)"
      >Go Back</Button
    >
  </div>
</template>
