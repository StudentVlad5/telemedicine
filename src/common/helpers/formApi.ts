import { baseFormUrl } from "../config";

const sendFormData = async (form_id: string, fields: Record<string, any>) => {
  try {
    const params = new URLSearchParams({ form_id });

    for (const key in fields) {
      if (fields.hasOwnProperty(key)) {
        params.append(key, fields[key]);
      }
    }

    const url = `${baseFormUrl}/edit_form?${params.toString()}`;

    const response = await fetch(url, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update fields: ${Object.keys(fields).join(", ")}`
      );
    }

    const data = await response.json();
    console.log(`✅ Updated fields:`, fields);
    return data;
  } catch (error) {
    console.error(`❌ Error updating fields:`, fields, error);
    return null;
  }
};

export default sendFormData;
