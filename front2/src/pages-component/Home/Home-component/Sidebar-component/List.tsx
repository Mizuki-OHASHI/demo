import { Channel } from "@/methods/Type";
import router from "next/router";
import { FC, useEffect, useState } from "react";

type Props = {
  channels: Array<Channel>;
  workspaceid: string;
  channelid: string;
};

export const ListChannels: FC<Props> = (props) => {
  const [activeChannels, setActiveChannels] = useState<Array<Channel>>([]);

  useEffect(() => {
    if (props.channels != null && props.channels.length > 0) {
      setActiveChannels(
        props.channels.filter((c) => {
          return c.workspaceid == props.workspaceid;
        })
      );
    }
  }, [props.channels, props.workspaceid]);

  return (
    <div>
      {activeChannels.map((c) => {
        if (c.deleted) {
          return <></>;
        }
        return (
          <div
            key={c.id}
            className={`flex flex-row rounded ${
              c.id == props.channelid ? "bg-blue-200" : ""
            } hover:bg-blue-100`}
          >
            <button
              className="w-full text-left text-lg px-2 whitespace-nowrap overflow-x-scroll"
              onClick={() => {
                router.push(
                  `/home?workspaceid=${props.workspaceid}&channelid=${c.id}`
                );
              }}
            >
              {c.name}
            </button>
          </div>
        );
      })}
    </div>
  );
};
