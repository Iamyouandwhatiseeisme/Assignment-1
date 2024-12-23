"use client";
import React, { useState } from "react";
import DropDownButton from "../DropDownButton/DropDownButton";
import DropDownContent from "../DropDownContent/DropDownContent";
import { ThemeOption } from "../../hooks/useTheme";
import { SortOption } from "../types";

interface DropDownProps {
  buttonText: string[];
  content: ThemeOption[] | SortOption[];
  toggleHandler: (
    option: string | undefined,
    order: string | undefined
  ) => void;
  type: string;
}

const DropDown = (props: DropDownProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const toggleDropDown = () => {
    setOpen((open) => !open);
  };

  return (
    <div>
      <DropDownButton toggle={toggleDropDown} open={open} type={props.type}>
        {props.buttonText}
      </DropDownButton>
      <DropDownContent
        onSelect={toggleDropDown}
        open={open}
        toggleHandler={props.toggleHandler}
        type={props.type}
      >
        {props.content}
      </DropDownContent>
    </div>
  );
};

export default DropDown;
