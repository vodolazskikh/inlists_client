/* eslint-disable max-len */
import * as React from 'react';

export function Close({ color = 'currentColor' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill={color}>
      <path d="M7.293 8.71l1.414-1.414L24.71 23.297l-1.414 1.415z" />
      <path d="M7.293 23.29L23.295 7.288l1.414 1.415L8.707 24.704z" />
    </svg>
  );
}
