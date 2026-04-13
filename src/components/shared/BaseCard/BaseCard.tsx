import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

interface BaseCardProps {
  title: string;
  subtitle?: string;
  icon?: string;
  category?: string;
  href?: string;
  extraInfoTopRight?: ReactNode;
  contentLeft?: ReactNode;
  contentRight?: ReactNode;
  actions?: ReactNode;
}

export default function BaseCard({
  title,
  subtitle,
  icon,
  category,
  href,
  extraInfoTopRight,
  contentLeft,
  contentRight,
  actions,
}: BaseCardProps) {
  return (
    <Card className='w-full'>
      <CardContent className='p-4'>
        {/* mobile */}
        <div className='flex flex-col md:hidden'>
          <Link href={href ?? '#'} className='block'>
            <div className='mb-2 flex items-start justify-between'>
              {icon ? (
                <Image src={icon} width={32} height={32} alt='icon' />
              ) : (
                <div className='h-8 w-8 rounded-sm bg-muted' />
              )}
              {category && (
                <span className='rounded bg-black px-2 py-1 text-xs text-white'>
                  {category}
                </span>
              )}
            </div>
            <h3 className='mb-2 text-lg font-semibold'>{title}</h3>
            {subtitle && (
              <p className='text-sm text-muted-foreground'>{subtitle}</p>
            )}
            {extraInfoTopRight && (
              <div className='mt-2 text-sm'>{extraInfoTopRight}</div>
            )}
            <div className='mb-2 w-full border-t border-gray-200'></div>
            {contentLeft}
            <div className='mt-2 flex justify-between text-sm'>
              {contentRight}
            </div>
          </Link>
        </div>

        {/* desktop */}
        <div className='hidden items-center gap-4 md:flex'>
          {icon ? (
            <Image
              src={icon}
              width={64}
              height={64}
              alt='icon'
              className='rounded-sm'
            />
          ) : (
            <div className='h-16 w-16 shrink-0 rounded-sm bg-muted' />
          )}

          <div className='flex-1'>
            <h3 className='font-medium'>{title}</h3>
            {category && (
              <p className='text-sm text-muted-foreground'>{category}</p>
            )}
            {subtitle && (
              <p className='text-sm text-muted-foreground'>{subtitle}</p>
            )}
            {contentLeft}
          </div>

          <div className='ml-auto flex shrink-0 flex-col items-end gap-2'>
            {extraInfoTopRight}
            <div className='flex gap-2'>{actions}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
