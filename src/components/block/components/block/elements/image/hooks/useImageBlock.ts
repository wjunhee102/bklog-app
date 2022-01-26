import { useRef, useCallback, useEffect } from "react";
import { UseBlockType } from "../../../../../hooks/useBlock";
import { updateObject } from "../../../../../reducer/utils";
import { BlockData } from "../../../../../types";
import { BaseProps } from "../../../zone/base/BaseBlockZone";

function useImageBlock(blockData: BlockData, useBlockReducer: UseBlockType, zoneProps: BaseProps) {
  const {
    onEditBlock
  } = useBlockReducer;

  const imageBlockContainer = useRef<HTMLDivElement>(null);
  const widthRef = useRef<number>(0);
  const firstPointRef = useRef<number>(0);
  
  const handleResizeOn = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    
    firstPointRef.current = e.clientX;

    if(!widthRef.current) {
      widthRef.current = imageBlockContainer.current.clientWidth;
    }
  }, [widthRef]);

  const handleResize = useCallback((e: React.MouseEvent<HTMLDivElement>) => { 
    if(!firstPointRef.current) return;
    e.preventDefault();

    const width: number = widthRef.current + (e.clientX - firstPointRef.current)/30;

    if(width < 100) {
      widthRef.current = 100;
    } else if(width > 900) {  
      widthRef.current = 900;
    } else {
      widthRef.current = width;
    }

    imageBlockContainer.current.style.width = `${widthRef.current}px`;
  }, [firstPointRef]);


  const handleResizeOff = useCallback((e) => {
    if(firstPointRef.current) firstPointRef.current = 0;
    if(widthRef.current === imageBlockContainer.current.clientWidth) return;

    widthRef.current = widthRef.current >> 0;

    onEditBlock(
      blockData.index, { 
        styles: updateObject(blockData.styles, { width: widthRef.current })
    });

  }, [widthRef]);

  useEffect(() => {
    if(imageBlockContainer.current) {
      for(const key in blockData.styles) {
        imageBlockContainer.current.style[key] = blockData.styles[key];
      }
      widthRef.current = imageBlockContainer.current.clientWidth;
    }
  }, [imageBlockContainer.current]);

  return {
    imageBlockContainer,
    handleResizeOn,
    handleResize,
    handleResizeOff
  }
}

export default useImageBlock;