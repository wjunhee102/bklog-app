import React from 'react';

export interface ButtonProps {
  title: string;
  value: string;
  IconComponent?: React.ComponentElement<any, any>
}