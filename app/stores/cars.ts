import { defineStore } from "pinia";
import type { Car } from "@/types";

export const useStore = defineStore("carsStore", {
  state: () => ({
    cars: [] as Car[],
    filter: "" as string,
  }),

  actions: {
    async fetchCars() {
      if (import.meta.client) {
        const carsData = localStorage.getItem("carsData");
        if (carsData) {
          this.cars = JSON.parse(carsData);
          return;
        }
      }

      this.cars = await $fetch<Car[]>("/api/products");

      if (import.meta.client) {
        localStorage.setItem("carsData", JSON.stringify(this.cars));
      }
    },

    initFilter() {
      if (import.meta.client)
        this.filter = localStorage.getItem("carFilter") || "";
    },

    initFilterWatcher() {
      watch(
        () => this.filter,
        (newFilter) => {
          localStorage.setItem("carFilter", newFilter);
        }
      );
    },
  },
});
