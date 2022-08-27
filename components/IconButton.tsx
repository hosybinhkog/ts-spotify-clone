import { NextPage } from "next";
import React from "react";

interface IconButtonProps {
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
  label: string;
}

const IconButton: NextPage<IconButtonProps> = ({
  icon: Icon,
  label,
}: IconButtonProps) => {
  return (
    <button className="flex items-center space-x-2 hover:text-white">
      <Icon className="icon-playback" />
      <span>{label}</span>
    </button>
  );
};

export default IconButton;
