<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const carsStore = useStore();

const carInfo = computed(() => {
  return carsStore.cars.find(
    (car) => car.id === parseInt(useRoute().params.id as string)
  );
});

const {
  data: carData,
  pending: carPending,
  error: carError,
} = await useLazyFetch(`/api/carInfo`, {
  params: {
    make: carInfo.value?.make,
    model: carInfo.value?.model,
    year: carInfo.value?.year,
  },
});

watch(carData, (val) => {
  console.log("Car data loaded:", val.Trims[0]);
});
</script>

<template>
  <div class="flex gap-8 px-8 py-4 max-[600px]:block max-[600px]:px-4">
    <div class="w-1/2 max-[600px]:w-full">
      <Card class="shadow">
        <CardHeader>
          <CardTitle class="text-xl"
            >{{ carInfo?.make }} {{ carInfo?.model }}</CardTitle
          >
        </CardHeader>
        <CardContent>
          <div class="flex justify-between">
            <b class="text-gray-500">Year: </b> <b>{{ carInfo?.year }}</b>
          </div>
          <div class="flex justify-between">
            <b class="text-gray-500">Make: </b> <b>{{ carInfo?.make }}</b>
          </div>
          <div class="flex justify-between">
            <b class="text-gray-500">Model: </b> <b>{{ carInfo?.model }}</b>
          </div>
        </CardContent>
      </Card>
    </div>
    <div class="w-1/2 flex justify-center items-center max-[600px]:hidden">
      <NuxtImg
        src="/images/NoImage.jpg"
        alt="No image"
        class="rounded-xl shadow w-full h-auto max-w-[520px] max-h-[520px] object-cover"
      />
    </div>
  </div>
  <div class="flex justify-center pl-8 mb-8">
    <Button class="cursor-pointer w-2xs" @click="navigateTo(`/`)"
      >Go Back</Button
    >
  </div>
</template>
