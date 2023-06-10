"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getUserCount, getVideoCount } from "../../../../api";

const Page = () => {
  const [role, setRole] = useState<any>("");
  const { data: vedioCount }: any = useQuery(
    ["vedio-count"],
    () => getVideoCount,
    {
      enabled: role === "admin",
    }
  );
  const { data: userCount }: any = useQuery(
    ["user-count"],
    () => getUserCount,
    {
      enabled: role === "admin",
    }
  );
  console.log(vedioCount);
  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);
  return (
    <div>
      {role === "admin" ? (
        <div className='mb-10'>
          <dl className=' grid grid-cols-1 gap-5 sm:grid-cols-3'>
            <div className='overflow-hidden rounded-lg bg-white px-2 py-2 shadow sm:p-6'>
              <dt className='truncate text-sm font-medium text-gray-500'>
                Total Users
              </dt>
              <dd className='mt-1 text-2xl font-semibold tracking-tight text-gray-900'>
                {userCount ? userCount : "0"}
              </dd>
            </div>
            <div className='overflow-hidden rounded-lg bg-white px-2 py-2 shadow sm:p-6'>
              <dt className='truncate text-sm font-medium text-gray-500'>
                Total Videos
              </dt>
              <dd className='mt-1 text-2xl font-semibold tracking-tight text-gray-900'>
                {vedioCount ? vedioCount : "0"}
              </dd>
            </div>
          </dl>
        </div>
      ) : (
        "Dashboard"
      )}
    </div>
  );
};

export default Page;
