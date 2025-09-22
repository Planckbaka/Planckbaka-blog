'use client';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function CardIntroduction() {
  return (
    <Card className='w-full max-w-md bg-transparent'>
      <CardHeader className='text-6xl justify-center '>Aki Wayne</CardHeader>
      <CardContent className='grid-cols-1 justify-end'>
        <p className='flex justify-end'>I am a full stack developer</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
