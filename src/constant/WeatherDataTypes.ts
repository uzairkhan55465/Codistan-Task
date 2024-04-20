export interface WeatherData {
    location: {
      name: string;
      country: string;
      region: string;
    };
    current: {
      temp_c: number;
      condition: {
        icon: string;
        text: string;
      };
      wind_kph: number;
      wind_degree: number;
      wind_dir: string;
      humidity: number;
      uv: number;
      precip_in: number;
      feelslike_c: number;
      feelslike_f: number;
    };
    forecast: {
      forecastday: {
        day: {
          condition: {
            icon: string;
            text: string;
          };
          mintemp_c: number;
          maxtemp_c: number;
        };
      }[];
    };
  }
  