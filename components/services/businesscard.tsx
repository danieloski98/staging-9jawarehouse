import React from 'react';
import Image from 'next/image'
import Img from '../../public/images/girl2.png'
import { Avatar } from '@chakra-ui/react'
import ReactStars from "react-rating-stars-component";
import { useRouter } from 'next/router'
import { IUser } from '../../utils/types/user';

//redux
import { useDispatch } from 'react-redux';
import {RootState} from '../../store/index'
import { updateUser } from '../../reducers/Activeuser.reducer'

export default function BusinessCard({user}: {user: IUser}) {
    console.log(user);
    const router = useRouter();
    // redux
    const dispatch = useDispatch();

    const ratingChanged = (newRating: any) => {
        console.log(newRating);
      };

      const move = () => {
          dispatch(updateUser(user));
          router.push(`/services/business/${user._id}`)
      }
      
  return (
    <div className="xl:w-30/100 lg:30/100 md:w-full sm:w-full h-auto flex flex-col border-1 border-lightGrey mb-6 py-8">
        <div className="w-full h-auto flex items-center justify-center">
            <Avatar src={user.profile_pic} size="xl" />
        </div>

        <div className="w-full h-auto flex flex-col items-center px-4 text-center">
            <p className=" font-Circular-std-medium text-lg text-gray-600 mb-0">{user.business_name}</p>
            <p className='text-xl text-themeGreen font-Circular-std-book'>{user.services[0]}</p>

            {/* <p className="font-semibold text-sm text-gray-500">Business Type</p> */}
            <div className="mt-0 flex flex-col">
                    {/* <p className="font-semibold text-sm text-gray-500">Overall Rating</p> */}
                    <div className="flex h-12 items-center">
                        <p className="text-xl font-Cerebri-sans-book text-themeGreen mr-2">{Math.round(user.rating) || 0}</p>
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={20}
                            activeColor="#ffd700"
                            value={user.rating}
                            isHalf={true}
                            edit={false}
                            color="lightgrey"
                        />
                        {user.commentLength && (
                            <p className="text-sm font-semibold text-gray-600 ml-2">({user.commentLength})</p>
                        )}
                    </div>
                </div>
                <button onClick={move} className="w-40 bg-themeGreen text-white text-sm font-Cerebri-sans-book h-10">View Profile</button>
        </div>

    </div>
  );
}