import { useState } from "react";
import { GLView } from 'expo';
import Expo2DContext from 'expo-2d-context';
import { Image } from "react-native";
import * as FileSystem from 'expo-file-system';

const iconScale = 1;
const iconW = 62;
const iconH = 72;
// const labelOrigin = 


export const CreateIcon = () => {
  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GLView style={{ flex: 1 }} onContextCreate={_onGLContextCreate} />
    </View>
  );
};

export const _onGLContextCreate = (gl) => {
  var ctx = new Expo2DContext(gl);
  ctx.scale(iconScale, iconScale);
  ctx.save();
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#000";
  // path
  ctx.beginPath();
  //오른쪽 위 꼭짓점
  ctx.moveTo(60.454, 0.206);
  //오른쪽 아래 꼭짓점까지 연결
  ctx.lineTo(60.454, 60.455000000000005);
  //화살표부분 시작
  ctx.lineTo(37.24, 60.455000000000005);
  ctx.lineTo(30.330000000000002, 70.206);
  ctx.lineTo(23.421000000000003, 60.454);
  //왼쪽 아래 꼭짓점까지 연결
  ctx.lineTo(0.20599999999999952, 60.454);
  //왼쪽 위 꼭짓점까지 연결
  ctx.lineTo(0.20599999999999952, 0.20699999999999985);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  dw = 56;
  dh = 56;
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onerror = function(e) {
      console.log(e)
  }
  img.onload = () => {
    w = img.naturalWidth;
    h = img.naturalHeight;
    if (w > h) dw = (dw * w) / h;
    if (h > w) dh = (dh * h) / w;
    var tempCanvas = new Expo2DContext(gl);
    tempCanvas.width = 51;
    tempCanvas.height = 51;
    // tempCanvas.drawImage(ctx, 0, 0, iconW * iconScale, iconH * iconScale);
    // ctx.drawImage(tempCanvas, 0, 0, 51, 51, 5, 51, 51);
    ctx.drawImage(img, 0, 0, w, h, -5, -5, dw, dh);
    
    marker.setIcon({
      url: canvas.toDataURL(),
      labelOrigin
    });

    //clean up
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas = null;
    tempCanvas.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCanvas = null;
    img.onload = null;
    img.onerror = null;
    img.src = "";
    img = null;
  }
  // img.src = `https://dronkers.janumedia.com/${marker.media.url}`;
  img.src = `${require('../../assets/example/ex1.png')}`;

}

const downloadNConvert = async (imageURL) => {
  try{
    //이미지 다운로드
    const fileURI = `${FileSystem.documentDirectory}image.jpg`;
    await FileSystem.downloadAsync(imageURL, fileURI);

    //이미지를 base64로 변환
    const base64Image = await FileSystem.readAsStringAsync(fileURI, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return base64Image;
  } catch(error){
    console.error('Error:', error);
    return null;
  }
};
