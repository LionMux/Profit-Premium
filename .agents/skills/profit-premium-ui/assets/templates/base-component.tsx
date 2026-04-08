/**
 * Base UI Component Template
 * Use for: Button, Input, Card, Label, etc.
 * Location: src/components/ui/
 */

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface /*ComponentName*/Props extends React.HTMLAttributes<HTMLElement> {
  // Add component-specific props here
}

const /*ComponentName*/ = React.forwardRef<HTMLElement, /*ComponentName*/Props>(
  ({ className, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={cn(
          // Base classes here
          'rounded-md border bg-background',
          className
        )}
        {...props}
      />
    );
  }
);
/*ComponentName*/.displayName = '/*ComponentName*/';

export { /*ComponentName*/ };
