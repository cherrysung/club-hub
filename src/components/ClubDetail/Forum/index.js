import { Box, Divider, Typography } from "@mui/material";
import PostItem from "./PostItem";
import CreatePost from "./CreatePost";
import { useCallback, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "../../../lib/firebase/init";
import { useParams } from "react-router-dom";

const firestore = getFirestore(app);

function Forum() {
  const { clubId } = useParams();
  const [posts, setPosts] = useState([]);
  const [invokeFetchPosts, setInvokeFetchPosts] = useState(true);

  const fetchPosts = useCallback(async () => {
    if (!clubId) return;
    if (!invokeFetchPosts) return;

    const clubPostColRef = collection(firestore, "clubs", clubId, "posts");

    const q = query(clubPostColRef, orderBy("createdAt", "desc"));

    try {
      const postArray = [];
      const querySnapshot = await getDocs(q);

      for (const doc of querySnapshot.docs) {
        if (doc.exists()) {
          const postData = doc.data();
          const postId = doc.id;

          postArray.push({
            ...postData,
            postId,
          });
        }
      }

      setPosts(postArray);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  }, [clubId]);

  useEffect(() => {
    if (invokeFetchPosts) {
      fetchPosts();
      setInvokeFetchPosts(false);
    }
  }, [invokeFetchPosts, fetchPosts]);

  const handleDelete = async (postId) => {
    if (!clubId) return;

    const postRef = doc(firestore, "clubs", clubId, "posts", postId);
    await deleteDoc(postRef);
    setInvokeFetchPosts(true);
  };

  const handleAddPost = async (content, isAnon) => {
    const clubPostColRef = collection(firestore, "clubs", clubId, "posts");

    const authorName = isAnon ? "Anonymous" : "Cherry Sung";
    await addDoc(clubPostColRef, {
      createdAt: serverTimestamp(),
      authorId: "wC1lMegX6UMxuPS3QvpINrebxrn1",
      content,
      authorName,
    });
    setInvokeFetchPosts(true);
  };

  return (
    <Box>
      <Typography variant="h5" mb={2} mt={4}>
        Club Forum
      </Typography>
      <CreatePost onSubmit={handleAddPost} />
      <Divider sx={{ my: 4 }} />
      <Box mt={1}>
        {posts.length > 0 &&
          posts.map(({ content, authorName, createdAt, postId, authorId }) => (
            <PostItem
              key={postId}
              postId={postId}
              content={content}
              name={authorName}
              createdAt={createdAt}
              onDelete={() => handleDelete(postId)}
              canDelete={authorId === "wC1lMegX6UMxuPS3QvpINrebxrn1"}
            />
          ))}
      </Box>
    </Box>
  );
}

export default Forum;
