import {IconSvgProps} from "./types";

export const StraightEmojicon = ({...props}: IconSvgProps) => {
  return (
    <svg
      viewBox="-5.28 -5.28 26.56 26.56"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5.5 7C6.32843 7 7 6.32843 7 5.5C7 4.67157 6.32843 4 5.5 4C4.67157 4 4 4.67157 4 5.5C4 6.32843 4.67157 7 5.5 7ZM12 5.5C12 6.32843 11.3284 7 10.5 7C9.67157 7 9 6.32843 9 5.5C9 4.67157 9.67157 4 10.5 4C11.3284 4 12 4.67157 12 5.5ZM4 9V11H12V9H4Z"
        fillRule="evenodd"
      />
    </svg>
  );
};
