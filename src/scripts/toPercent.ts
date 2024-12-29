export default function (per: `${number}%`) {
  const num = Number(per.replace('%', ''));
  return 1 / (100 / num);
}
