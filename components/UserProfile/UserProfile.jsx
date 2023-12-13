import { View, Text, StyleSheet, Pressable } from 'react-native';
import { styles } from '../MyProfile/styles';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import CustomToast from '../CustomToast';
import { s3BaseUrl } from '../../constants/config';
import { useQuery, useMutation } from '@tanstack/react-query';
import heartIcon from '../../assets/icons/heart_filled.png';
import { fetchReceivedRequests, requestFriend } from '../../api/friendsApi';

const UserProfile = ({ user, onPressFriendRequest }) => {
  const [showToast, setShowToast] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isAlreadyFriend, setIsAlreadyFriend] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const { data: friendsList } = useQuery({
    queryKey: ['friendsList', 17],
    queryFn: () => fetchFriends(17),
    // refetchOnWindowFocus: true,
  });
  const { data: receivedFriendsList } = useQuery({
    queryKey: ['receivedList', 17],
    queryFn: () => fetchReceivedRequests(17),
    select: data => {
      return data.filter(friend => {
        return friend.status === 'REQUESTED';
      });
    },
  });

  const { mutate: requestMutate } = useMutation({
    mutationFn: args => requestFriend(args.requesterId, args.receiverId),
    onSuccess: () => {
      // console.log('requestMutation success');
    },
  });

  const onPressRequest = () => {
    // 만약 나 자신이라면
    if (user.id === 17) {
      setToastMessage('나 자신은 영원한 나의 친구입니다.');
      setShowToast(true);
      return;
    }

    if (isRequesting) {
      setToastMessage('이미 친구 요청 중입니다.');
      setShowToast(true);
      return;
    }

    requestMutate({ requesterId: 17, receiverId: user.id });
    setToastMessage('친구 요청 완료');
    setShowToast(true);
    setIsRequesting(true);
    return;
  };

  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 3000); // 3초 후에 토스트 숨기기
    }
    return () => clearTimeout(timer); // 컴포넌트가 언마운트되거나 showToast가 변경되기 전에 타이머 클리어
  }, [showToast]);

  useEffect(() => {
    let alreadyFriend = false;
    let requesting = false;

    friendsList?.forEach(friend => {
      if (friend.requesterId === user.id) {
        if (friend.status === 'ACCEPTED') {
          alreadyFriend = true;
        }
        if (friend.status === 'REQUESTED') {
          requesting = true;
        }
      }
    });

    setIsAlreadyFriend(alreadyFriend);
    setIsRequesting(requesting);
  }, [friendsList]);

  useEffect(() => {
    let requesting = false;

    receivedFriendsList?.forEach(friend => {
      if (friend.receiverId === user.id) {
        requesting = true;
      }
    });

    setIsRequesting(requesting);
  }, [receivedFriendsList]);

  // console.log('receivedFriendsList', receivedFriendsList);
  // console.log(user);

  return (
    <View style={styles.profileContainer}>
      {user.profileImage ? (
        <Image source={s3BaseUrl + user.profileImage} style={styles.image} contentFit="cover" />
      ) : (
        <View style={styles.noImageWrapper}>
          <Image source={require('../../assets/icons/user.png')} style={styles.noImage} />
        </View>
      )}
      <View style={styles.rightWrapper}>
        <View style={styles.iconTextWrapper}>
          {user.status === 'PRIVATE' && (
            <Image source={require('../../assets/icons/private.png')} style={styles.privateImage} />
          )}
          <Text style={styles.usernameText}>{user.nickname}</Text>
        </View>
        <Text style={styles.onelineText}>{user.introduce}</Text>
        <View style={styles.buttonWrapper}>
          <Pressable style={styles.pinkButton} onPress={!isAlreadyFriend && !isRequesting ? onPressRequest : null}>
            {isAlreadyFriend ? (
              <Image source={heartIcon} style={styles.friendsImage} />
            ) : (
              <Image source={require('../../assets/icons/person_add.png')} style={styles.friendsImage} />
            )}
            <Text style={styles.buttonText}>
              {isAlreadyFriend ? '친구' : isRequesting ? '친구 요청 중' : '친구 요청'}
            </Text>
          </Pressable>
        </View>
      </View>
      <CustomToast text={toastMessage} show={showToast} />
    </View>
  );
};

export default UserProfile;
