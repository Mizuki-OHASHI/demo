import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { UserInfo } from "@/methods/Type";
import { DropdownMenus } from "./Header-component/DropdownMenu";
import {
  BrandSamsungpass,
  InfoCircle,
  EditCircle,
  Logout,
  Settings,
  Home,
  Trash,
} from "tabler-icons-react";
import { LogOut } from "@/methods/Authenticate";
import { useRouter } from "next/router";
import { ShowIcon } from "@/methods/ShowIcon";

type Props = {
  userInfo: UserInfo;
  currentUserId: string;
  path: string;
  setPath: Dispatch<SetStateAction<string>>;
};

export const SettingsHeader: FC<Props> = (props) => {
  const userMenus = [
    {
      label: "ユーザー情報照会",
      path: `/user`,
      icon: <InfoCircle size={16} />,
    },
    {
      label: "ユーザー情報編集",
      path: `/user?option=edit`,
      icon: <EditCircle size={16} />,
    },
    {
      label: "アカウント削除",
      path: `/user?option=delete`,
      icon: <Trash size={16} color="red" />,
      isRed: true,
    },
  ];

  const channelMenus = [
    {
      label: "チャンネル情報照会",
      path: "/channel",
      icon: <InfoCircle size={16} />,
    },
    {
      label: "チャンネル情報編集",
      path: "/channel?option=edit",
      icon: <EditCircle size={16} />,
    },
    {
      label: "チャンネル削除",
      path: `/channel?option=delete`,
      icon: <Trash size={16} />,
      isRed: true,
    },
  ];

  const workspaceMenus = [
    {
      label: "ワークスペース情報照会",
      path: "/workspace",
      icon: <InfoCircle size={16} />,
    },
    {
      label: "ワークスペース情報編集",
      path: "/workspace?option=edit",
      icon: <EditCircle size={16} />,
    },
    {
      label: "ワークスペース削除",
      path: "/workspace?option=delete",
      icon: <Trash size={16} />,
      isRed: true,
    },
  ];

  const router = useRouter();
  useEffect(() => {
    router.push(`/settings${props.path}`);
  }, [props.path]);

  return (
    <div className="fixed top-0 left-0 right-0 h-12 w-screen bg-blue-900 text-white flex flex-row z-50">
      <div className="h-12 w-2/12 text-center flex flex-row">
        <button
          className="h-12 w-4/12 my-auto flex flex-row hover:bg-blue-800"
          onClick={() => {
            router.push("/home");
          }}
        >
          <Home className="m-auto" size={32} />
        </button>
        <button
          className="h-12 w-8/12 text-2xl my-auto flex flex-row hover:bg-blue-800"
          onClick={() => {
            props.setPath("");
          }}
        >
          <div className="mx-4 my-auto">設定</div>
          <Settings size={32} className="my-auto" />
        </button>
      </div>
      <DropdownMenus
        path={props.path}
        setPath={props.setPath}
        name="ユーザー設定"
        menues={userMenus}
      />
      <DropdownMenus
        path={props.path}
        setPath={props.setPath}
        name="チャンネル設定"
        menues={channelMenus}
      />
      <DropdownMenus
        path={props.path}
        setPath={props.setPath}
        name="ワークスペース設定"
        menues={workspaceMenus}
      />

      <div className="w-4/12 ">
        <div className="flex flex-row-reverse">
          <div className="h-12">
            <button
              className="h-12"
              onClick={() => {
                LogOut();
                router.push("/");
              }}
            >
              <div className="flex flex-row text-blue-900 hover:bg-blue-800 hover:text-white">
                <Logout size={32} color="white" className="m-2" />
                <div className="text-sm mr-2 my-auto">ログアウト</div>
              </div>
            </button>
          </div>
          <div className="h-12">
            <button
              className="h-12 flex flex-row items-center hover:bg-blue-800"
              onClick={() => {
                router.push(`/settings/user`);
              }}
            >
              <div className="my-auto mx-2">
                <ShowIcon
                  iconId={props.userInfo.user.img}
                  iconSize={32}
                  onClick={() => {}}
                />
              </div>
              <div className="px-2 text-xl text-white py-auto">
                {props.userInfo.user.name}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
