import { UserInfo, Workspace } from "@/methods/Type";
import { useRouter } from "next/router";
import { FC } from "react";
import {
  CreateChannel,
  CreateWorkspace,
} from "@/pages-component/Home/Home-component/Sidebar-component/Create";
import {
  JoinChannel,
  JoinWorkspace,
} from "@/pages-component/Home/Home-component/Sidebar-component/Join";
import { ListChannels } from "./Sidebar-component/List";
import { ConvQueryToString } from "@/methods/Tools";
import { ShowIcon } from "@/methods/ShowIcon";

type Props = {
  userInfo: UserInfo;
  currentUserId: string;
  updateUserInfo: () => void;
};

export const Sidebar: FC<Props> = (props) => {
  const router = useRouter();
  const { workspaceid, channelid } = router.query;

  // console.log(props.userInfo);

  const listWorkspaces: FC<Array<Workspace>> = (workspaces) => {
    if (workspaces == null) {
      return <div></div>;
    } else {
      return (
        <div>
          {workspaces.map((w) => {
            if (w.deleted) {
              return <></>;
            }
            return (
              <div
                key={w.id}
                className={`my-2 lex flex-row rounded ${
                  w.id == workspaceid ? "bg-blue-200" : ""
                } hover:bg-blue-100`}
              >
                <button
                  className="w-full text-lg px-2 flex flex-row"
                  onClick={() => {
                    router.push(`/home?workspaceid=${w.id}`);
                  }}
                >
                  <ShowIcon iconId={w.img} iconSize={32} onClick={() => {}} />
                  <div className="px-2 my-auto text-left whitespace-nowrap overflow-x-scroll">
                    {w.name}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-law">
      <div className="w-6/12 h-[calc(100vh-4rem)] m-1 p-1 rounded bg-blue-50">
        <div className="text-xl text-center">ワークスペース</div>
        <div className="my-1 py-1 border-t border-b border-blue-300">
          <JoinWorkspace
            joinedWorkspaces={props.userInfo.workspaces}
            currentUserId={props.currentUserId}
            updateUserInfo={props.updateUserInfo}
          />
          <CreateWorkspace
            currentUserId={props.currentUserId}
            updateUserInfo={props.updateUserInfo}
          />
        </div>
        <div className="overflow-scroll">
          {listWorkspaces(props.userInfo.workspaces)}
        </div>
      </div>
      <div className="w-6/12 h-[calc(100vh-4rem)] m-1 p-1 rounded bg-blue-50">
        <div className="text-xl text-center">チャンネル</div>
        <div className="my-1 py-1 border-t border-b border-blue-300">
          {ConvQueryToString(workspaceid).length == 26 ? (
            <>
              <JoinChannel
                channels={props.userInfo.channels}
                currentUserId={props.currentUserId}
                workspaceId={ConvQueryToString(workspaceid)}
                updateUserInfo={props.updateUserInfo}
              />
              <CreateChannel
                workspaceId={ConvQueryToString(workspaceid)}
                currentUserId={props.currentUserId}
                updateUserInfo={props.updateUserInfo}
              />
            </>
          ) : (
            <div className="text-gray-500 text-center">
              ワークスペースを
              <br />
              選択してください
            </div>
          )}
        </div>
        <ListChannels
          channels={props.userInfo.channels}
          workspaceid={ConvQueryToString(workspaceid)}
          channelid={ConvQueryToString(channelid)}
        />
      </div>
    </div>
  );
};
