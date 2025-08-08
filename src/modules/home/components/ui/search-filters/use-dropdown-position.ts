import { RefObject } from "react";

export const useDropdownPosition = (ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>) => {
  const getDropdownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };

    const rect = ref.current.getBoundingClientRect();
    const dropdownWidth = 240; //Width of the dropdown 240 px 

    //Calculate the initial position
    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;

    //Check if the dropdown goes beyond the right edge of the viewport
    if (left + dropdownWidth > window.innerWidth) {
      left = rect.right + window.scrollX - dropdownWidth;
    }

    //If still offscreen, aligh to the right edge of viewport with some pading
    if (left < 0) {
      left = window.innerWidth - dropdownWidth - 16;
    }

    //Ensure the dropdown does not go off left edge
    if (left < 0) {
      left = 16;
    }

    return { top, left };
  };

  return { getDropdownPosition }
};