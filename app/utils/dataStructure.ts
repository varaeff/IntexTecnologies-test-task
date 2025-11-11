import type { Car } from "@/types";

export const carFields: { label: string; key: keyof Car }[] = [
  { label: "Year", key: "year" },
  { label: "Make", key: "make" },
  { label: "Model", key: "model" },
];

export const carDetailsFields: { label: string; key: keyof Car }[] = [
  { label: "Body", key: "model_body" },
  { label: "Doors", key: "model_doors" },
  { label: "Drive", key: "model_drive" },
  { label: "Transmission", key: "model_transmission_type" },
  { label: "Fuel", key: "model_engine_fuel" },
  { label: "City fuel consumption", key: "model_lkm_city" },
  { label: "Highway fuel consumption", key: "model_lkm_hwy" },
  { label: "Mixed fuel consumption", key: "model_lkm_mixed" },
  { label: "Weight", key: "model_weight_kg" },
];
