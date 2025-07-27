export interface IStravaGear {
  id: string;
  resource_state: number;
  primary: boolean;
  name: string;
  distance: number;
  brand_name: string;
  model_name: string;
  frame_type: number;
  description: string;
}

export interface IGear
  extends Omit<
    IStravaGear,
    | 'resource_state'
    | 'brand_name'
    | 'model_name'
    | 'frame_type'
    | 'description'
  > {
  brand?: string;
  model?: string;
}
