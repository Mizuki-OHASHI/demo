import { FC, FormEvent, useState } from "react";
import { Parser } from "@/methods/Parser";
import { RequestCreateMessage } from "@/methods/RequestCreate";
import { useRouter } from "next/router";
import { ConvQueryToString } from "@/methods/Tools";
import { GPT } from "@/methods/gpt";
import { MailForward, MessageChatbot, PhotoPlus } from "tabler-icons-react";
import { UploadImageContainer } from "@/methods/UploadImage";
import { MarkdownInfo } from "@/methods/MarkdownInfo";
import { Validation } from "@/methods/Validation";

type Props = {
  updateMessage: () => void;
  currentUserId: string;
};

export const PostMessages: FC<Props> = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();
  const { channelid } = router.query;

  const channelId = ConvQueryToString(channelid);

  const makeTitle = () => {
    GPT(body, setTitle);
  };

  const postMessage = () => {
    RequestCreateMessage(
      props.currentUserId,
      channelId,
      title,
      body,
      props.updateMessage
    );
    setBody("");
    setTitle("");
  };
  return (
    <div>
      <div className="w-full absolute bottom-0 left-0 right-0 p-2 overflow-scroll">
        <form>
          <div className="flex flex-col border-2 border-blue-200 rounded-lg m-2 bg-blue-50">
            <div className="p-2 flex flex-law">
              <div className="w-1/12 my-auto text-gray-500">タイトル</div>
              <input
                className="w-9/12 outline-none bg-blue-50"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
              <button
                className="w-2/12"
                type="button"
                onClick={() => {
                  if (body != "" && body.length <= 1000 && title.length <= 50) {
                    makeTitle();
                  }
                }}
              >
                <div className="flex flex-row-reverse px-2">
                  <div className="my-auto text-sm">自動生成</div>
                  <MessageChatbot
                    size={32}
                    color={body == "" ? "gray" : "darkblue"}
                  />
                </div>
              </button>
            </div>
            <div className="border-t-2 border-b-2 border-blue-200 p-2 max-h-72 overflow-scroll">
              {body == "" ? (
                <div className="text-gray-500">プレビュー</div>
              ) : (
                <Parser lines={body} />
              )}
            </div>
            <div>
              <div className="px-2 pt-2">
                <textarea
                  className="outline-none bg-blue-50 resize-none w-[calc(100%)] h-[2rem] hover:h-[8rem]"
                  value={body}
                  onChange={(e) => {
                    setBody(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>
            <div>
              <div className="flex mb-1 mx-6">
                <UploadImageContainer setBody={setBody} />
                {/* <MarkdownInfo /> */}
                <Validation body={body} title={title} />

                <button
                  className="ml-0"
                  type="button"
                  onClick={() => {
                    if (
                      body != "" &&
                      body.length <= 1000 &&
                      title.length <= 50
                    ) {
                      postMessage();
                    }
                  }}
                >
                  <div
                    className={`px-1 flex flex-row overflow-auto rounded ${
                      body != "" && body.length <= 1000 && title.length <= 50
                        ? "hover:bg-blue-300"
                        : ""
                    }`}
                  >
                    <MailForward
                      size={32}
                      color={
                        body != "" && body.length <= 1000 && title.length <= 50
                          ? "darkblue"
                          : "gray"
                      }
                    />
                    <div className="my-auto mx-2">送信</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
