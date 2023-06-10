"use client";
import { logIn } from "../../../../api";
import Button from "@/components/button";
import Input from "@/components/input";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useMutation } from "react-query";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
  const [state, setState] = useState<any>({});
  const [unverified, setUnVerified] = useState<boolean>(true);

  function onChange(value: any) {
    console.log("Captcha value:", value);
    setUnVerified(false);
  }

  const {
    mutate,
    error: formError,
    data,
    isLoading,
  } = useMutation(async () => await logIn(state.email, state.password));
  if (data?.accessToken) {
    redirect("/apps/dashboard");
  }
  return (
    <div className='w-full h-screen flex justify-center items-center md:p-0 px-8'>
      <div className='w-full md:w-1/2 lg:w-1/3  bg-milky shadow-2xl flex flex-col p-5 pb-7 rounded-lg'>
        <div className=''>
          <h1 className='text-primaryDark text-center text-2xl pb-4 border-b border-gray-200 font-bold'>
            Login
          </h1>
        </div>
        <div className='flex flex-col  pt-4 h-full'>
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
          <div>
            <ReCAPTCHA
              sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
              onChange={onChange}
            />
          </div>

          <>
            {formError && (
              <div className='text-red-500 text-xs  py-2 bg-red-200  rounded-md pl-2 mb-1'>
                {(formError as any)?.message}
              </div>
            )}
          </>
          <div className='mt-2 '>
            <Button
              label='Submit'
              onClick={() => mutate()}
              loading={isLoading}
              disabled={unverified}
              fullWidth
            />
          </div>
          <Link href='/auth/signup'>
            <Button label='Sign Up' buttonType='link' />
          </Link>
        </div>
      </div>
    </div>
  );
}
