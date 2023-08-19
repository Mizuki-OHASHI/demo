import { Image } from "@mantine/core";
import { FC } from "react";
import { FaceId } from "tabler-icons-react";

type Props = {
  iconId: string;
  iconSize: number;
  onClick: () => void;
};

export const ShowIcon: FC<Props> = (props) => {
  if (props.iconId === "") {
    return (
      <div className={`rounded bg-blue-200`} onClick={props.onClick}>
        <FaceId size={props.iconSize} color="darkblue" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center" onClick={props.onClick}>
      <Image
        src={`${process.env.NEXT_PUBLIC_STORAGE_URI}/${props.iconId}?alt=media`}
        alt={props.iconId}
        fit="cover"
        radius="md"
        width={`${props.iconSize}px`}
        height={`${props.iconSize}px`}
      />
    </div>
  );
};
