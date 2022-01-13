import React from 'react';
import ReactStars from "react-rating-stars-component";
import { IComment } from '../../utils/types/comments';
import { Image } from '@chakra-ui/react'

const Comments = ({comment}: {comment: IComment}) => {
    const ratingChanged = (newRating: any) => {
        console.log(newRating);
      };
    return (
        <div className="w-full p-5 flex flex-col h-auto border-b-2 border-gray-200 mb-4">
            <p className="text-sm font-Circular-std-book text-gray-600">{new Date(comment.created_at).toDateString()}</p>
            

            <div className="flex mt-8">
            <p className='text-md text-gray-600 font-Circular-std-medium'>{comment.fullname}</p>

            <div className=" flex flex-col ml-4 pt-1">
                {/* <p className="font-semibold text-sm text-gray-500">Overall Rating</p> */}
                <div className="flex h-5 items-center">
                    <p className="text-md font-light text-themeGreen mr-1">{comment.rating}/5</p>
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={20}
                        activeColor="#ffd700"
                        value={comment.rating}
                        isHalf={true}
                        edit={false}
                        color="lightgrey"
                    />
                    {/* <p className="text-sm font-semibold text-gray-600 ml-4">10 Reviews</p> */}
                </div>
            </div>
            </div>

            <p className="mt-4 text-md font-Circular-std-book text-gray-600">{comment.comment}</p>

           {
               comment.pictures.length > 0 && (
                <div className="w-full h-auto flex mt-6">
                {comment.pictures.map((item, index) => (
                    <div className="w-20 h-20 rounded-md overflow-hidden mr-4" key={index.toString()}>
                        <Image src={item} alt="img" className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
               )
           }
        </div>
    )
}

export default function RateBox({comments, name}: {comments: Array<IComment>, name: string}) {
  return (
    <div id="comments" className="w-full h-auto pb-10 border-2 border-gray-200">
        <div className="w-full h-auto py-6 pb-10 flex flex-col bg-white p-5">
            <p className="text-2xl font-Circular-std-medium text-gray-600 ml-0">Customer Reviews for {name}</p>

           {comments.length > 0 && (
                <div className="w-full flex flex-col mt-6">
                    {
                        comments.map((item, index) => (
                            <Comments key={index.toString()} comment={item} />
                        ))
                    }
                    
                </div>
           )}
           {comments.length < 1 && (
               <div className="w-full h-32 flex flex-col justify-center items-center">
                   <p>This user has no Reviews</p>
               </div>
           )}
        </div>
    </div>
  );
}
