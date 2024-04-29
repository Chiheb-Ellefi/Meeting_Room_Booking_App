import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../config/firebase";
const uploadImages = async ({ imageURLs, roomName }) => {
  console.log(imageURLs);
  let downloadURLs = [];
  await Promise.all(
    imageURLs.map(async (uri, index) => {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storage = getStorage(app);
      const storageRef = ref(storage, `${roomName}/${index}`);
      const snapshot = await uploadBytes(storageRef, blob);
      console.log("Uploaded a blob or file!");

      const downloadURL = await getDownloadURL(snapshot.ref);
      downloadURLs.push(downloadURL);
    })
  );
  return downloadURLs;
};
export default uploadImages;
