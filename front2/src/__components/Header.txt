import { useRouter } from "next/router";
import { FC } from "react";
import { ShowIcon } from "./ShowIcon";
import type { Icon, User, Workspace } from "./Type";

type Props = {
  user: User;
  workspaces: Array<Workspace>;
  theme: string;
};

export const Header: FC<Props> = (props) => {
  const router = useRouter();

  const userIcon: Icon = {
    id: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP._CO0ePr3XLVEC8vgpNv34gHaF7%26pid%3DApi&f=1&ipt=7a38242329672adff92b69c05da9e3dfcf5a0660a1273f986e36178b3e0d529e&ipo=images",
    // id: props.user.id,
    name: props.user.name,
    size: 12,
  };

  return (
    <>
      <div className={`w-full h-16 bg-blue-950 text-blue-50`}>
        <div className="px-8 py-2 w-full flex flex-row">
          <div className="h-12">FCT</div>
          <div className="h-12">
            <div className="h-12 px-4">
              {props.workspaces.map((workspace) => {
                const workspaceIcon: Icon = {
                  id: workspace.id,
                  name: workspace.name,
                  size: 12,
                };
                return (
                  <>
                    <ShowIcon
                      icon={workspaceIcon}
                      onClick={() => {
                        /** Workspace の遷移 */
                      }}
                    />
                  </>
                );
              })}
            </div>
          </div>
          <div
            className="h-12 mr-auto flex flex-row"
            onClick={() => {
              router.push("/setting");
            }}
          >
            <ShowIcon
              icon={userIcon}
              onClick={() => {
                router.push("/setting");
              }}
            />
            <div className="h-12 px-4 text-center items-center">
              {props.user.name}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
