const body = document.querySelector("body");
const bodyInfo = {
  width: 0,
  height: 0
}

const observer = new ResizeObserver(entries => {
  const boxElement = entries[0];
  bodyInfo.width = boxElement.contentRect.width;
  bodyInfo.height = boxElement.contentRect.height;
});

observer.observe(body);

export default () => bodyInfo;
