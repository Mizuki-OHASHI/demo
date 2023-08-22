import { MyError } from "@/methods/Type";
import { GetDateTime } from "./Tools";
import { useRouter } from "next/router";

const uri = process.env.NEXT_PUBLIC_BACK_END_URI;
const ver = process.env.NEXT_PUBLIC_BACK_END_VERSION;

// ------------ CREATE ------------
export const RequestCreateUser = async (
  userId: string,
  name: string,
  routerPushHome: () => void
) => {
  // console.log("try to create user ...");
  try {
    const res = await fetch(`${uri}/v${ver}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { id: userId, name: name } }),
    });

    const error = (await res.json()) as MyError;

    if (error.code != 0) {
      alert(
        `エラー
        ${error.detail}`
      );
      return false;
    }

    alert("ユーザーの新規登録に成功しました");

    routerPushHome();
    return true;
  } catch (err) {
    alert("サーバーとの接続に失敗しました at RequestCreateUser");
    console.error(err);
    return false;
  }
};

export const RequestCreateMessage = async (
  userId: string,
  channelId: string,
  title: string,
  body: string,
  updateMessage: () => void
) => {
  try {
    const res = await fetch(`${uri}/v${ver}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          postedby: userId,
          postedat: GetDateTime(),
          channelid: channelId,
          title: title,
          body: body,
        },
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

    alert("メッセージの送信に成功しました");
    updateMessage();
    return true;
  } catch (err) {
    alert("サーバーとの接続に失敗しました at RequestCreateMessage");
    console.error(err);
    return false;
  }
};

export const RequestCreateReply = async (
  userId: string,
  channelId: string,
  title: string,
  body: string,
  updateReply: () => void
) => {
  try {
    const res = await fetch(`${uri}/v${ver}/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reply: {
          postedby: userId,
          postedat: GetDateTime(),
          replyto: channelId,
          title: title,
          body: body,
        },
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

    alert("メッセージの送信に成功しました");
    updateReply();
    return true;
  } catch (err) {
    alert("サーバーとの接続に失敗しました at RequestCreateReply");
    console.error(err);
    return false;
  }
};

export const RequestCreateChannel = async (
  userId: string,
  name: string,
  bio: string,
  publicPw: string,
  privatePw: string,
  workspaceId: string
) => {
  try {
    const res = await fetch(`${uri}/v${ver}/channel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: userId,
        channel: {
          name: name,
          bio: bio,
          createdat: GetDateTime(),
          publicpassword: publicPw,
          privatepassword: privatePw,
          workspaceid: workspaceId,
        },
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

    alert("チャンネルの新規登録に成功しました");
    return true;
  } catch (err) {
    alert("サーバーとの接続に失敗しました at RequestCreateChannel");
    console.error(err);
    return false;
  }
};

export const RequestCreateWorkspace = async (
  userId: string,
  name: string,
  bio: string,
  publicPw: string,
  privatePw: string
) => {
  try {
    const res = await fetch(`${uri}/v${ver}/workspace`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: userId,
        workspace: {
          name: name,
          bio: bio,
          createdat: GetDateTime(),
          publicpassword: publicPw,
          privatepassword: privatePw,
        },
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

    alert("ワークスペースの新規登録に成功しました");
    return true;
  } catch (err) {
    alert("サーバーとの接続に失敗しました at RequestCreateWorkspace");
    console.error(err);
    return false;
  }
};
