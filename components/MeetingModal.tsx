import React, { ReactNode } from 'react'
import {
    Dialog,
    DialogContent,
  } from "@/components/ui/dialog"
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
  

interface MeetingModalProps {
    isOpen:boolean,
    onClose: ()=> void,
    title:string,
    className?:string,
    children?: ReactNode,
    handleClick?: () => void,
    img?:string,
    buttonText?:string,
    buttonIcon?: string;
}

const MeetingModal = ({isOpen, onClose, title, className, children, handleClick, buttonText, img, buttonIcon} : MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-[90%] max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white rounded-md">
        <div className="flex flex-col gap-6">
          {img && (
            <div className='flex justify-center'>
              <Image src={img} alt={img} width={72} height={72} />
            </div>
            )}
              <h1 className={cn('text-3xl font-bold leading-[42px]', className)}>{title}</h1>
              {children}
              <Button className='bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0'
              onClick={handleClick}>
                {buttonIcon && (
                    <Image
                    src={buttonIcon}
                    alt='button icons'
                    width={13}
                    height={13}
                    />
                )} &nbsp;
                {buttonText || 'Schedule Meeting'}
              </Button>
        
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MeetingModal