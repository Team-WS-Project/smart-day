import axios from "axios";
import dayjs from "dayjs";
import shortTermDatas from "./shortTerm.json";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

// stype IsBetweenTime = (startTime: string, endTime: string) => boolean;

const setBaseData = () => {
  const today = dayjs(new Date()).format("YYYYMMDDHHmm").slice(0, 8);
  const yesterday = dayjs(new Date()).add(-1, "day").format("YYYYMMDDHHmm").slice(0, 8);

  const isBetweenTime = (startTime: string, endTime: string) => {
    return dayjs(new Date()).isBetween(today + `${startTime}`, today + `${endTime}`, "minute", "()");
  };

  let baseDate = dayjs(new Date()).format("YYYYMMDDHHmm").slice(0, 8);
  let baseTime = "";

  if (isBetweenTime("0000", "0200")) {
    baseDate = yesterday;
    baseTime = "2300";
  } else if (isBetweenTime("0200", "0500")) {
    baseTime = "0200";
  } else if (isBetweenTime("0500", "0800")) {
    baseTime = "0500";
  } else if (isBetweenTime("0800", "1100")) {
    baseTime = "0800";
  } else if (isBetweenTime("1100", "1400")) {
    baseTime = "1100";
  } else if (isBetweenTime("1400", "1700")) {
    baseTime = "1400";
  } else if (isBetweenTime("1700", "2000")) {
    baseTime = "1700";
  } else if (isBetweenTime("2000", "2300")) {
    baseTime = "2000";
  } else if (isBetweenTime("2300", "0500")) {
    baseTime = "2300";
  }

  return {
    baseDate,
    baseTime,
  };
};

const serviceKey = import.meta.env.VITE_WEATHER_API_SERVICE_KEY;
const numOfRows = 0;
const pageNo = 1;

const dataType = "JSON";

const apiURL = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?";

const getShortWeather = async (currentLocation: string) => {
  try {
    const [locationData] = shortTermDatas.filter((elem) => {
      return elem[0] === currentLocation;
    });
    const dateData = setBaseData();
    const baseDate = dateData.baseDate;
    const baseTime = dateData.baseTime;

    const nx = locationData[1];
    const ny = locationData[2];

    console.log(nx, ny);
    console.log(baseDate, baseTime);

    const res = await axios.get(
      `${apiURL}serviceKey=${serviceKey}&numOfRows=${numOfRows}&pageNo=${pageNo}&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}&dataType=${dataType}`,
    );

    return res;
  } catch (err) {
    console.log(err);
  }
};

export const weatherApiFetchTest = async (currentLocation: string) => {
  console.log(currentLocation);
  const res = await getShortWeather(currentLocation);
  const tmp = res?.data.response.body.items.item;

  const sky = tmp.filter((elem: { category: string }) => {
    return elem.category === "SKY";
  });

  // 추출할 인덱스 배열
  const indicesToExtract = [0, 23, 47];
  const weatherCode = indicesToExtract.map((index) => sky[index].fcstValue);

  return weatherCode;
};
