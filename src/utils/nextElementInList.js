const nextElementInList = (list, item) => {
  const currentItemIndex = list.indexOf(item);
  console.log(currentItemIndex);
  const nextItemIndex = (currentItemIndex + 1) % list.length; // 4 -> 0 so 1, 2, 3, 4->0, 1, 2, 3...
  console.log(nextItemIndex);
  const nextItem = list[nextItemIndex];
  return nextItem;
};

export default nextElementInList;
