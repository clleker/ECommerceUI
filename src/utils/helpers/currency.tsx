export default function Currency(props: any): any {
  const { value } = props;

  const result = new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
  }).format(value);
  return `${result}`;
}
