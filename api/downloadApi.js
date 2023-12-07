import * as FileSystem from 'expo-file-system';
// 비디오 파일 다운로드를 위한 ios 용 라이브러리
import { shareAsync} from 'expo-sharing';
import { Platform } from 'react-native';

export const downloadFromUrl = async fileProps => { 
  const result = await FileSystem.downloadAsync(
    fileProps.uri,
    FileSystem.documentDirectory + fileProps.filename
  );
  console.log(result);
  save(result.uri, fileProps.filename, result.headers["Content-Type"]);
}

const save = async (uri, filename, mimetype) => {
  const [showToast, setShowToast] = useRecoilState(toastState);
  if(Platform.OS === "android"){
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if(permissions.granted){
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64});
      await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, base64, {encoding: FileSystem.EncodingType.Base64});
        })
        .catch(e => console.log(e));
    }else{
      shareAsync(uri);
    }
  } else{ 
    shareAsync(uri);
  }
}

