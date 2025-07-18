interface IActivityMap {
  id: string;
  summary_polyline?: string;
  resource_state?: number;
}

interface IAthlete {
  id: number;
  resource_state: number;
}

export interface IStravaActivity {
  id: string;
  resource_state: number;
  athlete: IAthlete;
  name: string;
  achievement_count: number;
  athlete_count: number;
  average_speed: number; // meters per second
  average_watts: number;
  comment_count: number;
  commute: boolean;
  display_hide_heartrate_option: boolean;
  distance: number; // in meters
  elapsed_time: number; // in seconds
  elev_high: number; // in meters
  elev_low: number; // in meters
  end_latlng: [number, number];
  external_id: string;
  flagged: boolean;
  from_accepted_tag: boolean;
  gear_id: string | null;
  has_heartrate: boolean;
  has_kudoed: boolean;
  heartrate_opt_out: boolean;
  kudos_count: number;
  location_city: string | null;
  location_country: string | null;
  location_state: string | null;
  manual: boolean;
  map: IActivityMap;
  max_speed: number; // meters per second
  max_watts: number;
  moving_time: number; // in seconds
  photo_count: number;
  pr_count: number;
  private: boolean;
  sport_type: string;
  start_date: string; // DateTime in UTC
  start_date_local: string; // DateTime in local timezone
  start_latlng: [number, number];
  timezone: string;
  total_elevation_gain: number; // in meters
  total_photo_count: number;
  trainer: boolean;
  type: string;
  upload_id: number;
  upload_id_str: string;
  utc_offset: number;
  visibility: string;
  workout_type: number;
}

export interface IActivity
  extends Omit<
    IStravaActivity,
    | 'athlete'
    | 'map'
    | 'resource_state'
    | 'comment_count'
    | 'display_hide_heartrate_option'
    | 'end_latlng'
    | 'from_accepted_tag'
    | 'has_heartrate'
    | 'has_kudoed'
    | 'heartrate_opt_out'
    | 'kudos_count'
    | 'location_city'
    | 'location_country'
    | 'location_state'
    | 'manual'
    | 'photo_count'
    | 'pr_count'
    | 'start_latlng'
    | 'total_photo_count'
    | 'upload_id'
    | 'upload_id_str'
    | 'workout_type'
  > {
  athleteId: number;
}
