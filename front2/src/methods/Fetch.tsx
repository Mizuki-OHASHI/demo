import {
  UserInfo,
  ChannelInfo,
  WorkspaceInfo,
  MessageInfo,
  Workspaces,
  UserStatistics,
  ChannelStatistics,
  WorkspaceStatistics,
} from "@/methods/Type";
import { reload } from "firebase/auth";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

const uri = process.env.NEXT_PUBLIC_BACK_END_URI;
const ver = process.env.NEXT_PUBLIC_BACK_END_VERSION;

//------------ INFO ------------

export const FetchUserInfo = async (
  userId: string,
  setUserInfo: Dispatch<SetStateAction<UserInfo>>,
  routerPushLP: () => void
) => {
  if (userId == "error" || userId.length != 28) {
    return;
  }
  try {
    const res = await fetch(`${uri}/v${ver}/user?id=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const userInfo = (await res.json()) as UserInfo;

    if (userInfo.error.code != 0) {
      alert(
        `エラー
        ${userInfo.error.detail}`
      );
    }

    if (userInfo.user.deleted) {
      alert(
        `アカウントは削除済みです。
        新規登録し直してください`
      );
      routerPushLP();
    }

    setUserInfo(userInfo);
    return;
  } catch (err) {
    alert("サーバーとの接続に失敗しました at FetchUserInfo");
    console.error(err);
    return;
  }
};

export const FetchChannelInfo = async (
  channelId: string,
  setChannelInfo: Dispatch<SetStateAction<ChannelInfo>>
) => {
  if (channelId == undefined || channelId.length != 26) {
    return;
  }
  try {
    const res = await fetch(`${uri}/v${ver}/channel?id=${channelId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const channelInfo = (await res.json()) as ChannelInfo;

    if (channelInfo.error.code != 0) {
      alert(
        `エラー
        ${channelInfo.error.detail}`
      );
    }

    setChannelInfo(channelInfo);
    return;
  } catch (err) {
    alert("サーバーとの接続に失敗しました at FetchChannelInfo");
    console.error(err);
    return;
  }
};

export const FetchWorkspaceInfo = async (
  workspaceId: string,
  setWorkspaceInfo: Dispatch<SetStateAction<WorkspaceInfo>>
) => {
  if (workspaceId == undefined || workspaceId.length != 26) {
    return;
  }
  try {
    const res = await fetch(`${uri}/v${ver}/workspace?id=${workspaceId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const workspaceInfo = (await res.json()) as WorkspaceInfo;

    if (workspaceInfo.error.code != 0) {
      alert(
        `エラー
        ${workspaceInfo.error.detail}`
      );
    }

    setWorkspaceInfo(workspaceInfo);
    return;
  } catch (err) {
    alert("サーバーとの接続に失敗しました at FetchWorkspaceInfo");
    console.error(err);
    return;
  }
};

export const FetchMessageInfo = async (
  messageId: string,
  setMessageInfo: Dispatch<SetStateAction<MessageInfo>>
) => {
  if (messageId == undefined || messageId.length != 26) {
    return;
  }
  try {
    const res = await fetch(`${uri}/v${ver}/message?id=${messageId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const messageInfo = (await res.json()) as MessageInfo;

    if (messageInfo.error.code != 0) {
      alert(
        `エラー
        ${messageInfo.error.detail}`
      );
    }

    setMessageInfo(messageInfo);
    return;
  } catch (err) {
    alert("サーバーとの接続に失敗しました at FetchMessageInfo");
    console.error(err);
    return;
  }
};

//------------ ALL ------------

export const FetchAllWorkspaces = async (
  setWorkspaces: Dispatch<SetStateAction<Workspaces>>
) => {
  try {
    const res = await fetch(`${uri}/v${ver}/join`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const workspaces = (await res.json()) as Workspaces;
    // console.log(workspaces);

    if (workspaces.error.code != 0) {
      alert(
        `エラー
        ${workspaces.error.detail}`
      );
    }

    setWorkspaces(workspaces);
    return;
  } catch (err) {
    alert("サーバーとの接続に失敗しました at FetchAllWorkspaces");
    console.error(err);
    return;
  }
};

//------------ STATISTICS ------------

export const FetchUserStatistics = async (
  userId: string,
  setUserStatistics: Dispatch<SetStateAction<UserStatistics>>
) => {
  try {
    const res = await fetch(
      `${uri}/v${ver}/statistics?type=user&id=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const us = (await res.json()) as UserStatistics;
    // console.log(us);

    if (us.error.code != 0) {
      alert(
        `エラー
        ${us.error.detail}`
      );
    }
    // console.log(us);

    setUserStatistics(us);
    return;
  } catch (err) {
    alert("サーバーとの接続に失敗しました at FetchUserStatistics");
    console.error(err);
    return;
  }
};

export const FetchChannelStatistics = async (
  channelId: string,
  setChannelStatistics: Dispatch<SetStateAction<ChannelStatistics>>
) => {
  if (channelId == undefined || channelId.length != 26) {
    return;
  }
  try {
    const res = await fetch(
      `${uri}/v${ver}/statistics?type=channel&id=${channelId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const us = (await res.json()) as ChannelStatistics;
    // console.log(us);

    if (us.error.code != 0) {
      alert(
        `エラー
        ${us.error.detail}`
      );
    }
    // console.log(us);

    setChannelStatistics(us);
    return;
  } catch (err) {
    alert("サーバーとの接続に失敗しました at FetchChannelStatistics");
    console.error(err);
    return;
  }
};

export const FetchWorkspaceStatistics = async (
  workspaceId: string,
  setWorkspaceStatistics: Dispatch<SetStateAction<WorkspaceStatistics>>
) => {
  if (workspaceId == undefined || workspaceId.length != 26) {
    return;
  }
  try {
    const res = await fetch(
      `${uri}/v${ver}/statistics?type=workspace&id=${workspaceId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const us = (await res.json()) as WorkspaceStatistics;
    // console.log(us);

    if (us.error.code != 0) {
      alert(
        `エラー
        ${us.error.detail}`
      );
    }
    // console.log(us);

    setWorkspaceStatistics(us);
    return;
  } catch (err) {
    alert("サーバーとの接続に失敗しました at FetchWorkspaceStatistics");
    console.error(err);
    return;
  }
};
