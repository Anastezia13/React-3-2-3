export interface Launch {
  flight_number: number;
  mission_name: string;
  launch_date_utc: string;
  rocket: {
    rocket_name: string;
  };
  links: {
    mission_patch_small: string | null;
    mission_patch: string | null;
  };
  details: string | null;
}

export async function fetchLaunches(): Promise<Launch[]> {
  const response = await fetch('https://kata-spacex.onrender.com/api/launches');
  if (!response.ok) {
    throw new Error('Failed to fetch launches');
  }
  const data = await response.json();
  return data.launches || []; 
}