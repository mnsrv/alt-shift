import { CSSProperties, ReactNode } from 'react';

import './Grid.css';

type GridProps = {
  children: ReactNode;
  columns: number;
  gap?: string;
};

export default function Grid({ children, columns, gap }: GridProps) {
  const style = {
    '--grid-columns': columns,
    '--grid-gap': gap || 'initial',
  } as CSSProperties;

  return (
    <div className="grid" style={style}>
      {children}
    </div>
  );
}
