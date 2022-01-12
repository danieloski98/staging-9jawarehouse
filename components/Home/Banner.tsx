import React from 'react';
import Image from 'next/image';
import { FiSearch, FiMenu, FiTrash2 } from 'react-icons/fi'
import { InputGroup, Input, InputLeftAddon, InputLeftElement, Drawer, DrawerOverlay, DrawerContent, DrawerBody, Avatar, Menu, MenuButton, MenuList, MenuItem, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Divider, Modal, ModalContent, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, ModalOverlay, Spinner, PopoverHeader, } from '@chakra-ui/react'
const colors = require('tailwindcss/colors')
import { useRouter } from 'next/router'
import { FiBell, FiChevronDown, FiX, FiChevronUp, FiChevronsDown } from 'react-icons/fi'
import Link from 'next/link'
import * as moment from 'moment';

// redux
// redux
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../store/index';
import { setServices as SetServ } from '../../reducers/services.reducer'
import { updateUser } from '../../reducers/User.reducer'
import { updatePin } from '../../reducers/pin.reducer'
import { login, logout } from '../../reducers/logged';

// images
import Logo from '../../public/images/logo.svg';
import Woman from '../../public/images/woman.svg';
import url from '../../utils/url';
import { IServerReturnObject } from '../../utils/types/serverreturntype';
import { useQuery } from 'react-query';
import { INotification } from '../../utils/types/Notification';


// other components
export const LeftNavbar = () => {
    const dispatch = useDispatch();
    const serv = useSelector((state: RootState) => state.ServicesReducer.services);
    const loggedIn = useSelector((state: RootState) => state.LoggedInReducer.loggedIn);
    const user = useSelector((state: RootState) => state.UserReducer.user);

    React.useMemo(() => {
        (async function() {
          const request1 = await fetch(`${url}services`);
          const json1 = await request1.json() as IServerReturnObject;
          const ser = json1.data;
    
          dispatch(SetServ(ser))
        })()
      }, [dispatch]);

    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    const handleLogout = () => {
      localStorage.removeItem('9jauser');
      localStorage.removeItem('9jatoken');
  
      dispatch(logout())
    }

    return (
        <div className="w-full h-24 flex justify-between items-center px-5">
            <Image src={Logo} alt="logo" className=" w-20 h-20" />
            <div className=" xl:hidden lg:hidden md:flex sm:flex w-20 justify-end items-center">
                {/* <FiSearch size={25} color="grey" /> */}
                <FiMenu size={25} color="grey" onClick={() => setOpen(true)} />
            </div>

            {/* drawer */}
            <Drawer isOpen={open} onClose={() => setOpen(false)} placement="right" >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerBody>
                        <div className="w-full flex flex-col items-start text-md font-light text-gray-600">
                            {/* <Avatar src="https://bit.ly/broken-link" className="" size="sm" /> */}
                            {!loggedIn && (
                              <>
                                <p onClick={() => router.push('/auth/loginform')} className="mt-6 text-md font-Cerebri-sans-book text-themeGreen">Login</p>
                                <p onClick={() => router.push('/auth/signup')} className="mt-4 mb-4 text-md font-Cerebri-sans-book text-themeGreen">Register</p>
                              </>
                            )}

                          {loggedIn && (
                            <div className="w-full h-16 flex items-center" onClick={() => router.push('/dashboard')}>
                              <Avatar src={user.profile_pic} className="mr-0 cursor-pointer" size="sm"  />
                              <p className='font-Cerebri-sans-book ml-2 text-themeGreen'>Dashboard</p>
                            </div>
                          )}

                    <Accordion className="mt-5" allowToggle allowMultiple defaultIndex={[0]}>


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
                                    <div key={index.toString()}>
                                      <p className="mt-3 mb-3 font-Cerebri-sans-book" key={index.toString()}>
                                        <Link href={`/services/${item.name}`}>{item.name}</Link>
                                      </p>

                                      {index !== serv.length - 1 && (
                                        <Divider />
                                      )}
                                    </div>
                                  ))}
                              </div>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                    <p className="text-red-500 mt-5 text-sm font-light" onClick={handleLogout}>Logout</p>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

        </div>
    )
}

// query frunction
const getNotifications = async (user_id: string) => {
  console.log(user_id);
  const request = await fetch(`${url}notifications/${user_id}`);
  const json = await request.json() as IServerReturnObject;
  if (!request.ok || json.statusCode !== 200) {
    throw new Error(json.errorMessage)
  }
  return json;
}

const RightNavBar = () => {
    const router = useRouter();
    const [loading, setLoading] = React.useState(true);
    const dispatch = useDispatch();
    const serv = useSelector((state: RootState) => state.ServicesReducer.services);
    const loggedIn = useSelector((state: RootState) => state.LoggedInReducer.loggedIn);
    const user = useSelector((state: RootState) => state.UserReducer.user);
    const [userMenuOpen, setUserMenuOpen] = React.useState(false);
    const [notificationOpen, setNotificationOpen] = React.useState(false);
    const [notiLoading, setNotiLoading] = React.useState(true);
    const [notiError, setNotiError] = React.useState(false);
    const [notifications, setNotifications] = React.useState([] as Array<INotification>);

    const fetchUser = React.useCallback( async() => {
      setLoading(true);
      // dispatch(updateUser(JSON.parse(localStorage.getItem('9jauser') as string)))
      const _id = JSON.parse(localStorage.getItem('9jauser') as string)._id;
      const request = await fetch(`${url}user/${_id}`);
      const json = await request.json() as IServerReturnObject;
  
      if (json.statusCode !== 200) {
          router.push('/');
          alert(json.errorMessage);
          dispatch(logout());
          setLoading(false);
          return
      } else {
          dispatch(updateUser(json.data));
          dispatch(login());
          setLoading(false);
      }
      }, [dispatch, router]);

    React.useEffect(() => {
      const data = localStorage.getItem('9jauser');

      if (data === null || data === undefined) {
          dispatch(logout());
          setLoading(false);
          router.push('/');
      } else {
          fetchUser();
      }
    }, []);

     // query
    const getNotificationQuery = useQuery(['getNotifications', user._id], () => getNotifications(user._id), {
      onSuccess: (data) => {
        const dt = data.data as Array<INotification>;
        setNotifications(data.data);
        console.log(data.data);
        setNotiLoading(false);
        setNotiError(false)
      },
      onError: (error) => {
        console.log(error);
        setNotiLoading(false);
        setNotiError(true);
      }
    })


      React.useMemo(() => {
      (async function() {
        const request1 = await fetch(`${url}services`);
        const json1 = await request1.json() as IServerReturnObject;
        const ser = json1.data;

        dispatch(SetServ(ser))
      })()
      }, [dispatch]);

      const deleteNoti = async (id: string) => {
        setNotiLoading(true);
        const request = await fetch(`${url}notifications/${id}`, {
          method: 'delete',
        });
        const json = await request.json() as IServerReturnObject;
        setNotiLoading(false);
        if (json.statusCode !== 200) {
          alert(json.errorMessage);
          return;
        }else {
          alert(json.successMessage);
          return;
        }
      }

      const getDate = (date: any) => {
        const dt = moment.default(date);
        return dt.startOf('hours').fromNow();
      }

      const handleLogout = () => {
        localStorage.removeItem('9jauser');
        localStorage.removeItem('9jatoken');

        dispatch(logout())
      }

    return (
        <div className="w-full h-24 flex justify-end pr-12 items-center text-white">

            {/* modal */}
            <Modal isOpen={loading} onClose={() => setLoading(false)} isCentered={true}>
                <ModalOverlay />
                <ModalContent>
                    <ModalContent className="w-full flex flex-col items-center justify-center h-56">
                        <Spinner colot="green.500" size="xl" />
                        <p className="mt-4 font-Cerebri-sans-book text-xl">Loading Details...</p>
                    </ModalContent>
                </ModalContent>
            </Modal>

             <Menu size="lg" preventOverflow={true}>
              <MenuButton
                rightIcon={<FiChevronDown size={20} color="grey" />}
              >
                <p className="flex mr-6">
                  <FiSearch size={20} className="text-white" />
                  <span className="ml-3 font-Circular-std-book text-md cursor-pointer">Find Service</span>
                  <FiChevronDown size={20} color="white" className="ml-1 mt-1" />
                </p>
              </MenuButton>
              <MenuList w="1000px" size maxH="500px" overflow="auto" mr="200px" className="grid grid-cols-4 font-light text-sm">
                {serv.map((item, index) => (
                  <MenuItem key={index.toString()}>
                    <a href={`/services?service=${item.name}`}>
                        <p className="text-gray-600 font-Circular-std-book">{item.name}</p>
                    </a>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

            
            {
              loggedIn && (
                <Menu isOpen={userMenuOpen} onClose={() => setUserMenuOpen(false)}>
                  <MenuButton
                    // righticon={<FiChevronDown size={20} color="grey" />}
                    className='hover:bg-green-200 rounded-md'
                    onClick={() => setUserMenuOpen(prev => !prev)}
                  >
                  <div className="z-30 w-16 h-12 rounded-md hover:bg-green-200 flex justify-center items-center cursor-pointer" >
                    <Avatar src={user.profile_pic} size="sm" />
                    {userMenuOpen && (
                      <FiChevronUp size={15} className="ml-0 " color="white" />
                    )}
                    {!userMenuOpen && (
                      <FiChevronDown color="white" size={15} className="ml-0" />
                    )}
                  </div>
                  </MenuButton>
                  <MenuList w="100px" minW="10px" maxH="200px" overflow="auto" className="flex flex-col font-light text-sm p-0">
                    <MenuItem className='h-6'>
                        <p onClick={() => router.push('/dashboard')}  className="text-sm text-themeGreen h-auto font-Circular-std-book mx-0 mt-0 flex items-center cursor-pointer">
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
              <Popover placement='bottom' size="xs" isOpen={notificationOpen} closeOnBlur={true} closeOnEsc={true} onClose={() => setNotificationOpen(false)}>
              <PopoverTrigger>
                <div className="w-12 h-12 flex items-center justify-center ml-6"  onClick={() => setNotificationOpen(prev => !prev)}>
                  <FiBell size={25} color="white" className='cursor-pointer' />
                </div>
              </PopoverTrigger>
              <PopoverContent borderRadius={0}>
                <PopoverHeader>
                  <div className="w-full flex justify-between text-themeGreen text-sm py-2">
                    <p className='font-Circular-std-medium'>Notifications</p>
                    <p className="font-Circular-std-book cursor-pointer">Mark All As Read</p>
                  </div>
                </PopoverHeader>
                {/* <PopoverArrow /> */}
                <PopoverBody className='p-0'>
                  <div className="w-full h-64 overflow-y-auto">
                        { notiLoading && (
                          <div className='w-full flex mt-6 justify-center'>
                            <Spinner size="md" color="green" />
                          </div>
                        )}

                        {!notiLoading && !notiError && notifications.length < 1 && (
                          <div className="w-full h-64 mt-4 font-Cerebri-sans-book text-gray-700">
                            <p>You have no new Notification</p>
                        </div>
                        )}

                        {!notiLoading && !notiError && notifications.length > 0 && (
                          <div className="mt-0 w-full ">
                            {notifications.map((item, index) => (
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
                  </div>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            )}

            {!loggedIn && (
              <p onClick={() => router.push('/auth/signup')} className="text-md font-Circular-std-book mx-5 flex items-center cursor-pointer">
                  <span>Become A Vendor</span>
              </p>
            )}

            {!loggedIn && (
              <p onClick={() => router.push('/auth/loginform')} className="text-md font-Circular-std-book mx-5 flex items-center cursor-pointer">
                  <span>Login</span>
              </p>
            )}
    </div>
    )
}



export default function Banner() {
    const [query, setQuery] = React.useState('');
    const router = useRouter();

    const handleKeydonw = (e: any) => {
        if (e.key === 'Enter') {
          router.push(`/services?service=${query}`);
        }
      }
  return (
    <div className="w-full xl:h-screen lg:h-screen md:h-auto sm:h-auto flex">
        <div className="flex-1 flex flex-col">
            <LeftNavbar />
            <div className="flex-1 flex flex-col justify-center xl:px-10 lg:px-10 md:px-5 sm:px-5  xl:py-0 lg:py-0 md:py-12 sm:py-12">
                <h1 className="xl:text-6xl lg:text-6xl md:text-4xl sm:text-4xl font-Circular-std-medium text-themeGreen">
                    Discover Vendors <br/>
                </h1>
                <h1 className="xl:text-6xl lg:text-6xl md:text-4xl sm:text-4xl font-Circular-std-medium text-themeGreen mt-4">
                    Near You
                </h1>
                <p className="xl:w-4/5 lg:w-4/5 md:w-full sm:w-full mt-5 text-xl font-Circular-std-book text-gray-400">
                Less hassle searching for who is best fit  for Photography, Catering, Event planning, make-up artists, DJs, decorators and more
                </p>

                <div className="xl:w-9/12 lg:w-9/12 md:w-full sm:w-full mt-6">
                    <InputGroup>
                        <InputLeftElement bgColor="#1A8F85" borderLeftRadius={10}>
                        <div className=" w-full flex items-center justify-center rounded-l-md">
                            <FiSearch color="white" size={20} />
                        </div>
                        </InputLeftElement>
                        <Input onKeyPress={handleKeydonw} onChange={(e) => setQuery(e.target.value)} placeholder="search for services or businesses" fontSize="md" paddingLeft="50px" className='font-Circular-std-book' />
                    </InputGroup>
                </div>
            </div>
        </div>
        <div className="flex-1 bg-themeGreen xl:flex lg:flex md:hidden sm:hidden flex flex-col">
            <RightNavBar />
            <div className="flex-1 overflow-hidden">
                <Image src={Woman} alt="logo" className=" w-full h-full object-contain" />
            </div>
        </div>
    </div>
  );
}
