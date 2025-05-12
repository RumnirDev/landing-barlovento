import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
    images: string[];
};

function ImagesCarousel({ images }: Props) {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [itemWidth, setItemWidth] = useState(0);
    const [itemsPerScreen, setItemsPerScreen] = useState(0);
    const [maxScrollPosition, setMaxScrollPosition] = useState(0);
    const [scrollThreshold, setScrollThreshold] = useState(0);
    const [accumulatedScroll, setAccumulatedScroll] = useState(0);
    const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(null);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const calculateDimensions = () => {
            if (containerRef.current && itemRef.current && images.length > 0) {
                const containerWidth = containerRef.current.offsetWidth;
                const gap = containerWidth * 0.02;
                const itemWithGap = itemRef.current.offsetWidth + gap;
                const itemsPerView = Math.floor(containerWidth / itemWithGap);
                const effectiveItemsPerView = Math.max(1, itemsPerView);
                
                const totalItemsWidth = images.length * itemWithGap;
                const maxScroll = Math.max(0, Math.ceil((totalItemsWidth - containerWidth) / itemWithGap));
                
                setItemWidth(itemWithGap);
                setItemsPerScreen(effectiveItemsPerView);
                setMaxScrollPosition(maxScroll);
                setScrollThreshold(300);
            }
        };

        calculateDimensions();
        window.addEventListener('resize', calculateDimensions);
        
        return () => {
            window.removeEventListener('resize', calculateDimensions);
        };
    }, [images.length]);
    
    const hasEnoughItemsToScroll = images.length > itemsPerScreen;

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            // No procesar eventos de rueda si hay una imagen expandida
            if (expandedImageIndex !== null) return;
            
            if (!hasEnoughItemsToScroll) return;
            
            if (e.deltaX !== 0 || e.shiftKey) {
                e.preventDefault();
                
                const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
                const newAccumulatedScroll = accumulatedScroll + delta;
                setAccumulatedScroll(newAccumulatedScroll);
                
                if (Math.abs(newAccumulatedScroll) >= scrollThreshold) {
                    const direction = newAccumulatedScroll > 0 ? 1 : -1;
                    setAccumulatedScroll(newAccumulatedScroll % scrollThreshold);
                    
                    if (direction > 0 && !isAtEnd()) {
                        const newPosition = Math.min(maxScrollPosition + 0.5, scrollPosition + 1);
                        setScrollPosition(newPosition);
                    } else if (direction < 0 && scrollPosition > 0) {
                        const newPosition = Math.max(0, scrollPosition - 1);
                        setScrollPosition(newPosition);
                    }
                }
            }
        };

        const carousel = carouselRef.current;
        if (carousel) {
            carousel.addEventListener('wheel', handleWheel, { passive: false });
        }
        
        return () => {
            if (carousel) {
                carousel.removeEventListener('wheel', handleWheel);
            }
        };
    }, [scrollPosition, maxScrollPosition, hasEnoughItemsToScroll, accumulatedScroll, scrollThreshold, expandedImageIndex]);
    
    const scrollLeft = () => {
        setAccumulatedScroll(0);
        const newPosition = Math.max(0, scrollPosition - itemsPerScreen);
        setScrollPosition(newPosition);
    };

    const scrollRight = () => {
        setAccumulatedScroll(0);
        const newPosition = Math.min(maxScrollPosition + 0.5, scrollPosition + itemsPerScreen);
        setScrollPosition(newPosition);
    };

    const calculateTransform = () => {
        if (itemWidth === 0) return 'translateX(0)';
        return `translateX(-${scrollPosition * itemWidth}px)`;
    };
    
    const isAtEnd = () => {
        console.log(scrollPosition, maxScrollPosition, itemWidth);
        return scrollPosition >= maxScrollPosition + 0.5 && maxScrollPosition > 0;
    };

    // Componente modificado de ImageFrame integrado para gestionar el estado de expansión aquí
    const CustomImageFrame = ({ src, index }: { src: string; index: number }) => {
        const handleClick = (e: React.MouseEvent) => {
            e.stopPropagation();
            setExpandedImageIndex(index);
        };

        return (
            <div 
                className="rounded-lg shadow-md cursor-pointer"
                onClick={handleClick}
                style={{ width: "450px", height: "300px" }}
            >
                <div className="w-full h-full overflow-hidden rounded-md flex items-center justify-center">
                    <img 
                        src={src} 
                        alt="Imagen en miniatura" 
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
        );
    };

    // Componente para mostrar imagen expandida
    const ExpandedImageView = () => {
        if (expandedImageIndex === null) return null;

        const handleClose = (e: React.MouseEvent) => {
            e.stopPropagation();
            setExpandedImageIndex(null);
        };

        return (
            <div 
                className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                onClick={handleClose}
            >
                <div className="rounded-lg max-w-[75%] max-h-[80%] overflow-hidden" onClick={e => e.stopPropagation()}>
                    <img 
                        src={images[expandedImageIndex]} 
                        alt="Imagen expandida" 
                        className="w-full h-auto object-contain max-h-screen"
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="w-full h-full pb-8 px-4 bg-transparent overflow-x-hidden overflow-y-visible">
            <div className="w-full mx-auto">
                <div className="relative w-[100vw]" ref={carouselRef}>
                    {/* Botón izquierdo */}
                    <button
                        onClick={scrollLeft}
                        disabled={scrollPosition === 0 || expandedImageIndex !== null}
                        className={`absolute left-0 top-1/2 z-10 bg-white p-2 rounded-full shadow-lg ${
                            scrollPosition === 0 || !hasEnoughItemsToScroll || expandedImageIndex !== null
                                ? 'opacity-0 pointer-events-none' 
                                : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    {/* Contenedor de los productos */}
                    <div className="relative mx-10" ref={containerRef}>
                        <div
                            className="flex transition-transform duration-700 ease-linear"
                            style={{ transform: calculateTransform() }}
                        >
                            {images.map((image: string, index) => (
                                <div 
                                    key={index} 
                                    className="flex-shrink-0"
                                    ref={index === 0 ? itemRef : null}
                                    style={{ 
                                        width: `${(100 - (itemsPerScreen - 1) * 2) / itemsPerScreen}%` 
                                    }}
                                >
                                    <CustomImageFrame src={image} index={index} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Botón derecho */}
                    <button
                        onClick={scrollRight}
                        disabled={isAtEnd() || expandedImageIndex !== null}
                        className={`absolute right-10 top-1/2 z-50 bg-white p-2 rounded-full shadow-lg ${
                            isAtEnd() || !hasEnoughItemsToScroll || expandedImageIndex !== null
                                ? 'opacity-0 pointer-events-none'
                                : 'text-gray-700 hover:bg-gray-100 opacity-100'
                        }`}
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
            
            {/* Componente de imagen expandida */}
            <ExpandedImageView />
        </div>
    );
}

export default ImagesCarousel;