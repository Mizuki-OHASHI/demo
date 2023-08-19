import { LogInWithEmail, LogInWithGoogle } from "@/methods/Authenticate";
import { fireAuth } from "@/methods/firebase";
import { TextInput, PasswordInput, Group, Box, Radio } from "@mantine/core";
import { useForm } from "@mantine/form";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { FC, useState, FormEvent, useEffect } from "react";
import { Registered, Login as LoginIcon } from "tabler-icons-react";

export const Login: FC = () => {
  const [currentUserId, setCurrentUserId] = useState("");
  const router = useRouter();
  const [loginWIth, setLoginWith] = useState("google");

  useEffect(() => {
    onAuthStateChanged(fireAuth, (currentUser) => {
      setCurrentUserId(currentUser?.uid ?? "");
    });
  }, []);

  useEffect(() => {
    if (currentUserId !== "") {
      router.push("/home");
    }
  }, [currentUserId]);

  const loadHomeWithEmailAndPassword = async (values: typeof form.values) => {
    LogInWithEmail(values.email, values.password, setCurrentUserId);
  };

  const loadHomeWithGoogle = async () => {
    LogInWithGoogle(setCurrentUserId);
  };

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "無効なアドレス"),
    },
  });

  return (
    <div className="h-screen w-screen">
      <div className="fixed top-0 left-0 right-0 bg-blue-900 text-white flex flex-row h-12 z-50">
        <div className="font-mono my-auto mx-4">SciConnect</div>
        <div className="h-12 hover:bg-blue-800 ml-auto">
          <button
            onClick={() => {
              router.push("/register");
            }}
            className="flex flex-row w-full h-full mx-2"
          >
            <Registered size={32} className="mx-2 my-auto" />
            <div className="mx-2 my-auto">新規登録</div>
          </button>
        </div>
        <div className="h-12 hover:bg-blue-800">
          <button
            onClick={() => {
              router.push("/login");
            }}
            className="flex flex-row w-full h-full mx-2"
          >
            <LoginIcon size={32} className="mx-2 my-auto" />
            <div className="mx-2 my-auto">ログイン</div>
          </button>
        </div>
      </div>
      <div className="h-full pt-12 w-full bg-gradient-to-r from-blue-300 via-blue-50 to-blue-300 flex">
        <div className="m-auto rounded-2xl border-2 p-8 bg-white border-blue-200">
          <div className="font-mono mx-auto mb-8 mt-2">
            Welcome to SciConnect !
          </div>
          <Box maw={320} mx="auto">
            <Radio.Group
              value={loginWIth}
              onChange={setLoginWith}
              name="loginWith"
              label="ログイン方法を選択"
              withAsterisk
            >
              <Group my="xs">
                <Radio value="google" label="Google アカウントでログインする" />
                <Radio
                  value="email"
                  label="メールアドレスとパスワードでログインする"
                />
              </Group>
            </Radio.Group>
            {loginWIth == "email" ? (
              <form onSubmit={form.onSubmit(loadHomeWithEmailAndPassword)}>
                <TextInput
                  withAsterisk
                  label="メールアドレス"
                  placeholder=""
                  {...form.getInputProps("email")}
                />

                <PasswordInput
                  withAsterisk
                  label="パスワード"
                  placeholder=""
                  {...form.getInputProps("password")}
                />
                <div className="mt-8 flex rounded-lg bg-blue-700 hover:bg-blue-600 text-white">
                  <button type="submit" className="p-2 w-full">
                    メールアドレスとパスワードでログイン
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-8 flex rounded-lg bg-blue-700 hover:bg-blue-600 text-white">
                <button
                  className="mx-auto p-2 w-full"
                  onClick={() => {
                    loadHomeWithGoogle();
                  }}
                >
                  Google アカウントでログイン
                </button>
              </div>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
};
