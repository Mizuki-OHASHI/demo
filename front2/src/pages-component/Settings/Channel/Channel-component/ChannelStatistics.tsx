import { FC } from "react";
import { ChannelStatistics } from "@/methods/Type";
import { ChartBar } from "tabler-icons-react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
  ResponsiveContainer,
} from "recharts";
import dynamic from "next/dynamic";

const BarChart = dynamic(
  () => import("recharts").then((recharts) => recharts.BarChart),
  { ssr: false }
);

const LineChart = dynamic(
  () => import("recharts").then((recharts) => recharts.LineChart),
  { ssr: false }
);

type Props = {
  channelStatistics: ChannelStatistics;
};

export const ShowChannelStatistics: FC<Props> = (props) => {
  return (
    <>
      <div className="flex flex-row">
        <ChartBar size={32} color="darkblue" />
        <div className="text-lg my-auto mx-2">チャンネル統計情報</div>
      </div>
      <div className="my-2 border-b-2 border-blue-100">
        <div className="px-4">時間帯別のメッセージ投稿件数</div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          width={300}
          height={250}
          data={props.channelStatistics.messagecounts}
          margin={{ bottom: 30, top: 10, left: -20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="hour"
            interval={2}
            label={{
              value: "時刻 (GMT)",
              position: "insideBottom",
              offset: -15,
            }}
          />
          <YAxis
          // label={{
          //   value: "投稿件数",
          //   position: "insideLeft",
          //   offset: 10,
          //   angle: -90,
          // }}
          />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="count" fill="#8884d8" />
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
      </ResponsiveContainer>
      {/* <div className="my-2 border-b-2 border-blue-100">
        <div className="px-4">メッセージの長さの累積度数分布</div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          width={300}
          height={250}
          data={props.channelStatistics.messagelengths}
          margin={{ bottom: 30, top: 10, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="length"
            interval={2}
            label={{
              value: "メッセージ長",
              position: "insideBottom",
              offset: -15,
            }}
          />
          <YAxis
            dataKey={"rate"}
            label={{
              value: "%",
              position: "insideLeft",
              offset: 0,
              // offset: 10,
              // angle: -90,
            }}
          />
          <Tooltip />
          {/* <Legend /> *
          <Line dataKey="rate" fill="#8884d8" />
          {/* <Bar dataKey="uv" fill="#82ca9d" /> *
        </LineChart>
      </ResponsiveContainer> */}
    </>
  );
};
