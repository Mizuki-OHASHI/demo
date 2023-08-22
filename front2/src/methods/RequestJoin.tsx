import { MyError } from "@/methods/Type";
import { GetDateTime } from "./Tools";
import { rejects } from "assert";

const uri = process.env.NEXT_PUBLIC_BACK_END_URI;
const ver = process.env.NEXT_PUBLIC_BACK_END_VERSION;

// ------------ JOIN ------------
export const RequestJoinChannel = async (
  userId: string,
  channelId: string | undefined,
  password: string,
  owner: boolean
) => {
  if (channelId == undefined) {
    alert("チャンネルを選択してください");
    return;
  }
  try {
    const res = await fetch(`${uri}/v${ver}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: userId,
        direction: "channel",
        id: channelId,
        password: password,
        owner: owner,
      }),
    });

    const error = (await res.json()) as MyError;

    if (error.code != 0) {
      alert(
        `エラー
        ${error.detail}`
      );
      return false;
    }

    alert("チャンネルに参加しました");
    return true;
  } catch (err) {
    alert("サーバーとの接続に失敗しました at RequestJoinChannel");
    console.error(err);
    return false;
  }
};

export const RequestJoinWorkspace = async (
  userId: string,
  workspaceId: string | undefined,
  password: string,
  owner: boolean
) => {
  if (workspaceId == undefined) {
    alert("ワークスペースを選択してください");
    return false;
  }
  try {
    const res = await fetch(`${uri}/v${ver}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: userId,
        direction: "workspace",
        id: workspaceId,
        password: password,
        owner: owner,
      }),
    });

    const error = (await res.json()) as MyError;

    if (error.code != 0) {
      alert(
        `エラー
        ${error.detail}`
      );
      return false;
    }

    alert("ワークスペースに参加しました");
    return true;
  } catch (err) {
    alert("サーバーとの接続に失敗しました at RequestJoinWorkspace");
    console.error(err);
    return false;
  }
};
