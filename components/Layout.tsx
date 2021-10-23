import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/dist/client/router";
import { signOut, useSession } from "next-auth/react";
import { topbarNavigation, userNavigation, sidebarNavigation } from "./routes";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ children }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
      <div className="h-full flex flex-col">
        {/* Top nav*/}
        <header className="flex-shrink-0 relative h-16 bg-white flex items-center">
          {/* Logo area */}
          <div className="absolute inset-y-0 left-0 md:static md:flex-shrink-0">
            <Link href="/">
              <a className="flex items-center justify-center h-16 w-16 bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 md:w-20">
                <Image
                  height={32}
                  width={32}
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                  alt="Workflow"
                />
              </a>
            </Link>
          </div>

          {/* Menu button area */}
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center sm:pr-6 md:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop nav area */}
          <div className="hidden md:min-w-0 md:flex-1 md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <div className="max-w-2xl relative text-gray-400 focus-within:text-gray-500">
                <label htmlFor="desktop-search" className="sr-only">
                  Search
                </label>
                <input
                  id="desktop-search"
                  type="search"
                  placeholder="Search"
                  className="block w-full border-transparent pl-12 placeholder-gray-500 focus:border-transparent sm:text-sm focus:ring-0"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4">
                  <SearchIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
            </div>
            <div className="ml-10 pr-4 flex-shrink-0 flex items-center space-x-10">
              <nav aria-label="Global" className="flex space-x-10">
                {topbarNavigation.map((item) => (
                  <Link href={item.href} key={item.name}>
                    <a className="text-sm font-medium text-gray-900">
                      {item.name}
                    </a>
                  </Link>
                ))}
              </nav>
              <div className="flex items-center space-x-8">
                <span className="inline-flex">
                  <a
                    href="#"
                    className="-mx-1 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </span>

                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                    <span className="sr-only">Open user menu</span>
                    {session?.user?.image && (
                      <Image
                        height={32}
                        width={32}
                        className="rounded-full"
                        src={session?.user?.image!}
                        alt=""
                      />
                    )}
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute z-30 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <Link href={item.href}>
                                <a
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  )}
                                >
                                  {item.name}
                                </a>
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              )}
                              onClick={() => signOut()}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile menu, show/hide this `div` based on menu open/closed state */}
          <Transition.Root show={mobileMenuOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-40 md:hidden"
              onClose={setMobileMenuOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="hidden sm:block sm:fixed sm:inset-0 sm:bg-gray-600 sm:bg-opacity-75" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="transition ease-out duration-150 sm:ease-in-out sm:duration-300"
                enterFrom="transform opacity-0 scale-110 sm:translate-x-full sm:scale-100 sm:opacity-100"
                enterTo="transform opacity-100 scale-100  sm:translate-x-0 sm:scale-100 sm:opacity-100"
                leave="transition ease-in duration-150 sm:ease-in-out sm:duration-300"
                leaveFrom="transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100"
                leaveTo="transform opacity-0 scale-110  sm:translate-x-full sm:scale-100 sm:opacity-100"
              >
                <nav
                  className="fixed z-40 inset-0 h-full w-full bg-white sm:inset-y-0 sm:left-auto sm:right-0 sm:max-w-sm sm:w-full sm:shadow-lg"
                  aria-label="Global"
                >
                  <div className="h-16 flex items-center justify-between px-4 sm:px-6">
                    <Image
                      height={32}
                      width={32}
                      className="block"
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=500"
                      alt="Workflow"
                    />
                    <button
                      type="button"
                      className="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">Close main menu</span>
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-2 max-w-8xl mx-auto px-4 sm:px-6">
                    <div className="relative text-gray-400 focus-within:text-gray-500">
                      <label htmlFor="mobile-search" className="sr-only">
                        Search
                      </label>
                      <input
                        id="mobile-search"
                        type="search"
                        placeholder="Search"
                        className="block w-full border-gray-300 rounded-md pl-10 placeholder-gray-500 focus:border-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3">
                        <SearchIcon className="h-5 w-5" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                  <div className="max-w-8xl mx-auto py-3 px-2 sm:px-4">
                    {sidebarNavigation.map((item) => (
                      <Link href={item.href} key={item.href}>
                        <a
                          onClick={() => setMobileMenuOpen(false)}
                          className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                    {topbarNavigation.map((item) => (
                      <Link href={item.href} key={item.href}>
                        <a
                          onClick={() => setMobileMenuOpen(false)}
                          className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 pt-4 pb-3">
                    <div className="max-w-8xl mx-auto px-4 flex items-center sm:px-6">
                      <div className="flex-shrink-0">
                        {session?.user?.image && (
                          <Image
                            height={40}
                            width={40}
                            className="rounded-full"
                            src={session?.user?.image!}
                            alt=""
                          />
                        )}
                      </div>
                      <div className="ml-3 min-w-0 flex-1">
                        <div className="text-base font-medium text-gray-800 truncate">
                          {session?.user?.name}
                        </div>
                        <div className="text-sm font-medium text-gray-500 truncate">
                          {session?.user?.email}
                        </div>
                      </div>
                      <a
                        href="#"
                        className="ml-auto flex-shrink-0 bg-white p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </a>
                    </div>
                    <div className="mt-3 max-w-8xl mx-auto px-2 space-y-1 sm:px-4">
                      {userNavigation.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <a className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-50">
                            {item.name}
                          </a>
                        </Link>
                      ))}
                      <button
                        onClick={() => signOut()}
                        className="w-full text-left block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-50"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </nav>
              </Transition.Child>
            </Dialog>
          </Transition.Root>
        </header>

        {/* Bottom section */}
        <div className="min-h-0 flex-1 flex overflow-hidden">
          {/* Narrow sidebar*/}
          <nav
            aria-label="Sidebar"
            className="hidden md:block md:flex-shrink-0 md:bg-gray-800 md:overflow-y-auto"
          >
            <div className="relative w-20 flex flex-col p-3 space-y-3">
              {sidebarNavigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={classNames(
                      item.href === router.asPath
                        ? "bg-gray-900 text-white"
                        : "text-gray-400 hover:bg-gray-700",
                      "flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg"
                    )}
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </Link>
              ))}
            </div>
          </nav>

          {children}
        </div>
      </div>
    </>
  );
}
