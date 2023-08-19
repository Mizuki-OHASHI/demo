import { FC, useEffect, useState } from "react";
import { SettingsHeader } from "../Settings-component/Header";
import {
  FetchWorkspaceInfo,
  FetchWorkspaceStatistics,
  FetchUserInfo,
} from "@/methods/Fetch";
import {
  WorkspaceInfo,
  WorkspaceStatistics,
  EmptyWorkspaceInfo,
  EmptyWorkspaceStatistics,
  EmptyUserInfo,
  UserInfo,
} from "@/methods/Type";
import { fireAuth } from "@/methods/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { BasicWorkspaceInfo } from "./Workspace-component/BasicWorkspaceInfo";
import { ShowWorkspaceStatistics } from "./Workspace-component/WorkspaceStatistics";
import { ListMember } from "../Settings-component/ListMember";
import { useRouter } from "next/router";
import { Select } from "@mantine/core";
import { ConvQueryToString } from "@/methods/Tools";

export const SettingsWorkspace: FC = () => {
  const router = useRouter();
  const { option, workspaceid } = router.query;
  const [userInfo, setUserInfo] = useState<UserInfo>(EmptyUserInfo);
  const [workspaceInfo, setWorkspaceInfo] =
    useState<WorkspaceInfo>(EmptyWorkspaceInfo);
  const [currentUserId, setCurrentUserId] = useState("");
  const [path, setPath] = useState("/workspace");
  const [workspaceId, setWorkspaceId] = useState<string | null>(
    ConvQueryToString(workspaceid)
  );
  const [workspaceStatistics, setWorkspaceStatistics] =
    useState<WorkspaceStatistics>(EmptyWorkspaceStatistics);
  const [workspaces, setWorkspaces] = useState<
    Array<{ value: string; label: string }>
  >([]);

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

  useEffect(() => {
    if (workspaceId !== "") {
      router.push(
        `/settings/workspace?workspaceid=${workspaceId}&option=${ConvQueryToString(
          option
        )}`
      );
    }
  }, [workspaceId]);

  useEffect(() => {
    if (userInfo.workspaces != null) {
      setWorkspaces(
        userInfo.workspaces.map((ch) => {
          return { value: ch.id, label: ch.name };
        })
      );
    }
  }, [userInfo]);

  useEffect(() => {
    FetchWorkspaceStatistics(
      ConvQueryToString(workspaceid),
      setWorkspaceStatistics
    );
    FetchWorkspaceInfo(ConvQueryToString(workspaceid), setWorkspaceInfo);
  }, [workspaceid]);

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
          <div className="mb-8 pb-8 border-b-2 border-blue-200">
            <Select
              placeholder="ワークスペースを１つ選択"
              value={workspaceId}
              onChange={setWorkspaceId}
              data={workspaces}
            />
          </div>
          <BasicWorkspaceInfo
            currentUserId={currentUserId}
            workspace={workspaceInfo.workspace}
            isOwner={
              workspaceInfo.members.find((m) => {
                return m.id == currentUserId;
              })?.flag ?? false
            }
          />
        </div>
        <div className="w-4/12 border-y-4 border-blue-50 m-4 p-8 rounded-2xl bg-blue-50  whitespace-nowrap overflow-y-scroll">
          <ListMember members={workspaceInfo.members} />
        </div>
        <div className="w-4/12 m-4 p-8 rounded-2xl bg-blue-50">
          <ShowWorkspaceStatistics workspaceStatistics={workspaceStatistics} />
        </div>
      </div>
    </div>
  );
};
