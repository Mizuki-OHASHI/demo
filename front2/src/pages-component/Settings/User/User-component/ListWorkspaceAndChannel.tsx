import { Channel, Workspace } from "@/methods/Type";
import { useRouter } from "next/router";
import { FC, ReactElement } from "react";
import { List } from "tabler-icons-react";

type Props = {
  channels: Array<Channel>;
  workspaces: Array<Workspace>;
};
export const ListWorkspaceAndChannel: FC<Props> = (props) => {
  const router = useRouter();

  const listWorkspace = (): ReactElement => {
    const workspaceWrapper = (ws: Workspace): ReactElement => {
      return (
        <div key={ws.id} className="rounded-xl hover:bg-blue-50 flex flex-row">
          <button
            className="pl-2 w-8/12 text-left overflow-x-scroll whitespace-nowrap"
            onClick={() => {
              router.push(`/home?workspaceid=${ws.id}`);
            }}
          >
            {ws.name}
          </button>
          <div className="w-2/12 m-1 p-1 rounded border-2 border-blue-50 hover:bg-blue-100">
            <button
              className="w-full text-center"
              onClick={() => {
                router.push(`/settings/workspace?workspaceid=${ws.id}`);
              }}
            >
              照会
            </button>
          </div>
          {ws.flag ? (
            <div className="w-2/12 m-1 p-1 rounded border-2 border-blue-50 hover:bg-blue-100">
              <button
                className="w-full text-center"
                onClick={() => {
                  router.push(
                    `/settings/workspace?workspaceid=${ws.id}&option=edit`
                  );
                }}
              >
                編集
              </button>
            </div>
          ) : (
            <div className="w-2/12 m-1 p-1 rounded border-2 border-blue-50">
              <button className="w-full text-center text-gray-300">編集</button>
            </div>
          )}
        </div>
      );
    };

    const deletedWorkspaceWrapper = (ws: Workspace) => {
      return (
        <div key={ws.id} className="rounded-xl flex flex-row">
          <div className="pl-2 my-auto w-8/12 text-left overflow-x-scroll whitespace-nowrap text-gray-300">
            {ws.name}
          </div>
          <div className="w-4/12 my-1 py-1 px-2 mx-2 rounded border-2 border-gray-100 text-gray-300">
            <div className="w-full text-center">削除済</div>
          </div>
        </div>
      );
    };

    return (
      <div className="m-2 p-2 bg-white rounded-2xl">
        {props.workspaces.map((ws) => {
          return ws.deleted
            ? deletedWorkspaceWrapper(ws)
            : workspaceWrapper(ws);
        })}
      </div>
    );
  };

  const listChannel = (): ReactElement => {
    const channelWrapper = (ch: Channel): ReactElement => {
      return (
        <div key={ch.id} className="rounded-xl hover:bg-blue-50 flex flex-row">
          <button
            className="pl-2 w-8/12 text-left overflow-x-scroll whitespace-nowrap"
            onClick={() => {
              router.push(
                `/home?workspaceid=${ch.workspaceid}&channelid=${ch.id}`
              );
            }}
          >
            {ch.name}
          </button>
          <div className="w-2/12 m-1 p-1 rounded border-2 border-blue-50 hover:bg-blue-100">
            <button
              className="w-full text-center"
              onClick={() => {
                router.push(`/settings/channel?channelid=${ch.id}`);
              }}
            >
              照会
            </button>
          </div>
          {ch.flag ? (
            <div className="w-2/12 m-1 p-1 rounded border-2 border-blue-50 hover:bg-blue-100">
              <button
                className="w-full text-center"
                onClick={() => {
                  router.push(
                    `/settings/channel?channelid=${ch.id}&option=edit`
                  );
                }}
              >
                編集
              </button>
            </div>
          ) : (
            <div className="w-2/12 m-1 p-1 rounded border-2 border-blue-50">
              <button className="w-full text-center text-gray-300">編集</button>
            </div>
          )}
        </div>
      );
    };

    const deletedChannelWrapper = (ch: Channel) => {
      return (
        <div key={ch.id} className="rounded-xl flex flex-row">
          <div className="pl-2 my-auto w-8/12 text-left overflow-x-scroll whitespace-nowrap text-gray-300">
            {ch.name}
          </div>
          <div className="w-4/12 my-1 py-1 px-2 mx-2 rounded border-2 border-gray-100 text-gray-300">
            <div className="w-full text-center">削除済</div>
          </div>
        </div>
      );
    };

    return (
      <div className="m-2 p-2 bg-white rounded-2xl">
        {props.channels.map((ch) => {
          return ch.deleted ? deletedChannelWrapper(ch) : channelWrapper(ch);
        })}
      </div>
    );
  };
  return (
    <div className="h-full w-full relative">
      <div>
        <div className="text-lg flex flex-row mb-2">
          <List size={32} color="darkblue" />
          <div className="ml-2 my-auto">ワークスペース一覧</div>
        </div>
        <div className="mt-2 flex flex-row border-b-2 border-blue-100">
          <div className="ml-4">所属しているワークスペース</div>
          <div className="ml-auto mr-4">{(props.workspaces ?? []).length}</div>
        </div>
        <div className="mt-2 flex flex-row border-b-2 border-blue-100">
          <div className="ml-4">管理しているワークスペース</div>
          <div className="ml-auto mr-4">
            {
              (props.workspaces ?? []).filter((ws) => {
                return ws.flag;
              }).length
            }
          </div>
        </div>
        {listWorkspace()}
      </div>
      <div className="mt-16">
        <div className="text-lg flex flex-row mb-2">
          <List size={32} color="darkblue" />
          <div className="ml-2 my-auto">チャンネル一覧</div>
        </div>
        <div className="mt-2 flex flex-row border-b-2 border-blue-100">
          <div className="ml-4">所属しているチャンネル</div>
          <div className="ml-auto mr-4">{(props.channels ?? []).length}</div>
        </div>
        <div className="mt-2 flex flex-row border-b-2 border-blue-100">
          <div className="ml-4">管理しているチャンネル</div>
          <div className="ml-auto mr-4">
            {
              (props.channels ?? []).filter((ch) => {
                return ch.flag;
              }).length
            }
          </div>
        </div>
        {listChannel()}
      </div>
    </div>
  );
};
