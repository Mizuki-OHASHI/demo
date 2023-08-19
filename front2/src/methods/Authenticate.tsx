import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { fireAuth } from "@/methods/firebase";
import { Dispatch, SetStateAction } from "react";

export const CurrentUserId = (): string => {
  return fireAuth.currentUser?.uid ?? "";
};

export const LogOut = (): void => {
  if (confirm("ログアウトしますか？")) {
    signOut(fireAuth)
      .then(() => {
        alert("ログアウトに成功しました");
      })
      .catch((err) => {
        alert(err);
      });
  }
};

export const LogInWithGoogle = async (
  setCurrentUserId: Dispatch<SetStateAction<string>>
) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(fireAuth, provider)
    .then((res) => {
      const user = res.user;
      alert(`ログイン中のユーザー: ${user.displayName}`);
      setCurrentUserId(user.uid);
    })
    .catch((err) => {
      const errorMessage = err.message;
      alert(errorMessage);
    });
};

export const LogInWithEmail = async (
  email: string,
  pwd: string,
  setCurrentUserId: Dispatch<SetStateAction<string>>
) => {
  const auth = getAuth();
  // setPersistence(auth, browserSessionPersistence);
  signInWithEmailAndPassword(auth, email, pwd)
    .then((res) => {
      const user = res.user;
      alert(`ログイン中のユーザー: ${user.email}`);
      setCurrentUserId(user.uid);
    })
    .catch((err) => {
      const errorCode = err.code;
      const errorMessage = err.message;
      switch (errorCode) {
        case "auth/wrong-password":
          alert("パスワードが違います");
        case "auth/user-not-found":
          if (
            confirm(
              `アカウントが見つかりません
              このメールアドレスとパスワードで新規登録しますか？
              Email: ${email}
              Password: ${pwd}`
            )
          ) {
            RegisterWithEmail(email, pwd, CurrentUserId);
          }
          return;
        case "auth/invalid-email;":
          alert("メールアドレスが無効です");
          return;
        case "auth/user-disabled;":
          alert("アカウントが無効です");
          return;
        default:
          alert(`${errorCode} : ${errorMessage}`);
          return;
      }
    });
};

export const RegisterWithEmail = async (
  email: string,
  pwd: string,
  setCurrentUserId: Dispatch<SetStateAction<string>>
) => {
  if (
    confirm(
      `このメールアドレスとパスワードで新規登録しますか？
        Email: ${email}
        Password: ${pwd}`
    )
  ) {
    const auth = getAuth();
    // setPersistence(auth, browserSessionPersistence);
    createUserWithEmailAndPassword(auth, email, pwd)
      .then((res) => {
        const user = res.user;
        alert(`ログイン中のユーザー: ${user.email}`);
        setCurrentUserId(user.uid);
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;

        switch (errorCode) {
          case "auth/email-already-in-use":
            if (
              confirm(
                `すでに Fire Base アカウントが存在します。
                引き続き新規登録手続きを行いますか？`
              )
            ) {
              LogInWithEmail(email, pwd, setCurrentUserId);
            }
            return;
          case "auth/weak-password":
            alert("パスワードが脆弱です");
            return;
          case "auth/invalid-email":
            alert("メールアドレスが無効です");
            return;
          case "auth/operation-not-allowed":
            alert("操作が許可されていません");
            return;
          default:
            alert(`${errorCode} : ${errorMessage}`);
            return;
        }
      });
  }
};
