import { useEffect, useState } from 'react';
import { BootstrapBreakpoints } from '../consts/enums';

/**
 * Gets the viewport size and the status of the current viewport based on the bootstrap 4 breakpoints.
 * @returns
 */
export const useViewport = () => {
  /**
   * Get the status of the current viewport based on the bootstrap 4 breakpoints.
   * @param width The width to check against
   * @returns
   */
  const getViewportStatus = (width: number) => {
    return {
      isSmallest: width < BootstrapBreakpoints.ExtraSmall,
      isExtraSmall: width < BootstrapBreakpoints.Small,
      isSmall: width >= BootstrapBreakpoints.Small && width < BootstrapBreakpoints.Medium,
      isMedium: width >= BootstrapBreakpoints.Medium && width < BootstrapBreakpoints.Large,
      isLarge: width >= BootstrapBreakpoints.Large && width < BootstrapBreakpoints.ExtraLarge,
      isExtraLarge: width >= BootstrapBreakpoints.ExtraLarge,
      isSmallOrSmaller: width <= BootstrapBreakpoints.Small,
      isMediumOrSmaller: width <= BootstrapBreakpoints.Medium,
      isLargeOrSmaller: width <= BootstrapBreakpoints.Large,
      isExtraLargeOrSmaller: width <= BootstrapBreakpoints.ExtraLarge,
      isSmallOrLarger: width >= BootstrapBreakpoints.Small,
      isMediumOrLarger: width >= BootstrapBreakpoints.Medium,
      isLargeOrLarger: width >= BootstrapBreakpoints.Large,
    };
  };

  const [viewport, setViewport] = useState({
    viewportWidth: window.innerWidth,
    ...getViewportStatus(window.innerWidth),
  });

  /**
   * Add event listeners to determine window size and current viewport status.
   */
  useEffect(() => {
    const handleWindowResize = () =>
      setViewport({
        viewportWidth: window.innerWidth,
        ...getViewportStatus(window.innerWidth),
      });

    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return {
    viewportWidth: viewport.viewportWidth,
    isSmallest: viewport.isSmallest,
    isExtraSmall: viewport.isExtraSmall,
    isSmall: viewport.isSmall,
    isMedium: viewport.isMedium,
    isLarge: viewport.isLarge,
    isExtraLarge: viewport.isExtraLarge,
    isSmallOrSmaller: viewport.isSmallOrSmaller,
    isMediumOrSmaller: viewport.isMediumOrSmaller,
    isLargeOrSmaller: viewport.isLargeOrSmaller,
    isExtraLargeOrSmaller: viewport.isExtraLargeOrSmaller,
    isSmallOrLarger: viewport.isSmallOrLarger,
    isMediumOrLarger: viewport.isMediumOrLarger,
    isLargeOrLarger: viewport.isLargeOrLarger,
  };
};