'use client'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from "@/hooks/use-toast"
import { Textarea } from './ui/textarea'
import ReactDatePicker from 'react-datepicker'
import { Input } from './ui/input'


const MeetingTypeList = () => {
    const [meetingState, setMeetingState] = useState<
      "isScheduleMeeting" | "isJoinMeeting" | "isInstantMeeting" | undefined
    >(undefined);
    const router = useRouter();
    const { user } = useUser()
    const client = useStreamVideoClient()
    const { toast } = useToast()
    const [callDetails, setCallDetails ] = useState<Call>()
    const [ values, setValues ] = useState({
      dateTime: new Date(),
      description: '',
      link: ''
    }) 

    const createMeeting = async ()=> {
      if(!client || !user ) return;

      try {
        if(!values.dateTime){
        toast({ title: "Please select a date and time"});
        return

        }
        const id = crypto.randomUUID();
        const call = client.call('default', id);
        if(!call) throw new Error('Failed to create call')

          const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
          const description = values.description || 'Insant Meeting'

          await call.getOrCreate({
            data:{
              starts_at: startsAt,
              custom:{
                description
              }
            }
          })
          setCallDetails(call);

          if(!values.description){
            router.push(`/meeting/${call.id}`)
          }
        toast({ title: "Meeting created"});
      } catch (error) {
        console.log(error)
        toast({ title: "Failed To Create Meeting"});
      }
    }
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
        <HomeCard
        img = 'icons/add-meeting.svg'
        title = 'New Meeting'
        description = 'Start an Instant Meeting'
        handleClick={()=> setMeetingState('isInstantMeeting')}
        className='bg-orange-1'
        />
        <HomeCard
        img = 'icons/schedule.svg'
        title = 'Schedule Meeting'
        description = 'Plan Your Meeting Meeting'
        handleClick={()=>setMeetingState('isScheduleMeeting')}
        className='bg-blue-1'
        />
        <HomeCard
        img = 'icons/recordings.svg'
        title = 'View Recorded Meetings'
        description = 'Check Your recordings'
        handleClick={()=>router.push('/recordings')}
        className='bg-purple-1'
        />
        <HomeCard
        img = 'icons/join-meeting.svg'
        title = 'Join Meeting'
        description = 'Join Via Invitaiton Link'
        handleClick={()=>setMeetingState('isJoinMeeting')}
        className='bg-yellow-1'
        />

        {!callDetails ? (
          <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          className="text-center"
          handleClick={createMeeting}
        >
          <div className='flex flex-col gap-2.5'>
            <label className='text-base text-normal
            leading-[22px] text-sky-2'>Add a Description</label>
            <Textarea className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
            onChange={(e)=> {
              setValues({...values, description: e.target.value})
            }}/>
          </div>
          <div className='flex flex-col gap-2.5'>
          <label className='text-base text-normal
            leading-[22px] text-sky-2'>Select date and time</label>
            <ReactDatePicker
            selected={values.dateTime}
            onChange={(date)=> setValues({...values,
              dateTime: date!
            })}
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={15}
            timeCaption='time'
            dateFormat='MMMM d, yyyy h:mm aa'
            className='w-full rounded bg-dark-3 p-2 focus:outline-none'
            />
          </div>
        </MeetingModal>

        ):(
        <MeetingModal
        isOpen={meetingState === 'isScheduleMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Meeting Created"
        className="text-center"
        buttonText="Copy Meeting Link"
        handleClick={()=> {
          navigator.clipboard.writeText(meetingLink);
          toast({title:'Link Copied'})
        }}
        img='/icons/checked.svg'
        buttonIcon='/icons/copy.svg'
      />

        )}
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
       <MeetingModal
        isOpen={meetingState === 'isJoinMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Enter the Meeting Link Here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={()=>router.push(values.link)}
      >
        <Input
        placeholder='Meeting Link'
        className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
        onChange={(e)=> setValues({...values, link:e.target.value})}
        />
      </MeetingModal>

    </section>
  )
}

export default MeetingTypeList