import {useEffect, useRef, useState} from 'react'

export const useTextarea = (placeholder) => {
   const [offset, setOffset] = useState(0);
   const textAreaRef = useRef(null);
   const spanRef = useRef(null);
   useEffect(() => {
      if (placeholder !== "") {
         setOffset(Number(spanRef.current.offsetWidth) + 4)
         // const offset = Number(spanRef.current.offsetWidth) + 4;
         // textAreaRef.current.style.textIndent = offset + "px";
      }
   }, [placeholder]);

   return {textAreaRef, spanRef, offset}
}