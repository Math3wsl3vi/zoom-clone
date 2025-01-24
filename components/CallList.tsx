/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore

'use client'
import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard';
import Loader from './Loader';
import { useToast } from '@/hooks/use-toast';

const CallList = ({type}:{type : 'ended' | 'upcoming' | 'recordings'}) => {
    const { toast } = useToast()

    const { endedCalls, UpcomingCalls, callRecordings, isLoading } = useGetCalls();
    const router = useRouter();

    const [ recordings, setRecordings ] = useState<CallRecording[]>([])

    const getCalls = ()=> {
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'recordings':
                return  recordings;  
            case 'upcoming':   
                return UpcomingCalls;
            default:
                return [];
        }
    }

    const getNoCallsMessage = ()=> {
        switch (type) {
            case 'ended':
                return 'No Previous calls';
            case 'recordings':
                return  'No recordings';  
            case 'upcoming':   
                return 'No upcoming calls';
            default:
                return '';
        }
    }

    useEffect(()=>{
        const fetchRecordings = async ()=> {
            try {
                const callData = await Promise.all(
                    callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [],
                  );
                const recordings = callData
                .filter((call) => call.recordings.length > 0)
                .flatMap((call) => call.recordings)
    
                setRecordings(recordings)
                
            } catch (error) {
                toast({title: 'Try Again Later'})
                
            }
           
        }
        if(type === 'recordings') fetchRecordings()
    },[type, callRecordings])

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();
    if(isLoading) return <Loader/>


  return (
    <div className='grid gird-cols-1 gap-5 xl:grid-cols-3'>
        {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording)=> (
            <MeetingCard 
            key={(meeting as Call).id}
            title={(meeting as Call).state?.custom.description?.substring(0,26) || meeting?.filename?.substring(0,20) || 'Personal Meeting'}
            icon={
                type === 'ended' ? '/icons/previous.svg': type === 'upcoming' ? '/icons/upcoming.svg' : '/icons/recordings.svg'
            }
            date={meeting.state?.startsAt.toLocaleString() ||  meeting.start_time.toLocaleString()}
            isPreviousMeeting={type === 'ended'}
            buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
            buttonText={type === 'recordings' ? 'Play' : 'Start'}
            link={type === 'recordings' ? meeting.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}
            handleClick={type === 'recordings' ? () => router.push(`$meeting.url`) : ()=> router.push(`/meeting/${meeting.id}`) }
            />
        )):(
            <h1>{noCallsMessage}</h1>
        )}
    </div>
  )
}

export default CallList