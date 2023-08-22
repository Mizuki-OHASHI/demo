import { HoverCard, Divider } from "@mantine/core";
import { QuestionMark } from "tabler-icons-react";

export const MarkdownInfo = () => {
  return (
    <HoverCard shadow="md" closeDelay={1000}>
      <HoverCard.Target>
        <QuestionMark size={32} color="darkblue" className="ml-2" />
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <div className="font-mono">
          <div className="text-xs text-gray-400">行先頭で使用</div>
          <div className="flex flex-row">
            <div className="mx-2">#</div>
            <div className="text-2xl mr-2">大見出し</div>
            <div className="mx-2">##</div>
            <div className="text-xl mr-2">中見出し</div>
            <div className="mx-2">###</div>
            <div className="text-lg">小見出し</div>
          </div>
          <div className="flex flex-row">
            <div className="mx-2">---</div>
            <div className="text-base mr-8">横線</div>
            <div className="mx-2">$</div>
            <div className="text-base mr-8">数式モード</div>
            <div className="mx-2">`</div>
            <div className="text-base">コードブロック</div>
          </div>
          <Divider />
          <div className="text-xs text-gray-400 mt-2">行内で使用</div>
          <div className="flex flex-row">
            <div className="mx-2 w-52">[label](link)</div>
            <div className="text-base mr-2">外部リンク</div>
          </div>
          <div className="flex flex-row">
            <div className="mx-2 w-52">![label](link, width)</div>
            <div className="text-base">画像の埋め込み</div>
          </div>
          <Divider />
          <div className="text-xs text-gray-400 mt-2">行末尾で使用</div>
          <div className="flex flex-row">
            <div className="mx-2">\</div>
            <div className="text-base mr-2">改行エスケープ</div>
          </div>
        </div>
      </HoverCard.Dropdown>
    </HoverCard>
  );
};
