import React, { useState, useEffect } from 'react';
import { useRefCallback } from './useRefCallback';

/**
 * const { ref, isHovered } = useHover({ loseHoverOnClick: false });
 * Возвращает нам реф, который нужно повесить на
 * компонент, о ховере которого мы хотим знать
 */
export function useHover(params?: { loseHoverOnClick?: boolean; ref?: React.RefObject<any> }) {
  const [value, setValue] = useState(false);
  const { ref, refCallback } = useRefCallback(params?.ref);

  useEffect(() => {
    const node = ref.current; // Если это вынести за хук, то ломается тултип линейки ¯\_(ツ)_/¯
    if (!node) {
      return;
    }

    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);

    node.addEventListener('mouseenter', handleMouseOver);
    node.addEventListener('mouseleave', handleMouseOut);
    if (params?.loseHoverOnClick) {
      node.addEventListener('click', handleMouseOut);
    }

    return () => {
      node.removeEventListener('mouseenter', handleMouseOver);
      node.removeEventListener('mouseleave', handleMouseOut);
      if (params?.loseHoverOnClick) {
        node.removeEventListener('click', handleMouseOut);
      }
    };
  }, [params?.loseHoverOnClick, ref.current]);

  return { ref, refCallback, isHovered: value };
}
