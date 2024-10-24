type ToastProps = {
  text: string,
}

export const Toast = ({text}: ToastProps) => {
  return (
    <div className='tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-5 tw-min-h-[300px] '>
      <div className='tw-flex tw-items-center tw-max-w-xs tw-p-4 tw-m-2 tw-space-x-4 tw-bg-col-gray tw-rounded-lg tw-shadow'>
        <div className='tw-pl-4 !tw-text-white tw-text-center'>{text}</div>
      </div>
    </div>
  );
}