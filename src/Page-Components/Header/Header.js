import React, { Component, useState } from "react";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Logo from "../../Assets/Images/Logo@2x.png";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    this.classNames();
    if (localStorage.getItem("currentUser")) {
      if (!this.state.user) {
        this.setState({
          user: { ...JSON.parse(localStorage.getItem("currentUser")) },
        });
      }
    }
  }

  classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.setState({
      user: null,
    });
    window.location.href = "/";
  }

  render() {
    return (
      <div className="fixed w-full z-50 top-0">
        <Popover className="relative bg-default">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center border-b- py-6 md:justify-start md:space-x-10">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <Link to="/" className="scale-up">
                  <img
                    className="h-20 w-auto inline mr-3 sm:h-10"
                    src={Logo}
                    alt=""
                  />
                  <span className="font-light inline">NART ALITI</span>
                </Link>
              </div>
              <div className="-mr-2 -my-2 md:hidden">
                <Popover.Button className="bg-default rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
              <Popover.Group as="nav" className="hidden md:flex space-x-10">
                <Link
                  to={"/"}
                  className="text-base font-medium text-white scale-up"
                >
                  Home
                </Link>

                <Link
                  to={"/"}
                  className="text-base font-medium text-white scale-up"
                >
                  Courses
                </Link>

                <Link
                  to={"/"}
                  className="text-base font-medium text-white scale-up"
                >
                  Your Courses
                </Link>

                {this.state.admin ? (
                  <Link
                    to={"/"}
                    className="text-base font-medium text-white scale-up"
                  >
                    Your Courses
                  </Link>
                ) : (
                  <></>
                )}
              </Popover.Group>
              {this.state.user ? (
                <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                  <button
                    onClick={this.logout.bind(this)}
                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white btn btn-logout"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                  <Link
                    to={"/auth/login"}
                    className="whitespace-nowrap text-base font-medium text-white hover:text-gray-200 transition ease-in"
                  >
                    Login
                  </Link>
                  <Link
                    to={"/auth/signUp"}
                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white   btn"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-default divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <img className="h-20 w-auto" src={Logo} alt="Workflow" />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-default rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div className="py-6 px-5 space-y-6">
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    <Link
                      to={"/"}
                      className="text-base font-medium text-white scale-up"
                    >
                      Home
                    </Link>

                    <Link
                      to={"/"}
                      className="text-base font-medium text-white scale-up"
                    >
                      Courses
                    </Link>

                    <Link
                      to={"/"}
                      className="scale-up text-base font-medium text-white"
                    >
                      Your Courses
                    </Link>
                  </div>
                  <div>
                    {this.state.user ? (
                      <button
                        onClick={this.logout.bind(this)}
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-500 hover:bg-red-700"
                      >
                        Logout
                      </button>
                    ) : (
                      <Link
                        to={"/auth/signUp"}
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 btn"
                      >
                        Sign up
                      </Link>
                    )}
                    <p className="mt-6 text-center text-base font-medium text-gray-500">
                      Existing customer?{" "}
                      <Link
                        to={"/auth/login"}
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        Login
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    );
  }
}
