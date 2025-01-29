"use client";
import React from "react";
import { CIcon } from "@coreui/icons-react";
import { ThemeOption } from "../../hooks/useTheme";
import { SortOption } from "../types";
import { useTheme } from "next-themes";

interface DropDownItemProps {
  children: ThemeOption | SortOption;
  onClick: () => void;
  // toggleHandler: (
  //   option: string | undefined,
  //   order: string | undefined
  // ) => void;
}

const DropDownItem = (props: DropDownItemProps) => {
  const { setTheme } = useTheme();

  const clickHandler = () => {
    props.onClick();

    setTheme(props.children.label);
  };

  return (
    <div
      className="p-2 m-0.5 w-full rounded-lg  cursor-pointer hover:bg-gray-200"
      onClick={() => {
        clickHandler();
      }}
    >
      <CIcon icon={(props.children as ThemeOption).icon}></CIcon>
    </div>
  );
};

export default DropDownItem;
