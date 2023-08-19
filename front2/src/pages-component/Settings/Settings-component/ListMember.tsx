import { Channel, User, Workspace } from "@/methods/Type";
import { useRouter } from "next/router";
import { FC, ReactElement } from "react";
import { CircleLetterM, Friends, List, UserCircle } from "tabler-icons-react";

type Props = {
  members: Array<User>;
};
export const ListMember: FC<Props> = (props) => {
  const router = useRouter();

  const listMember = (): ReactElement => {
    const memberWrapper = (m: User): ReactElement => {
      return (
        <div className="rounded-xl hover:bg-blue-50 h-10 p-2" key={m.id}>
          <button className="w-full flex flex-row my-auto" onClick={() => {}}>
            <div className="overflow-x-scroll whitespace-nowrap my-auto">
              {m.name}
            </div>
            {m.flag ? (
              <div className="ml-auto my-auto">
                <UserCircle size={24} color="darkblue" />
              </div>
            ) : (
              <></>
            )}
          </button>
        </div>
      );
    };

    return (
      <div className="m-2 p-2 bg-white rounded-2xl">
        {props.members.map((m) => {
          return memberWrapper(m);
        })}
      </div>
    );
  };

  return (
    <div className="h-full w-full">
      <div>
        <div className="text-lg flex flex-row mb-2">
          <Friends size={32} color="darkblue" />
          <div className="ml-2 my-auto">メンバー一覧</div>
        </div>
        <div className="mt-2 flex flex-row border-b-2 border-blue-100">
          <div className="ml-4">メンバー</div>
          <div className="ml-auto mr-4">{(props.members ?? []).length} 人</div>
        </div>
        <div className="mt-2 flex flex-row border-b-2 border-blue-100">
          <div className="mx-4">管理者</div>
          <UserCircle size={24} color="darkblue" />
          <div className="ml-auto mr-4">
            {
              (props.members ?? []).filter((m) => {
                return m.flag;
              }).length
            }{" "}
            人
          </div>
        </div>
        {listMember()}
      </div>
    </div>
  );
};
