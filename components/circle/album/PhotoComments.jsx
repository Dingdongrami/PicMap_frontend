import { Text, View, Image, Pressable, Dimensions, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { comStyles } from './styles';
import { useEffect, useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Comment from './Comment';
// import { comments } from '../../../data/comment-dummy';
import PersonRow from '../../PersonRow/PersonRow';
import { deleteLike, updateLike } from '../../../api/likeApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addComment, deleteComment, fetchComments } from '../../../api/commentsApi';
import { fetchUser } from '../../../api/userApi';

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
  const [isLiked, setIsLiked] = useState(false); // 좋아요 여부
  const [comment, setComment] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledComplete, setIsScrolledComplete] = useState(false);
  const [isFullScrolled, setIsFullScrolled] = useState(false);
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const height = useSharedValue(40); // 댓글창 높이
  const queryClient = useQueryClient();

  // 댓글 불러오기
  const { data: comments } = useQuery({
    queryKey: ['comments', photo?.id],
    queryFn: () => fetchComments(photo?.id),
    enabled: !!photo?.id,
    staleTime: 1000 * 60 * 60 * 24, // 24시간 동안 캐시된 데이터 사용
  });

  // 댓글 추가하기
  const { mutate: addCommentMutate } = useMutation({
    mutationFn: args => addComment(args.photoId, args.comment),
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
      setIsLiked(true);
    },
  });

  // 댓글 삭제하기
  const { mutate: deleteCommentMutate } = useMutation({
    mutationFn: commentId => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
      setIsLiked(false);
    },
  });

  // 좋아요 추가하기
  const { mutate: updateLikeMutate } = useMutation({
    mutationFn: () => updateLike(photo?.id),
    onSuccess: () => {
      queryClient.invalidateQueries('onePhoto');
    },
  });

  // 좋아요 삭제하기
  const { mutate: deleteLikeMutate } = useMutation({
    mutationFn: () => deleteLike(photo?.id),
    onSuccess: () => {
      queryClient.invalidateQueries('onePhoto');
    },
  });

  const onPressScrollUp = () => {
    if (!isScrolled && !isFullScrolled) {
      // Expanding to partially scrolled state
      height.value = withSpring(height.value + 151, config);
      setIsScrolledComplete(true);
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

  // 댓글 추가할 때
  const handleCommentSubmit = () => {
    if (!comment.trim()) return; // 빈 댓글은 제외

    // 댓글 추가 로직
    addCommentMutate({ photoId: photo?.id, comment: comment.trim() });
    setComment(''); // 댓글 입력창 초기화
  };

  // 댓글 삭제할 때
  const handleCommentDelete = commentId => {
    deleteCommentMutate(commentId);
  };

  // PersonRow 컴포넌트 내에서 각 사용자의 정보를 가져오기
  const UserPersonRow = ({ userId }) => {
    const {
      data: user,
      isLoading,
      isError,
    } = useQuery({
      queryKey: ['user', userId],
      queryFn: () => fetchUser(userId),
    });

    if (isLoading) return <Text>Loading...</Text>;
    if (isError) return <Text>Error loading user</Text>;

    return (
      <PersonRow
        user={user}
        button={{ icon: require('../../../assets/icons/heart.png'), style: { width: 18, height: 18 } }}
      />
    );
  };

  useEffect(() => {
    if (isScrolledComplete) {
      setIsScrolled(true);
      setIsScrolledComplete(false);
    }
  }, [isScrolledComplete]);

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
              if (isLiked) {
                deleteLikeMutate();
                setIsLiked(false);
              } else {
                updateLikeMutate();
                setIsLiked(true);
              }
            }}>
            <Image
              source={require('../../../assets/icons/heart_filled.png')}
              contentFit="cover"
              style={{ width: 18, height: 18 }}
            />
          </Pressable>
          <Pressable onPress={onPressLikeCount}>
            <Text style={comStyles.count}>{photo?.likeCount}</Text>
          </Pressable>
        </View>
      </Pressable>
      <View style={{ flex: 1 }}>
        {isFullScrolled &&
          (isLikeClicked ? (
            <FlatList
              data={comments}
              renderItem={({ item }) => <UserPersonRow userId={item?.userId} />}
              keyExtractor={item => item?.id}
              showsVerticalScrollIndicator={false}
              style={comStyles.commentList}
              ListEmptyComponent={() => <Text style={comStyles.noCommentsText}>좋아요가 없어요.</Text>}
            />
          ) : (
            !isScrolled && (
              <FlatList
                data={comments}
                renderItem={({ item }) => (
                  <Comment
                    comment={item}
                    isFullScrolled={isFullScrolled}
                    onPressDelete={() => handleCommentDelete(item?.id)}
                  />
                )}
                keyExtractor={item => item?.id}
                showsVerticalScrollIndicator={false}
                style={comStyles.commentList}
                ListEmptyComponent={() => <Text style={comStyles.noCommentsText}>댓글이 없어요.</Text>}
              />
            )
          ))}
        {isScrolled && !isFullScrolled && (
          <>
            <View style={comStyles.commentWrapper}>
              {comments?.length > 0 ? (
                <Comment comment={comments[0]} onPressDelete={() => handleCommentDelete(comments[0].id)} />
              ) : (
                <Text style={comStyles.noCommentsText}>댓글이 없어요.</Text>
              )}
            </View>
            <Pressable style={comStyles.moreComment} onPress={onPressScrollUp}>
              <Image source={require('../../../assets/icons/circle_array_btn.png')} style={comStyles.moreCommentIcon} />
            </Pressable>
          </>
        )}
        <TextInput
          value={comment}
          onChangeText={setComment}
          style={comStyles.input}
          placeholder="댓글 달기..."
          onPressIn={onPressInTypeComment}
          onBlur={onBlurTypeComment}
          onSubmitEditing={handleCommentSubmit}
          returnKeyType="send" // 줄바꿈 버튼의 텍스트 설정
        />
      </View>
    </Animated.View>
  );
};
