import { useRef, useCallback, useEffect, useState } from "react";
import { ImageBlock } from "../../../../../entities/block/image/ImageBlock";
import { ImageStyles } from "../../../../../entities/block/type/types/image";
import { UseBlockType } from "../../../../../hooks/useBlock";
import { updateObject } from "../../../../../utils";
import getBodyInfo from "../../../../../utils/windowUtils";
import { BaseProps } from "../../../zone/base/BaseBlockZone";

function useImageBlock(block: ImageBlock, useBlockReducer: UseBlockType, zoneProps: BaseProps) {
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

    if(!widthRef.current && imageBlockContainer.current) {
      widthRef.current = imageBlockContainer.current.clientWidth;
    }
  }, [widthRef]);

  const handleResize = useCallback((e: React.MouseEvent<HTMLDivElement>) => { 
    if(!firstPointRef.current || !imageBlockContainer.current) return;
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
    if(!imageBlockContainer.current || widthRef.current === imageBlockContainer.current.clientWidth) return;

    widthRef.current = widthRef.current >> 0;

    onEditBlock(
      block.index, { 
        styles: updateObject(block.styles, { width: `${widthRef.current}` })
    });

  }, [widthRef]);

  useEffect(() => {
    if(imageBlockContainer.current) {
      for(const key in block.styles) {
        imageBlockContainer.current.style[key as any] = block.styles[key as keyof ImageStyles];
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