import React from 'react';

export interface ButtonProps<T = string> {
  title: string;
  value: T;
  IconComponent?: React.ComponentElement<any, any>
}