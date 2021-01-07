/**
 * Дергает handler, если был клик вне элемента в ref.
 *
 * https://usehooks.com/useOnClickOutside/
 *
 * @example
 *
 * function CloseMeIfClickedOutside({ closeMe }) {
 *   const ref = React.useRef(null);
 *
 *   useOnClickOutside(ref, closeMe);
 *
 *   return <div ref={ref}>Click outside me to close me</div>
 * }
 */
import { useEffect } from 'react';

export function useOnClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
