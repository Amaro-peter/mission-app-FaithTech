import { db } from '../utils/firebase'; // Adjust the import according to your project structure
import { collection, getDocs, doc, writeBatch } from "firebase/firestore";

const excludeUsers = async () => {
  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);

    if (snapshot.empty) {
      console.log('No users found.');
      return;
    }

    const batch = writeBatch(db);

    snapshot.forEach((document) => {
      if (document.id !== '5A4cQFrlrGS1STTh01DNBWjgsG73') {
        console.log(`Deleting user with ID: ${document.id}`);
        batch.delete(doc(db, 'users', document.id));
      }
    });

    await batch.commit();
    console.log('Excluded all users except the one with UID 5A4cQFrlrGS1STTh01DNBWjgsG73');
  } catch (error) {
    console.error('Error excluding users:', error);
  }
};

export default excludeUsers;