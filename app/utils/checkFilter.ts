import type { Car } from "@/types";

export default (car: Car, filter: string): boolean => {
  if (!filter) return true;
  const filterLower = filter.toLowerCase();
  return (
    car.make.toLowerCase().includes(filterLower) ||
    car.model.toLowerCase().includes(filterLower) ||
    car.year.toString().includes(filterLower)
  );
};
