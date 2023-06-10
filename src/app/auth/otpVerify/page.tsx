"use client";
import { resendOtp, verifyOtp } from "../../../../api";
import Button from "@/components/button";
import Input from "@/components/input";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";

export default function VerifyOtp() {
  const router = useRouter();
  const [state, setState] = useState<any>();
  const [email, setEmail] = useState<any>();
  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);

  const {
    mutate,
    error: formError,
    isLoading,
  } = useMutation(async () => await verifyOtp({ otp: parseInt(state) }), {
    onSuccess: () => {
      router.push("/apps/dashboard");
    },
  });

  const {
    mutate: mutateResend,
    isLoading: loadingOtp,
    data,
  } = useMutation(async () => await resendOtp({ email: email }));
  return (
    <div className='w-full h-screen flex justify-center items-center md:p-0 px-8'>
      <div className='w-full md:w-1/2 lg:w-1/3  bg-milky shadow-2xl flex flex-col p-5 pb-8 rounded-lg'>
        <div className=''>
          <h1 className='text-primaryDark text-center text-2xl pb-4 border-b border-gray-200 font-bold'>
            Verify OTP
          </h1>
        </div>
        <div className='flex flex-col  pt-4 h-full'>
          <Input
            name='otp'
            label='OTP'
            type='number'
            onChange={(e: any) => setState(e.target.value)}
          />

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
              fullWidth
            />
          </div>
          <div className='mt-2 flex items-center'>
            {loadingOtp && (
              <svg
                className='animate-spin   h-5 w-4  text-gray-400 '
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
            )}
            <Button
              label='Resend OTP'
              buttonType='link'
              onClick={() => mutateResend()}
              loading={loadingOtp}
            />
          </div>
          <p className='text-sm text-green-500'>{data?.message}</p>
        </div>
      </div>
    </div>
  );
}
