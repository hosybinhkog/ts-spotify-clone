import { NextPage } from "next";
import React from "react";

import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import IconButton from "./IconButton";
import { signOut, useSession } from "next-auth/react";

const Devider: NextPage = () => (
  <hr className="border-t-[0.1px] border-gray-900" />
);

const Sidebar: NextPage = () => {
  const { data: session } = useSession();

  return (
    <div className=" text-gray-500 px-5 pt-5 pb-36 text-xs lg:text-sm border-r border-gray-900 h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:block w-full overflow-y-scroll scrollbar-hidden example">
      <div className="space-y-4">
        {session?.user && (
          <button onClick={() => signOut()}>
            {session?.user?.name} - logout
          </button>
        )}
        <IconButton icon={HomeIcon} label="Home" />
        <IconButton icon={SearchIcon} label="Search" />
        <IconButton icon={LibraryIcon} label="Your Lib" />

        <Devider />
        <IconButton icon={PlusCircleIcon} label="Create Playlist" />
        <IconButton icon={HeartIcon} label="Liked Song" />
        <IconButton icon={RssIcon} label="Your episodes" />

        <Devider />
      </div>
    </div>
  );
};

export default Sidebar;
