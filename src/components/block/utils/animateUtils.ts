import { checkInstanceOfHTMLElement } from ".";

function easeOut (progress, startPoint, movingDistance, duration) {
  return movingDistance * ( -Math.pow( 2, -12 * progress/duration ) + 1 ) + startPoint;
}


interface AnimateElementProps {
  ele: HTMLElement;
  styleType: string;
  unit: string;
  startPoint: number;
  targetPoint: number; 
  duration?: number;
}

function createAnimate({
  ele, styleType, unit, startPoint, targetPoint, duration = 1000
}: AnimateElementProps) {
  let start = null;
  let movingDistance = targetPoint - startPoint;

  return function animate(timestamp) {
    if(!start) start = timestamp;

    let progress = timestamp - start;
    let point = easeOut(progress, startPoint, movingDistance, duration)

    ele.style[styleType] = `${point}${unit}`;

    if(progress < duration) {
      window.requestAnimationFrame(animate);
    } else {
      ele.style[styleType] = `${targetPoint}${unit}`;
      console.log("엔드")
    }
  }
}

function animateElement(animateProps: AnimateElementProps,
  moving?: boolean
) {
  if(!checkInstanceOfHTMLElement(animateProps.ele) && !animateProps.ele.style[animateProps.styleType] && moving) return;

  if(moving !== undefined) moving = true;

  const animate = createAnimate(animateProps);

  window.requestAnimationFrame(animate);
  
  if(moving) moving = false;
}

export default {
  animateElement
};