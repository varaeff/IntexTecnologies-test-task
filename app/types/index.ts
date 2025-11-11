export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  fetched: boolean;
  model_body?: string;
  model_doors?: number;
  model_drive?: string;
  model_transmission_type?: string;
  model_engine_fuel?: string;
  model_lkm_city?: number;
  model_lkm_hwy?: number;
  model_lkm_mixed?: number;
  model_weight_kg?: number;
}
