import { useRef, useCallback, useEffect, useState } from "react";
import { UseBlockType } from "../../../../../hooks/useBlock";
import { BlockData } from "../../../../../types";
import { updateObject } from "../../../../../utils";
import getBodyInfo from "../../../../../utils/windowUtils";
import { BaseProps } from "../../../zone/base/BaseBlockZone";

function useImageBlock(blockData: BlockData, useBlockReducer: UseBlockType, zoneProps: BaseProps) {
  const {
    onEditBlock
  } = useBlockReducer;
  
  const [ direction, setDirection ] = useState<boolean>(false);

  const imageBlockContainer = useRef<HTMLDivElement>(null);
  const widthRef = useRef<number>(0);
  const firstPointRef = useRef<number>(0);
  
  const handleResizeOn = useCallback((directionValue: boolean) => (e: React.MouseEvent<HTMLDivElement>) => {
    
    firstPointRef.current = e.clientX;
    setDirection(directionValue);

    if(!widthRef.current) {
      widthRef.current = imageBlockContainer.current.clientWidth;
    }
  }, [widthRef]);

  const handleResize = useCallback((e: React.MouseEvent<HTMLDivElement>) => { 
    if(!firstPointRef.current) return;
    e.preventDefault();

    let reducedAreaRatio = 50 - ((getBodyInfo().width/100) >> 0); 
    
    if(reducedAreaRatio <= 10) reducedAreaRatio = 10;

    const movingDistance = direction? e.clientX - firstPointRef.current : firstPointRef.current - e.clientX;
    const width: number = widthRef.current + movingDistance/reducedAreaRatio;
 
    if(width < 100) {
      widthRef.current = 100;
    } else if(width > 900) {  
      widthRef.current = 900;
    } else {
      widthRef.current = width;
    }
  
    imageBlockContainer.current.style.width = `${widthRef.current}px`;
  }, [firstPointRef, direction]);


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