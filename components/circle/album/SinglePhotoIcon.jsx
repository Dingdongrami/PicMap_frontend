import { Pressable, Text, View, Image, FlatList } from 'react-native';
import { useState } from 'react';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';

export const SinglePhotoIcon = ({photoData, isSelected }) => {
  // const [ checkedPhotos, setCheckedPhotos ] = useState([]);
  // const navigation = useNavigation();
  // const clickPhoto = (index) => {
  //   navigation.navigate('PhotoCom', {index});
  // }
  const key = (photoData) => photoData.id;
  return(
    <View>
      {/* {photoData.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.photoRow}>
          {row.map((item, index) => (
            <View  key={index}>
              {!isSelected ?
                <Pressable onPress={()=>clickPhoto(3*rowIndex + index)} >
                  <View style={styles.imageContainer} >
                    <Image source={require('../../../assets/icons/image.png')} style={styles.imageIcon} />
                  </View>
                </Pressable>
                : 
                <View style={styles.imageCon4check}>
                  <Checkbox 
                    key={index}
                    value={checkedPhotos[3*rowIndex+index]}
                    onValueChange={() => {
                      const itemIndex = 3*rowIndex+index;
                      const newCheckedPhotos = [...checkedPhotos];
                      newCheckedPhotos[itemIndex] = !newCheckedPhotos[itemIndex];
                      setCheckedPhotos(newCheckedPhotos);
                    }}
                    color={checkedPhotos ? '#D6D3D1': undefined}
                    style={styles.checkbox}
                  />
                  <Image source={require('../../../assets/icons/image.png')} style={styles.image4check} />
                </View>
              }
            </View>
          ))}
        </View>
      ))} */}
      <FlatList
        nestedScrollEnabled
        data={photoData}
        numColumns={3}
        keyExtractor={key}
        //만약 실제이미지가 데이터에 존재하면 바뀌게 될 함수
        renderItem={() => <PhotoIcon isSelected={isSelected} index={key}/>}
      />
    </View>

  );
};

const PhotoIcon = ({isSelected, index}) => {
  const [ checkedPhotos, setCheckedPhotos ] = useState([]);
  const navigation = useNavigation();
  const clickPhoto = (index) => {
    navigation.navigate('PhotoCom', {index: index.JSON});
  }
  return(
    <View style={styles.photoRow}>
      <View >
        {!isSelected ?
          <Pressable onPress={()=>clickPhoto(index)} >
            <View style={styles.imageContainer} >
              <Image source={require('../../../assets/icons/image.png')} style={styles.imageIcon} />
            </View>
          </Pressable>
          : 
          <View style={styles.imageCon4check}>
            <Checkbox 
              // key={index}
              // keyExtractor={item => item.id}
              value={checkedPhotos[index]}
              onValueChange={() => {
                // const itemIndex = 3*rowIndex+index;
                // const newCheckedPhotos = [...checkedPhotos];
                // newCheckedPhotos[itemIndex] = !newCheckedPhotos[itemIndex];
                // setCheckedPhotos(newCheckedPhotos);
                const itemIndex = index;
                const newCheckedPhotos = [...checkedPhotos];
                newCheckedPhotos[itemIndex] = !newCheckedPhotos[itemIndex];
                setCheckedPhotos(newCheckedPhotos);
              }}
              color={checkedPhotos ? '#D6D3D1': undefined}
              style={styles.checkbox}
            />
            <Image source={require('../../../assets/icons/image.png')} style={styles.image4check} />
          </View>
        }
      </View>
    </View>
  )
}