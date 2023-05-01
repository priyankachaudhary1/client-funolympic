"use client";
import {
  addVideoCategory,
  deleteVideoCategory,
  editVideoCategory,
  getVideoCategory,
} from "../../../../api";
import Button from "@/components/button";
import Input from "@/components/input";
import SidePanel from "@/components/sidePanel";
import Table from "@/components/table";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import ReactPlayer from "react-player";

const columnHelper = createColumnHelper();

const VedioPage = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [state, setState] = useState<any>({});

  const { data, refetch } = useQuery(["videoCategoryList"], getVideoCategory);
  const { mutate } = useMutation(() => addVideoCategory(state), {
    onSuccess: () => {
      refetch();
      setModal(false);
      setState({});
    },
  });
  const { mutate: mutateDelete } = useMutation(
    (id: string) => deleteVideoCategory(id),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const { mutate: mutateEdit } = useMutation(() => editVideoCategory(state), {
    onSuccess: () => {
      refetch();
      setState({});
      setEdit(false);
    },
  });
  const columns = useMemo(() => {
    return [
      columnHelper.accessor((row: any) => row, {
        id: "name",
        cell: (info) => info.getValue().name,
        header: "Category Name",
      }),

      columnHelper.accessor((row: any) => row, {
        id: "actions",
        cell: (info: any) => {
          return (
            <div className='flex gap-x-2'>
              <Button
                icon={<TrashIcon className='w-4 h-4' />}
                className='bg-red-500 hover:bg-red-700 '
                onClick={() => mutateDelete(info.getValue()?.id)}
              />
              <Button
                icon={<PencilSquareIcon className='w-4 h-4' />}
                onClick={() => {
                  setEdit(true);
                  setState((prev: any) => ({
                    ...prev,
                    name: info.getValue()?.name,
                    id: info.getValue()?.id,
                  }));
                }}
              />
            </div>
          );
        },
      }),
    ];
  }, []);
  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='font-bold text-xl text-primary-500 py-6'>Videos</h1>
        <div>
          <Button label='filter' onClick={() => setModal(true)} />
        </div>
      </div>
      <div className='grid grid-cols-4 gap-x-10'>
        <div className='bg-milky w-full h-40 rounded-md shadow-xl hover:translate-y-1 hover:shadow-2xl delay-100  cursor-pointer'>
          {/* as */}
          <ReactPlayer
            url='https://www.youtube.com/watch?v=wWgIAphfn2U'
            height='100%'
            width='100%'
          />
        </div>
        <div className='bg-milky w-full h-40 rounded-md shadow-xl hover:translate-y-1 cursor-pointer'>
          as
        </div>
      </div>
    </div>
  );
};

export default VedioPage;
