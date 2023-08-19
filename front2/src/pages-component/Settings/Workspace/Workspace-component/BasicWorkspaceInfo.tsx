import { FC, useEffect, useState } from "react";
import { Workspace } from "@/methods/Type";
import { useRouter } from "next/router";
import {
  ArrowBarToDown,
  CircleOff,
  Edit,
  InfoCircle,
} from "tabler-icons-react";
import { RequestEditWorkspace } from "@/methods/RequestEdit";
import { ConvDateTime, ConvQueryToString } from "@/methods/Tools";
import { Modal, TextInput, Checkbox, Box, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { RequestDeleteWorkspace } from "@/methods/RequestDelete";
import { UploadIcon } from "@/methods/UploadIcon";
import { ShowIcon } from "@/methods/ShowIcon";

type Props = {
  currentUserId: string;
  workspace: Workspace;
  isOwner: boolean;
};

export const BasicWorkspaceInfo: FC<Props> = (props) => {
  const router = useRouter();
  const [state, setState] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [publicPw, setPublicPw] = useState("");
  const [privatePw, setPrivatePw] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const { option } = router.query;

  useEffect(() => {
    setState(ConvQueryToString(option));
    if (option == "delete") {
      open();
    }
  }, [option]);

  useEffect(() => {
    setName(props.workspace.name);
    setBio(props.workspace.bio);
    setPublicPw(props.workspace.publicPw);
    setImageUrl(props.workspace.img);
    // console.log("test", props.workspace);
  }, [props.workspace]);

  const form = useForm({
    initialValues: {
      workspaceId: "",
      pw: "",
      confirm: false,
    },

    // functions will be used to validate values at corresponding key
    validate: {
      workspaceId: (value) =>
        value !== props.workspace.id ? "ID が一致しません" : null,
      confirm: (value) => (!value ? "チェックしてください" : null),
    },
  });

  const handleSubmitDelete = async () => {
    close();
    if (confirm("本当にワークスペースを削除しますか？")) {
      if (
        await RequestDeleteWorkspace(
          props.workspace.id,
          props.currentUserId,
          form.values.pw
        )
      ) {
        form.reset();
        router.push("/settings");
      }
    }
    form.reset();
  };

  const handleSubmitEdit = async () => {
    if (confirm("保存しますか？")) {
      if (
        await RequestEditWorkspace(
          props.currentUserId,
          props.workspace.id,
          name,
          bio,
          publicPw,
          privatePw,
          imageUrl
        )
      ) {
        setName(props.workspace.name);
        setBio(props.workspace.bio);
        setPublicPw(props.workspace.publicPw);
        setPrivatePw("");
        router.push(`/settings/workspace?workspaceid=${props.workspace?.id}`);
      }
    }
  };

  const handleSubmitCancel = () => {
    if (confirm("取り消しますか？ 変更内容は保存されません！")) {
      router.push("/settings/workspace");
      setName(props.workspace.name);
      setBio(props.workspace.bio);
      setPublicPw(props.workspace.publicPw);
      setPrivatePw("");
    }
  };

  return (
    <>
      <div className="w-full flex flex-row">
        <div className="flex flex-row">
          <InfoCircle size={32} color="darkblue" />
          <div className="text-lg my-auto mx-2">ワークスペース基本情報</div>
        </div>
        {props.isOwner ? (
          <button
            className="flex flex-row ml-auto"
            onClick={() => {
              router.push("/settings/workspace?option=edit");
            }}
          >
            <Edit size={32} />
          </button>
        ) : (
          <></>
        )}
      </div>
      {state == "edit" ? (
        <div className="m-6">
          <UploadIcon imageUrl={imageUrl} setImageUrl={setImageUrl} />
        </div>
      ) : (
        <div className="my-auto mx-2 h-56 w-56 p-4">
          <ShowIcon
            iconId={props.workspace.img}
            iconSize={192}
            onClick={() => {}}
          />
        </div>
      )}
      <div className="py-2">
        <div className="border-b-2 border-blue-100 flex flex-row">
          <div className="px-4 whitespace-normal">ワークスペース名</div>
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
            <div className="px-2">{props.workspace?.name}</div>
          </div>
        )}
      </div>
      <div className={`py-2 ${state == "edit" ? "text-blue-300" : ""}`}>
        <div className="border-b-2 border-blue-100">
          <div className="px-4">ワークスペースID</div>
        </div>
        <div>
          <div className="px-2">{props.workspace?.id}</div>
        </div>
      </div>
      <div className={`py-2 ${state == "edit" ? "text-blue-300" : ""}`}>
        <div className="border-b-2 border-blue-100">
          <div className="px-4">作成日時</div>
        </div>
        <div>
          <div className="px-2">
            {/N/.test(ConvDateTime(props.workspace?.createdat))
              ? ""
              : ConvDateTime(props.workspace?.createdat)}
          </div>
        </div>
      </div>
      <div className="py-2">
        <div className="border-b-2 border-blue-100 flex flex-row">
          <div className="px-4 whitespace-normal">説明</div>
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
            <div className="px-2">{props.workspace?.bio}</div>
          </div>
        )}
      </div>
      <div className="py-2">
        <div className="border-b-2 border-blue-100 flex flex-row">
          <div className="px-4">公開パスワード</div>
          {state == "edit" ? (
            publicPw?.length > 50 ? (
              <div className="text-red-500 ml-auto mr-4">
                50字以下にしてください
              </div>
            ) : (
              <div className="text-blue-400 ml-auto mr-4">
                {publicPw?.length ?? 0}/50
              </div>
            )
          ) : (
            <></>
          )}
        </div>
        {state == "edit" ? (
          <input
            className="px-2 outline-none bg-blue-50 w-full"
            value={publicPw}
            onChange={(e) => setPublicPw(e.target.value)}
          />
        ) : (
          <div>
            <div className="px-2">
              {props.workspace?.publicPw ?? "パスワードなし"}
            </div>
          </div>
        )}
      </div>

      {state == "edit" &&
      props.isOwner &&
      !(name?.length > 50 || bio?.length > 100 || publicPw?.length > 50) ? (
        <>
          <PasswordInput
            placeholder="管理者用パスワード"
            value={privatePw}
            onChange={(e) => {
              setPrivatePw(e.target.value);
            }}
            className="m-4"
          />
          <div className="flex flex-row-reverse mx-6 mb-1">
            <button
              type="button"
              onClick={() => {
                handleSubmitEdit();
              }}
            >
              <div className="px-1 flex flex-row overflow-auto rounded hover:bg-blue-300">
                <ArrowBarToDown size={32} color="darkblue" />
                <div className="my-auto mx-2">保存</div>
              </div>
            </button>
            <button
              type="button"
              onClick={() => {
                handleSubmitCancel();
              }}
            >
              <div className="px-1 flex flex-row overflow-auto rounded hover:bg-red-300">
                <CircleOff size={32} color="red" />
                <div className="my-auto mx-2 text-red-700">取消</div>
              </div>
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
      <Modal opened={opened} onClose={close} title="ワークスペースの削除">
        <Box maw={300} mx="auto">
          <form onSubmit={form.onSubmit(handleSubmitDelete)}>
            <div>
              ワークスペース
              {props.workspace.name == "" ? "" : ` (${props.workspace.name}) `}
              を削除します。
              <br />
              配下の チャンネル, メッセージ および その返信 も削除されます。
              <br />
              この操作は取り消せません。
            </div>
            <Checkbox
              className="my-4"
              mt="md"
              label="この操作が取り消せないことを理解した。"
              {...form.getInputProps("confirm", { type: "checkbox" })}
            />
            <div>ワークスペースIDを入力してください。</div>
            <TextInput
              withAsterisk
              label={props.workspace.id}
              placeholder={props.workspace.id}
              {...form.getInputProps("workspaceId")}
            />
            <PasswordInput
              className="my-2"
              withAsterisk
              label="管理者用パスワード"
              {...form.getInputProps("pw")}
            />
            <div className="mt-8 flex rounded-lg bg-red-700 hover:bg-red-600 text-white">
              <button type="submit" className="mx-auto p-2 w-full">
                ワークスペースを削除
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};
