import { Box, Divider, Typography } from '@mui/material';
import PostItem from './PostItem';
import CreatePost from './CreatePost';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  addPostDoc,
  addReplyDoc,
  deletePostDoc,
  deleteReplyDoc,
  getClubPosts,
} from '../../../lib/firebase/firestore';
import { useAuth } from '../../../providers/authProvider';
import { useUser } from '../../../providers/userProvider';

function Forum({ isLeader }) {
  const { clubId } = useParams();
  const { auth } = useAuth();
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [invokeFetchPosts, setInvokeFetchPosts] = useState(true);

  const fetchPosts = useCallback(async () => {
    if (!clubId) return;

    try {
      const posts = await getClubPosts(clubId);
      setPosts(posts);
    } catch (error) {
      console.error(error);
    }
  }, [clubId]);

  useEffect(() => {
    if (invokeFetchPosts) {
      fetchPosts();
      setInvokeFetchPosts(false);
    }
  }, [invokeFetchPosts, fetchPosts]);

  useEffect(() => {
    fetchPosts();
    setInvokeFetchPosts(false);
  }, [clubId, fetchPosts]);

  const handleDelete = async (postId) => {
    if (!clubId) return;

    await deletePostDoc(clubId, postId);
    setInvokeFetchPosts(true);
  };

  const handleAddPost = async (content, isAnon) => {
    if (!auth || !user) return;

    const authorName = isAnon
      ? 'Anonymous'
      : `${user.firstName} ${user.lastName}`;
    const postData = {
      authorId: auth.uid,
      content,
      authorName,
    };
    await addPostDoc(clubId, postData);
    setInvokeFetchPosts(true);
  };

  const handleDeleteReply = async (postId, replyId) => {
    try {
      await deleteReplyDoc(clubId, postId, replyId);
      setInvokeFetchPosts(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddReply = async (postId, content, isAnon) => {
    const authorName = isAnon
      ? 'Anonymous'
      : `${user.firstName} ${user.lastName}`;

    const replyData = {
      authorId: auth.uid,
      authorName,
      content,
    };

    try {
      await addReplyDoc(clubId, postId, replyData);
      setInvokeFetchPosts(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Typography variant='h5' mb={2} mt={4}>
        Club Forum
      </Typography>
      <CreatePost onSubmit={handleAddPost} />
      <Divider sx={{ my: 4 }} />
      <Box mt={1}>
        {auth &&
          posts.length > 0 &&
          posts.map(
            ({ content, authorName, createdAt, postId, authorId, replies }) => (
              <PostItem
                key={postId}
                postId={postId}
                content={content}
                name={authorName}
                createdAt={createdAt}
                onDelete={() => handleDelete(postId)}
                canDelete={authorId === auth.uid}
                replies={replies}
                currentAuthUid={auth.uid}
                onDeleteReply={handleDeleteReply}
                onAddReply={handleAddReply}
                isLeader={isLeader}
              />
            )
          )}
      </Box>
    </Box>
  );
}

export default Forum;
