import { useState } from "react";

/*Formulario de useForm */
export const useForm = (initialForm) => {
  const [dataForm, setDataForm] = useState(initialForm);

  const onChangeInput = ({ target }) => {
    const { name, value } = target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return {
    onChangeInput,
    onSubmit,
    setDataForm,
    dataForm,
  };
};
