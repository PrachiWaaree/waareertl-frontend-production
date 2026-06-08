"use client";
/* eslint-disable @next/next/no-img-element */

import Image from 'next/image';
import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * OptimizedImage Component
 * 
 * A wrapper around Next.js Image component with automatic optimization,
 * lazy loading, and fallback support.
 * 
 * Features:
 * - Automatic image optimization (WebP, AVIF)
 * - Lazy loading by default
 * - Responsive image sizing
 * - Blur placeholder for better UX
 * - Fallback to regular img tag on error
 * - Support for external and internal images
 */

const OptimizedImage = ({
  src,
  alt = '',
  width,
  height,
  fill = false,
  priority = false,
  loading = 'lazy',
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className = '',
  style = {},
  onError,
  onLoad,
  placeholder = 'blur',
  blurDataURL,
  objectFit = 'cover',
  objectPosition = 'center',
  unoptimized = false,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Handle image load error
  const handleError = (error) => {
    setHasError(true);
    setIsLoading(false);
    if (onError) onError(error);
  };

  // Handle image load success
  const handleLoad = (event) => {
    setIsLoading(false);
    if (onLoad) onLoad(event);
  };

  // Check if src is a valid URL
  const isValidSrc = src && (typeof src === 'string' || typeof src === 'object');

  // If src is invalid or has error, render fallback
  if (!isValidSrc || hasError) {
    return (
      <div
        className={`image-fallback ${className}`}
        style={{
          width: fill ? '100%' : width,
          height: fill ? '100%' : height,
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...style
        }}
        {...props}
      >
        <span style={{ color: '#999', fontSize: '14px' }}>
          {alt || 'Image not available'}
        </span>
      </div>
    );
  }

  // Determine if image is from external source
  const isInternal = src.includes('waaree.com') || src.includes('waareertl.com') || src.includes('devdevelopment.co.in') || src.includes('localhost');
  const isExternalImage = typeof src === 'string' && 
    (src.startsWith('http://') || src.startsWith('https://')) &&
    !isInternal;

  // Generate blur placeholder if not provided
  const getBlurDataURL = () => {
    if (blurDataURL) return blurDataURL;
    
    // Simple gray placeholder
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5Ij5Mb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg==';
  };

  // Image configuration
  const imageConfig = {
    src: typeof src === 'object' ? src : src,
    alt,
    width: fill ? undefined : width,
    height: fill ? undefined : height,
    fill,
    priority,
    loading,
    quality,
    sizes,
    className: `optimized-image ${className} ${isLoading ? 'image-loading' : 'image-loaded'}`,
    style: {
      objectFit,
      objectPosition,
      ...style
    },
    onError: handleError,
    onLoad: handleLoad,
    placeholder: placeholder === 'blur' ? 'blur' : 'empty',
    blurDataURL: placeholder === 'blur' ? getBlurDataURL() : undefined,
    unoptimized: unoptimized || isExternalImage,
    ...props
  };

  const canUseNextImage = (width && height) || fill;

  if (!canUseNextImage) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={typeof src === 'object' ? src.src : src}
        alt={alt || ''}
        loading={loading}
        className={`optimized-image ${className} ${isLoading ? 'image-loading' : 'image-loaded'}`}
        style={{ objectFit, objectPosition, ...style }}
        onError={handleError}
        onLoad={handleLoad}
        width={width || 800}
        height={height || 600}
        {...props}
      />
    );
  }

  return <Image {...imageConfig} alt={alt || ''} />;
};

OptimizedImage.propTypes = {
  /** Image source URL or object */
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      src: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
    })
  ]).isRequired,
  
  /** Alternative text for accessibility */
  alt: PropTypes.string,
  
  /** Image width (required unless fill is true) */
  width: PropTypes.number,
  
  /** Image height (required unless fill is true) */
  height: PropTypes.number,
  
  /** Fill parent container */
  fill: PropTypes.bool,
  
  /** Load image with high priority (above the fold) */
  priority: PropTypes.bool,
  
  /** Loading behavior: 'lazy' or 'eager' */
  loading: PropTypes.oneOf(['lazy', 'eager']),
  
  /** Image quality (1-100) */
  quality: PropTypes.number,
  
  /** Responsive sizes attribute */
  sizes: PropTypes.string,
  
  /** CSS class name */
  className: PropTypes.string,
  
  /** Inline styles */
  style: PropTypes.object,
  
  /** Error handler */
  onError: PropTypes.func,
  
  /** Load handler */
  onLoad: PropTypes.func,
  
  /** Placeholder type: 'blur' or 'empty' */
  placeholder: PropTypes.oneOf(['blur', 'empty']),
  
  /** Custom blur placeholder */
  blurDataURL: PropTypes.string,
  
  /** Object fit property */
  objectFit: PropTypes.oneOf([
    'fill', 'contain', 'cover', 'none', 'scale-down'
  ]),
  
  /** Object position property */
  objectPosition: PropTypes.string,
  
  /** Disable image optimization */
  unoptimized: PropTypes.bool,
};

OptimizedImage.defaultProps = {
  alt: '',
  fill: false,
  priority: false,
  loading: 'lazy',
  quality: 85,
  sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className: '',
  style: {},
  placeholder: 'blur',
  objectFit: 'cover',
  objectPosition: 'center',
  unoptimized: false,
};

export default OptimizedImage;