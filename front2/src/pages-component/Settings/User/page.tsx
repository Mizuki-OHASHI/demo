import { FC, useEffect, useState } from "react";
import { SettingsHeader } from "../Settings-component/Header";
import { FetchUserInfo, FetchUserStatistics } from "@/methods/Fetch";
import {
  EmptyUserInfo,
  EmptyUserStatistics,
  UserInfo,
  UserStatistics,
} from "@/methods/Type";
import { fireAuth } from "@/methods/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ListWorkspaceAndChannel } from "./User-component/ListWorkspaceAndChannel";
import { ShowUserStatistics } from "./User-component/UserStatistics";
import { BasicUserInfo } from "./User-component/BasicUserInfo";
import { useRouter } from "next/router";

export const SettingsUser: FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(EmptyUserInfo);
  const [currentUserId, setCurrentUserId] = useState("");
  const [path, setPath] = useState("/user");
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

  const [userStatistics, setUserStatistics] =
    useState<UserStatistics>(EmptyUserStatistics);

  useEffect(() => {
    if (currentUserId !== undefined) {
      FetchUserStatistics(currentUserId, setUserStatistics);
    }
  }, [currentUserId]);

  return (
    <div className="w-screen h-screen text-blue-950">
      <SettingsHeader
        userInfo={userInfo}
        currentUserId={currentUserId}
        path={path}
        setPath={setPath}
      />
      <div className="h-screen pt-12 flex flex-row">
        <div className="w-4/12 m-4 p-8 rounded-2xl bg-blue-50 whitespace-nowrap overflow-y-scroll">
          <BasicUserInfo
            currentUserId={currentUserId}
            userInfo={userInfo}
            onEdited={() =>
              FetchUserInfo(currentUserId, setUserInfo, () => {
                router.push("/");
              })
            }
          />
        </div>
        <div className="w-4/12 border-y-4 border-blue-50 m-4 p-8 rounded-2xl bg-blue-50  whitespace-nowrap overflow-y-scroll">
          <ListWorkspaceAndChannel
            channels={userInfo.channels}
            workspaces={userInfo.workspaces}
          />
        </div>
        <div className="w-4/12 m-4 p-8 rounded-2xl bg-blue-50">
          <ShowUserStatistics userStatistics={userStatistics} />
        </div>
      </div>
    </div>
  );
};
