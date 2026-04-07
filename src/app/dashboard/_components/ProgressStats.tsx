interface CircularProgressProps {
  percentage: number;
  topText: string;
  bottomText: string;
  label: string;
}

function CircularProgress({
  percentage,
  topText,
  bottomText,
  label,
}: CircularProgressProps) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className='flex flex-col items-center gap-6'>
      <div className='relative h-40 w-40'>
        <svg
          className='absolute left-0 top-0 h-full w-full -rotate-90 transform'
          viewBox='0 0 120 120'
        >
          {/* Background Circle */}
          <circle
            cx='60'
            cy='60'
            r={radius}
            stroke='#F1F5F9'
            strokeWidth='2.5'
            fill='transparent'
          />
          {/* Progress Circle */}
          <circle
            cx='60'
            cy='60'
            r={radius}
            stroke='#0B5DB8'
            strokeWidth='2.5'
            fill='transparent'
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap='round'
            className='transition-all duration-1000 ease-in-out'
          />
        </svg>
        {/* Center Text */}
        <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
          <span className='text-2xl font-bold text-gray-900'>{topText}</span>
          <span className='mt-1 text-xs font-bold text-gray-800'>
            {bottomText}
          </span>
        </div>
      </div>
      {/* Label */}
      <h3 className='text-center text-sm font-bold uppercase tracking-wide text-gray-900'>
        {label}
      </h3>
    </div>
  );
}

export function ProgressStats() {
  return (
    <section className='flex w-full flex-col items-start justify-start gap-12 py-10 md:flex-row md:items-start md:justify-start lg:gap-16'>
      <CircularProgress
        percentage={72}
        topText='72%'
        bottomText='14H Z 20H'
        label='ZAJĘCIA TEORETYCZNE'
      />
      <CircularProgress
        percentage={72}
        topText='72%'
        bottomText='14H Z 20H'
        label='ZAJĘCIA PRAKTYCZNE'
      />
      <CircularProgress
        percentage={80}
        topText='2000 ZŁ'
        bottomText='Z 2500 ZŁ'
        label='PŁATNOŚĆ'
      />
    </section>
  );
}
