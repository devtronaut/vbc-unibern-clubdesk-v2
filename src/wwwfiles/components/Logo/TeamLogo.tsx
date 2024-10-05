import { VolleyballIcon } from '../Icons/VolleyballIcon';

type TeamLogoProps = {
  src?: string;
};

export const TeamLogo = ({ src }: TeamLogoProps) => {
  return (
    <div className="tw-h-full tw-w-fit tw-min-w-fit">
      {src ? (
        <img
          src={src}
          className="tw-h-full tw-w-fit tw-min-w-fit tw-min-h-full tw-rounded-full"
        />
      ) : (
        <VolleyballIcon />
      )}
    </div>
  );
};
