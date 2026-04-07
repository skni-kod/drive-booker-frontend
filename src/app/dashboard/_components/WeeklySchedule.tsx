export function WeeklySchedule() {
  const schedule = [
    {
      id: 1,
      isNext: true,
      title: 'Wykład kategoria B',
      date: 'Poniedziałek 17:00',
      location: 'Mikołaja Kopernika 1',
    },
    {
      id: 2,
      isNext: false,
      title: 'Wykład kategoria B',
      date: 'Czwartek 17:00',
      location: 'Mikołaja Kopernika 1',
    },
    {
      id: 3,
      isNext: false,
      title: 'Wykład kategoria B',
      date: 'Piątek 17:00',
      location: 'Mikołaja Kopernika 1',
    },
    {
      id: 4,
      isNext: false,
      title: 'Wykład kategoria B',
      date: 'Piątek 17:00',
      location: 'Mikołaja Kopernika 1',
    },
  ];

  return (
    <section>
      <h2 className='mb-4 text-xl font-medium text-gray-800'>Twój tydzień</h2>
      <div className='flex flex-col gap-3'>
        {schedule.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col justify-between gap-4 rounded-2xl px-5 py-4 sm:flex-row sm:items-end ${
              item.isNext
                ? 'bg-[#0B5DB8] text-white shadow-sm'
                : 'border border-gray-100 bg-[#FAFAFA] text-gray-900'
            }`}
          >
            <div>
              {item.isNext && (
                <p className='mb-1 text-xs font-medium text-blue-200'>
                  Nadchodzące
                </p>
              )}
              <h3 className='text-lg font-medium'>{item.title}</h3>
              <p
                className={`text-sm ${
                  item.isNext ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {item.date}
              </p>
            </div>
            <div
              className={`text-sm ${
                item.isNext ? 'text-blue-100' : 'text-gray-600'
              }`}
            >
              {item.location}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
