import { useState } from "react";
import { User } from "../types";

function useForm(initialValues: User) {
  const [formData, setFormData] = useState<User>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const resetForm = () => {
    setFormData(initialValues);
  };

  return { formData, handleChange, resetForm };
}

export { useForm };
