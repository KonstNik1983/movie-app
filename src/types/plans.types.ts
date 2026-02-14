export interface PlanFeature {
  id: number;
  text: string;
  isActive: boolean;
}

export interface Plan {
  id: number;
  name: string;
  price: number;
  features: PlanFeature[];
}
