
import { useState } from "react";

type ImageFrameProps = {
  src: string;
};

function ImageFrame({ src }: ImageFrameProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (isExpanded) {
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 h-max w-max"
        onClick={toggleExpanded}
      >
        <div className="bg-white p-4 rounded-lg max-w-4xl max-h-screen">
          <img 
            src={src} 
            alt="Imagen de barlovento expandida" 
            className="w-full h-auto object-contain max-h-screen"
          />
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white p-4 rounded-lg shadow-md cursor-pointer w-1/3 aspect-1/2"
      onClick={toggleExpanded}
    >
      <div className="w-full h-full overflow-hidden rounded-md flex items-center justify-center">
        <img 
          src={src} 
          alt="Imagen de barlovento" 
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}

export default ImageFrame;
export type { ImageFrameProps };