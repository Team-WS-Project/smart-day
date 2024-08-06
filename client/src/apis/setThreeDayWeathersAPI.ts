import { useWeatherStore } from "../store/weatherStore";
import { weatherApiFetchTest } from "./weatherAPI/weatherAPI";

const getFormattedDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const useFetchThreeDayWeathers = () => {
  const actions = useWeatherStore((state) => state.actions);
  const fetchWeather = async (currentLocation: string, today: Date) => {
    try {
      const result = await weatherApiFetchTest(currentLocation);
      const weatherData: Record<string, number> = {};

      if (result) {
        result.forEach((value, index) => {
          const date = new Date(today);
          date.setDate(date.getDate() + index);
          const formattedDate = getFormattedDate(date);
          weatherData[formattedDate] = Number(value);
        });

        actions.setWeatherData(weatherData);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return fetchWeather;
};
