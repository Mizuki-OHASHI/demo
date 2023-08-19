import { Dispatch, FC, ReactElement, SetStateAction } from "react";
import { Menu } from "@mantine/core";

type MenuElement = {
  label: string;
  path: string;
  icon: ReactElement;
  isRed?: boolean;
};

type MenuProps = {
  menues: Array<MenuElement>;
  path: string;
  setPath: Dispatch<SetStateAction<string>>;
  name: string;
};

export const DropdownMenus: FC<MenuProps> = (props) => {
  return (
    <Menu
      trigger="hover"
      shadow="md"
      width={240}
      position="bottom-start"
      transitionProps={{ transition: "fade", duration: 500 }}
      offset={0}
    >
      <Menu.Target>
        <div className="w-2/12 text-white px-6 py-3 hover:bg-blue-800">
          {props.name}
        </div>
      </Menu.Target>
      <Menu.Dropdown>
        {props.menues.map((el) => {
          return (
            <Menu.Item
              key={el.path}
              onClick={() => {
                props.setPath(el.path);
              }}
              icon={el.icon}
              className={el.isRed ? "text-red-500" : ""}
            >
              {el.label}
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
};
