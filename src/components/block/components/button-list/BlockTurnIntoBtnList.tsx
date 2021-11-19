import React from 'react';
import { ButtonProps } from './types';

const BlockTurnIntoBtnList: ButtonProps[] = [
  {
    title: "본문",
    value: "bk-p",
    IconComponent: <img src="/img/text.png" alt=""/>
  },
  {
    title: "제목",
    value: "bk-h1",
    IconComponent: <img src="/img/header1.png" alt=""/>
  },
  {
    title: "머리말",
    value: "bk-h2",
    IconComponent: <img src="/img/header1.png" alt=""/>
  },
  {
    title: "부 머리말",
    value: "bk-h3",
    IconComponent: <img src="/img/header1.png" alt=""/>
  },
  {
    title: "체크리스트",
    value: "bk-todo",
    IconComponent: <img src="/img/to-do.png" alt=""/> 
  },
  {
    title: "구분점 목록",
    value: "bk-bulleted",
    IconComponent: <img src="/img/bulleted-list.png" alt=""/>
  },
  {
    title: "번호 목록",
    value: "bk-numbered",
    IconComponent: <img src="/img/numbered-list.png" alt=""/>
  }
]

export default BlockTurnIntoBtnList;