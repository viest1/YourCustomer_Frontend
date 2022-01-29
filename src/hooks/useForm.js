import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    // This function runs when the things we are watching change
    setInputs(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = e.target.files;
    }
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: value,
    });
  }

  const handleSelect = (e, action) => {
    let obj = [];
    if (e?.length) {
      for (let i = 0; i < e.length; i++) {
        obj.push({ label: e[i].label, value: e[i].value });
      }
      setInputs({
        // copy the existing state
        ...inputs,
        [action.name]: obj,
      });
    } else {
      setInputs({
        // copy the existing state
        ...inputs,
        [action.name]: e?.label === undefined || e?.value === undefined ? '' : { label: e?.label, value: e?.value },
      });
    }
  };

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(Object.entries(inputs).map(([key, value]) => [key, '']));
    setInputs(blankState);
  }

  // return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
    handleSelect,
  };
}
