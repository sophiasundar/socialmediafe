import React, { useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import TopBar from '../home/TopBar';
import ProfileCard from '../home/ProfileCard';
import FollowersCard from '../home/FollowersCard';
import {  updateScrollPosition } from '../redux/scrollSlice.js';

function Home() {
    const { user } = useSelector((state)=> state.user);
    const { scrollY } = useSelector((state)=> state.scroll);
    const dispatch = useDispatch();

    useEffect(()=>{
        const handleScroll = () => {
          dispatch(updateScrollPosition(window.scrollY));
        };

        window.addEventListener('scroll',handleScroll);

        return () =>{
          window.removeEventListener('scroll',handleScroll);
        }
    },)

  return (
    <div className='home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden' style={{ scrollTop: scrollY }}>
      <TopBar/>
      
      <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full'>
        
        {/* col-1 */}
             <div className='hidden w-1/3 lg:w:1/4 h-full md:flex flex-col gap-6 overflow-y-auto'>
                <ProfileCard user={user}/>
                <FollowersCard followers={user?.followers}/>
             </div>

        {/* col-2 */}
            <div>

            </div>

        {/* col-3 */}
        <div>

        </div>

        </div>
    </div>
  )
}

export default Home
