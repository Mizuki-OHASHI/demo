import {
  ChannelInfo,
  EmptyChannelInfo,
  EmptyMessageInfo,
  MessageInfo,
} from "@/methods/Type";
import { FC, useState, useEffect } from "react";
import { ViewMessages } from "@/pages-component/Home/Home-component/Thread-component/ViewMessages";
import { PostMessages } from "@/pages-component/Home/Home-component/Thread-component/PostMessages";
import { FetchChannelInfo, FetchMessageInfo } from "@/methods/Fetch";
import { useRouter } from "next/router";
import { ConvQueryToString } from "@/methods/Tools";
import { PostReplies } from "./Reply-component/PostReplies";
import { ViewReplies } from "./Reply-component/ViewReplies";
import { ArrowBack } from "tabler-icons-react";

type Props = {
  currentUserId: string;
};

export const Thread: FC<Props> = (props) => {
  const router = useRouter();
  const [channelInfo, setChannelInfo] = useState<ChannelInfo>(EmptyChannelInfo);
  const [messageInfo, setMessageInfo] = useState<MessageInfo>(EmptyMessageInfo);

  const { workspaceid, channelid, messageid } = router.query;

  const workspaceId = ConvQueryToString(workspaceid);
  const channelId = ConvQueryToString(channelid);
  const messageId = ConvQueryToString(messageid);

  const updateMessage = (): void => {
    if (channelId != "default") {
      FetchChannelInfo(channelId, setChannelInfo);
    }
  };

  const updateReply = (): void => {
    if (messageId != "default") {
      FetchMessageInfo(messageId, setMessageInfo);
    }
  };

  useEffect(() => {
    if (channelId != "default") {
      FetchChannelInfo(channelId, setChannelInfo);
    }
  }, [channelId]);

  useEffect(() => {
    if (messageId != "default") {
      FetchMessageInfo(messageId, setMessageInfo);
    }
  }, [channelId, messageId]);

  if (channelId == "default") {
    return <div></div>;
  } else {
    if (messageId == "default") {
      return (
        <div className="absolute top-0 bottom-0 left-0 right-0">
          <div className="text-3xl px-4 py-2 whitespace-nowrap overflow-x-scroll">
            {channelInfo.channel.name}
          </div>
          <ViewMessages
            messages={channelInfo.messages}
            updateMessage={updateMessage}
            currentUserId={props.currentUserId}
          />
          <PostMessages
            updateMessage={updateMessage}
            currentUserId={props.currentUserId}
          />
        </div>
      );
    } else {
      return (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-row">
          <div className="w-6/12 relative">
            <div className="text-3xl px-4 py-2 whitespace-nowrap overflow-x-scroll">
              {channelInfo.channel.name}
            </div>
            <ViewMessages
              messages={channelInfo.messages}
              updateMessage={updateMessage}
              currentUserId={props.currentUserId}
            />
            <PostMessages
              updateMessage={updateMessage}
              currentUserId={props.currentUserId}
            />
          </div>
          <div className="w-6/12 relative bg-blue-50">
            <div className="flex flex-row">
              <div className="text-3xl px-4 py-2 whitespace-nowrap overflow-x-scroll">
                {messageInfo.root.title}
              </div>
              <div className="ml-auto my-auto mr-4">
                <button
                  onClick={() => {
                    router.push(
                      `/home?workspaceid=${workspaceId}&channelid=${channelId}`
                    );
                  }}
                >
                  <ArrowBack size={32} className="hover:bg-blue-100 rounded" />
                </button>
              </div>
            </div>
            <ViewReplies
              replies={messageInfo.replies}
              updateReply={updateReply}
              currentUserId={props.currentUserId}
            />
            <PostReplies
              updateReply={updateReply}
              currentUserId={props.currentUserId}
            />
          </div>
        </div>
      );
    }
  }
};
