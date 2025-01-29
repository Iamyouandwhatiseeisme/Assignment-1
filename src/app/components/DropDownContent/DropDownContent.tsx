import React from "react";
import DropDownItem from "../DropDownItem/DropDownItem";
import { ThemeOption } from "../../hooks/useTheme";

interface DropDownContentProps {
  children: ThemeOption[];
  open: boolean;
  onSelect: () => void;
}

const DropDownContent = (props: DropDownContentProps) => {
  return (
    <div
      style={{
        visibility: `${props.open ? "visible" : "hidden"}`,
        transition: "transform 150ms ease-in-out",
        transform: "translateY(-5%)",
      }}
      className={
        props.open
          ? "fixed rounded-lg animate-slide-in min-w-12 bg-gray-200 shadow-lg shadow-teal-300 text-green-950 flex-col items-center mt-4 max-h-40vh z-50 flex cursor-pointer opacity-100 translate-y-0 pointer-events-auto"
          : "absolute min-w-12 flex-col items-center mt-4 max-h-40vh  pointer-events-none z-50 "
      }
    >
      {
        <>
          {props.children.map((options) => (
            <DropDownItem onClick={props.onSelect} key={options.label}>
              {options}
            </DropDownItem>
          ))}
        </>
      }
    </div>
  );
};

export default DropDownContent;
