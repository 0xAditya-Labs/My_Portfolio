export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

export const preloadImages = async (imagePaths: string[]): Promise<void> => {
  try {
    await Promise.all(imagePaths.map(preloadImage));
  } catch (error) {
    console.warn('Some images failed to preload:', error);
  }
};

// Extract thumbnail images from projects data
export const getProjectThumbnails = (): string[] => {
  return [
    "/projects/5.webp",      // Brain Tumor Detector
    "/projects/66.webp",     // AI-RoadIntelligence  
    "/projects/2.webp",      // RoomsOnRent
    "/projects/6.webp",      // Dot Ignorer
    "/projects/Dot-ignorer.webp", // Another Dot Ignorer variant
    "/projects/4.webp",      // Additional project images
    "/projects/3.webp",      
    "/projects/66a.webp",
    "/projects/a4.webp",
    "/projects/a5.webp"
  ];
};