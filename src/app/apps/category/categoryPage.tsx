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

const columnHelper = createColumnHelper();

const CategoryPage = () => {
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
        <h1 className='font-bold text-xl text-primary-500 py-6'>
          Video Category
        </h1>
        <div>
          <Button label='Add Video Category' onClick={() => setModal(true)} />
        </div>
      </div>
      <Table columns={columns} data={data ?? []} />

      <SidePanel
        isVisible={modal}
        title='Add New Category'
        onClose={() => setModal(false)}
        primaryButtonAction={() => mutate()}
      >
        <>
          <Input
            label='Category Name'
            name='name'
            onChange={(e: any) =>
              setState((prev: any) => ({ ...prev, name: e.target.value }))
            }
          />
        </>
      </SidePanel>
      <SidePanel
        isVisible={edit}
        title='Edit New Category'
        onClose={() => setEdit(false)}
        primaryButtonAction={() => mutateEdit(state)}
      >
        <>
          <Input
            label='Category Name'
            name='name'
            value={state?.name ?? ""}
            onChange={(e: any) =>
              setState((prev: any) => ({ ...prev, name: e.target.value }))
            }
          />
        </>
      </SidePanel>
    </div>
  );
};

export default CategoryPage;
