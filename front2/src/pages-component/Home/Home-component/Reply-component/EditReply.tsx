import { FC, useState } from "react";
import { Parser } from "@/methods/Parser";
import { RequestEditReply } from "@/methods/RequestEdit";
import { ArrowBarToDown, CircleOff } from "tabler-icons-react";
import { Reply } from "@/methods/Type";
import { Validation } from "@/methods/Validation";

type Props = {
  updateReply: () => void;
  reply: Reply;
  currentUserId: string;
  closeEditor: () => void;
};

export const EditReplies: FC<Props> = (props) => {
  const [title, setTitle] = useState(props.reply.title);
  const [body, setBody] = useState(props.reply.body);

  const editReply = () => {
    RequestEditReply(
      props.reply.id,
      title,
      body,
      props.currentUserId,
      props.updateReply
    );
    props.closeEditor();
  };
  return (
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
        </div>
        <div className="border-t-2 border-b-2 border-blue-200 p-2 max-h-72 overflow-scroll">
          {body == "" ? (
            <div className="text-gray-500">プレビュー</div>
          ) : (
            <Parser lines={body} />
          )}
        </div>
        <div>
          <div className="p-2">
            <textarea
              className="outline-none bg-blue-50 resize-none w-[calc(100%)] h-[8rem]"
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
              }}
            ></textarea>
          </div>
        </div>
        <div>
          <div className="flex flex-row-reverse mx-6 mb-1">
            {body.length > 1000 || title.length > 50 ? (
              <></>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (confirm("保存しますか？")) {
                    editReply();
                  }
                }}
              >
                <div className="px-1 flex flex-row overflow-auto rounded hover:bg-blue-300">
                  <ArrowBarToDown
                    size={32}
                    color={body == "" ? "gray" : "darkblue"}
                  />
                  <div className="my-auto mx-2">保存</div>
                </div>
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                if (confirm("取り消しますか？ 変更内容は保存されません！")) {
                  props.closeEditor();
                }
              }}
            >
              <div className="px-1 flex flex-row overflow-auto rounded hover:bg-red-300">
                <CircleOff size={32} color="red" />
                <div className="my-auto mx-2 text-red-700">取消</div>
              </div>
            </button>
            <Validation body={body} title={title} />
          </div>
        </div>
      </div>
    </form>
  );
};
