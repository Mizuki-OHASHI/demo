import { Image } from "@mantine/core";
import { useRouter } from "next/router";
import { ChangeEvent, FC, useEffect } from "react";
import {
  Registered,
  Login,
  Number1,
  Point,
  Number2,
  Number3,
  Number4,
  Number5,
} from "tabler-icons-react";

export const LP: FC = () => {
  const router = useRouter();
  return (
    <div className="h-screen w-screen">
      <div className="fixed top-0 left-0 right-0 bg-blue-900 text-white flex flex-row h-12 z-50">
        <div className="font-mono my-auto mx-4">SciConnect</div>
        <div className="h-12 hover:bg-blue-800 ml-auto">
          <button
            onClick={() => {
              router.push("/register");
            }}
            className="flex flex-row w-full h-full mx-2"
          >
            <Registered size={32} className="mx-2 my-auto" />
            <div className="mx-2 my-auto">新規登録</div>
          </button>
        </div>
        <div className="h-12 hover:bg-blue-800">
          <button
            onClick={() => {
              router.push("/login");
            }}
            className="flex flex-row w-full h-full mx-2"
          >
            <Login size={32} className="mx-2 my-auto" />
            <div className="mx-2 my-auto">ログイン</div>
          </button>
        </div>
      </div>
      <div className="w-full pt-12">
        <div className="w-full h-96 bg-gradient-to-r from-blue-900 to-blue-50 flex flex-row">
          <div className="w-6/12 h-96 text-blue-50">
            <div className="m-24">
              <div className="font-mono text-4xl">Welcome to SciConnect !</div>
              <div className="p-4">
                SciConnect は
                <br />
                理科生が理系のために開発した
                <br />
                コミュニケーションツールです.
              </div>
            </div>
          </div>
          <div className="w-6/12 h-96 text-white flex">
            <div className="ml-auto m-24 ">
              <div className="h-12 bg-blue-900 hover:bg-blue-800 rounded m-4 ">
                <button
                  onClick={() => {
                    router.push("/register");
                  }}
                  className="flex flex-row w-full h-full mx-2"
                >
                  <Registered size={32} className="mx-2 my-auto" />
                  <div className="mx-2 my-auto">新規登録</div>
                </button>
              </div>
              <div className="h-12 bg-blue-900 hover:bg-blue-800 rounded m-4">
                <button
                  onClick={() => {
                    router.push("/login");
                  }}
                  className="flex flex-row w-full h-full mx-2"
                >
                  <Login size={32} className="mx-2 my-auto" />
                  <div className="mx-2 my-auto">ログイン</div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-auto h-24 bg-gradient-to-b from-blue-900 to-blue-800 flex flex-row">
          <div className="flex flex-row text-blue-50 text-2xl font-mono m-auto">
            <div className="my-auto">SciConnect を推す</div>
            <Number5 size={48} color="skyblue" />
            <div className="my-auto">つの理由。</div>
          </div>
        </div>
        <div className="w-full h-96 bg-gradient-to-l from-blue-800 to-blue-200  flex flex-row">
          <div className="w-6/12 h-96 py-12 text-white flex">
            <Image
              src={`${process.env.NEXT_PUBLIC_STORAGE_URI}/SciConnectDemo1.png?alt=media`}
              alt="Demo1 MarkDown"
              fit="contain"
              radius="md"
              height={96 * 4 - 24 * 4}
            />
          </div>
          <div className="w-6/12 h-96 text-white flex flex-col">
            <div className="my-auto mx-12">
              <div className="flex flex-row border-b-2 border-blue-50">
                <Number1 size={64} />
                <div className="my-auto text-2xl">マークダウン記法</div>
              </div>
              <div className="p-4">
                SciConnect は一部マークダウン記法をサポートしています。
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-96 bg-gradient-to-r from-blue-800 to-blue-200  flex flex-row">
          <div className="w-6/12 h-96 text-white flex flex-col">
            <div className="my-auto mx-12">
              <div className="flex flex-row border-b-2 border-blue-50">
                <Number2 size={64} />
                <div className="my-auto text-2xl">KaTeX による数式表示</div>
              </div>
              <div className="p-4">
                SciConnect は KaTeX を導入しています。
                <br />
                数式モードにより, 理系の会話を強力にサポート。
              </div>
            </div>
          </div>
          <div className="w-6/12 h-96 py-16 text-white flex">
            <Image
              src={`${process.env.NEXT_PUBLIC_STORAGE_URI}/SciConnectDemo2.png?alt=media`}
              alt="Demo1 MarkDown"
              fit="contain"
              radius="md"
              height={96 * 4 - 32 * 4}
            />
          </div>
        </div>
        <div className="w-full h-96 bg-gradient-to-l from-blue-800 to-blue-200  flex flex-row">
          <div className="w-6/12 h-96 py-20 text-white flex">
            <Image
              src={`${process.env.NEXT_PUBLIC_STORAGE_URI}/SciConnectDemo3.png?alt=media`}
              alt="Demo1 MarkDown"
              fit="contain"
              radius="md"
              height={96 * 4 - 40 * 4}
            />
          </div>
          <div className="w-6/12 h-96 text-white flex flex-col">
            <div className="my-auto mx-12">
              <div className="flex flex-row border-b-2 border-blue-50">
                <Number3 size={64} />
                <div className="my-auto text-2xl">タイトルの自動生成</div>
              </div>
              <div className="p-4">
                ボタンひとつで本文に合ったタイトルを提案します。
                <br />
                自然言語処理モデルは
                <span className="font-mono"> gpt-3.5-turbo </span>
                を使用しています。
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-96 bg-gradient-to-r from-blue-800 to-blue-200  flex flex-row">
          <div className="w-6/12 h-96 text-white flex flex-col">
            <div className="my-auto mx-12">
              <div className="flex flex-row border-b-2 border-blue-50">
                <Number4 size={64} />
                <div className="my-auto text-2xl">統計情報の参照</div>
              </div>
              <div className="p-4">
                時間帯別のメッセージ投稿件数など, 統計情報を参照できます。
                <br />
                理系心をくすぐること間違いなし。
              </div>
            </div>
          </div>
          <div className="w-6/12 h-96 py-8 text-white flex">
            <Image
              src={`${process.env.NEXT_PUBLIC_STORAGE_URI}/SciConnectDemo4.png?alt=media`}
              alt="Demo1 MarkDown"
              fit="contain"
              radius="md"
              height={96 * 4 - 16 * 4}
            />
          </div>
        </div>
        <div className="w-full h-96 bg-gradient-to-l from-blue-800 to-blue-200  flex flex-row">
          <div className="w-6/12 h-96 py-6 text-white flex">
            <Image
              src={`${process.env.NEXT_PUBLIC_STORAGE_URI}/SciConnectDemo5.png?alt=media`}
              alt="Demo1 MarkDown"
              fit="contain"
              radius="md"
              height={96 * 4 - 12 * 4}
            />
          </div>
          <div className="w-6/12 h-96 text-white flex flex-col">
            <div className="my-auto mx-12">
              <div className="flex flex-row border-b-2 border-blue-50">
                <Number5 size={64} />
                <div className="my-auto text-2xl">シンプルなデザイン</div>
              </div>
              <div className="p-4">
                <span className="font-mono">Simple is the best.</span>
                <br />
                ワークスペースやチャンネルの階層構造も一目でわかります。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// import { useState } from "react";
// import { storage } from "@/methods/firebase";
// import { ref, uploadBytes } from "firebase/storage";
// import imageCompression from "browser-image-compression";
// import { v4 as uuidv4 } from "uuid";
// import { ShowIcon } from "@/methods/ShowIcon";
// import { PhotoOff } from "tabler-icons-react";

// type Props = {
//   imageUrl: string | undefined;
//   setImageUrl: Dispatch<SetStateAction<string | undefined>>;
// };

// export const UploadIcon: FC = () => {
//   const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

//   const isImageFile = (file: File): boolean => {
//     return file.type.startsWith("image/");
//   };

//   const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];

//     if (!(file && isImageFile(file))) {
//       return;
//     }

//     const options = {
//       maxWidthOrHeight: 100,
//     };

//     imageCompression(file, options)
//       .then((compressedFile) => {
//         // console.log("File compressed successfully");

//         const imageUrl_ = uuidv4();

//         // console.log("Image URL:", imageUrl_);
//         const storageRef = ref(storage, imageUrl_);

//         uploadBytes(storageRef, compressedFile)
//           .then((snapshot) => {
//             // console.log(snapshot.ref);
//             // console.log("File uploaded successfully");
//             setImageUrl(imageUrl_);
//           })
//           .catch((error) => {
//             console.error("Error uploading file:", error);
//           });
//       })
//       .catch((error) => {
//         // console.log(error.message); // output: I just want to stop
//       });
//   };

//   return (
//     <div>
//       <div className="h-8 w-48 rounded-lg flex bg-blue-900 text-blue-100 mb-2">
//         <label className="m-auto">
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileUpload}
//             className="hidden"
//           />
//           画像のアップロード
//         </label>
//       </div>
//       <div className="w-48 h-48 flex bg-blue-50 rounded-xl">
//         {imageUrl ? (
//           <ShowIcon iconId={imageUrl} iconSize={192} onClick={() => {}} />
//         ) : (
//           <PhotoOff size={48} color="darkblue" className="m-auto" />
//         )}
//       </div>
//     </div>
//   );
// };

// export const App: FC = () => {
//   const [image, setImage] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const handleImage = (event: FormEvent) => {
//     const image = event.target.files[0];
//     setImage(image);
//   };

//   const onSubmit = (event: FormEvent) => {
//     event.preventDefault();
//     if (image === "") {
//       // console.log("ファイルが選択されていません");
//     }
//     // アップロード処理
//     const uploadTask = storage.ref(`/images/${image.name}`).put(image);
//     uploadTask.on(
//       firebase.storage.TaskEvent.STATE_CHANGED,
//       next,
//       error,
//       complete
//     );
//   };

//   const next = (snapshot) => {
//     // 進行中のsnapshotを得る
//     // アップロードの進行度を表示
//     const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     // console.log(percent + "% done");
//     // console.log(snapshot);
//   };
//   const error = (error: any) => {
//     // エラーハンドリング
//     // console.log(error);
//   };

//   const complete = () => {
//     // 完了後の処理
//     // 画像表示のため、アップロードした画像のURLを取得
//     storage
//       .ref("images")
//       .child(image.name)
//       .getDownloadURL()
//       .then((fireBaseUrl: React.SetStateAction<string>) => {
//         setImageUrl(fireBaseUrl);
//       });
//   };

//   return (
//     <div className="App">
//       <h1>画像アップロード</h1>
//       <form onSubmit={onSubmit}>
//         <input type="file" onChange={handleImage} />
//         <button>Upload</button>
//       </form>
//       <Image src={imageUrl} alt="uploaded" />
//     </div>
//   );
// };

// {
//   /* {selectedFile && (
//         <div>
//           <p>Selected file: {selectedFile.name}</p>
//           <button onClick={() => downloadFile(selectedFile.name)}>
//             Download File
//           </button>
//         </div>
//       )} */
// }
// {
//   /* <div>Image Display</div>
//       {imageUrl ? (
//         <Image src={imageUrl} alt="Image" />
//       ) : (
//         <p>Loading image...</p>
//       )} */
// }

// -------------------------

// const imageCompressor = async (file: File): Promise<boolean> => {
//   const options = {
//     maxWidthOrHeight: 100,
//   };

//   imageCompression(file, options)
//     .then((compressedFile) => {
//       setSelectedFile(compressedFile); // write your own logic
//       // console.log("setSelectedFile(compressedFile)");
//       // console.log(file);
//       // console.log(selectedFile);
//       return true;
//     })
//     .catch((error) => {
//       // console.log(error.message); // output: I just want to stop
//     });
// };

// const handleFileUpload2 = async (event: ChangeEvent<HTMLInputElement>) => {
//   const file = event.target.files?.[0];

//   // console.log("test");
//   if (file) {
//     // console.log(await imageCompressor(file));
//   }

//   if (
//     file &&
//     isImageFile(file) &&
//     (await imageCompressor(file)) &&
//     selectedFile
//   ) {
//     const storageRef = ref(storage, selectedFile.name);

//     // console.log("storageRef");

//     uploadBytes(storageRef, selectedFile)
//       .then((snapshot) => {
//         // console.log(snapshot.ref);
//         // console.log("File uploaded successfully");
//       })
//       .catch((error) => {
//         console.error("Error uploading file:", error);
//       });
//   }
// };

// const downloadFile = (fileName: string) => {
//   const storageRef = ref(storage, fileName);

//   getDownloadURL(storageRef)
//     .then((url) => {
//       // console.log("File download URL:", url);
//       window.open(url, "_blank"); // Open the download URL in a new window
//     })
//     .catch((error) => {
//       console.error("Error downloading file:", error);
//     });
// };

// useEffect(() => {
//   const getImage = async () => {
//     try {
//       const imageRef = ref(storage, "images/my-image.jpg");
//       const downloadUrl = await getDownloadURL(imageRef);
//       setImageUrl(downloadUrl);
//     } catch (error) {
//       console.error("Error getting image:", error);
//     }
//   };

//   getImage();
// }, []);
