import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { CustomToast, PersonRow } from '../../components';
import { styles } from './styles';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { fetchFriends } from '../../api/friendsApi';
import { fetchUser } from '../../api/userApi';
import { joinPublicCircle } from '../../api/circleApi';

const FriendItem = ({ userId, circleId, personAddButton }) => {
  const { data: user } = useQuery({
    queryKey: ['friendItem', userId],
    queryFn: () => fetchUser(userId),
  });

  const modifiedPersonAddButton = {
    ...personAddButton,
    onPress: () => personAddButton.onPress(userId, circleId),
  };

  return <PersonRow user={user} button={modifiedPersonAddButton} />;
};

const InviteUser = ({ route }) => {
  const circleId = route.params.circleId;
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const queryClient = useQueryClient();
  const circleMemberList = queryClient.getQueryData(['circleMembers', circleId]);

  const { data: friendsList } = useQuery({
    queryKey: ['friendsList', 17],
    queryFn: () => fetchFriends(17),
    select: data => {
      return data.filter(friend => {
        return !circleMemberList.some(member => member.id === friend.requesterId);
      });
    },
    onSuccess: data => {
      console.log('friendsList success');
    },
  });
  const { mutate: joinMutate } = useMutation({
    mutationFn: args => joinPublicCircle(args.userId, args.circleId),
    onSuccess: () => {
      console.log('joinMutation success');
      queryClient.invalidateQueries('circle');
    },
  });

  const handleInvite = (userId, circleId) => {
    setShowToast(true);
    setToastMessage('해당 사용자를 초대했습니다.');
    joinMutate({ userId, circleId }, { onSuccess: () => refetch() });
  };

  // 버튼 객체를 별도로 분리
  const personAddButton = {
    icon: require('../../assets/icons/person_add.png'),
    style: styles.personAddIcon,
    onPress: handleInvite,
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <FlatList
        style={{ width: '100%', marginTop: 9 }}
        data={friendsList}
        renderItem={({ item }) => (
          <FriendItem userId={item.requesterId} circleId={circleId} personAddButton={personAddButton} />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ fontFamily: 'IropkeBatang', marginTop: 30, color: '#78716C', textAlign: 'center' }}>
            초대할 친구가 없습니다.
          </Text>
        }
      />
      <CustomToast show={showToast} text={toastMessage} />
    </View>
  );
};

export default InviteUser;
