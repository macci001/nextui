import {IconSvgProps} from "./types";

export const AngryEmojicon = ({...props}: IconSvgProps) => {
  return (
    <svg
      aria-label="Angry face emoji"
      role="img"
      viewBox="-5.28 -5.28 26.56 26.56"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5 4H4V5.5C4 6.32843 4.67157 7 5.5 7C6.32843 7 7 6.32843 7 5.5L5 4ZM12 4H11L9 5.5C9 6.32843 9.67157 7 10.5 7C11.3284 7 12 6.32843 12 5.5V4ZM8 10C6.89543 10 6 10.8954 6 12H4C4 9.79086 5.79086 8 8 8C10.2091 8 12 9.79086 12 12H10C10 10.8954 9.10457 10 8 10Z"
        fillRule="evenodd"
      />
    </svg>
  );
};
