export function nameof<T>(key: keyof T, instance?: T): keyof T {
  return key;
}

export function convertObjToFormData(
  data: any,
  form: FormData,
  namespace: string = ""
): FormData {
  for (let propertyName in data) {
    let formKey = namespace ? `${namespace}[${propertyName}]` : propertyName;
    if (
      data.hasOwnProperty(propertyName) && // Array'se ve File Dizisi İse
      data[propertyName] instanceof Array &&
      data[propertyName][0] instanceof File
    ) {
      for (let index in data[propertyName]) {
        const tempFormKey = `${formKey}[${index}]`;
        form.append(tempFormKey, data[propertyName][index]);
      }
    } else if (
      data.hasOwnProperty(propertyName) &&
      data[formKey] instanceof File
    ) {
      form.append(propertyName, data[propertyName]);
    } else if (data[propertyName] instanceof Date) {
      form.append(formKey, data[propertyName].toISOString());
    } else if (data[propertyName] instanceof Array) {
      data[propertyName].forEach((element: any, index: any) => {
        if (element) {
          const tempFormKey = `${formKey}[${index}]`;
          if (typeof element === "object") {
            convertObjToFormData(element, form, tempFormKey);
          } else {
            form.append(tempFormKey, element.toString());
          }
        }
      });
    } else if (
      typeof data[propertyName] === "object" &&
      !(data[propertyName] instanceof File)
    ) {
      convertObjToFormData(data[propertyName], form, formKey);
    } else if (
      !data.hasOwnProperty(propertyName) ||
      typeof data[propertyName] === "undefined" ||
      data[propertyName] === null
    ) {
      continue;
    } else {
      console.log(data[propertyName]);
      form.append(formKey, data[propertyName].toString());
    }
  }
  return form;
}
