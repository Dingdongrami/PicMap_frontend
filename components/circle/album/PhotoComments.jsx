import { Text, View, Image, Pressable, Dimensions, TextInput, KeyboardAvoidingView, FlatList } from 'react-native';
import { comStyles } from './styles';
import { useState } from 'react';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import Comment from './Comment';
import { comments } from '../../../data/comment-dummy';
import PersonRow from '../../PersonRow/PersonRow';
import { deleteLike, updateLike } from '../../../api/likeApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Get the full height of the screen
const screenHeight = Dimensions.get('window').height;

// Calculate 90% of the screen height
const fullScreenHeight = screenHeight * 0.9;

const config = {
  damping: 40, // Increase for slower oscillation
  stiffness: 25, // Decrease for slower extension
};

//사진클릭시 접속하는 화면
export const PhotoComments = ({ photo }) => {
  const [heart, setHeart] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFullScrolled, setIsFullScrolled] = useState(false);
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const height = useSharedValue(40);
  const queryClient = useQueryClient();

  const { mutate: updateLikeMutate } = useMutation({
    mutationFn: () => updateLike(photo.id),
    onSuccess: () => {
      queryClient.invalidateQueries('onePhoto');
    },
  });

  const { mutate: deleteLikeMutate } = useMutation({
    mutationFn: () => deleteLike(photo.id),
    onSuccess: () => {
      queryClient.invalidateQueries('onePhoto');
    },
  });

  const onPressScrollUp = () => {
    if (!isScrolled && !isFullScrolled) {
      // Expanding to partially scrolled state
      height.value = withSpring(height.value + 151, config);
      setIsScrolled(true);
    } else if (isScrolled && !isFullScrolled) {
      // Expanding to full-screen (90% of screen height)
      height.value = withSpring(fullScreenHeight, config);
      setIsFullScrolled(true);
      setIsScrolled(false); // Resetting isScrolled
    } else if (isFullScrolled) {
      // Collapsing back to initial state
      height.value = withSpring(40, config);
      setIsFullScrolled(false);
      setIsLikeClicked(false);
    }
  };

  const onPressLikeCount = () => {
    if (isFullScrolled) setIsLikeClicked(!isLikeClicked);
  };

  // 댓글 입력창 눌렀을 때
  const onPressInTypeComment = () => {
    height.value = withSpring(height.value + 260, config);
  };

  // 댓글 입력창 눌렀다가 벗어났을 때
  const onBlurTypeComment = () => {
    height.value = withSpring(height.value - 260, config);
  };

  // console.log(photo);

  return (
    <Animated.View style={[comStyles.scrollCon, { height: height }]}>
      <Pressable style={comStyles.commuBox} onPress={onPressScrollUp}>
        <View style={comStyles.commentInfoBox}>
          <Image
            source={require('../../../assets/icons/comment.png')}
            contentFit="cover"
            style={{ width: 14, height: 14 }}
          />
          <Text style={comStyles.count}>{photo?.commentCount}</Text>
        </View>
        <View style={comStyles.commentInfoBox}>
          <Pressable
            onPress={() => {
              setHeart(!heart);
              heart ? deleteLikeMutate() : updateLikeMutate();
            }}>
            {!heart ? (
              <Image
                source={require('../../../assets/icons/heart_unfilled.png')}
                contentFit="cover"
                style={{ width: 18, height: 18 }}
              />
            ) : (
              <Image
                source={require('../../../assets/icons/heart_filled.png')}
                contentFit="cover"
                style={{ width: 18, height: 18 }}
              />
            )}
          </Pressable>
          <Pressable onPress={onPressLikeCount}>
            <Text style={comStyles.count}>{photo?.likeCount}</Text>
          </Pressable>
        </View>
      </Pressable>
      <View style={{ flex: 1 }}>
        {isFullScrolled ? (
          isLikeClicked ? (
            <FlatList
              data={comments.slice(0, 7)}
              renderItem={({ item }) => (
                <PersonRow
                  user={item.user}
                  button={{ icon: require('../../../assets/icons/heart.png'), style: { width: 18, height: 18 } }}
                />
              )}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              style={comStyles.commentList}
            />
          ) : (
            <FlatList
              data={comments}
              renderItem={({ item }) => <Comment comment={item} isFullScrolled={isFullScrolled} />}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              style={comStyles.commentList}
            />
          )
        ) : (
          <>
            <View style={comStyles.commentWrapper}>
              <Comment comment={comments[0]} />
            </View>
            <Pressable style={comStyles.moreComment} onPress={onPressScrollUp}>
              <Image source={require('../../../assets/icons/circle_array_btn.png')} style={comStyles.moreCommentIcon} />
            </Pressable>
          </>
        )}
        <TextInput
          style={comStyles.input}
          placeholder="댓글 달기..."
          onPressIn={onPressInTypeComment}
          onBlur={onBlurTypeComment}
        />
      </View>
    </Animated.View>
  );
};
