import { ButtonProps } from "./util";

const textBlockButtonList: ButtonProps[] = [
  {
    title: "Text",
    value: "p",
    IconComponent: <img src="/img/text.png" alt=""/>
  },
  {
    title: "Heading 1",
    value: "h1",
    IconComponent: <img src="/img/header1.png" alt=""/>
  },
  {
    title: "Heading 2",
    value: "h2",
    IconComponent: <img src="/img/header1.png" alt=""/>
  },
  {
    title: "Heading 3",
    value: "h3",
    IconComponent: <img src="/img/header1.png" alt=""/>
  },
  {
    title: "To-do list",
    value: "todo",
    IconComponent: <img src="/img/to-do.png" alt=""/> 
  },
  {
    title: "Bulleted list",
    value: "bulleted",
    IconComponent: <img src="/img/bulleted-list.png" alt=""/>
  },
  {
    title: "Numbered list",
    value: "numbered",
    IconComponent: <img src="/img/numbered-list.png" alt=""/>
  }
]

export default textBlockButtonList;
