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
  extends Pick<IStravaGear, 'id' | 'primary' | 'name' | 'distance'> {
  brand?: string;
  model?: string;
  athleteId: string;
  stopNotifications: boolean;
  notifyThreshold?: number;
}
