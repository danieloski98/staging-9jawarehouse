import React from 'react';
import { FiSearch, FiBell, FiMenu, FiChevronDown, FiX, FiChevronUp } from 'react-icons/fi'
import { Avatar, Drawer, DrawerOverlay, DrawerContent, DrawerBody, Menu, MenuButton, MenuList, MenuItem, Button, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Divider, Spinner, DrawerCloseButton  } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import * as moment from 'moment'
import { Notification, Search } from 'react-iconly';

// redux
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../store/index';
import { setServices as SetServ } from '../../reducers/services.reducer'
import { updateUser } from '../../reducers/User.reducer';
import { login, logout } from '../../reducers/logged'

// images
import Image from 'next/image';
import Logo from '../../public/images/logo.svg';
import Sidebar from '../dashboard/Sidebar';
import { INotification } from '../../utils/types/Notification';
import { IServerReturnObject } from '../../utils/types/serverreturntype';
import url from '../../utils/url';
import { useQuery } from 'react-query';

// query frunction
const getNotifications = async (user_id: string) => {
  const request = await fetch(`${url}notifications/${user_id}`);
  const json = await request.json() as IServerReturnObject;
  if (!request.ok) {
    throw new Error('An Error Occured')
  }
  return json;
}


export default function NormNavbar() {
  const [open, setOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [notiLoading, setNotiLoading] = React.useState(true);
  const [notiError, setNotiError] = React.useState(false);
  const [notifications, setNotifications] = React.useState([] as Array<INotification>);
  const [showNoti, setShowNoti] = React.useState(false);
  const user = useSelector((state:RootState) => state.UserReducer.user);
  const loggedIn = useSelector((state: RootState) => state.LoggedInReducer.loggedIn);
  const serv = useSelector((state: RootState) => state.ServicesReducer.services)
  const dispatch = useDispatch();
  console.log(user);
  const router = useRouter();

   // query
   const getNotificationQuery = useQuery('getNotifications', () => getNotifications(user._id), {
    onSuccess: (data) => {
      const dt = data.data as Array<INotification>;
      setNotifications(dt);
      setNotiLoading(false);
      setNotiError(false)
    },
    onError: (error) => {
      console.log(error);
      setNotiLoading(false);
      setNotiError(true);
    }
  })

  const handleLogout = () => {
    localStorage.removeItem('9jauser');
    localStorage.removeItem('9jatoken');

    dispatch(logout())
  }

  const getDate = (date: any) => {
    const dt = moment.default(date);
    return dt.startOf('hours').fromNow();
  }

  return (
    <div className="w-full h-20 bg-white px-10 flex justify-between fixed z-50">
        <div className="flex-1 flex items-center">
            <Link href="/">
                <a>
                    <Image src={Logo} alt="logo" className="w-20 h-20" />
                </a>
            </Link>
        </div>
        <div className="flex-1 xl:flex lg:flex md:hidden sm:hidden justify-end items-center">
            <Menu size="lg" preventOverflow={true}>
              <MenuButton
                rightIcon={<FiChevronDown size={20} color="grey" />}
              >
                <p className="flex mr-6">
                {/* <span  onClick={() => setShowSearchbar(prev => !prev)}>
                    <Search  size={20} primaryColor='grey' />
                </span> */}
                  <span className="ml-3 font-Cerebri-sans-book">Find Service</span>
                  <FiChevronDown size={20} color="grey" className="ml-1 mt-1" />
                </p>
              </MenuButton>
              <MenuList w="100vw" size maxH="500px" overflow="auto" className="grid grid-cols-4 font-Cerebri-sans-book text-sm pl-10">
                {serv.map((item, index) => (
                  <MenuItem key={index.toString()}>
                    <Link href={`/services`}>{item.name}</Link>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            
            {
              loggedIn && (
                <Menu>
                  <MenuButton
                    righticon={<FiChevronDown size={20} color="grey" />}
                    className='hover:bg-green-200 rounded-md'
                  >
                  <div className="z-30 w-16 h-12 rounded-md hover:bg-green-200 flex justify-center items-center cursor-pointer" onClick={() => setUserMenuOpen(prev => !prev)}>
                    <Avatar src={user.profile_pic} size="sm" />
                    {userMenuOpen && (
                      <FiChevronUp size={15} className="ml-0 " color="black" />
                    )}
                    {!userMenuOpen && (
                      <FiChevronDown color="black" size={15} className="ml-0" />
                    )}
                  </div>
                  </MenuButton>
                  <MenuList w="100px" minW="10px" maxH="200px" overflow="auto" className="flex flex-col font-light text-sm p-0">
                      <MenuItem className='h-6'>
                        <p onClick={() => router.push('/dashboard')} className="text-sm text-themeGreen font-Circular-std-book mx-0 flex items-center cursor-pointer">
                          <span>Dashboard</span>
                        </p>
                      </MenuItem> 
                      <MenuItem className='h-6'>
                        <p onClick={handleLogout} className="text-sm text-red-400 h-auto font-Circular-std-book mx-0 mt-0 flex items-center cursor-pointer">
                          <span>Logout</span>
                        </p>
                      </MenuItem>          
                  </MenuList>
                </Menu>
              )
            }

            {loggedIn && (
              <div className="p-1 cursor-pointer rounded-md hover:bg-green-200">
                <span  onClick={() => setShowNoti(true)} >
                  <Notification size={25} filled primaryColor="grey" />
                </span>
                {/* <FiBell size={25} color="black" className='cursor-pointer'/> */}
              </div>
            )}

            {!loggedIn && (
              <div className="flex font-Cerebri-sans-book text-md cursor-pointer">
                <Link href="/auth/signup" passHref>
                  <p className="mr-6 font-Cerebri-sans-book text-md">
                    Create Account
                    </p>
                </Link>
                <p className='font-Cerebri-sans-book'><Link href="/auth/loginform">Login</Link></p>
              </div>
            )}
        </div>

        <div className="xl:hidden lg:hidden md:flex sm:flex items-center">
          <FiMenu size={30} color="grey" onClick={() => setOpen(true)} />
        </div>

        {/* Notification Drawer */}
        <Drawer isOpen={showNoti} onClose={() => setShowNoti(false)}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <p>Notifications</p>
              {!notiLoading && !notiError && notifications.length < 1 && (
                <div className="w-full h-64 mt-4">
                  <p>You have no new Notification</p>
              </div>
              )}

              {notiLoading && (
                <div className="w-full h-40 flex justify-center items-center mt-4">
                  <Spinner size="lg" color="green" />
                </div>
              )}

              {!notiLoading && !notiError && notifications.length > 0 && (
                <div className="mt-0 w-full ">
                {notifications.sort((a, b) => {
                  if (new Date(a.created_at) > new Date(b.created_at)) {
                    return -1;
                  }else {
                    return 1;
                  }
                }).map((item, index) => (
                    <div className="w-full h-auto px-0 py-2 flex flex-col" key={index.toString()}>
                       <div className="w-full  cursor-pointer h-full flex justify-end items-center">
                        <p className='font-Circular-std-medium text-xs text-gray-400 mt-3'>{getDate(item.created_at)}</p>
                      </div>
                      <div className="flex-1 flex flex-col justify-evenly mt-3">
                        <p className='font-Cerebri-sans-book text-sm text-black mb-3 mr-6'>{item.message}</p>
                        <div className="flex flex-col">
                          <Divider />
                         
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>

         {/* navigation drawer for small screens and medium screens */}

         <Drawer isOpen={open} onClose={() => setOpen(false)}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerBody className="bg-gray-100">
                <div className="w-full h-auto bg-gray-100 p-0 flex flex-col">

                  {/* logo box */}

                  <div className="w-full h-20 flex justify-between items-center">

                    <Link href="/">
                      <a>
                        {/* <Image src={Logo} alt="logo" className="w-20 h-full" /> */}
                      </a>
                    </Link>

                    <FiX size={25} color="grey" onClick={() => setOpen(false)} />

                  </div>

                  {/* menu */}

                  <div className="w-full flex flex-col">
                  {
                      loggedIn && (
                        <div className="w-full h-10 text-white flex justify-center items-center bg-themeGreen">
                            PIN: 9080998
                        </div>
                      )
                    }

                    <Link href="/dashboard">
                        <a className="text-themeGreen mt-5 text-lg font-light">Dashboard</a>
                    </Link>

                    <Accordion className="mt-5" allowToggle allowMultiple defaultIndex={[0]}>
                        {/* <AccordionItem>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                  <p className="text-xl font-light text-themeGreen">Dashboard</p>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel>
                              <div className="w-full flex flex-col">
                                <p onClick={() => setPage(1)}>Profile</p>
                                <p className="mt-3" onClick={() => setPage(2)}>Customer Reviews</p>
                                <p className="mt-3" onClick={() => setPage(3)}>Subscriptions</p>
                                <p className="mt-3">Notifications</p>
                                <p className="mt-3" onClick={() => setPage(4)}>Settings</p>
                              </div>
                            </AccordionPanel>
                        </AccordionItem> */}

                        <AccordionItem>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                  <p className="text-xl font-Cerebri-sans-book text-themeGreen">Find Services</p>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel>
                              <div className="w-full h-64 overflow-y-auto flex flex-col">
                                {/* <p>Profile</p> */}
                                  {serv.map((item, index) => (
                                    <>
                                      <p className="mt-3 mb-3 font-Cerebri-sans-book" key={index.toString()}>
                                        <Link href={`/services`}>{item.name}</Link>
                                      </p>

                                      {index !== serv.length - 1 && (
                                        <Divider />
                                      )}
                                    </>
                                  ))}
                              </div>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>

                    <p className="text-red-500 mt-5 text-sm font-Cerebri-sans-book">Logout</p>
                  </div>


                </div>
              </DrawerBody>
            </DrawerContent>
        </Drawer>
    </div>
  );
}
