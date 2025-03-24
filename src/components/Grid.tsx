import { CSSProperties, ReactNode } from 'react';

import './Grid.css';

type GridProps = {
  children: ReactNode;
  columns: number;
  gap?: string;
  style?: CSSProperties;
};

export default function Grid({ children, columns, gap, style }: GridProps) {
  const gridStyle = {
    '--grid-columns': columns,
    '--grid-gap': gap || 'initial',
    ...style,
  } as CSSProperties;

  return (
    <div className="grid" style={gridStyle}>
      {children}
    </div>
  );
}
