"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
  onCardSelect: (card: Card) => void;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: string;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => { },
  currentIndex: 0,
});

export const Carousel = ({
  items,
  initialScroll = 0,
  onCardSelect,
}: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384;
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  const handleCardClick = (card: Card | undefined) => {
    if (!card || !card.src || !card.category) {
      return;
    }
    onCardSelect(card);
  };

  const row1Items = items.slice(0, 8);
  const row2Items = items.slice(8, 16);

  const fillMissingCards = (rowItems: JSX.Element[]) => {
    const emptyCard: JSX.Element = (
      <motion.div
        key="empty-card"
        className="h-56 w-56 md:h-[13.5rem] md:w-[13.5rem]"
      />
    );
    const numEmptyCards = 8 - rowItems.length;
    const filledCards = [...rowItems];

    for (let i = 0; i < numEmptyCards; i++) {
      filledCards.push(emptyCard);
    }

    return filledCards;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full h-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none] h-full"
          ref={carouselRef}
          onScroll={checkScrollability}
          style={{
            overflowX: "auto",
            whiteSpace: "nowrap",
            maxWidth: "100%",
          }}
        >
          <div
            className={cn(
              "flex flex-col",
              "max-w-7xl mx-auto h-full"
            )}
          >
            <div className="flex flex-row justify-start">
              {fillMissingCards(row1Items).map((item, index) => {
                const card = item.props.card as Card;
                return (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        delay: 0.2 * index,
                        ease: "easeOut",
                        once: true,
                      },
                    }}
                    key={"card" + index}
                    onClick={() => handleCardClick(card)}
                    className={cn(
                      "last:pr-[5%] md:last:pr-[1%]",
                      index % 2 === 0 ? "bg-black" : "bg-white"
                    )}
                  >
                    {item}
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-row justify-start">
              {fillMissingCards(row2Items).map((item, index) => {
                const card = item.props.card as Card;
                return (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        delay: 0.2 * index,
                        ease: "easeOut",
                        once: true,
                      },
                    }}
                    key={"card" + (index + 8)}
                    onClick={() => handleCardClick(card)}
                    className={cn(
                      "last:pr-[5%] md:last:pr-[1%]",
                      (index + 8) % 2 === 0 ? "bg-white" : "bg-black"
                    )}
                  >
                    {item}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="ml-5 absolute left-0 top-52">
          <button
            className="relative z-40 h-10 w-10 bg-black rounded-full flex items-center justify-center disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-white" />
          </button>
        </div>
        <div className="mr-5 absolute right-0 top-52">
          <button
            className="relative z-40 h-10 w-10 bg-black rounded-full flex items-center justify-center disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
  onHoverEnter,
  onHoverLeave,
  isBlurred,
}: {
  card: Card;
  index: number;
  layout?: boolean;
  onHoverEnter: (index: number) => void;
  onHoverLeave: () => void;
  isBlurred: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  const row = Math.floor(index / 4);
  const column = index % 4;

  const isBgWhite = (row + column) % 2 === 0;
  const bgColor = isBgWhite ? "bgblack" : "bg-white";
  const textColor = isBgWhite ? "text-white" : "text-black";

  return (
    <motion.button
      layoutId={layout ? `card-${card.title}` : undefined}
      onClick={handleOpen}
      onMouseEnter={() => onHoverEnter(index)}
      onMouseLeave={onHoverLeave}
      className={`group h-56 w-56 md:h-[13.5rem] md:w-[13.5rem] overflow-hidden flex items-center justify-center relative z-10
    ${isBlurred ? "filter blur-sm transition-all duration-1000 ease-out" : ""}
    ${bgColor}`}
    >
      <motion.div>
        <motion.p
          layoutId={layout ? `title-${card.title}` : undefined}
          className={`${textColor} font-regular text-center max-w-xs px-2 py-1`}
        >
          Project: {index}
        </motion.p>
        <motion.p
          layoutId={layout ? `title-${card.title}` : undefined}
          className={`${textColor} font-regular text-xl text-center max-w-xs px-2 py-1 word text-wrap`}
        >
          {card.title}
        </motion.p>
        <motion.p
          layoutId={layout ? `title-${card.title}` : undefined}
          className={
            "text-gold font-extralight text-xs text-center max-w-xs px-2 py-1 word text-wrap"
          }
        >
          (click here)
        </motion.p>
      </motion.div>
    </motion.button>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
