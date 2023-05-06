export const inputMaskConfig = {
  alias: "currency",
  groupSeparator: ".",
  radixPoint: ",",
  autoGroup: true,
  digits: 2,
  digitsOptional: false,
  placeholder: "0,00",
  showMaskOnFocus: true,
};

// 33,22 --> 33.22
export const convertStrCurrencyToFloat = (value: string) => {
  return parseFloat(value.split(".").join("").split(",").join("."));
};

//33.22 --> 33,22
export const convertFloatToCurrencyStr = (value: string) => {
  return value.toString().split(".").join(",");
};
