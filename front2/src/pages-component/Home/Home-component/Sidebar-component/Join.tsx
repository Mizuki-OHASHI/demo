import {
  Box,
  Checkbox,
  Group,
  Modal,
  PasswordInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { FC, FormEvent, useEffect, useState } from "react";
import {
  RequestJoinChannel,
  RequestJoinWorkspace,
} from "@/methods/RequestJoin";
import {
  FetchAllWorkspaces,
  FetchChannelInfo,
  FetchWorkspaceInfo,
} from "@/methods/Fetch";
import {
  Channel,
  EmptyWorkspaceInfo,
  EmptyWorkspaces,
  UserInfo,
  Workspace,
  WorkspaceInfo,
  Workspaces,
} from "@/methods/Type";

type ChannelProps = {
  channels: Array<Channel>;
  currentUserId: string;
  workspaceId: string;
  updateUserInfo: () => void;
};

export const JoinChannel: FC<ChannelProps> = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [workspaceInfo, setWorkspaceInfo] =
    useState<WorkspaceInfo>(EmptyWorkspaceInfo);
  const [channelsToJoin, setChannelsToJoin] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [channelToJoin, setChannelToJoin] = useState("");

  const handleSubmit = async (values: typeof form.values) => {
    if (
      await RequestJoinChannel(
        props.currentUserId,
        channelsToJoin.find((c) => {
          return c.label == channelToJoin;
        })?.value,
        values.password,
        values.owner
      )
    ) {
      props.updateUserInfo();
      form.reset();
      close();
    }
  };

  const form = useForm({
    initialValues: {
      password: "",
      owner: false,
    },
  });

  useEffect(() => {
    FetchWorkspaceInfo(props.workspaceId, setWorkspaceInfo);
  }, [props.currentUserId, props.workspaceId]);

  useEffect(() => {
    if (workspaceInfo.channels != null && props.channels != null) {
      setChannelsToJoin(
        workspaceInfo.channels
          .filter((c) => {
            return !c.deleted;
          })
          .map((c) => {
            if (
              props.channels.some((c_) => {
                return c_.id == c.id;
              })
            ) {
              return { value: c.id, label: c.name, disabled: true };
            } else {
              return { value: c.id, label: c.name };
            }
          })
      );
    }
  }, [workspaceInfo, props.channels]);

  return (
    <div className="overflow-scroll">
      <div className="hover:bg-blue-200 px-4 rounded">
        <button onClick={open} className="w-full">
          参加
        </button>
      </div>
      <Modal opened={opened} onClose={close} title="チャンネルに参加">
        <Box maw={300} mx="auto">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Select
              label="チャンネル"
              placeholder="チャンネルを１つ選択"
              searchable
              onSearchChange={setChannelToJoin}
              searchValue={channelToJoin}
              nothingFound="一致するチャンネルがありません"
              data={channelsToJoin}
            />
            <PasswordInput
              withAsterisk
              label={form.values.owner ? "管理者用パスワード" : "パスワード"}
              placeholder=""
              {...form.getInputProps("password")}
            />
            <Checkbox
              mt="md"
              label="管理者として参加する"
              {...form.getInputProps("owner", { type: "checkbox" })}
            />
            {/* <Group position="center" mt="md"> */}
            <div className="mt-8 flex rounded-lg bg-blue-700 hover:bg-blue-600 text-white">
              <button type="submit" className="mx-auto p-2 w-full">
                参加
              </button>
            </div>
            {/* </Group> */}
          </form>
        </Box>
      </Modal>
    </div>
  );
};

type WorkspaceProps = {
  joinedWorkspaces: Array<Workspace>;
  currentUserId: string;
  updateUserInfo: () => void;
};

export const JoinWorkspace: FC<WorkspaceProps> = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [workspaces, setWorkspaces] = useState<Workspaces>(EmptyWorkspaces);
  const [workspacesToJoin, setWorkspacesToJoin] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [workspaceToJoin, setWorkspaceToJoin] = useState("");

  const handleSubmit = async (values: typeof form.values) => {
    if (
      await RequestJoinWorkspace(
        props.currentUserId,
        workspacesToJoin.find((c) => {
          return c.label == workspaceToJoin;
        })?.value,
        values.password,
        values.owner
      )
    ) {
      props.updateUserInfo();
      form.reset();
      close();
    }
  };

  const form = useForm({
    initialValues: {
      password: "",
      owner: false,
    },
  });

  useEffect(() => {
    FetchAllWorkspaces(setWorkspaces);
    // console.log("FetchAllWorkspaces(setWorkspaces)");
  }, []);

  useEffect(() => {
    if (workspaces.list != null && props.joinedWorkspaces != null) {
      setWorkspacesToJoin(
        workspaces.list
          .filter((w) => {
            return !w.deleted;
          })
          .map((c) => {
            if (
              props.joinedWorkspaces.some((c_) => {
                return c_.id == c.id;
              })
            ) {
              return { value: c.id, label: c.name, disabled: true };
            } else {
              return { value: c.id, label: c.name };
            }
          })
      );
    }
  }, [workspaces, props.joinedWorkspaces]);

  return (
    <div className="overflow-scroll">
      <div className="hover:bg-blue-200 px-4 rounded">
        <button onClick={open} className="w-full">
          参加
        </button>
      </div>
      <Modal opened={opened} onClose={close} title="ワークスペースに参加">
        <Box maw={300} mx="auto">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Select
              label="ワークスペース"
              placeholder="ワークスペースを１つ選択"
              searchable
              onSearchChange={setWorkspaceToJoin}
              searchValue={workspaceToJoin}
              nothingFound="一致するワークスペースがありません"
              data={workspacesToJoin}
            />
            <PasswordInput
              withAsterisk
              label={form.values.owner ? "管理者用パスワード" : "パスワード"}
              placeholder=""
              {...form.getInputProps("password")}
            />
            <Checkbox
              mt="md"
              label="管理者として参加する"
              {...form.getInputProps("owner", { type: "checkbox" })}
            />
            <div className="mt-8 flex rounded-lg bg-blue-700 hover:bg-blue-600 text-white">
              <button type="submit" className="mx-auto p-2 w-full">
                参加
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
