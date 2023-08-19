import { FC, useEffect, useState } from "react";
import { SettingsHeader } from "./Settings-component/Header";
import { FetchUserInfo } from "@/methods/Fetch";
import { EmptyUserInfo, UserInfo } from "@/methods/Type";
import { fireAuth } from "@/methods/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

export const SettingsInit: FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(EmptyUserInfo);
  const [currentUserId, setCurrentUserId] = useState("");
  const [path, setPath] = useState("");
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(fireAuth, (currentUser) => {
      setCurrentUserId(currentUser?.uid ?? "");
    });
  }, []);

  useEffect(() => {
    FetchUserInfo(currentUserId, setUserInfo, () => {
      router.push("/");
    });
  }, [currentUserId]);

  return (
    <div className="w-screen h-screen pt-12 bg-gradient-to-t from-blue-200 to-blue-50 text-blue-950">
      <SettingsHeader
        userInfo={userInfo}
        currentUserId={currentUserId}
        path={path}
        setPath={setPath}
      />
      <div className="flex justify-center pt-[45vh]">
        <div className="text-blue-900 text-xl px-8 border-b-4 border-blue-200">
          上のリボンからご希望の設定項目を選択してください。
        </div>
      </div>
    </div>
  );
};
