import React from 'react';
import { FiUser, FiStar, FiDollarSign, FiSettings, FiHelpCircle } from 'react-icons/fi'

const ACTIVE = 'flex justify-between border-r-4 border-themeGreen h-12 text-themeGreen cursor-pointer';
const INACTIVE = 'flex justify-between h-12 text-gray-500 hover:bg-gray-100 cursor-pointer'

interface IProps {
    page: number;
    setPage: Function;
}

export default function Sidebar({page, setPage}: IProps) {
  return (
    <div className="w-full h-auto flex flex-col pb-10">

        <div className="w-full flex flex-col py-6 bg-white">
            <p className="mt-6 ml-6 text-md font-light text-gray-500 mb-8">Quick Menu</p>

            <div className={page === 1 ? ACTIVE:INACTIVE} onClick={() => setPage(1)}>
                <div className="flex items-center pl-6">
                    <FiUser size={25} />
                    <p className="ml-4 text-sm font-semibold ">Profile</p>
                </div>
            </div>

            <div className={page === 2 ? ACTIVE:INACTIVE} onClick={() => setPage(2)}>
                <div className="flex items-center pl-6">
                    <FiStar size={25} />
                    <p className="ml-4 text-sm font-semibold">Customer Reviews</p>
                </div>
            </div>

            <div className={page === 3 ? ACTIVE:INACTIVE} onClick={() => setPage(3)}>
                <div className="flex items-center pl-6">
                    <FiDollarSign size={25} />
                    <p className="ml-4 text-sm font-semibold ">Subscriptions</p>
                </div>
            </div>

            <div className={page === 4 ? ACTIVE:INACTIVE} onClick={() => setPage(4)}>
                <div className="flex items-center pl-6">
                    <FiSettings size={25} />
                    <p className="ml-4 text-sm font-semibold">Settings</p>
                </div>
            </div>

            <div className="w-11/12 mt-5 flex items-center justify-center mx-3 h-12 bg-green-100 text-green-600">
                PIN - 867585
            </div>
        </div>

        <div className="w-full h-auto bg-white mt-6 flex flex-col p-6">

            <div className="w-full flex">
                <FiHelpCircle size={20} color="grey" />
                <p className="ml-4 text-md font-light">Help Center</p>
            </div>

            <p className="ml-4 text-sm font-semibold mt-6">How do generate new pin?</p>
            <p className="ml-4 text-sm font-semibold mt-3">How do i renew my subscriptions? </p>
            <p className="ml-4 text-sm font-semibold mt-3">How much is the subscription fee? </p>

            <p className="ml-0 text-md font-light mt-8">For further assistance </p>
            <div className="mt-3 p-3 h-12 bg-themeGreen text-white text-sm font-light flex justify-center items-center">Contact Support</div>

            

        </div>


    </div>
  );
}