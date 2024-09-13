import React from "react";
import TooltipIcon from "@/components/shared/TooltipIcon";
import { Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <div className="ml-14 flex justify-between">
      <h1 className="font-poppins text-3xl font-bold leading-10 text-[#18120f]">
        {title}
      </h1>

      <div className="flex flex-1 items-center justify-end space-x-5">
        <div className="flex space-x-4">
          <TooltipIcon
            icon={<Search size={24} color="#6D6D6D" />}
            content={<p className="text-[#18120f]">Search</p>}
          />
          <TooltipIcon
            icon={<Bell size={24} color="#6D6D6D" />}
            content={<p className="text-[#18120f]">Notifications</p>}
            classname="mr-10"
          />
        </div>

        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>

          <div className="flex flex-col space-y-0">
            <p className="font-lexend text-base font-semibold text-[#18120f]">
              Mechaku Admin
            </p>
            <p className="font-lexend text-sm text-[#6D6D6D]">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
