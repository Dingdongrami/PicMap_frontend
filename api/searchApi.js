import { searchInstance } from "./instance"

// 장소 검색을 위한 함수
export const searchLocations = async address => {
  try{
    const { data } = await searchInstance.get(`/location?address=${address}`,  { headers: {'Content-Type': 'text/plain'} });
    return data;  
  }catch(error){
    // console.error(error.config);
    // Alert.alert("장소가 검색되지 않았습니다.");
  }
};