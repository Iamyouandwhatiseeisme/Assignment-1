import React, { useState } from "react";
import { EditableInputProps } from "../types";
export default function EditableInput(props: EditableInputProps) {
  const [value, setValue] = useState<string>(props.value);
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  async function handleApiCall() {
    const response = await fetch(props.apiEndpoint, {
      method: "POST",
      headers: {
        newValue: value,
      },
    });
    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.updateType === "email") {
        alert(`Verification email sent to ${value}`);
      }
    }
  }

  return (
    <div className="flex flex-row justify-start items-center gap-2">
      <label>Email: </label>
      <input
        className="rounded-2xl h-10 w-48 text-start pl-2"
        type="email"
        value={value}
        onSubmit={handleApiCall}
        onChange={handleValueChange}
      ></input>
      <button
        className="rounded-2xl border bg-white border-black h-10 w-20"
        onClick={handleApiCall}
      >
        {props.updateButtonText}
      </button>
    </div>
  );
}
