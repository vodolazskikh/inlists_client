import { useState, RefCallback, useRef, useCallback, MutableRefObject } from 'react';

/**
 * С обычным ref.current есть проблема: обновляется после рендера, поэтому нельзя сделать хук, зависмый от него.
 * Поэтому есть вот эта штука, которая использует refCallback механизм, и обновляет компонент при обновлении ref'а:
 * с ней можно юзать ref.current в зависимостях.
 *
 * @example
 * const MyComponent = memo(() => {
 *   const { ref, refCallback } = useRefCallback();
 *
 *   useEffect(() => {
 *     // work with ref.current here
 *   }, [ref.current]);
 *
 *   return <div ref={refCallback} />;
 * });
 */
export function useRefCallback<T>(oldRef?: MutableRefObject<T>) {
  const newRef = useRef<T | null>(null);
  const ref = oldRef || newRef;

  const [, setInstance] = useState(ref.current);

  const refCallback: RefCallback<T> = useCallback(
    (newInstance) => {
      ref.current = newInstance;
      setInstance(newInstance);
    },
    [ref],
  );

  return { ref, refCallback };
}
