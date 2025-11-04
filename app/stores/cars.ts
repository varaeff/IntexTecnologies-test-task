import { defineStore } from "pinia";
import type { Car } from "@/types";

export const useStore = defineStore("carsStore", {
  state: () => ({
    cars: [] as Car[],
  }),
  actions: {
    async fetchCars() {
      this.cars = await $fetch("/api/products");
    },
  },
});
