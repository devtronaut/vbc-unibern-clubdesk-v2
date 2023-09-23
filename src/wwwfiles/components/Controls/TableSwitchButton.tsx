type TableSwitchButtonProps = {
  text: string,
  handler: () => void,
}

export const TableSwitchButton = (props: TableSwitchButtonProps) => {
  return (
    <button onClick={props.handler} className='tw-px-4 tw-py-1 tw-text-red-700 tw-border-2 tw-border-red-700 tw-duration-500 tw-hover:tw-bg-red-700 tw-hover:tw-text-white tw-first:tw-rounded-l-full tw-last:tw-rounded-r-full'>{props.text}</button>
  )
}