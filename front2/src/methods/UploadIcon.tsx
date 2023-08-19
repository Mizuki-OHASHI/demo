import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { storage } from "@/methods/firebase";
import { ref, uploadBytes } from "firebase/storage";
import imageCompression from "browser-image-compression";
import { v4 as uuidv4 } from "uuid";
import { ShowIcon } from "@/methods/ShowIcon";
import { PhotoOff } from "tabler-icons-react";

type Props = {
  imageUrl: string;
  setImageUrl: Dispatch<SetStateAction<string>>;
};

export const UploadIcon: FC<Props> = (props) => {
  const isImageFile = (file: File): boolean => {
    return file.type.startsWith("image/");
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!(file && isImageFile(file))) {
      return;
    }

    const options = {
      maxWidthOrHeight: 100,
    };

    imageCompression(file, options)
      .then((compressedFile) => {
        // console.log("File compressed successfully");

        const imageUrl = uuidv4();

        // console.log("Image URL:", imageUrl);
        const storageRef = ref(storage, imageUrl);

        uploadBytes(storageRef, compressedFile)
          .then((snapshot) => {
            // console.log(snapshot.ref);
            // console.log("File uploaded successfully");
            props.setImageUrl(imageUrl);
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
          });
      })
      .catch((error) => {
        // console.log(error.message);
      });
  };

  return (
    <div>
      <div className="h-8 w-48 rounded-lg border-2 border-blue-900 flex bg-blue-50 text-blue-900 mb-2 hover:bg-blue-200">
        <label className="m-auto">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          画像のアップロード
        </label>
      </div>
      <div className="w-48 h-48 flex bg-blue-50 rounded-xl">
        {props.imageUrl ? (
          <ShowIcon iconId={props.imageUrl} iconSize={192} onClick={() => {}} />
        ) : (
          <PhotoOff size={48} color="darkblue" className="m-auto" />
        )}
      </div>
    </div>
  );
};
