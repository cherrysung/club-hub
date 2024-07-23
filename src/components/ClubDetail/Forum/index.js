import { Box, Divider, Typography } from '@mui/material';
import PostItem from './PostItem';
import CreatePost from './CreatePost';
import { useState } from 'react';

export const MOCK_POSTS = [
  {
    postId: 'post-1',
    authorId: 'tdUpDtnhSTeDz3k6GBL3TjMaT6J2',
    authorName: 'Jane Ro',
    createdAt: '2024-02-11 21:51',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    postId: 'post-2',
    authorId: 'tdUpDtnhSTeDz3k6GBL3TjMaT6J2',
    authorName: 'Jane Ro',
    createdAt: '2024-02-11 21:51',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    postId: 'post-3',
    authorId: 'wC1lMegX6UMxuPS3QvpINrebxrn1',
    authorName: 'Cherry Sung',
    createdAt: '2024-02-11 21:51',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
];

function Forum({ clubId }) {
  const [posts, setPosts] = useState(MOCK_POSTS);

  const handleDelete = async (postId) => {
    console.log(postId);
  };

  return (
    <Box>
      <Typography variant='h5' mb={2} mt={4}>
        Club Forum
      </Typography>
      <CreatePost />
      <Divider sx={{ my: 4 }} />
      <Box mt={1}>
        {posts.length > 0 &&
          posts.map(({ content, authorName, createdAt, postId }) => (
            <PostItem
              key={postId}
              postId={postId}
              content={content}
              name={authorName}
              createdAt={createdAt}
              onDelete={() => handleDelete(postId)}
            />
          ))}
      </Box>
    </Box>
  );
}

export default Forum;
