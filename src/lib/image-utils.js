/* eslint-disable import/no-anonymous-default-export, no-unused-vars */
/**
 * Image Utility Functions
 * 
 * Provides optimized image handling for Next.js applications
 * with support for both internal and external images.
 */

import { PUBLIC_SERVER_URL } from "@/config";

/**
 * Get optimized image source configuration
 * 
 * @param {string|object} url - Image URL or path
 * @param {object} options - Additional options
 * @returns {object} Image configuration for Next.js Image component
 */
export const getOptimizedImageConfig = (url = "", options = {}) => {
  const {
    width,
    height,
    quality = 85,
    format = 'auto',
    priority = false,
    ...restOptions
  } = options;

  // Handle empty URL
  if (!url) {
    return {
      src: '',
      alt: '',
      width: width || 1,
      height: height || 1,
      ...restOptions
    };
  }

  // Handle external URLs
  if (typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'))) {
    return {
      src: url,
      alt: options.alt || '',
      width: width || 800,
      height: height || 600,
      unoptimized: true, // External images can't be optimized by Next.js
      ...restOptions
    };
  }

  // Handle internal URLs
  let imageUrl = url;
  
  if (typeof url === 'string') {
    if (!url.startsWith('http') && !url.startsWith('blob')) {
      imageUrl = // PUBLIC_SERVER_URL + 
        (url.startsWith('\\') || url.startsWith('/') ? url : `/${url}`);
    }
  }

  return {
    src: imageUrl,
    alt: options.alt || '',
    width: width || 800,
    height: height || 600,
    quality,
    ...restOptions
  };
};

/**
 * Generate responsive image sizes
 * 
 * @param {string} breakpoints - Breakpoints for responsive images
 * @returns {string} Sizes attribute for responsive images
 */
export const getResponsiveSizes = (breakpoints = 'default') => {
  const sizeConfigs = {
    default: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    hero: '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw',
    thumbnail: '(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw',
    full: '100vw',
    half: '50vw',
    third: '33vw',
    quarter: '25vw'
  };

  return sizeConfigs[breakpoints] || sizeConfigs.default;
};

/**
 * Generate blur placeholder for images
 * 
 * @param {string} color - Background color (hex or rgb)
 * @param {string} text - Optional text to display
 * @returns {string} Base64 encoded SVG for blur placeholder
 */
export const generateBlurPlaceholder = (color = '#f5f5f5', text = '') => {
  const svg = `
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="${color}"/>
      ${text ? `<text x="50" y="50" font-family="Arial" font-size="10" text-anchor="middle" fill="#999">${text}</text>` : ''}
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

/**
 * Check if image is from external source
 * 
 * @param {string} url - Image URL
 * @returns {boolean} True if image is external
 */
export const isExternalImage = (url) => {
  if (!url || typeof url !== 'string') return false;
  
  const isHttp = url.startsWith('http://') || 
                 url.startsWith('https://') || 
                 url.startsWith('//');
                 
  const isInternal = url.includes('waaree.com') || url.includes('waareertl.com') || url.includes('devdevelopment.co.in') || url.includes('localhost');
  return isHttp && !isInternal;
};

/**
 * Get image dimensions from URL or file
 * 
 * @param {string} url - Image URL
 * @returns {Promise<object>} Promise resolving to {width, height}
 */
export const getImageDimensions = async (url) => {
  if (!url) return { width: 0, height: 0 };

  return new Promise((resolve) => {
    const img = new Image();
    
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    
    img.onerror = () => {
      resolve({
        width: 800,
        height: 600
      });
    };
    
    img.src = url;
  });
};

/**
 * Generate image srcset for responsive images
 * 
 * @param {string} baseUrl - Base image URL
 * @param {Array<number>} widths - Array of widths for srcset
 * @param {string} descriptor - Srcset descriptor (e.g., 'w' or 'x')
 * @returns {string} Srcset attribute value
 */
export const generateSrcset = (baseUrl, widths = [400, 800, 1200, 1600], descriptor = 'w') => {
  if (!baseUrl || !Array.isArray(widths)) return '';
  
  return widths
    .map(width => `${baseUrl}?width=${width} ${width}${descriptor}`)
    .join(', ');
};

/**
 * Preload critical images
 * 
 * @param {Array<string>} imageUrls - Array of image URLs to preload
 */
export const preloadImages = (imageUrls = []) => {
  if (typeof window === 'undefined' || !Array.isArray(imageUrls)) return;
  
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

/**
 * Lazy load images with Intersection Observer
 * 
 * @param {string} selector - CSS selector for images to lazy load
 * @param {object} options - Intersection Observer options
 */
export const lazyLoadImages = (selector = '.lazy-image', options = {}) => {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');
        
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
        }
        
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  });

  document.querySelectorAll(selector).forEach(img => {
    observer.observe(img);
  });
};

/**
 * Get image format based on browser support
 * 
 * @returns {string} Preferred image format (webp, avif, jpeg, png)
 */
export const getPreferredImageFormat = () => {
  if (typeof window === 'undefined') return 'webp';
  
  // Check for AVIF support
  const avifTest = new Image();
  avifTest.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8r///yW6EAArMQGUsRk+';
  
  // Check for WebP support
  const webpTest = new Image();
  webpTest.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  
  // Return preferred format based on support
  if (avifTest.complete && avifTest.naturalWidth > 0) {
    return 'avif';
  } else if (webpTest.complete && webpTest.naturalWidth > 0) {
    return 'webp';
  }
  
  return 'jpeg';
};

/**
 * Generate image optimization configuration
 * 
 * @param {object} params - Image parameters
 * @returns {object} Complete image configuration
 */
export const optimizeImageConfig = (params = {}) => {
  const {
    src,
    alt = '',
    width,
    height,
    quality = 85,
    priority = false,
    loading = 'lazy',
    sizes = 'default',
    placeholder = 'blur',
    ...restParams
  } = params;

  const isExternal = isExternalImage(src);
  
  return {
    src,
    alt,
    width: width || (isExternal ? 800 : undefined),
    height: height || (isExternal ? 600 : undefined),
    quality,
    priority,
    loading,
    sizes: getResponsiveSizes(sizes),
    placeholder,
    blurDataURL: placeholder === 'blur' ? generateBlurPlaceholder() : undefined,
    unoptimized: isExternal,
    ...restParams
  };
};

export default {
  getOptimizedImageConfig,
  getResponsiveSizes,
  generateBlurPlaceholder,
  isExternalImage,
  getImageDimensions,
  generateSrcset,
  preloadImages,
  lazyLoadImages,
  getPreferredImageFormat,
  optimizeImageConfig
};