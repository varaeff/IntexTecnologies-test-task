import { defineStore } from "pinia";
import type { Car } from "@/types";

export const useStore = defineStore("carsStore", {
  state: () => ({
    cars: [] as Car[],
    filter: "" as string,
  }),
  actions: {
    async fetchCars() {
      const res = await fetch("/api/products");
      this.cars = await res.json();
    },
  },
});
