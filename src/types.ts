import * as React from 'react';

export type WithHTMLAttributes<P extends {}, H extends HTMLElement> = P & Omit<React.HTMLAttributes<H>, keyof P>;