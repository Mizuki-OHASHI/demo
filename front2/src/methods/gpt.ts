import error from "next/error";
import { Dispatch, SetStateAction } from "react";
import { ConvQueryToString } from "./Tools";

export const GPT = async (
  body: string,
  setTitle: Dispatch<SetStateAction<string>>
) => {
  try {
    const res = await fetch(
      ConvQueryToString(process.env.NEXT_PUBLIC_GPT_URL),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ConvQueryToString(
            process.env.NEXT_PUBLIC_GPT_API_KEY
          )}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `instruction: make title in brief Japanese.\ninputs:\n${body}`,
            },
          ],
          max_tokens: 100,
        }),
      }
    );

    const res_ = (await res.json()) as GPTRes;

    // console.log(res_);

    setTitle(res_.choices[0].message.content);

    // console.log(
    //   ConvQueryToString(process.env.NEXT_PUBLIC_GPT_URL),
    //   ConvQueryToString(process.env.NEXT_PUBLIC_GPT_API_KEY),
    //   {
    //     model: "gpt-3.5-turbo",
    //     messages: [
    //       {
    //         role: "user",
    //         content: `instruction: make title\ninputs:\n${body}`,
    //       },
    //     ],
    //     max_tokens: 30,
    //   }
    // );
    return;
  } catch (err) {
    alert("サーバーとの接続に失敗しました at GPT");
    console.error(err);
    return;
  }
};

type GPTRes = {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: [
    {
      message: { role: string; content: string };
      finish_reason: string;
      index: number;
    }
  ];
};

// NEXT_PUBLIC_GPT_URL = "https://api.openai.com/v1/fine-tunes";
// NEXT_PUBLIC_GPT_API_KEY = "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";

// curl  \
//   -X POST \
//   -H "Content-Type: application/json" \
//   -H "Authorization: Bearer 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" \
//   -d '{
//     "model": "gpt-3.5-turbo",
//     "messages": [{"role": "user", "content": "instruction: make title\ninputs:\n改めて「四、活動報告」についてです。\n必須内容 "}],
//     "max_tokens": 30
//   }' https://api.openai.com/v1/chat/completions

// const res = {
//   id: "chatcmpl-7N8NXaNd1czDI0bDYbKt92u1KhlFB",
//   object: "chat.completion",
//   created: 1685748107,
//   model: "gpt-3.5-turbo-0301",
//   usage: { prompt_tokens: 37, completion_tokens: 10, total_tokens: 47 },
//   choices: [
//     {
//       message: { role: "assistant", content: "「四、活動報告」の重" },
//       finish_reason: "length",
//       index: 0,
//     },
//   ],
// };

// const s = {
//   id: "chatcmpl-7N8LYhLKTXcOjqeSMbCNInVxQCpcc",
//   object: "chat.completion",
//   created: 1685747984,
//   model: "gpt-3.5-turbo-0301",
//   usage: { prompt_tokens: 289, completion_tokens: 25, total_tokens: 314 },
//   choices: [
//     {
//       message: {
//         role: "assistant",
//         content: "「G活動報告2022-2023：幹部紹介と活動展望」",
//       },
//       finish_reason: "stop",
//       index: 0,
//     },
//   ],
// };
