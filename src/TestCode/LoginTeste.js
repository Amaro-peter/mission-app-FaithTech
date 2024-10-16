// Firestore references
const db = firebase.firestore();

// User document
const userDoc = {
  uid: newUser.user.uid,
  email: inputs.email,
  username: inputs.username,
  fullName: inputs.fullName,
  bio: "",
  profilePicURL: "",
  createdAt: Date.now()
};

// Add user document to Firestore
db.collection('users').doc(newUser.user.uid).set(userDoc);

// Adding a follower
const addFollower = (userId, followerId) => {
  db.collection('followers').doc(userId).collection('followers').doc(followerId).set({
    followerId: followerId,
    followedAt: Date.now()
  });
};

// Adding a following
const addFollowing = (userId, followingId) => {
  db.collection('following').doc(userId).collection('following').doc(followingId).set({
    followingId: followingId,
    followedAt: Date.now()
  });
};

// Adding a post
const addPost = (userId, postContent) => {
  const postId = db.collection('posts').doc(userId).collection('posts').doc().id;
  db.collection('posts').doc(userId).collection('posts').doc(postId).set({
    postId: postId,
    content: postContent,
    createdAt: Date.now()
  });
};