<script setup lang="ts">
import { Skeleton } from "@/components/ui/skeleton";
</script>

<template>
  <div class="w-full p-4 border rounded-xl shadow">
    <Skeleton
      v-for="(n, index) in 9"
      :key="n"
      class="h-5 rounded-10"
      :class="{ 'mb-2': index !== 8 }"
    />
  </div>
</template>
