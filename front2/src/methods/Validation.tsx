import { FC } from "react";

type Props = {
  title: string;
  body: string;
};

export const Validation: FC<Props> = (props) => {
  return (
    <div className="ml-auto mr-4 flex flex-row text-xs">
      <div className="my-auto px-2">タイトル</div>
      {props.title.length > 50 ? (
        <div className="text-red-500 my-auto">字数超過</div>
      ) : (
        <div className="text-blue-400 my-auto">
          {props.title.length ?? 0}/50
        </div>
      )}
      <div className="my-auto px-2">本文</div>
      {props.body.length > 1000 ? (
        <div className="text-red-500 my-auto">字数超過</div>
      ) : (
        <div className="text-blue-400 my-auto">
          {props.body.length ?? 0}/1000
        </div>
      )}
    </div>
  );
};
