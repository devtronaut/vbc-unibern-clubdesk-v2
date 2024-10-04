type TableSwitchButtonProps = {
  text: string;
  handler: () => void;
};

export const TableSwitchButton = ({
  text,
  handler,
}: TableSwitchButtonProps) => {
  return (
    <button
      onClick={() => handler()}
      className="tw-bg-white tw-px-4 tw-py-3 tw-text-col-button tw-border-solid tw-border-2 tw-border-col-button tw-rounded-full tw-duration-500 hover:tw-bg-col-button hover:tw-text-white"
    >
      {text}
    </button>
  );
};
