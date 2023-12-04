import GeoViewport from '@mapbox/geo-viewport';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

//자식 element가 마커인지 판별
export const isMarker = (child) =>
  child && child.props && child.props.coordinate && child.props.cluster !== false;

//주어진 지도 영역을 표현하기 위한 상자
export const calculateBBox = (region) => {
  let lngD;
  //경도가 음수인 경우 양수로 변환
  if (region.longitudeDelta < 0) lngD = region.longitudeDelta + 360
  else lngD = region.longitudeDelta

  //[서쪽 경도, 남쪽 위도, 동쪽 경도, 북쪽 위도]
  return [
    region.longitude - lngD, // westLng - min lng
    region.latitude - region.latitudeDelta, // southLat - min lat
    region.longitude + lngD, // eastLng - max lng
    region.latitude + region.latitudeDelta, // northLat - max lat
  ];
};

//적절한 지도의 확대수준 
// region: 지도영역에 대한 정보, bBox: 경계상자에 대한 정보, minZoom: 최소확대수준
export const returnMapZoom = (region, bBox, minZoom) => {
  const viewport =
    region.longitudeDelta >= 40 ? { zoom: minZoom } : GeoViewport.viewport(bBox, [width, height]);

  return viewport.zoom;
};

//마커의 지리적 위치정보와 이미지를 표현
export const markerToGeoJSONFeature = (marker, index) => {
  // console.log(marker.props.imageUri);
  return {
    type: 'Feature',
    geometry: {
      coordinates: [marker.props.coordinate.longitude, marker.props.coordinate.latitude],
      type: 'Point',
    },
    properties: {
      point_count: 0,
      index,
      ..._removeChildrenFromProps(marker.props),
      //이미지 URL
      imageUri: marker.props.imageUri
    },
  };
};

// 나선 모양의 좌표 생성 함수
// marker: 클러스터를 나타내는 마커객체
// clusterChildren: 클러스 내부 자식마커들 배열
// markers: 전체 마커배열
// index: 현재 클러스터의 index
export const generateSpiral = (marker, clusterChildren, markerArray, index) => {
  const { properties, geometry } = marker;
  //클러스터링된 마커들의 개수
  const count = properties.point_count;
  const centerLocation = geometry.coordinates;
  const res = [];
  let angle = 0;
  let start = 0;
  // console.log(clusterChildren);

  //특정 bBox와 zoom에 따라 markers가 결정되고
  // 그 클러스터링된 마커집단 내에 마커들의 개수가 start가 됨
  //부모 컴포넌트에서 건네받은 markers.map의 인덱스임
  for (let i = 0; i < index; i++) {
    start += markerArray[i].properties.point_count || 0;
  }

  // 마커의 개수만큼 스파이럴 형태의 좌표를 생성 후 배열에 담아 반환
  for (let i = 0; i < count; i++) {
    angle = 0.25 * (i * 0.5);
    const latitude = centerLocation[1] + 0.0002 * angle * Math.cos(angle);
    const longitude = centerLocation[0] + 0.0002 * angle * Math.sin(angle);

    if (clusterChildren[i + start]) {
      res.push({
        index: clusterChildren[i + start].properties.index,
        longitude,
        latitude,
        centerPoint: {
          latitude: centerLocation[1],
          longitude: centerLocation[0],
        },
      });
      // markerArray[index].properties.imageUri = clusterChildren[count+start].properties.imageUri;
    }
  }
  return res;
}

//개수에 따라 크기변화
export const returnMarkerStyle = (points) => {
  if (points >= 50) {
    return {
      width: 84,
      height: 84,
      size: 64,
      fontSize: 20,
    }
  }

  if (points >= 25) {
    return {
      width: 78,
      height: 78,
      size: 58,
      fontSize: 19,
    }
  }

  if (points >= 15) {
    return {
      width: 72,
      height: 72,
      size: 54,
      fontSize: 18,
    }
  }

  if (points >= 10) {
    return {
      width: 66,
      height: 66,
      size: 50,
      fontSize: 17,
    }
  }

  if (points >= 8) {
    return {
      width: 60,
      height: 60,
      size: 46,
      fontSize: 17,
    }
  }

  if (points >= 4) {
    return {
      width: 54,
      height: 54,
      size: 40,
      fontSize: 16,
    }
  }

  return {
    width: 48,
    height: 48,
    size: 36,
    fontSize: 15,
  }
}

// 자식속성을 제거한 새로운 객체 반환
const _removeChildrenFromProps = (props) => {
  const newProps = {};
  Object.keys(props).forEach((key) => {
    if (key !== 'children') {
      newProps[key] = props[key];
    }
  })
  return newProps;
}