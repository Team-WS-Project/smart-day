import { baseAxios } from "./baseAPI";

export const putCurrentLocation = async (currentLocation: string) => {
  try {
    await baseAxios.put("/users/update", {
      location: currentLocation,
    });
  } catch (err) {
    console.error(err);
  }
};

// alert 분리 (alert는 UI단에서) -> (컴포넌트에), api요청에는 api만
// alert 대신 에러 모달이 뜨는것도 좋음, api 재호출 -> 컴포넌트에서
export const addServerFavoriteLocation = async (currentLocation: string) => {
  try {
    await baseAxios.post("/favorites/add", {
      location_name: currentLocation,
    });
  } catch {
    alert("즐겨찾기에 실패했습니다. 다시 시도해주세요.");
  }
};

// 프론트 제어 부분은 프론트컨벤션에 맞춰서
export const deleteServerFavoriteLocation = async (locationName: string) => {
  try {
    await baseAxios.delete("/favorites/delete", {
      data: { location_name: locationName },
    });
  } catch {
    alert("즐겨찾기 삭제에 실패했습니다. 다시 시도해주세요.");
  }
};

export const getFavorites = async () => {
  try {
    const res = await baseAxios.get("/favorites", {});
    return res;
  } catch (err) {
    console.error(err);
  }
};
