"use client";
import {
  addVideo,
  deleteVideo,
  editVideo,
  getAllVideo,
  getfilterVideo,
  getVideoCategory,
} from "../../../../api";
import Button from "@/components/button";
import Input from "@/components/input";
import SidePanel from "@/components/sidePanel";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import ReactPlayer from "react-player";
import Select from "@/components/select";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";

const VedioPage = () => {
  const router = useRouter();
  const [role, setRole] = useState<any>("");
  const [modal, setModal] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [state, setState] = useState<any>({});
  const [selectedCategory, setSelectedCategory] = useState<any>({});
  const [videoList, setVideoList] = useState<any>([]);

  const [playVedio, setPlayVedio] = useState<boolean>(false);
  const [vedioId, setVedioId] = useState<string>("");

  const { data } = useQuery(["videoCategoryList"], getVideoCategory);
  const [filter, setFilter] = useState<any>("all");
  const { data: allVedios, refetch } = useQuery(["videoList"], getAllVideo, {
    onSuccess: (data) => {
      setVideoList(data);
    },
  });
  const { refetch: refetchFilter } = useQuery(
    ["videoList"],
    () => getfilterVideo(filter),
    {
      onSuccess: (data) => {
        setVideoList(data);
      },
    }
  );

  const { mutate, isLoading } = useMutation(() => addVideo(state), {
    onSuccess: () => {
      setState({});
      setModal(false);
      setSelectedCategory({});
      refetch();
    },
  });
  const { mutate: mutateDelete } = useMutation(
    (id: string) => deleteVideo(id),
    {
      onSuccess: () => {
        refetch();
        refetchFilter();
      },
    }
  );

  const { mutate: mutateEdit, isLoading: editLoading } = useMutation(
    () => editVideo(state),
    {
      onSuccess: () => {
        setState({});
        setEdit(false);
        setSelectedCategory({});
        refetch();
      },
    }
  );

  useEffect(() => {
    if (edit) {
      setSelectedCategory(state?.categoryId);
    }
  }, [edit]);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  useEffect(() => {
    setState((prev: any) => ({ ...prev, categoryId: selectedCategory?.id }));
  }, [selectedCategory]);

  console.log(state, "ststs");
  return (
    <div>
      <div className='flex justify-between'>
        <div className='flex  '>
          <h1 className='font-bold text-xl text-primary-500 pt-6 pb-1'>
            Videos
          </h1>
        </div>
        <div>
          {role === "admin" && (
            <Button label='Add New Video' onClick={() => setModal(true)} />
          )}
        </div>
      </div>
      <div className='flex flex-col gap-y-9 py-5'>
        {allVedios?.map((el: any) => (
          <div key={el.id}>
            <div className='w-full flex  mt-3 mb-8 border-b border-gray-200 bg-gray-100 py-3 rounded-sm'>
              <div>
                <span
                  className={clsx(
                    "text-sm border border-gray-200 p-[6px] px-3 cursor-pointer rounded-full ml-1",
                    "bg-primary-300 hover:bg-primary-500 text-white font-semibold"
                  )}
                >
                  {el.category}
                </span>
              </div>
            </div>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-y-4 md:gap-x-10 z-10'>
              {el.videos.map((val: any) => (
                <div
                  className='bg-gray-50 group w-full flex flex-col pb-3 rounded-xl overflow-hidden shadow-xl hover:-translate-y-2 hover:scale-105 ease-in-out duration-300	 hover:shadow-2xl delay-100  cursor-pointer '
                  onMouseEnter={() => {
                    setPlayVedio(true);
                    setVedioId(val.id);
                  }}
                  onMouseLeave={() => {
                    setPlayVedio(false);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    router.replace(`apps/vedios/view/${val.id}`);
                  }}
                >
                  <ReactPlayer
                    url={val.videoUrl}
                    playing={vedioId === val.id && playVedio}
                    controls={true}
                    height='80%'
                    width='100%'
                  />
                  <div className='grid grid-cols-8 cursor-default'>
                    <div className='flex flex-col col-span-6'>
                      <div className='text-sm font-semibold px-1 pt-1 overflow-hidden'>
                        {val.title}
                      </div>
                      <div className='text-xs text-gray-500 px-1 pb-1 overflow-hidden'>
                        {val.description}
                      </div>
                    </div>
                    {role === "admin" && (
                      <div
                        className='flex col-span-1 justify-center items-center cursor-pointer group'
                        onClick={(e) => {
                          e.stopPropagation();
                          setState({
                            title: val.title,
                            description: val.description,
                            categoryId: val.categoryId,
                            id: val.id,
                          });
                          setEdit(true);
                        }}
                      >
                        <PencilSquareIcon className='w-5 h-5 group-hover:text-green-500 mt-1 hidden group-hover:block' />
                      </div>
                    )}
                    {role === "admin" && (
                      <div
                        className='flex col-span-1 justify-center items-center cursor-pointer group'
                        onClick={() => {
                          mutateDelete(el.id);
                        }}
                      >
                        <TrashIcon className='w-5 h-5 group-hover:text-red-500 mt-1 hidden group-hover:block' />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <SidePanel
        isVisible={modal}
        title='Add New video'
        onClose={() => setModal(false)}
        primaryButtonAction={() => mutate(state)}
        primaryButtonLoading={isLoading}
      >
        <>
          <Input
            label='Title'
            name='title'
            onChange={(e: any) =>
              setState((prev: any) => ({ ...prev, title: e.target.value }))
            }
          />
          <Input
            label='Description'
            name='description'
            onChange={(e: any) =>
              setState((prev: any) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          <Select
            label='Video Category'
            selected={selectedCategory}
            setSelected={(val: any) => {
              setSelectedCategory(val);
            }}
            data={data}
          />

          <Input
            label='Video file'
            name='video'
            type='file'
            onChange={(e: any) =>
              setState((prev: any) => ({
                ...prev,
                video: e.target.files[0],
              }))
            }
            accept='video/*'
          />
        </>
      </SidePanel>

      <SidePanel
        isVisible={edit}
        title='Edit Video'
        onClose={() => {
          setEdit(false);
          setState({});
        }}
        primaryButtonAction={() => mutateEdit(state)}
        primaryButtonLoading={editLoading}
      >
        <>
          <Input
            label='Title'
            name='title'
            defaultValue={state?.title ?? ""}
            onChange={(e: any) =>
              setState((prev: any) => ({ ...prev, title: e.target.value }))
            }
          />
          <Input
            label='Description'
            name='description'
            defaultValue={state?.description ?? ""}
            onChange={(e: any) =>
              setState((prev: any) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          <Select
            label='Video Category'
            selected={selectedCategory}
            setSelected={(val: any) => {
              setSelectedCategory(val);
            }}
            data={data}
          />
        </>
      </SidePanel>
    </div>
  );
};

export default VedioPage;
