<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-vue-next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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

      <Skeleton v-if="carPending" class="h-30 rounded-10" />
      <Alert v-else-if="carError" variant="destructive" class="shadow">
        <AlertCircle class="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Error loading car details. Please try again later.
        </AlertDescription>
      </Alert>
      <Card v-else="carData" class="shadow">
        <CardContent>
          <div class="flex justify-between">
            <b class="text-gray-500">Body: </b>
            <b>{{ carData?.Trims[0].model_body }}</b>
          </div>
          <div class="flex justify-between">
            <b class="text-gray-500">Doors: </b>
            <b>{{ carData?.Trims[0].model_doors }}</b>
          </div>
          <div class="flex justify-between">
            <b class="text-gray-500">Drive: </b>
            <b>{{ carData?.Trims[0].model_drive }}</b>
          </div>
          <div class="flex justify-between">
            <b class="text-gray-500">Transmission: </b>
            <b>{{ carData?.Trims[0].model_transmission_type }}</b>
          </div>
          <div class="flex justify-between">
            <b class="text-gray-500">Fuel: </b>
            <b>{{ carData?.Trims[0].model_engine_fuel }}</b>
          </div>
          <div class="flex justify-between">
            <b class="text-gray-500">City fuel consumption: </b>
            <b>{{ carData?.Trims[0].model_lkm_city }}</b>
          </div>
          <div class="flex justify-between">
            <b class="text-gray-500">Highway fuel consumption: </b>
            <b>{{ carData?.Trims[0].model_lkm_hwy }}</b>
          </div>
          <div class="flex justify-between">
            <b class="text-gray-500">Mixed fuel consumption: </b>
            <b>{{ carData?.Trims[0].model_lkm_mixed }}</b>
          </div>
          <div class="flex justify-between">
            <b class="text-gray-500">Weight: </b>
            <b>{{ carData?.Trims[0].model_weight_kg }} kg</b>
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
