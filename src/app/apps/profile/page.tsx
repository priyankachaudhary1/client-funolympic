"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { userProfile } from "../../../../api";

const Page = () => {
  const [state, setState] = useState<any>({});
  const { mutate, error: formError } = useMutation(() => userProfile(state), {
    onSuccess: () => {
      setState({});
    },
  });
  return (
    <div className='md:w-1/2 w-full '>
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
            setState((prev: any) => ({ ...prev, phoneNumber: e.target.value }))
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
  );
};

export default Page;
