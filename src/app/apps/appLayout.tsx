"use client";
import { Dialog, Menu, Transition } from "@headlessui/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import React, { Fragment, useEffect, useState } from "react";
import {
  AdjustmentsHorizontalIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  VideoCameraIcon,
  ChartBarIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

const AdminMenu = [
  {
    name: "Dashboard",
    href: "/apps/dashboard",
    icon: ChartBarIcon,
  },
  {
    name: "Users",
    href: "/apps/users",
    icon: UserGroupIcon,
  },
  {
    name: "Category",
    href: "/apps/category",
    icon: UserGroupIcon,
  },
  {
    name: "Vedios",
    href: "/apps/vedios",
    icon: VideoCameraIcon,
  },
];

const UserMenu = [
  {
    name: "Dashboard",
    href: "/apps/dashboard",
    icon: ChartBarIcon,
  },

  {
    name: "Vedios",
    href: "/apps/vedios",
    icon: VideoCameraIcon,
  },
];

const AppLayoutClient = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const router = useRouter();

  const [userRole, setUserRole] = useState<string>("");
  let role: any;
  useEffect(() => {
    role = localStorage.getItem("role");
  }, []);

  useEffect(() => {
    role && setUserRole(role);
  }, [role]);

  useEffect(() => {
    userRole === "admin" && setMenus(AdminMenu);
    userRole === "user" && setMenus(UserMenu);
  }, [userRole]);

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [menus, setMenus] = React.useState<any[]>([]);

  const activeRoute = React.useCallback(
    (href: string) => {
      let activeClassName = "";
      if (pathName.includes(href)) {
        activeClassName = "group bg-primary-500 text-white";
      }
      return activeClassName;
    },
    [pathName]
  );

  const handleLogout = () => {
    localStorage.clear();
    router.push("/auth/login");
  };

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as='div'
            className='fixed inset-0 flex z-40 md:hidden'
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <div className='relative flex-1 flex flex-col max-w-xs w-full pt-5 bg-primaryLight'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-in-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in-out duration-300'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='absolute top-0 right-0 -mr-12 pt-2'>
                    <button
                      type='button'
                      className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className='sr-only'>Close sidebar</span>
                      <XMarkIcon
                        className='h-6 w-6 text-white'
                        aria-hidden='true'
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className='flex-shrink-0 flex items-center px-4 '>
                  <img
                    className='h-8 w-auto'
                    src='https://freesvg.org/img/student_hat_1.png'
                    alt='Consultancy'
                  />
                  <p className='font-extrabold text-primaryDark px-3 text-xl'>
                    Vedio Stream
                  </p>
                </div>
                <div className='mt-5 flex-1 h-0 overflow-y-auto'>
                  <nav className='px-2 space-y-1'>
                    {menus?.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={clsx(
                          activeRoute(item.href),
                          "group flex items-center rounded-md px-4 py-2 hover:bg-primaryDark hover:text-white "
                        )}
                      >
                        <item.icon
                          className='h-6 w-6 shrink-0 text-gray-900 group-hover:text-white'
                          aria-hidden='true'
                        />
                        <span className='mx-2 text-sm font-medium text-gray-900 group-hover:text-white'>
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className=' flex flex-shrink-0 border-t border-gray-100  p-4 shadow-2xl bg-white'>
                  <Link href='/auth/login' className='group w-full'>
                    <div className='flex items-center'>
                      <div></div>
                      <div className='ml-3 w-full'>
                        <p className='text-base font-medium text-gray-900'></p>
                        <div className=' '>
                          <button
                            className=' my-2 flex items-center text-gray-900'
                            onClick={handleLogout}
                          >
                            <ArrowLeftOnRectangleIcon
                              width={24}
                              height={24}
                              className='text-gray-900 group-hover:text-red-500'
                            />
                            <p className='ml-2 w-full text-xs font-medium text-gray-900 group-hover:text-red-500'>
                              Logout
                            </p>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </Transition.Child>
            <div className='flex-shrink-0 w-14' aria-hidden='true'>
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className='hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-primaryLight'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex flex-col flex-grow pt-5 bg-primary overflow-y-auto'>
            <div className='flex items-center flex-shrink-0 px-4'>
              <img
                className='h-8 w-auto'
                src='https://freesvg.org/img/student_hat_1.png'
                alt='Consultancy'
              />
              <p className='font-extrabold text-primaryDark px-3 text-xl'>
                Vedio Stream
              </p>
            </div>
            <div className='mt-5 flex-1 flex flex-col'>
              <nav className='flex-1 px-4 pb-4 space-y-1'>
                {menus?.map((item) => {
                  return (
                    <Link
                      // prefetch="intent"
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        activeRoute(item.href),
                        "flex items-center rounded-md p-2  hover:bg-primaryDark hover:text-white "
                      )}
                    >
                      <item.icon
                        className='group:text-white h-6 w-6  shrink-0 hover:text-white'
                        aria-hidden='true'
                      />
                      <span className='mx-2 text-sm font-semibold  hover:text-white'>
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
          <div className=' flex flex-shrink-0 border-t border-gray-100 bg-white p-4 shadow-2xl'>
            <Link href='/auth/login' className='group w-full'>
              <div className='flex items-center'>
                <div></div>
                <div className='ml-3 w-full'>
                  <p className='text-base font-medium text-gray-900'>
                    {userRole}
                  </p>
                  <div className=' '>
                    <button
                      className=' my-2 flex items-center text-gray-900'
                      onClick={handleLogout}
                    >
                      <ArrowLeftOnRectangleIcon
                        width={24}
                        height={24}
                        className='text-gray-900 group-hover:text-red-500'
                      />
                      <p className='ml-2 w-full text-xs font-medium text-gray-900 group-hover:text-red-500'>
                        Logout
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className='md:pl-64 flex flex-col flex-1'>
          <div className='sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow'>
            <button
              type='button'
              className='px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cerulean-500 md:hidden'
              onClick={() => setSidebarOpen(true)}
            >
              <span className='sr-only'>Open sidebar</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </button>

            <div className='flex-1 px-4 flex justify-between'>
              <div className='flex-1 flex'>
                <label htmlFor='search-field' className='sr-only'>
                  Search
                </label>
                <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
                  <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center'>
                    {/* <SearchIcon className='h-5 w-5' aria-hidden='true' /> */}
                  </div>
                  <input
                    id='search-field'
                    className='block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm'
                    //   placeholder='Search'
                    type='search'
                    // value={query}
                    autoComplete='off'
                    // onChange={(e) => setQuery(e.target.value)}
                    name='search'
                  />
                </div>
              </div>

              <div className='ml-4 flex items-center md:ml-6'>
                {/* Profile dropdown */}
                <Menu as='div' className='ml-6 relative'>
                  <div>
                    <Menu.Button className='max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cerulean-500'>
                      <span className='sr-only'>Open user menu</span>
                      <img
                        className='h-8 w-8 rounded-full'
                        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                        alt=''
                      />
                    </Menu.Button>
                  </div>
                </Menu>
              </div>
            </div>
          </div>

          <main>
            <div className='py-5 h-screen bg-gray-50 '>
              <div className='max-w-full px-4 sm:px-6 md:px-8'>{children}</div>
            </div>
          </main>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AppLayoutClient;
