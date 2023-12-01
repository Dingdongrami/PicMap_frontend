export const getCurrentTimestamp = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더합니다.
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export const convertToIsoFormat = dateTimeStr => {
  // console.log(dateTimeStr);
  // 날짜 구분자를 변경: "2023:11:18 16:07:54" -> "2023-11-18 16:07:54"
  let formattedStr = dateTimeStr.replace(/:/g, (match, offset) => (offset === 4 || offset === 7 ? '-' : match));

  // 날짜와 시간을 'T'로 구분
  formattedStr = formattedStr.replace(' ', 'T');

  return formattedStr;
};
