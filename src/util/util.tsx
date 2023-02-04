// str: 日付文字列（yyyyMMdd）
export function toDate(str: string): string {
  const retDate =
    str.substring(0, 4) +
    "年" +
    str.substring(4, 6) +
    "月" +
    str.substring(6, 8) +
    "日";
  return retDate;
}
