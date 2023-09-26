type ToastProps = {
  text: string,
}

export const Toast = (props: ToastProps) => {
  return (
    <div className='tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-5 tw-min-h-[300px] '>
      <div className='tw-flex tw-items-center tw-w-full tw-max-w-xs tw-p-4 tw-space-x-4 tw-bg-col-table-header tw-rounded-lg tw-shadow'>
        <div className='tw-pl-4 !tw-text-white tw-text-center'>{props.text}</div>
      </div>
    </div>
  );
}