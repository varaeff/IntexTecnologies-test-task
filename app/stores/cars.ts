import { defineStore } from "pinia";
import type { Car } from "@/types";

export const useStore = defineStore("carsStore", {
  state: () => ({
    cars: [] as Car[],
    filter: "" as string,
  }),
  actions: {
    async fetchCars() {
      this.cars = await $fetch("/api/products");
    },
  },
});
