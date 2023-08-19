import { MyError } from "@/methods/Type";

const uri = process.env.NEXT_PUBLIC_BACK_END_URI;
const ver = process.env.NEXT_PUBLIC_BACK_END_VERSION;

// ------------ DELETE ------------
export const RequestDeleteMessage = async (
  messageId: string,
  userId: string,
  updateMessage: () => void
) => {
  try {
    const res = await fetch(`${uri}/v${ver}/message`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: { id: messageId, postedby: userId } }),
    });

    const error = (await res.json()) as MyError;

    if (error.code != 0) {
      alert(
        `エラー
        ${error.detail}`
      );
      return;
    }

    alert("メッセージを削除しました");
    updateMessage();
    return;
  } catch (err) {
    alert("サーバーとの接続に失敗しました9");
    console.error(err);
    return;
  }
};

export const RequestDeleteReply = async (
  replyId: string,
  userId: string,
  updateReply: () => void
) => {
  try {
    const res = await fetch(`${uri}/v${ver}/reply`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reply: { id: replyId, postedby: userId } }),
    });

    const error = (await res.json()) as MyError;

    if (error.code != 0) {
      alert(
        `エラー
        ${error.detail}`
      );
      return;
    }

    alert("メッセージを削除しました");
    updateReply();
    return;
  } catch (err) {
    alert("サーバーとの接続に失敗しました9");
    console.error(err);
    return;
  }
};

export const RequestDeleteUser = async (userId: string) => {
  try {
    const res = await fetch(`${uri}/v${ver}/user`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: { id: userId },
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

    alert("アカウントを削除しました");
    return true;
  } catch (err) {
    alert("サーバーとの接続に失敗しました11");
    console.error(err);
    return false;
  }
};

export const RequestDeleteChannel = async (
  channelId: string,
  userId: string,
  password: string
) => {
  try {
    const res = await fetch(`${uri}/v${ver}/channel`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel: { id: channelId, privatepassword: password },
        userid: userId,
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

    alert("チャンネルを削除しました");
    return true;
  } catch (err) {
    alert("サーバーとの接続に失敗しました11");
    console.error(err);
    return false;
  }
};

export const RequestDeleteWorkspace = async (
  workspaceId: string,
  userId: string,
  privatePw: string
) => {
  try {
    const res = await fetch(`${uri}/v${ver}/workspace`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: userId,
        workspace: {
          id: workspaceId,
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

    alert("ワークスペースを削除しました");
    return true;
  } catch (err) {
    alert("サーバーとの接続に失敗しました11wd");
    console.error(err);
    return false;
  }
};
