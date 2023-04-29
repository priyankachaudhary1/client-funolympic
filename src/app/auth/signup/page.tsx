"use client";
import { logIn, signUp } from "@/api";
import Button from "@/components/button";
import Input from "@/components/input";
import Link from "next/link";
import { useState } from "react";
import { useMutation } from "react-query";

export default function SignUp() {
  const [state, setState] = useState<any>({});

  const { mutate, error: formError } = useMutation(
    async () => await signUp(state)
  );
  return (
    <div className='w-full h-screen flex justify-center items-center md:p-0 px-8'>
      <div className='w-full md:w-1/2 lg:w-1/3  bg-milky shadow-2xl flex flex-col p-5 pb-8 rounded-lg'>
        <div className=''>
          <h1 className='text-primaryDark text-center text-2xl pb-4 border-b border-gray-200 font-bold'>
            Signup
          </h1>
        </div>
        <div className='flex flex-col  pt-4 h-full'>
          <Input
            name='name'
            label='Name'
            onChange={(e: any) =>
              setState((prev: any) => ({ ...prev, name: e.target.value }))
            }
          />
          <Input
            name='email'
            label='Email'
            type='email'
            onChange={(e: any) =>
              setState((prev: any) => ({ ...prev, email: e.target.value }))
            }
          />
          <Input
            name='password'
            label='Password'
            type='password'
            onChange={(e: any) =>
              setState((prev: any) => ({ ...prev, password: e.target.value }))
            }
          />
          <Input
            name='role'
            label='Role'
            onChange={(e: any) =>
              setState((prev: any) => ({ ...prev, role: e.target.value }))
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
            <Button label='Submit' onClick={() => mutate()} fullWidth />
          </div>
          <Link href='/auth/login'>
            <Button label='Log In' buttonType='link' />
          </Link>
        </div>
      </div>
    </div>
  );
}
