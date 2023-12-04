import React, { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, LayoutAnimation, Platform, Pressable } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import SuperCluster from 'supercluster';
import ClusterMarker from './ClusteredMarker';
import {
  calculateBBox,
  generateSpiral,
  isMarker,
  markerToGeoJSONFeature,
  returnMapZoom,
} from './helpers';
import { useNavigation, useIsFocused } from '@react-navigation/native';

//Map 함수의 자식 컴포넌트
const ClusteredMapView = forwardRef(
  (
    {
      radius,
      maxZoom,
      minZoom,
      minPoints,
      extent,
      nodeSize,
      children,
      onClusterPress,
      onRegionChangeComplete,
      onMarkersChange,
      preserveClusterPressBehavior,
      clusteringEnabled,
      clusterColor,
      clusterTextColor,
      clusterFontFamily,
      spiderLineColor,
      layoutAnimationConf,
      animationEnabled,
      renderCluster,
      tracksViewChanges,
      spiralEnabled,
      superClusterRef,
      ...restProps
    },
    ref,
  ) => {
    const [markers, updateMarkers] = useState([]); // 영역과 확대수준으로 마커를 배열로 설정
    const [spiderMarkers, updateSpiderMarker] = useState([]); // 모든 마커의 지리적 위치를 배열로 설정
    const [otherChildren, updateChildren] = useState([]); // 마커로 표시되지 않는 자식 element들 배열로 설정
    const [superCluster, setSuperCluster] = useState(null); // 여러가지 props로 포함된 superCluster 객체를 list로 설정 -> 초기값은 null (모여있는 정도)
    
    const [currentRegion, updateRegion] = useState(restProps.region || restProps.initialRegion); // 부모 컴포넌트로부터 받은 region 값으로 현재 위치파악

    const [isSpiderfier, updateSpiderfier] = useState(false); // spider처럼 여러개의 자식 element로 나눠질 경우를 boolean으로 설정
    const [clusterChildren, updateClusterChildren] = useState(null);
    const [isNav, setIsNav] = useState(false);
    const mapRef = useRef();
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const locs = useRef([]);
    //useMemom 훅을 이용하여 'children'을 배열로 변환함
    const propsChildren = useMemo(() => React.Children.toArray(children), [children]);
    //클러스터링 마커의 대표사진을 포함한 새로운 클러터링 객체
    const newProps = markers.map((marker, index) => {
      return {
        ...marker,
        imageURI: undefined // 초기값으로 undefined 할당
      };
    });

    // propsChildren과 clusteringEnabled가 변할때 marker와 superCluster 변경
    useEffect(() => {
      const rawData = [];
      const otherChildren = [];

      if (!clusteringEnabled) {
        updateSpiderMarker([]);
        updateMarkers([]);
        updateChildren(propsChildren);
        setSuperCluster(null);
        return
      }

      //props 배열에서 child가 마커면 => 지리 위치를 raw data에 추가하여 GeoJsSON 형식으로 변환
      //마커가 아니라면 => otherChildren에 추가함
      propsChildren.forEach((child, index) => {
        if (isMarker(child)) {
          rawData.push(markerToGeoJSONFeature(child, index));
        } else {
          otherChildren.push(child);
        }
      })

      // 초기값으로 주어진 props 값을 바탕으로 superCluster 객체 생성
      const superCluster = new SuperCluster({
        radius,
        maxZoom,
        minZoom,
        minPoints,
        extent,
        nodeSize,
      });

      //위에서 마커인 데이터들만 superCluster로 변형
      superCluster.load(rawData);

      //bBox로 처음 렌더링될때 보일 영역 설정, zoom으로 지도 확대수준 결정, markers로 bBox랑 zoom 설정
      const bBox = calculateBBox(currentRegion);
      const zoom = returnMapZoom(currentRegion, bBox, minZoom);
      const markers = superCluster.getClusters(bBox, zoom);

      // 앞서 보일영역과 확대수준이 업데이트 된 markers 상태변수로
      // 나머지 자식 element updateChildren 상태변수로
      // superCluster 객체를 새로 상태변수 업데이트
      updateMarkers(markers);
      updateChildren(otherChildren);
      setSuperCluster(superCluster);

      // 비동기적으로 실행하기 위해 참조를 이용해서 업데이트
      superClusterRef.current = superCluster;
    }, [propsChildren, clusteringEnabled])


    useEffect(() => {
      if (!spiralEnabled) {
        return;
      }
      // isSpiderfier가 존재하고 marker의 길이가 0이상인 경우
      if (isSpiderfier && markers.length > 0) {
        const allSpiderMarkers = [];
        let spiralChildren = [];

        markers.map((marker, i) => {
          //marker에 cluster라는 속성이 존재한다면
          if (marker.properties.cluster) {
            //해당 클러스터의 모든 자식 marker들을 가져옴
            spiralChildren = superCluster.getLeaves(marker.properties.cluster_id, Infinity);
          }
          // 나선 형태의 마커위치 생성
          const positions = generateSpiral(marker, spiralChildren, newProps, i);
          // 마커위치를 allSpiderMarker에 대입
          allSpiderMarkers.push(...positions);
        })
        //상태관리 update
        updateSpiderMarker(allSpiderMarkers);
      } else {
        updateSpiderMarker([]);
      }
    }, [isSpiderfier, markers])

    // 지역 이동
    const _onRegionChangeComplete = (region) => {
      // superCluster와 region이 있는 경우
      if (superCluster && region) {
        const bBox = calculateBBox(region);
        const zoom = returnMapZoom(region, bBox, minZoom);
        const markers = superCluster.getClusters(bBox, zoom);
        if (animationEnabled && Platform.OS === 'ios') {
          LayoutAnimation.configureNext(layoutAnimationConf);
        }
        // 확대 수준이 18 이상이고 marker가 있고 clusterChildren이 있을때
        // => region.longitudeDelta >= 40 || region.langitudeDelta >=40 이제 이 region은 초기값
        if (zoom >= 10 && markers.length > 0 && clusterChildren) {
          //나선형이 가능한 경우에는 spiderfier 가능한데 더이상의 움직임은 없으면 좋겟음
          if (spiralEnabled) {
            updateSpiderfier(true);
          }
          // navigation.navigate('MapList', {markers});
        // 확대는 10 미만 || marker 없음 || clusterChildren 없음
        } else {
          // 아직 나선형으로 만들기는 거짓
          if (spiralEnabled) {
            updateSpiderfier(false);
          }
        }
        //marker들은 업데이트
        updateMarkers(markers);
        updateRegion(region);
      } 
    };

    //Cluster(모여있는 집단)이 클릭됐을 때 호출되는 함수
    const _onClusterPress = (cluster) => () => {
      // cluster에 속한 모든 자식요소들을 가져와서 children
      // Infinity: 클러스터 아이디에 해당하는 모든 자식 요소를 가져오기 위한 최댓값
      const children = superCluster.getLeaves(cluster.id, Infinity);
      updateClusterChildren(children);
      if (preserveClusterPressBehavior) {
        // 그냥 이벤트 핸들러인데 cluster와 children을 넣어놓고 반환하는 역할일듯
        onClusterPress(cluster, children);
        return;
      }
      const coordinates = children.map(({ geometry }) => ({
        latitude: geometry.coordinates[1],
        longitude: geometry.coordinates[0],
      }))
      // 위치가 움직이지 않고 region을 클릭하면
      const lats = coordinates.map(item => item.latitude);
      const longs = coordinates.map(item => item.longitude);
      if(Math.max(...lats)-Math.min(...lats) < 1 && Math.max(...longs)-Math.min(...longs) < 1){
        setIsNav(true);
        // locs.current = clusterChildren;
      }
      // 지도를 특정 좌표에 맞게 조정하는 부분
      mapRef.current.fitToCoordinates(coordinates, {
        //여백 설정을 위한 옵션
        edgePadding: restProps.edgePadding,
      })
      onClusterPress(cluster, children);
      return children;
    };
    useEffect(() => {
      if(isFocused && mapRef.current){
        mapRef.current.animateToRegion(restProps.initialRegion, 1000);
      }
      setIsNav(false);
    }, [isFocused]);
    useEffect(()=>{
      locs.current = clusterChildren;
      if(isNav ){
        navigation.navigate('MapList', {locs});
      }
    }, [isNav, clusterChildren]);

    return (
      <MapView
        {...restProps}
        ref={(map) => {
          mapRef.current = map
          if (ref) {
            ref.current = map
          }
          restProps.mapRef(map)
        }}
        onRegionChangeComplete={_onRegionChangeComplete}>
        {markers.map((marker, index) =>
          marker.properties.point_count === 0 
          ? ( propsChildren[marker.properties.index]) 
          : !isSpiderfier 
            ? ( renderCluster 
              ? ( renderCluster({
                    onPress: _onClusterPress(marker),
                    clusterColor,
                    clusterTextColor,
                    clusterFontFamily,
                    ...marker,})) 
              : ( <ClusterMarker
                  key={`cluster-${marker.id}`}
                  {...marker}
                  onPress={_onClusterPress(marker)}
                  // thumbnail={newProps[index]}
                  clusterColor={
                    restProps.selectedClusterId === marker.id
                      ? restProps.selectedClusterColor
                      : clusterColor}
                  clusterTextColor={clusterTextColor}
                  clusterFontFamily={clusterFontFamily}
                  tracksViewChanges={tracksViewChanges}
                  />
                )
              ) 
            : null
          )
        }
        {otherChildren}
        {spiderMarkers.map((marker) => {
          return propsChildren[marker.index]
            ? React.cloneElement(propsChildren[marker.index], {
                coordinate: { ...marker },
              })
            : null
        })}
        {spiderMarkers.map((marker, index) => (
          <Polyline
            key={index}
            coordinates={[marker.centerPoint, marker, marker.centerPoint]}
            strokeColor={spiderLineColor}
            strokeWidth={1}
          />
        ))}
      </MapView>
    )
  },
)

ClusteredMapView.defaultProps = {
  clusteringEnabled: true,
  spiralEnabled: true,
  animationEnabled: true,
  preserveClusterPressBehavior: false,
  layoutAnimationConf: LayoutAnimation.Presets.spring,
  tracksViewChanges: false,
  // SuperCluster parameters
  radius: Dimensions.get('window').width * 0.06,
  maxZoom: 20,
  minZoom: 1,
  minPoints: 2,
  extent: 512,
  nodeSize: 64,
  // Map parameters
  edgePadding: { top: 50, left: 50, right: 50, bottom: 50 },
  // Cluster styles
  clusterColor: '#00B386',
  clusterTextColor: '#FFFFFF',
  spiderLineColor: '#00B386',
  // Callbacks
  onRegionChangeComplete: () => {},
  onClusterPress: () => {},
  onMarkersChange: () => {},
  superClusterRef: {},
  mapRef: () => {},
}

export default memo(ClusteredMapView);