import { FC, useEffect, useState } from "react";
import { UserInfo } from "@/methods/Type";
import { useRouter } from "next/router";
import {
  ArrowBarToDown,
  CircleOff,
  Edit,
  InfoCircle,
} from "tabler-icons-react";
import { ShowIcon } from "@/methods/ShowIcon";
import { UploadIcon } from "@/methods/UploadIcon";
import { RequestEditUser } from "@/methods/RequestEdit";
import { ConvQueryToString } from "@/methods/Tools";
import { Modal, TextInput, Group, Checkbox, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { RequestDeleteUser } from "@/methods/RequestDelete";

type Props = {
  currentUserId: string;
  userInfo: UserInfo;
  onEdited: () => void;
};

export const BasicUserInfo: FC<Props> = (props) => {
  const router = useRouter();
  const [state, setState] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const { option } = router.query;

  useEffect(() => {
    setState(ConvQueryToString(option));
    if (option == "delete") {
      open();
    }
  }, [option]);

  useEffect(() => {
    setImageUrl(props.userInfo.user.img);
    setName(props.userInfo.user.name);
    setBio(props.userInfo.user.bio);
  }, [props.userInfo]);

  const form = useForm({
    initialValues: {
      userId: "",
      confirm: false,
    },

    // functions will be used to validate values at corresponding key
    validate: {
      userId: (value) =>
        value !== props.currentUserId ? "ID が一致しません" : null,
      confirm: (value) => (!value ? "チェックしてください" : null),
    },
  });

  const handleSubmitDelete = async () => {
    close();
    if (confirm("本当にアカウントを削除しますか？")) {
      if (await RequestDeleteUser(props.currentUserId)) {
        form.reset();
        router.push("/");
      }
    }
    form.reset();
  };

  const handleSubmitEdit = async () => {
    if (confirm("保存しますか？")) {
      if (await RequestEditUser(props.currentUserId, name, bio, imageUrl)) {
        props.onEdited();
        router.push("/settings/user");
      }
    }
  };

  return (
    <>
      <div className="w-full flex flex-row">
        <div className="flex flex-row">
          <InfoCircle size={32} color="darkblue" />
          <div className="text-lg my-auto mx-2">ユーザー基本情報</div>
        </div>
        <button
          className="flex flex-row ml-auto"
          onClick={() => {
            router.push("/settings/user?option=edit");
          }}
        >
          <Edit size={32} />
        </button>
      </div>
      {state == "edit" ? (
        <div className="m-6">
          <UploadIcon imageUrl={imageUrl} setImageUrl={setImageUrl} />
        </div>
      ) : (
        <div className="my-auto mx-2 h-56 w-56 p-4">
          <ShowIcon
            iconId={props.userInfo.user.img}
            iconSize={192}
            onClick={() => {}}
          />
        </div>
      )}
      <div className="py-2">
        <div className="border-b-2 border-blue-100">
          <div className="px-4 whitespace-normal">表示名</div>
          {state == "edit" ? (
            name?.length > 50 ? (
              <div className="text-red-500 ml-auto mr-4">
                50字以下にしてください
              </div>
            ) : (
              <div className="text-blue-400 ml-auto mr-4">
                {name?.length ?? 0}/50
              </div>
            )
          ) : (
            <></>
          )}
        </div>
        {state == "edit" ? (
          <input
            className="px-2 outline-none bg-blue-50 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <div>
            <div className="px-2">{props.userInfo.user.name}</div>
          </div>
        )}
      </div>
      <div className={`py-2 ${state == "edit" ? "text-blue-300" : ""}`}>
        <div className="border-b-2 border-blue-100">
          <div className="px-4">ユーザーID</div>
        </div>
        <div>
          <div className="px-2">{props.userInfo.user.id}</div>
        </div>
      </div>
      <div className="py-2">
        <div className="border-b-2 border-blue-100 flex flex-row">
          <div className="px-4">プロフィール</div>
          {state == "edit" ? (
            bio?.length > 100 ? (
              <div className="text-red-500 ml-auto mr-4">
                100字以下にしてください
              </div>
            ) : (
              <div className="text-blue-400 ml-auto mr-4">
                {bio?.length ?? 0}/100
              </div>
            )
          ) : (
            <></>
          )}
        </div>
        {state == "edit" ? (
          <textarea
            className="px-2 outline-none bg-blue-50 w-full resize-none"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        ) : (
          <div>
            <div className="px-2 whitespace-normal">
              {props.userInfo.user.bio}
            </div>
          </div>
        )}
      </div>
      {state == "edit" && !(name?.length > 50 || bio?.length > 100) ? (
        <div className="flex flex-row-reverse mx-6 mb-1">
          <button type="button" onClick={handleSubmitEdit}>
            <div className="px-1 flex flex-row overflow-auto rounded hover:bg-blue-300">
              <ArrowBarToDown size={32} color="darkblue" />
              <div className="my-auto mx-2">保存</div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm("取り消しますか？ 変更内容は保存されません！")) {
                router.push("/settings/user");
                setName(props.userInfo.user.name);
                setBio(props.userInfo.user.bio);
              }
            }}
          >
            <div className="px-1 flex flex-row overflow-auto rounded hover:bg-red-300">
              <CircleOff size={32} color="red" />
              <div className="my-auto mx-2 text-red-700">取消</div>
            </div>
          </button>
        </div>
      ) : (
        <></>
      )}
      <Modal opened={opened} onClose={close} title="アカウントの削除">
        <Box maw={300} mx="auto">
          <form onSubmit={form.onSubmit(handleSubmitDelete)}>
            <div>
              アカウントを削除します。
              <br />
              この操作は取り消せません！
            </div>
            <Checkbox
              className="my-4"
              mt="md"
              label="この操作が取り消せないことを理解した。"
              {...form.getInputProps("confirm", { type: "checkbox" })}
            />
            <div>ユーザーIDを入力してください。</div>
            <TextInput
              withAsterisk
              label={props.currentUserId}
              placeholder={props.currentUserId}
              {...form.getInputProps("userId")}
            />
            <Group position="center" mt="md">
              <button type="submit" className="text-red-500">
                アカウントを削除
              </button>
            </Group>
          </form>
        </Box>
      </Modal>
    </>
  );
};
