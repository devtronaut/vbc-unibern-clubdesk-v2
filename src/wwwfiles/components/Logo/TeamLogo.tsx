import { VolleyballIcon } from './VolleyballIcon';

type TeamLogoProps = {
    src?: string
}

export const TeamLogo = ({src}: TeamLogoProps) => {
    return (
      <>
        <div className="tw-h-full ">
          {src ? (
            <img
              src={src}
              className="tw-h-full tw-rounded-full"
            />
          ) : (
            <VolleyballIcon />
          )}
        </div>
      </>
    );
}