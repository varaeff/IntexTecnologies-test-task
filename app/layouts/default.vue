<script setup lang="ts">
import { Search } from "lucide-vue-next";
import { Input } from "@/components/ui/input";

const carsStore = useStore();
</script>

<template>
  <div class="relative flex items-center px-8 py-4 border-b-2 max-[600px]:px-4">
    <h1 class="shrink-0 text-2xl font-bold pr-2 max-[600px]:text-xl">
      CarCatalog
    </h1>
    <div
      class="absolute left-1/2 -translate-x-1/2 w-full max-w-sm items-center max-[700px]:static max-[700px]:translate-x-0 max-[700px]:ml-auto max-[700px]:text-right"
    >
      <Input
        v-model="carsStore.filter"
        id="search"
        type="text"
        placeholder="Search by make, model or year"
        class="pl-10 background-muted bg-gray-100"
      />
      <span
        class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
      >
        <Search class="size-6 text-muted-foreground" />
      </span>
    </div>
  </div>

  <div>
    <slot />
  </div>
</template>
