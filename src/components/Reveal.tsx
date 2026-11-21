import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import "./Reveal.css";

type RevealDirection = "up" | "down" | "left" | "right";

type RevealProps = {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    /** Délai avant le déclenchement de l'animation, en ms (utile pour créer un effet cascade) */
    delay?: number;
    /** Sens d'arrivée de l'élément */
    direction?: RevealDirection;
    /** Distance parcourue pendant l'animation, en px */
    distance?: number;
};

const SHIFT_BY_DIRECTION: Record<RevealDirection, (distance: number) => string> = {
    up: (d) => `translateY(${d}px)`,
    down: (d) => `translateY(-${d}px)`,
    left: (d) => `translateX(-${d}px)`,
    right: (d) => `translateX(${d}px)`,
};

export function Reveal({ children, className = "", style, delay = 0, direction = "up", distance = 26 }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    // Sans IntersectionObserver (très vieux navigateurs), on affiche directement le contenu.
    const [visible, setVisible] = useState(() => typeof IntersectionObserver === "undefined");

    useEffect(() => {
        if (typeof IntersectionObserver === "undefined") return;
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    const customStyle = {
        "--reveal-shift": SHIFT_BY_DIRECTION[direction](distance),
        transitionDelay: `${delay}ms`,
        ...style,
    } as CSSProperties;

    return (
        <div ref={ref} className={`Reveal ${visible ? "visible" : ""} ${className}`} style={customStyle}>
            {children}
        </div>
    );
}
