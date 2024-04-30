const extractDate = (passedMilliseconds: number) => {
  const date = new Date(passedMilliseconds);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  // 2024.04.22. 오후 9:31 형태로 반환
  return {
    year,
    month,
    day,
    hour,
    minute,
  };
};

export default extractDate;
