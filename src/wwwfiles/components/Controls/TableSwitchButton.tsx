type TableSwitchButtonProps = {
  text: string,
  handler: () => void,
}

export const TableSwitchButton = (props: TableSwitchButtonProps) => {
  return (
    <button onClick={props.handler} className='tw-bg-white tw-px-4 tw-py-1 tw-text-col-button tw-border-solid tw-border-2 tw-border-col-button tw-duration-500 hover:tw-bg-col-button hover:tw-text-white first:tw-rounded-l-full last:tw-rounded-r-full'>{props.text}</button>
  )
}