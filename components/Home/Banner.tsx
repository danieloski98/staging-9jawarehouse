import React from 'react';
import Image from 'next/image';
import { FiSearch, FiMenu } from 'react-icons/fi'
import { InputGroup, Input, InputLeftAddon, InputLeftElement } from '@chakra-ui/react'
const colors = require('tailwindcss/colors')

// images
import Logo from '../../public/images/logo.svg';
import Woman from '../../public/images/woman.svg';


// other components
const LeftNavbar = () => {
    return (
        <div className="w-full h-24 flex justify-between items-center px-5">
            <Image src={Logo} alt="logo" className=" w-20 h-20" />
            <div className=" xl:hidden lg:hidden md:flex sm:flex w-20 justify-between items-center">
                <FiSearch size={25} color="grey" />
                <FiMenu size={25} color="grey" />
            </div>
        </div>
    )
}

const RightNavBar = () => {
    return (
        <div className="w-full h-24 flex justify-center items-center">
            <a href="" className="text-sm font-semibold mx-5 flex items-center">
                <FiSearch size={25} color="grey" />
                <span>Find Services</span>
            </a>

            <a href="" className="text-sm font-semibold mx-5 flex items-center">
                <span>Become A Vendor</span>
            </a>

            <a href="" className="text-sm font-semibold mx-5 flex items-center">
                <span>Login</span>
            </a>
    </div>
    )
}



export default function Banner() {
  return (
    <div className="w-full h-screen flex">
        <div className="flex-1 flex flex-col">
            <LeftNavbar />
            <div className="flex-1 flex flex-col justify-center xl:px-10 lg:px-10 md:px-5 sm:px-5">
                <h1 className="xl:text-6xl lg:text-6xl md:text-4xl sm:text-4xl font-regular text-themeGreen">
                    Discover Vendors <br/>
                </h1>
                <h1 className="xl:text-6xl lg:text-6xl md:text-4xl sm:text-4xl font-regular text-themeGreen mt-4">
                    Near You
                </h1>
                <p className="xl:w-4/5 lg:w-4/5 md:w-full sm:w-full mt-5 text-md font-semibold text-gray-400">
                Less hassle searching for who is best fit  for Photography, Catering, Event planning, make-up artists, DJs, decorators and more
                </p>

                <div className="xl:w-9/12 lg:w-9/12 md:w-full sm:w-full mt-6">
                    <InputGroup>
                        <InputLeftAddon bgColor="#1A8F85">
                        <div className=" w-full flex items-center justify-center">
                            <FiSearch color="white" size={20} />
                        </div>
                        </InputLeftAddon>
                        <Input placeholder="search for services or businesses" />
                    </InputGroup>
                </div>
            </div>
        </div>
        <div className="flex-1 bg-yellow-200 xl:flex lg:flex md:hidden sm:hidden flex flex-col">
            <RightNavBar />
            <div className="flex-1 overflow-hidden">
                <Image src={Woman} alt="logo" className=" w-full h-full object-contain" />
            </div>
        </div>
    </div>
  );
}
