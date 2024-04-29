import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../config/firebase";
const uploadProfileImage = async ({ imageURL, email }) => {
  const response = await fetch(imageURL);
  const blob = await response.blob();
  const storage = getStorage(app);
  const storageRef = ref(storage, `profileImages/${email}`);
  const snapshot = await uploadBytes(storageRef, blob);
  console.log("Uploaded a blob or file!");
  const downloadURL = await getDownloadURL(snapshot.ref);

  return downloadURL;
};
export default uploadProfileImage;
