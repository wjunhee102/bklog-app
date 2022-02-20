import React from 'react';
import { BlockTypeText } from '../../../entities/block/type/types/text';
import { ButtonProps } from './types';

const BlockTurnIntoBtnList: ButtonProps<BlockTypeText>[] = [
  {
    title: "텍스트",
    value: "text",
    IconComponent: <img src="/img/text.png" alt=""/>
  },
  {
    title: "체크리스트",
    value: "todo",
    IconComponent: <img src="/img/to-do.png" alt=""/> 
  },
  {
    title: "구분점 목록",
    value: "bulleted",
    IconComponent: <img src="/img/bulleted-list.png" alt=""/>
  },
  {
    title: "번호 목록",
    value: "numbered",
    IconComponent: <img src="/img/numbered-list.png" alt=""/>
  }
]

export default BlockTurnIntoBtnList;