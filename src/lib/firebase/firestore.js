import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { app } from './init';
import { Button } from '@mui/material';
import data from '../mock.json';

const firestore = getFirestore(app);
const storage = getStorage(app);

export const AddDataButton = () => {
  const handleClick = async () => {
    const batch = writeBatch(firestore);

    data.forEach((clubDoc) => {
      batch.set(doc(firestore, 'clubs', clubDoc.clubId), clubDoc);
    });

    await batch.commit();
  };

  return <Button onClick={handleClick}>Add Club Data</Button>;
};

export const setUserDoc = async (uid, data) => {
  const userRef = doc(firestore, 'users', uid);

  try {
    await setDoc(userRef, {
      ...data,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Failed to set user doc: ', error);
    throw error;
  }
};

export const updateUserDoc = async (uid, data) => {
  const userRef = doc(firestore, 'users', uid);
  try {
    await updateDoc(userRef, data);
  } catch (error) {
    console.error('Failed to update user doc: ', error);
    throw error;
  }
};

export const updateFavorites = async (uid, clubId, isInFavorite) => {
  const userRef = doc(firestore, 'users', uid);

  try {
    if (isInFavorite) {
      await updateDoc(userRef, {
        favorites: arrayRemove(clubId),
      });
    } else {
      await updateDoc(userRef, {
        favorites: arrayUnion(clubId),
      });
    }
  } catch (error) {
    console.error('Failed to update user favorites:', error);
    throw error;
  }
};

export const updateRecommendations = async (uid, payload, recommendations) => {
  const userRef = doc(firestore, 'users', uid);

  const clubIds = recommendations
    .map((rec) => Object.keys(rec)[0])
    .sort((a, b) => +a - +b);

  try {
    await updateDoc(userRef, {
      recommendations: {
        createdAt: serverTimestamp(),
        clubIds,
        payload,
      },
    });
  } catch (error) {
    console.error('Failed to update recommendations: ', error);
    throw error;
  }
};

export const getClubPosts = async (clubId) => {
  const clubPostColRef = collection(firestore, 'clubs', clubId, 'posts');

  const q = query(clubPostColRef, orderBy('createdAt', 'desc'));
  const postsArray = [];
  try {
    const querySnapshot = await getDocs(q);

    for (const doc of querySnapshot.docs) {
      if (doc.exists()) {
        const postData = doc.data();
        const postId = doc.id;

        const replyColRef = collection(
          firestore,
          'clubs',
          clubId,
          'posts',
          postId,
          'replies'
        );
        const repliesQuery = query(replyColRef, orderBy('createdAt', 'asc'));

        const repliesSnapshot = await getDocs(repliesQuery);
        if (!repliesSnapshot.empty) {
          const repliesArray = repliesSnapshot.docs.map((reply) => ({
            ...reply.data(),
            replyId: reply.id,
          }));

          postsArray.push({
            ...postData,
            postId,
            replies: repliesArray,
          });
        } else {
          postsArray.push({
            ...postData,
            postId,
          });
        }
      }
    }

    return postsArray;
  } catch (error) {
    console.error('Failed to fetch posts: ', error);
    throw error;
  }
};

export const addPostDoc = async (clubId, postData) => {
  const clubPostColRef = collection(firestore, 'clubs', clubId, 'posts');

  try {
    await addDoc(clubPostColRef, {
      ...postData,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Failed to add new post: ', error);
    throw error;
  }
};

export const deletePostDoc = async (clubId, postId) => {
  try {
    const postRef = doc(firestore, 'clubs', clubId, 'posts', postId);
    await deleteDoc(postRef);
  } catch (error) {
    console.error('Failed to delete post doc: ', error);
    throw error;
  }
};

export const addReplyDoc = async (clubId, postId, replyData) => {
  const replyPostColRef = collection(
    firestore,
    'clubs',
    clubId,
    'posts',
    postId,
    'replies'
  );

  try {
    await addDoc(replyPostColRef, {
      ...replyData,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Failed to add reply: ', error);
    throw error;
  }
};

export const deleteReplyDoc = async (clubId, postId, replyId) => {
  const replyDocRef = doc(
    firestore,
    'clubs',
    clubId,
    'posts',
    postId,
    'replies',
    replyId
  );

  try {
    await deleteDoc(replyDocRef);
  } catch (error) {
    console.error('Failed to delete reply doc: ', error);
    throw error;
  }
};

export const updateClub = async (clubId, field, newValue) => {
  try {
    const clubDocRef = doc(firestore, 'clubs', clubId);
    await updateDoc(clubDocRef, {
      [field]: newValue,
    });
  } catch (error) {
    console.error('Failed to update club', error);
    throw error;
  }
};

export const updateClubImage = async (clubId, file) => {
  const storageRef = ref(storage, `clubs/${clubId}`);

  try {
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);

    await updateClub(clubId, 'imageSrc', downloadUrl);
  } catch (error) {
    console.error('Failed to update club image', error);
    throw error;
  }
};
