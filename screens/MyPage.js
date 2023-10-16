import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { CirclePost, MyProfile } from '../components';

export const MyPage = () => {
  const [data, setData] = useState(Array(10).fill({}));

  // const StickyHeader = () => (
  //   <View style={styles.stickyHeader}>
  //     <Text>Sticky Header</Text>
  //   </View>
  // );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MyProfile />
      {/* <StickyHeader /> */}
      <FlatList
        data={data}
        renderItem={({ item, index }) => <CirclePost />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   stickyHeader: {
//     backgroundColor: 'lightgray',
//     padding: 10,
//   },
// });
