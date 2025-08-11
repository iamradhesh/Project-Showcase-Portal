"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";

const UserInfo = () => {
  const { data: session } = useSession();

  return (
    <div className="mt-8 px-4 sm:px-6 md:px-8">
      {session ? (
        <div className="relative border-b-2 border-gray-200 pb-5 flex flex-col items-center text-center bg-white rounded-md shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1)]">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 font-sans">
            User Information
          </h1>
          <Image
            src={session.user?.image}
            alt="User Avatar"
            width={100}
            height={100}
            className="rounded-full w-24 h-24 sm:w-28 sm:h-28 object-cover"
          />
          <h2 className="text-base sm:text-lg mt-2 text-blue-500">
             {session.user?.name}
          </h2>
          <h2 className="text-base sm:text-lg text-gray-500">
             {session.user?.email}
          </h2>
        </div>
      ) : null}
    </div>
  );
};

export default UserInfo;
