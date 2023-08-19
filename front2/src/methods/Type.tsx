// ------------ USER ------------
export type User = {
  id: string;
  name: string;
  deleted: boolean;
  bio: string;
  img: string;
  flag: boolean;
};

export const EmptyUser: User = {
  id: "",
  name: "",
  deleted: false,
  bio: "",
  img: "",
  flag: false,
};

// ------------ CHANNEL ------------
export type Channel = {
  id: string;
  name: string;
  createdat: string;
  bio: string;
  publicPw: string;
  privatePw: string;
  deleted: boolean;
  workspaceid: string;
  flag: boolean;
};

export const EmptyChannel = {
  id: "",
  name: "",
  createdat: "",
  bio: "",
  publicPw: "",
  privatePw: "",
  deleted: false,
  workspaceid: "",
  flag: false,
};

// ------------ WORKSPACE ------------
export type Workspace = {
  id: string;
  name: string;
  createdat: string;
  bio: string;
  publicPw: string;
  privatePw: string;
  deleted: boolean;
  img: string;
  flag: boolean;
};

export const EmptyWorkspace: Workspace = {
  id: "",
  name: "",
  createdat: "",
  bio: "",
  publicPw: "",
  privatePw: "",
  deleted: false,
  img: "",
  flag: false,
};

// ------------ MESSAGE ------------
export type Message = {
  id: string;
  title: string;
  body: string;
  postedat: string;
  postedby: string;
  name: string;
  icon: string;
  channelId: string;
  edited: boolean;
  deleted: boolean;
};

export const EmptyMessage = {
  id: "",
  title: "",
  body: "",
  postedat: "",
  postedby: "",
  name: "",
  icon: "",
  channelId: "",
  edited: false,
  deleted: false,
};

export type Reply = {
  id: string;
  title: string;
  body: string;
  postedat: string;
  postedby: string;
  name: string;
  icon: string;
  replyto: string;
  edited: boolean;
  deleted: boolean;
};

// ------------ ERROR ------------
export type MyError = {
  code: number;
  detail: string;
};

export const EmptyError = {
  code: 100,
  detail: "loading",
};

// ------------ INFO ------------
export type UserInfo = {
  user: User;
  workspaces: Array<Workspace>;
  channels: Array<Channel>;
  error: MyError;
};

export const EmptyUserInfo = {
  user: EmptyUser,
  workspaces: [],
  channels: [],
  error: EmptyError,
};

export type ChannelInfo = {
  channel: Channel;
  members: Array<User>;
  messages: Array<Message>;
  error: MyError;
};

export const EmptyChannelInfo: ChannelInfo = {
  channel: EmptyChannel,
  members: [],
  messages: [],
  error: EmptyError,
};

export type WorkspaceInfo = {
  workspace: Workspace;
  members: Array<User>;
  channels: Array<Channel>;
  error: MyError;
};

export const EmptyWorkspaceInfo: WorkspaceInfo = {
  workspace: EmptyWorkspace,
  members: [],
  channels: [],
  error: EmptyError,
};

export type MessageInfo = {
  root: Message;
  replies: Array<Reply>;
  error: MyError;
};

export const EmptyMessageInfo: MessageInfo = {
  root: EmptyMessage,
  replies: [],
  error: EmptyError,
};

// ------------ JOIN ------------
export type Workspaces = {
  list: Array<Workspace>;
  error: MyError;
};

export const EmptyWorkspaces = {
  list: [],
  error: EmptyError,
};

// ------------ CUD ------------
export type MessageCUD = {
  message: Message;
};

export type UserCUD = {
  user: User;
};

export type JoinInfo = {
  userid: string;
  direction: string;
  id: string;
  password: string;
  owner: boolean;
};

// ------------ STATISTICS ------------

export type messagecount = {
  hour: number;
  count: number;
};

export type messagelength = {
  length: number;
  rate: number;
};

export type UserStatistics = {
  id: string;
  messagecounts: Array<messagecount>;
  messagelengths: Array<messagelength>;
  error: MyError;
};

export const EmptyUserStatistics = {
  id: "",
  messagecounts: [],
  messagelengths: [],
  error: EmptyError,
};

export type ChannelStatistics = {
  id: string;
  messagecounts: Array<messagecount>;
  messagelengths: Array<messagelength>;
  error: MyError;
};

export const EmptyChannelStatistics = {
  id: "",
  messagecounts: [],
  messagelengths: [],
  error: EmptyError,
};

export type WorkspaceStatistics = {
  id: string;
  messagecounts: Array<messagecount>;
  error: MyError;
};

export const EmptyWorkspaceStatistics = {
  id: "",
  messagecounts: [],
  error: EmptyError,
};
