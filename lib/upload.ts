import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase.config";

export const uploadFile = async (file: File, folder: string) => {
  const filename = uuidv4();
  const storageRef = ref(
    storage,
    `${folder}/${filename}.${file.name.split(".").pop()}`
  );
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  return { url, alt: file.name.split(".")[0] };
};

export const uploadFiles = async (files: File[], folder: string) => {
  const uploadPromises = await Promise.all(
    files.map(async (file) => uploadFile(file, folder))
  );

  const fileUrls = await Promise.all(uploadPromises);

  return fileUrls;
};
