import { TextInput, Text, View, Image, Pressable } from "react-native";
import Modal from 'react-native-modal';
import { styles, editStyle } from "./styles";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { editModalState } from "../../stores/edit-modal";
import { useMutation } from "@tanstack/react-query";
import { editCircleName } from "../../api/circleApi";
import { useQueryClient } from "@tanstack/react-query";
 
export const EditModal = ({circleId}) => {
  const [text, setText] = useState('');
  const [isVisible, setIsVisible] = useRecoilState(editModalState);
  const submit = () => {
    editCircleNameMutation.mutate({circleId, circleData: {name: text}});
    setIsVisible(!isVisible);
  };
  const deletion = () => {
    setIsVisible(!isVisible);
  };
  const queryClient = useQueryClient();

  // 이름 편집하기 -> 바로 circle Header이름 변경
  const editCircleNameMutation  = useMutation({
    mutationFn: args => editCircleName(args.circleId, args.circleData),
    onSuccess: () => {
      queryClient.invalidateQueries(['circle', `${circleId}`])
    }
  })
  
  return(
    <View>   
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
            onChange={event => setText(event.nativeEvent.text)}
            value={text}
            />
            <View style={editStyle.optionBox}>
              <Pressable onPress={deletion}>
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
    </View>

  );


};