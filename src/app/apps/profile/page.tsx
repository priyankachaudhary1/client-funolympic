"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import Link from "next/link";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getUseMe, userProfile } from "../../../../api";

const Page = () => {
  const [state, setState] = useState<any>({});
  const { mutate, error: formError } = useMutation(() => userProfile(state), {
    onSuccess: () => {
      setState({});
    },
  });

  const { data } = useQuery(["useMe"], getUseMe);

  return (
    <>
      <Link href='apps/profile/changePassword'>
        <div className='float-right mt-[2px]'>
          <Button label='Change password' />
        </div>
      </Link>
      <h1 className='font-bold text-primary-400 bg-gray-100 py-2 px-1 border-y border-gray-200'>
        Update profile
      </h1>
      <div className='flex flex-col gap-2 mt-4'>
        <div className='flex gap-2'>
          <h1 className='text-gray-700 font-semibold'>Name:</h1>
          <p>{data?.name}</p>
        </div>
        <div className='flex gap-2'>
          <h1 className='text-gray-700 font-semibold'>Address:</h1>
          <p>{data?.address}</p>
        </div>
        <div className='flex gap-2'>
          <h1 className='text-gray-700 font-semibold'>Phone:</h1>
          <p>{data?.phoneNumber}</p>
        </div>
      </div>
      <div className='md:w-1/2  w-full pt-5'>
        <div className='flex flex-col  pt-4 h-full'>
          <Input
            name='address'
            label='Address'
            value={state?.address ?? ""}
            onChange={(e: any) =>
              setState((prev: any) => ({ ...prev, address: e.target.value }))
            }
          />
          <Input
            name='phoneNumber'
            label='Phone '
            value={state?.phoneNumber ?? ""}
            onChange={(e: any) =>
              setState((prev: any) => ({
                ...prev,
                phoneNumber: e.target.value,
              }))
            }
          />

          <Input
            name='profile'
            label='Profile picture '
            type='file'
            onChange={(e: any) =>
              setState((prev: any) => ({
                ...prev,
                profile: e.target.files[0],
              }))
            }
          />

          <>
            {formError && (
              <div className='text-red-500 text-xs  py-2 bg-red-200  rounded-md pl-2 mb-1'>
                {(formError as any)?.message}
              </div>
            )}
          </>
          <div className='mt-2 '>
            <Button label='Submit' onClick={() => mutate(state)} fullWidth />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
