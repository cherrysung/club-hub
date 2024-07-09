/**
 * The `userProvider` contains the `user` document from Firestore
 * It is used throughout the app for current user's data (ie. name, email, recommendations, etc.)
 * It uses Firestore `onSnapshot` method to listen to live changes on user doc and refreshes the state
 */
