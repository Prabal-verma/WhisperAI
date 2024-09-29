"use client";
import { FaUser, FaCog } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link"; // Import Link from Next.js

import { useCurrentUser } from "@/hooks/use-current-user";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogoutButton } from "@/components/auth/logout-button";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <div className="relative z-50 bg-white">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user?.image || undefined} />
            <AvatarFallback className="bg-gray-700 text-white">
              <FaUser />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-white dark:bg-black dark:text-white  rounded-md shadow-md border border-gray-200 overflow-visible" align="end">
          <div className="p-2">
            <Link href="/Profile" passHref>
              <DropdownMenuItem className="flex items-center p-2 hover:bg-gray-100 dark:hover:text-black rounded-md transition-colors">
                <FaUser className="h-4 w-4 mr-2 text-gray-700" />
                Profile
              </DropdownMenuItem>
            </Link>
            <Link href="/Settings" passHref>
              <DropdownMenuItem className="flex items-center p-2 hover:bg-gray-100 rounded-md transition-colors dark:hover:text-black">
                <FaCog className="h-4 w-4 mr-2 text-gray-700" />
                Settings
              </DropdownMenuItem>
            </Link>
            <LogoutButton>
              <DropdownMenuItem className="flex items-center p-2 hover:bg-gray-100 rounded-md transition-colors dark:hover:text-black">
                <ExitIcon className="h-4 w-4 mr-2 text-gray-700" />
                Logout
              </DropdownMenuItem>
            </LogoutButton>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
