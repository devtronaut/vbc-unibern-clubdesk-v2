type TableSwitchButtonProps = {
  text: string;
  isActive: boolean;
  handler: () => void;
};

export const TableSwitchButton = ({
  text,
  handler,
  isActive,
}: TableSwitchButtonProps) => {
  return (
    <button
      onClick={() => handler()}
      className={`tw-relative tw-px-2 tw-py-3 tw-text-white tw-font-bold tw-border-none tw-rounded-t-lg hover:tw-cursor-pointer ${
        isActive
          ? 'tw-bg-col-gray after:tw-shadow-roundedTabRightActive before:tw-shadow-roundedTabLeftActive tw-z-20'
          : 'tw-bg-col-gray-light after:tw-shadow-roundedTabRightPassive before:tw-shadow-roundedTabLeftPassive'
      }
      after:tw-content-[''] after:tw-absolute after:-tw-right-[9%] after:tw-bottom-0 after:tw-bg-transparent after:tw-h-[50%] after:tw-w-[10%] after:tw-rounded-bl-xl after:tw-z-10
      before:tw-content-[''] before:tw-absolute before:-tw-left-[9%] before:tw-bottom-0 before:tw-bg-transparent before:tw-h-[50%] before:tw-w-[10%] before:tw-rounded-br-xl before:tw-z-10
      `}
    >
      {text}
    </button>
  );
};
