import { searchInstance } from "./instance"

// 장소 검색을 위한 함수
export const searchLocations = async address => {
  try{
    const response = await searchInstance.get(`/location?address=${address}`);
    return response.data;  
  }catch(error){
    console.error(error);
  }
};