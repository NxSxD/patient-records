import { AppointmentLocation } from "./types";
import { getAPIKey } from "./key";

export async function geocodeAddress(
  address: string
): Promise<AppointmentLocation | null> {
  let location;

  try {
    let mapsAPIKey;
    const keyResponse = await getAPIKey();
    if (keyResponse.headers.get("Content-Type").includes("application/json")) {
      const { key } = await keyResponse.json();
      if (key) mapsAPIKey = key;
    }

    const geocodingURL = new URL(
      "https://maps.googleapis.com/maps/api/geocode/json"
    );
    const params = {
      key: mapsAPIKey,
      address,
    };

    geocodingURL.search = new URLSearchParams(params).toString();

    const response = await fetch(geocodingURL.toString(), {
      method: "GET",
    });

    if (response.headers.get("Content-Type").includes("application/json")) {
      const data = await response.json();
      const firstResult = data.results[0];
      location = {
        lat: firstResult.geometry.location.lat,
        lng: firstResult.geometry.location.lng,
      };
    }
  } catch (e) {
    console.log("E: ", e);
    return null;
  }

  return location;
}
