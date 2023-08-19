import { User } from "@/methods/Type";
import { LogOut } from "@/methods/Authenticate";
import { Logout, Settings } from "tabler-icons-react";
import { useRouter } from "next/router";
import { FC } from "react";
import { ShowIcon } from "@/methods/ShowIcon";

type Props = {
  user: User;
  currentUserId: string;
};

export const Header: FC<Props> = (props) => {
  const router = useRouter();
  return (
    <div className="flex flex-row-reverse">
      <div className="h-12">
        <button
          className="h-12"
          onClick={() => {
            LogOut();
            router.push("/");
          }}
        >
          <div className="flex flex-row text-blue-900 hover:bg-blue-800 hover:text-white">
            <Logout size={32} color="white" className="m-2" />
            <div className="text-sm mr-2 my-auto">ログアウト</div>
          </div>
        </button>
      </div>
      <div className="h-12">
        <button
          className="h-12"
          onClick={() => {
            router.push(`/settings`);
          }}
        >
          <div className="h-12 px-2 flex flex-row text-blue-900 hover:bg-blue-800 hover:text-white">
            <Settings size={32} color="white" className="m-2" />
            <div className="text-sm my-auto">設定</div>
          </div>
        </button>
      </div>
      <div className="h-12">
        <button
          className="h-12"
          onClick={() => {
            router.push(`/settings/user`);
          }}
        >
          <div className="h-12 px-2 flex flex-row text-blue-900 hover:bg-blue-800 hover:text-white">
            <div className="my-auto mx-2">
              <ShowIcon
                iconId={props.user.img}
                iconSize={32}
                onClick={() => {}}
              />
            </div>
            <div className="text-xl text-white my-auto">{props.user.name}</div>
          </div>
        </button>
      </div>
      <div className="font-mono my-auto px-4 mr-auto">
        <button
          onClick={() => {
            router.push("/");
          }}
        >
          SciConnect
        </button>
      </div>
    </div>
  );
};
