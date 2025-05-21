import { FormInstance } from "antd";

export const setFormFields = (form: FormInstance<any>, fields: any) => {
  form.setFields(
    Object.entries(fields).map(([name, value]) => ({ name, value }))
  );
}