"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { GrAddCircle } from "react-icons/gr";
import { BiUser } from "react-icons/bi";
import { RiAdminLine } from "react-icons/ri";
import Popover from "@/components/shared/popover";
import Image from "next/image";
import { Session } from "next-auth";
import { ADMIN_EMAIL } from "@/lib/constants";

export default function UserDropdown({ session }: { session: Session }) {
  const router = useRouter();
  const { email, image } = session?.user || {};
  const [openPopover, setOpenPopover] = useState(false);

  if (!email) return null;

  return (
    <div className="relative inline-block text-left">
      <Popover
        content={
          <div className="w-full rounded-md bg-white p-2 sm:w-56">
            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={() => router.push("/form")}
            >
              <GrAddCircle className="h-4 w-4" />
              <p className="text-sm">Join Insider</p>
            </button>
            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={() => router.push("/user-form-list")}
            >
              <BiUser className="h-4 w-4" />
              <p className="text-sm">User List</p>
            </button>
            {email === ADMIN_EMAIL && (
              <button
                className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
                onClick={() => router.push("/admin-form-list")}
              >
                <RiAdminLine className="h-4 w-4" />
                <p className="text-sm">Admin List</p>
              </button>
            )}
            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4" />
              <p className="text-sm">Logout</p>
            </button>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"
        >
          <Image
            alt={email}
            src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
            width={40}
            height={40}
          />
        </button>
      </Popover>
    </div>
  );
}
