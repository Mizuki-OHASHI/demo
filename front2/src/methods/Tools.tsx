export const ConvQueryToString = (q: string | string[] | undefined): string => {
  if (typeof q === "string") {
    return q;
  } else {
    return "default";
  }
};

export const GetDateTime = (): string => {
  const currentDate = new Date();

  // const year = currentDate.getFullYear();
  // const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  // const day = ("0" + currentDate.getDate()).slice(-2);
  // const hours = ("0" + currentDate.getHours()).slice(-2);
  // const minutes = ("0" + currentDate.getMinutes()).slice(-2);
  // const seconds = ("0" + currentDate.getSeconds()).slice(-2);

  // return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return currentDate.toISOString().slice(0, 19).replace("T", " ");
};

export const ConvDateTime = (datetime: string): string => {
  const inputDate = new Date(datetime);

  const year = inputDate.getFullYear();
  const month = inputDate.getMonth() + 1;
  const day = inputDate.getDate();
  const hours = inputDate.getHours();
  const minutes = ("0" + inputDate.getMinutes()).slice(-2);

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};
