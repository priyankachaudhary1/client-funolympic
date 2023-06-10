"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useMutation, useQuery } from "react-query";
import {
  addComplains,
  addFeedback,
  deleteComplains,
  deleteFeedback,
  editFeedback,
  getAllComplains,
  getAllFeedback,
  getVideo,
} from "../../../../../../api";
import {
  Bars3BottomLeftIcon,
  UserIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Input from "@/components/input";
import Button from "@/components/button";
import SidePanel from "@/components/sidePanel";
import clsx from "clsx";

const PlayVedio = () => {
  const params = useParams();
  const [playVedio, setPlayVedio] = useState();
  const [isFeedbackActive, setIsFeedbackActive] = useState(true);
  const [hoverId, setHoverId] = useState("");
  const [showTrashEdit, setshowTrashEdit] = useState(false);
  const [role, setRole] = useState<any>("");
  const [isEditFeedBack, setIsEditFeedBack] = useState(false);
  const [feedback, setfeedback] = useState("");
  const [feedbackId, setfeedbackId] = useState("");

  const { data } = useQuery(["vedio"], () => getVideo(params.id));
  const { data: allFeedbacks, refetch } = useQuery(["feedback"], () =>
    getAllFeedback(params.id)
  );
  const { data: allComplains, refetch: refetchComplain } = useQuery(
    ["complains"],
    () => getAllComplains(params.id)
  );
  const { mutate, isLoading } = useMutation(
    async () =>
      await addFeedback({
        title: "FEEDBACK",
        feedBack: feedback,
        videoId: params.id,
      }),
    {
      onSuccess: () => {
        refetch();
        setfeedback("");
      },
    }
  );
  const { mutate: mutateEdit, isLoading: editLoading } = useMutation(
    async () =>
      await editFeedback({
        title: "FEEDBACK",
        feedBack: feedback,
        videoId: params.id,
        id: feedbackId,
      }),
    {
      onSuccess: () => {
        refetch();
        setIsEditFeedBack(false);
        setfeedback("");
      },
    }
  );

  const { mutate: mutateComplain, isLoading: isLoadingCompalin } = useMutation(
    async () =>
      await addComplains({
        title: "Complain",
        complaint: feedback,
        videoId: params.id,
      }),
    {
      onSuccess: () => {
        refetchComplain();
        setfeedback("");
      },
    }
  );

  const { mutate: mutateDelete } = useMutation(
    async (id: string) => await deleteFeedback(id, role),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const { mutate: mutateDeleteComplain } = useMutation(
    async (id: string) => await deleteComplains(id),
    {
      onSuccess: () => {
        refetchComplain();
      },
    }
  );

  useEffect(() => {
    setfeedback("");
    setHoverId("");
    setshowTrashEdit(false);
  }, [isFeedbackActive]);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  const handlepost = () => {
    if (isFeedbackActive) {
      mutate();
    } else {
      mutateComplain();
    }
  };
  return (
    <div className='flex flex-col w-full pb-7'>
      <div className='h-[50vh]'>
        <ReactPlayer
          url={data?.videoUrl}
          playing={playVedio}
          onClick={() => setPlayVedio(playVedio)}
          controls={true}
          height='100%'
          width='100%'
        />
      </div>
      <div className=' flex  flex-col gap-x-2 pt-4 pb-1  border-b-2'>
        <h3 className='font-bold text-gray-800'>{data?.title}</h3>
        <p className='text-md'>{data?.description}</p>
        <h4 className='text-lg text-gray-700 pt-5 flex items-center gap-x-5 mb-2'>
          <span
            onClick={() => setIsFeedbackActive(true)}
            className={clsx(
              "text-sm border border-gray-200 p-[6px] px-3 cursor-pointer rounded-full",
              isFeedbackActive
                ? "bg-primary-300 hover:bg-primary-500 text-white font-semibold"
                : ""
            )}
          >
            Feedback
          </span>
          <span
            onClick={() => setIsFeedbackActive(false)}
            className={clsx(
              "text-sm border border-gray-200 p-[6px] px-3 cursor-pointer rounded-full",
              !isFeedbackActive
                ? "bg-primary-300 hover:bg-primary-500 text-white font-semibold"
                : ""
            )}
          >
            Complains
          </span>
          <span>
            <Bars3BottomLeftIcon className='w-5 h-5  text-gray-500' />
          </span>
        </h4>
        <div className='flex   w-full items-center'>
          <div className='w-4/5'>
            <input
              placeholder={
                isFeedbackActive ? "Add a feedback.." : "Add a complain.."
              }
              name='feedback'
              value={feedback}
              className=' appearance-none block w-full px-3 py-2 border-none bg-transparent placeholder-gray-400 focus:outline-none  sm:text-sm'
              onChange={(e: any) => setfeedback(e.target.value)}
            />
          </div>
          <div className='w-1/5 mb-[3px]'>
            <Button
              label='Post'
              className='w-full'
              loading={isLoading}
              onClick={handlepost}
            />
          </div>
        </div>
      </div>
      {isFeedbackActive ? (
        <>
          {allFeedbacks?.map((el: any) => (
            <div
              key={el.id}
              className=' border-b border-gray-100 hover:border-gray-200 hover:bg-gray-100 pr-16 p-2 py-3  '
              onMouseEnter={() => {
                setshowTrashEdit(true);
                setHoverId(el.id);
              }}
              onMouseLeave={() => setshowTrashEdit(false)}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center '>
                  <div className='border rounded-full border-gray-300 mr-2 p-1 h-1/3 '>
                    <img className='h-8 w-8 rounded-full' src={el?.profile} />
                  </div>
                  <div className='flex flex-col gap-x-1'>
                    <h4 className='font-semibold text-gray-700'>{el.name}</h4>
                    <p className='text-sm'>{el.feedBack}</p>
                  </div>
                </div>
                {showTrashEdit && el.id === hoverId && (
                  <div className='flex gap-x-3'>
                    <PencilSquareIcon
                      className='w-5 h-5  text-blue-500 cursor-pointer'
                      onClick={() => {
                        setIsEditFeedBack(true);
                        setfeedback(el.feedBack);
                        setfeedbackId(el.id);
                      }}
                    />
                    <TrashIcon
                      className='w-5 h-5  text-red-500 cursor-pointer'
                      onClick={() => {
                        mutateDelete(el.id);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {allComplains?.map((el: any) => (
            <div
              key={el.id}
              onMouseEnter={() => {
                setshowTrashEdit(true);
                setHoverId(el.id);
              }}
              onMouseLeave={() => setshowTrashEdit(false)}
              className=' border-b border-gray-100 hover:border-gray-200 hover:bg-gray-100 pr-16 p-2 py-3  '
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center '>
                  <div className='border rounded-full border-gray-300 mr-2 p-1 h-1/3 '>
                    <img className='h-8 w-8 rounded-full' src={el?.profile} />
                  </div>
                  <div className='flex flex-col gap-x-1'>
                    <h4 className='font-semibold text-gray-700'>{el.name}</h4>
                    <p className='text-sm'>{el.complaint}</p>
                  </div>
                </div>

                {role === "admin" && (
                  <>
                    {showTrashEdit && el.id === hoverId && (
                      <div className='flex gap-x-2'>
                        <TrashIcon
                          className='w-5 h-5  text-red-500 cursor-pointer'
                          onClick={() => {
                            isFeedbackActive
                              ? mutateDelete(el.id)
                              : mutateDeleteComplain(el.id);
                          }}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </>
      )}
      <SidePanel
        isVisible={isEditFeedBack}
        title='Edit Feedback'
        onClose={() => {
          setIsEditFeedBack(false);
          // setState({});
        }}
        primaryButtonAction={() => mutateEdit()}
        primaryButtonLoading={editLoading}
      >
        <>
          <Input
            label='Feedback'
            name='title'
            value={feedback}
            // defaultValue={state?.title ?? ""}
            onChange={(e: any) => setfeedback(e.target.value)}
          />
        </>
      </SidePanel>
    </div>
  );
};

export default PlayVedio;
