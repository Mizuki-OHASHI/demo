import { LogInWithGoogle, RegisterWithEmail } from "@/methods/Authenticate";
import { RequestCreateUser } from "@/methods/RequestCreate";
import { Box, Group, PasswordInput, Radio, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Registered, Login as LoginIcon } from "tabler-icons-react";

export const Register: FC = () => {
  const [currentUserId, setCurrentUserId] = useState("");
  const router = useRouter();
  const [registerWith, setRegisterWith] = useState("google");

  // useEffect(() => {
  //   onAuthStateChanged(fireAuth, (currentUser) => {
  //     setCurrentUserId(currentUser?.uid ?? "");
  //   });
  // }, []);

  // useEffect(() => {
  //   if (currentUserId !== "") {
  //     router.push("/home");
  //   }
  // }, [currentUserId]);

  // const createUserWithEmailAndPassword = async (values: typeof form.values) => {
  //   RegisterWithEmail(values.email, values.password, setCurrentUserId);
  // };

  // const createUserWithGoogle = async (values: typeof form.values) => {
  //   const uid = await LogInWithGoogle();
  //   // console.log("LogInWithGoogle", await uid);
  //   if ((await uid) != "") {
  //     RequestCreateUser(uid, values.name, () => router.push("/home"));
  //   }
  // };

  const handleSubmit = (values: typeof form.values) => {
    if (registerWith == "email") {
      // console.log("try to register with email and password");
      RegisterWithEmail(values.email, values.password, setCurrentUserId);
    } else {
      LogInWithGoogle(setCurrentUserId);
    }
  };

  useEffect(() => {
    // console.log("currentUserId");
    if (currentUserId != "") {
      // console.log(currentUserId);
      RequestCreateUser(currentUserId, form.values.name, () =>
        router.push("/home")
      );
    }
  }, [currentUserId]);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) =>
        value.length < 2
          ? "表示名は２字以上"
          : value.length > 50
          ? "表示名は５０字以下"
          : null,
      email: (value) =>
        registerWith == "google"
          ? null
          : /^\S+@\S+$/.test(value)
          ? null
          : "無効なアドレス",
      password: (value) =>
        registerWith == "google"
          ? null
          : value.length < 8
          ? "パスワードは８文字以上"
          : /[a-zA-Z].*\d|\d.*[a-zA-Z]/.test(value)
          ? null
          : "パスワードは英数字のいずれも含む必要があります",
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
              value={registerWith}
              onChange={setRegisterWith}
              name="loginWith"
              label="新規登録の方法を選択"
              withAsterisk
            >
              <Group my="xs">
                <Radio value="google" label="Google アカウントで登録する" />
                <Radio
                  value="email"
                  label="メールアドレスとパスワードで登録する"
                />
              </Group>
            </Radio.Group>
            <TextInput
              withAsterisk
              label="表示名"
              placeholder=""
              {...form.getInputProps("name")}
            />
            <form onSubmit={form.onSubmit(handleSubmit)}>
              {registerWith == "email" ? (
                <>
                  <TextInput
                    withAsterisk
                    label="メールアドレス"
                    placeholder="sci.connect@example.com"
                    {...form.getInputProps("email")}
                  />

                  <PasswordInput
                    withAsterisk
                    label="パスワード"
                    placeholder=""
                    {...form.getInputProps("password")}
                  />
                </>
              ) : (
                <></>
              )}
              {/* <Group position="center" mt="md"> */}
              <div className="mt-8 flex rounded-lg bg-blue-700 hover:bg-blue-600 text-white">
                <button type="submit" className="p-2 w-full">
                  {registerWith == "email"
                    ? "メールアドレスとパスワードで登録"
                    : "Google アカウントで登録"}
                </button>
              </div>
              {/* </Group> */}
            </form>
          </Box>
        </div>
      </div>
    </div>
  );
};
