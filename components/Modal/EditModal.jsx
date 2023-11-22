import { TextInput, Text, View, Image, Pressable } from "react-native";
import Modal from 'react-native-modal';
import { styles, editStyle } from "./styles";
import { useState } from "react";

export const EditModal = ({ isModalVisible }) => {
  const [text, setText] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const submit = () => {
    setIsVisible(!isVisible);
  };
  return(
    <Modal
    isVisible={isVisible}
    style={styles.modal}
    transparent={true}>
      <View style={editStyle.container}>
        <View style={editStyle.modalContainer} >
          <Text style={editStyle.title}>써클 이름 변경</Text>
          <TextInput 
          style={editStyle.inputBox}
          keyboardType="default"
          onChange={newText => setText(newText)}
          defaultValue={text}
          >
            <Text>{text}</Text>
            <Image source={require('../../assets/icons/cancel_btn.png')} style={editStyle.cancelBox} />
          </TextInput>
          <View style={editStyle.optionBox}>
            <Pressable onPress={()=>setIsVisible(!isVisible)}>
              <View style={editStyle.singleBox1}>
                <Text style={editStyle.textStyle}>취소</Text>
              </View>
            </Pressable>
            <Pressable onPress={submit}>
              <View style={editStyle.singleBox2} >
                <Text style={editStyle.textStyle}>저장</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};