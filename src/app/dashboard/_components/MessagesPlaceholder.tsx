export function MessagesPlaceholder() {
  return (
    <section>
      <h2 className='mb-4 text-xl font-medium text-gray-800'>Wiadomości</h2>

      <div className='w-full rounded-xl border border-gray-100 bg-[#FAFAFA] p-4'>
        <div className='mb-3 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <span className='h-6 w-6 rounded-full bg-gray-400' />
            <p className='text-xl font-medium text-gray-800'>Wojciech Mann</p>
          </div>

          <span className='text-sm text-gray-700'>Piątek 17:00</span>
        </div>

        <p className='text-sm leading-7 text-gray-700'>
          Lorem ipsum dolor sit amet consectetur. Eu consequat tellus sodales
          vel risus mattis. Nisl non vitae ut malesuada. Mauris blandit duis
          tristique vel. Platea varius leo aliquet.Mauris blandit duis tristique
          vel. Platea varius leo aliquet.
        </p>
      </div>
    </section>
  );
}
