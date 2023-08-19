import { Reply } from "@/methods/Type";

import { FC } from "react";
import { ReplyWrapper } from "@/pages-component/Home/Home-component/Reply-component/ReplyWrapper";

type Props = {
  replies: Array<Reply>;
  currentUserId: string;
  updateReply: () => void;
};

export const ViewReplies: FC<Props> = (props) => {
  // console.log("replys", props.replies);

  if (props.replies == null) {
    return <div></div>;
  } else {
    return (
      <div className="w-full absolute top-14 bottom-12 left-0 right-0 p-2 overflow-scroll">
        <div className="pb-72">
          {props.replies.map((m) => {
            if (m.deleted) {
              return (
                <div
                  key={m.id}
                  className="text-gray-500 border-2 border-gray-200 rounded-lg m-2 p-2"
                >
                  このメッセージは削除されました
                </div>
              );
            }
            return (
              <ReplyWrapper
                key={m.id}
                updateReply={props.updateReply}
                reply={m}
                currentUserId={props.currentUserId}
              />
            );
          })}
        </div>
      </div>
    );
  }
};
