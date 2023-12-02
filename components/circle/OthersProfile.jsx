import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { circleInstance } from '../../api/instance';
import { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { s3BaseUrl } from '../../constants/config';
import { useQuery } from '@tanstack/react-query';
import { fetchMembers } from '../../api/circleApi';
import { useNavigation } from 'expo-router';

export const OthersProfile = ({ circleId }) => {
  const navigation = useNavigation();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['circleMembers', circleId],
    queryFn: () => fetchMembers(circleId),
  });

  console.log(data);

  return (
    <>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollBox}>
        {data?.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.personCircle}
            onPress={() => navigation.navigate('UserPage', { user: item })}>
            {item.profileImage ? (
              <Image
                source={s3BaseUrl + item.profileImage}
                style={{ width: '100%', height: '100%', borderRadius: 500 }}
              />
            ) : (
              <Text style={styles.text}>{item.nickname}</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollBox: {
    paddingHorizontal: 10,
  },
  personCircle: {
    borderWidth: 0.5,
    borderColor: '#78716C',
    borderRadius: 500,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'IropkeBatang',
    fontSize: 13,
    margin: 2,
  },
  text: {
    fontFamily: 'IropkeBatang',
    color: '#78716C',
  },
});
