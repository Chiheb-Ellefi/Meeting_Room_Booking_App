import { getStorage, ref, deleteObject } from "firebase/storage";
import { app } from "../../config/firebase";
const deleteImagesfromFirebase = async ({ roomName, length }) => {
  const storage = getStorage(app);
  for (let index = 0; index < length; index++) {
    const desertRef = ref(storage, `${roomName}/${index}`);
    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        console.log("files deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
export default deleteImagesfromFirebase;
