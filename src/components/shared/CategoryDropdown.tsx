import { Form, Select } from "antd";
import { useEffect, useState } from "react";
import * as apiCategory from "../../services/api/category-http";

export default function CategoryDropdown(props: {
  name: string;
  label: string;
  rules: any[];
  mode?: "multiple";
}) {
  const { name, label, rules, mode } = props;
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    apiCategory.getList().then((result) => {
      setCategories(result.data.data);
    });
  };

  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Select
        size={"middle"}
        mode={mode}
        placeholder="Kategoriler"
        defaultValue={[]}
        style={{ width: "100%" }}
      >
        {categories.map((category) => (
          <Select.Option key={category.id} value={category.id}>
            {category.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
}
