import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { storage } from "@/methods/firebase";
import { ref, uploadBytes } from "firebase/storage";
import imageCompression from "browser-image-compression";
import { v4 as uuidv4 } from "uuid";
import { PhotoOff, PhotoPlus } from "tabler-icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Box, Group, Input, Modal, Slider, Image } from "@mantine/core";

type Props_ = {
  imageUrl: string;
  setImageUrl: Dispatch<SetStateAction<string>>;
  imageWidth: number;
};

const UploadImage: FC<Props_> = (props) => {
  const isImageFile = (file: File): boolean => {
    return file.type.startsWith("image/");
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!(file && isImageFile(file))) {
      return;
    }

    const options = {
      maxWidthOrHeight: 200,
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
    <>
      <Group position="center" mt="sm">
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
      </Group>
      <Group position="center" mt="sm">
        {props.imageUrl ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_STORAGE_URI}/${props.imageUrl}?alt=media`}
            alt={props.imageUrl}
            fit="contain"
            radius="md"
            width={`${props.imageWidth}px`}
          />
        ) : (
          <div className="w-72 h-72 flex bg-blue-50 rounded-xl">
            <PhotoOff size={48} color="darkblue" className="m-auto" />
          </div>
        )}
      </Group>
    </>
  );
};

type Props = {
  setBody: Dispatch<SetStateAction<string>>;
};

export const UploadImageContainer: FC<Props> = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageWidth, setImageWidth] = useState(200);
  const [imageLabel, setImageLabel] = useState("");

  const insertIntoMessageBody = () => {
    props.setBody(
      (body) =>
        body +
        `![${imageLabel}](${process.env.NEXT_PUBLIC_STORAGE_URI}/${imageUrl}?alt=media, ${imageWidth})`
    );
    close();
  };

  const sliderMarks = [
    { value: 100, label: "100px" },
    { value: 200, label: "200px" },
    { value: 300, label: "300px" },
  ];

  return (
    <div>
      <button onClick={open} type="button">
        <PhotoPlus size={32} color="darkblue" />
      </button>
      <Modal opened={opened} onClose={close} title="画像のアップロード">
        <Box maw={400} mx="auto">
          <UploadImage
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            imageWidth={imageWidth}
          />
          {imageUrl.length == 36 ? (
            <>
              <Slider
                value={imageWidth}
                onChange={setImageWidth}
                defaultValue={5}
                color="indigo"
                min={50}
                max={350}
                marks={sliderMarks}
                step={10}
                className="m-4"
              />
              <Input
                value={imageLabel}
                placeholder="画像の説明"
                onChange={(e) => setImageLabel(e.target.value)}
                className="mt-8 mx-8"
              />
              <Group position="center" mt="sm">
                <button
                  onClick={insertIntoMessageBody}
                  className="rounded bg-blue-700 hover:bg-blue-600 p-2 m-2 text-blue-50"
                >
                  メッセージに埋め込む
                </button>
              </Group>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Modal>
    </div>
  );
};
