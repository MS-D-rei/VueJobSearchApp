const nextElementInList = (list: string[], item: string) => {
  const currentItemIndex = list.indexOf(item);
  const nextItemIndex = (currentItemIndex + 1) % list.length; // 4 -> 0 so 1, 2, 3, 4->0, 1, 2, 3...
  const nextItem = list[nextItemIndex];
  return nextItem;
};

export default nextElementInList;
