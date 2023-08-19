import { FC, ReactElement } from "react";
import "katex/dist/katex.min.css";
import katex from "katex";
import { Image } from "@mantine/core";

const arr = [
  { re: /^\s*#\s+/, cn: "text-2xl", id: 0 },
  { re: /^\s*##\s+/, cn: "text-xl", id: 0 },
  { re: /^\s*###\s+/, cn: "text-lg", id: 0 },
  { re: /^\s*`\s+/, cn: "font-mono", id: 0 },
  { re: /^\s*-\s+/, cn: "text-base list-inside", id: 1 },
  { re: /^\s*-{3,}\s*$/, cn: "h-0.5 border-none bg-blue-200", id: 2 },
  { re: /^\s*\$\s+/, cn: "", id: 3 },
  {
    re: /^(.*?)!\[(.*?)\]\((http[s]?:\/\/.*?),\s*([0-9]+?)\)(.*?)$/,
    cn: "img",
    id: 4,
  },
  { re: /^(.*?)\[(.*?)\]\((http[s]?:\/\/.*?)\)(.*?)$/, cn: "a", id: 4 },
];

type Props = {
  lines: string;
};

export const Parser: FC<Props> = (props) => {
  const lineArr = props.lines.replace(/\s*\\\n/, " ").split(/\n/);

  const renderKaTeX = (text: string) => {
    const renderedHTML = katex.renderToString(text, {
      throwOnError: false,
    });
    return <div dangerouslySetInnerHTML={{ __html: renderedHTML }} />;
  };

  const lineParser = (line: string): ReactElement => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].re.test(line)) {
        switch (arr[i].id) {
          case 0:
            return (
              <div key={line} className={`${arr[i].cn}`}>
                {line.replace(arr[i].re, "")}
              </div>
            );
          case 1:
            return (
              <li className={`${arr[i].cn}`}>{line.replace(arr[i].re, "")}</li>
            );
          case 2:
            return <hr className={`${arr[i].cn}`} />;
          case 3:
            return (
              <div key={line}>{renderKaTeX(line.replace(arr[i].re, ""))}</div>
            );
          case 4:
            // const regex = /^(.*?)\[(.*?)\]\((http[s]?:\/\/.*?)\)(.*?)$/;
            const matches = line.match(arr[i].re);

            if (matches) {
              const head = matches[1];
              const label = matches[2];
              const ref = matches[3];
              const size = matches[4];
              const tail = matches[5];

              return (
                <div className="text-base">
                  {head}
                  {arr[i].cn == "a" ? (
                    <a className="text-blue-600" href={ref}>
                      {label}
                    </a>
                  ) : (
                    <div className="m-2 whitespace-nowrap overflow-hidden">
                      <Image
                        radius="md"
                        width={size}
                        alt={label}
                        src={ref}
                        withPlaceholder={true}
                        placeholder={label}
                      />
                    </div>
                  )}

                  {tail}
                </div>
              );
            }

            return <></>;
        }
      }
    }
    return <div className="text-base">{line.replace(/\s*$/, "")}</div>;
  };

  return (
    <div key={props.lines}>
      {lineArr.map((line) => {
        return lineParser(line);
      })}
    </div>
  );
};
