import { FC, useEffect, useState } from "react";
import { SettingsHeader } from "../Settings-component/Header";
import {
  FetchChannelInfo,
  FetchChannelStatistics,
  FetchUserInfo,
} from "@/methods/Fetch";
import {
  ChannelInfo,
  ChannelStatistics,
  EmptyChannelInfo,
  EmptyChannelStatistics,
  EmptyUserInfo,
  UserInfo,
} from "@/methods/Type";
import { fireAuth } from "@/methods/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { BasicChannelInfo } from "./Channel-component/BasicChannelInfo";
import { ShowChannelStatistics } from "./Channel-component/ChannelStatistics";
import { ListMember } from "../Settings-component/ListMember";
import { useRouter } from "next/router";
import { Select } from "@mantine/core";
import { ConvQueryToString } from "@/methods/Tools";

export const SettingsChannel: FC = () => {
  const router = useRouter();
  const { option, channelid } = router.query;
  const [userInfo, setUserInfo] = useState<UserInfo>(EmptyUserInfo);
  const [channelInfo, setChannelInfo] = useState<ChannelInfo>(EmptyChannelInfo);
  const [currentUserId, setCurrentUserId] = useState("");
  const [path, setPath] = useState("/channel");
  const [channelId, setChannelId] = useState<string | null>(
    ConvQueryToString(channelid)
  );
  const [channelStatistics, setChannelStatistics] = useState<ChannelStatistics>(
    EmptyChannelStatistics
  );
  const [channels, setChannels] = useState<
    Array<{ value: string; label: string }>
  >([]);

  useEffect(() => {
    onAuthStateChanged(fireAuth, (currentUser) => {
      setCurrentUserId(currentUser?.uid ?? "");
    });
  }, []);

  useEffect(() => {
    FetchUserInfo(currentUserId, setUserInfo, () => {
      router.push("/");
    });
  }, [currentUserId]);

  useEffect(() => {
    if (channelId !== "") {
      router.push(
        `/settings/channel?channelid=${channelId}&option=${ConvQueryToString(
          option
        )}`
      );
    }
  }, [channelId]);

  useEffect(() => {
    if (userInfo.channels != null) {
      setChannels(
        userInfo.channels.map((ch) => {
          return { value: ch.id, label: ch.name };
        })
      );
    }
  }, [userInfo]);

  useEffect(() => {
    FetchChannelStatistics(ConvQueryToString(channelid), setChannelStatistics);
    FetchChannelInfo(ConvQueryToString(channelid), setChannelInfo);
  }, [channelid]);

  return (
    <div className="w-screen h-screen text-blue-950">
      <SettingsHeader
        userInfo={userInfo}
        currentUserId={currentUserId}
        path={path}
        setPath={setPath}
      />
      <div className="h-screen pt-12 flex flex-row">
        <div className="w-4/12 m-4 p-8 rounded-2xl bg-blue-50 whitespace-nowrap overflow-y-scroll">
          <div className="mb-8 pb-8 border-b-2 border-blue-200">
            <Select
              placeholder="チャンネルを１つ選択"
              value={channelId}
              onChange={setChannelId}
              data={channels}
            />
          </div>
          <BasicChannelInfo
            currentUserId={currentUserId}
            channel={channelInfo.channel}
            isOwner={
              channelInfo.members.find((m) => {
                return m.id == currentUserId;
              })?.flag ?? false
            }
          />
        </div>
        <div className="w-4/12 border-y-4 border-blue-50 m-4 p-8 rounded-2xl bg-blue-50  whitespace-nowrap overflow-y-scroll">
          <ListMember members={channelInfo.members} />
        </div>
        <div className="w-4/12 m-4 p-8 rounded-2xl bg-blue-50">
          <ShowChannelStatistics channelStatistics={channelStatistics} />
        </div>
      </div>
    </div>
  );
};
