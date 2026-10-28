import { type CSSProperties } from "react";
import "./ThemedText.css"

const stylesText = {
    big_title: {
        fontWeight: "normal",
        fontSize: "clamp(2.5rem, 6vw, 7.5rem)",
        letterSpacing: 0.8,
        fontFamily: "Gloock, sans-serif",
    },
    title: {
        fontWeight: "normal",
        fontSize: "clamp(1.35rem, 2.2vw, 2.2rem)",
        letterSpacing: 0.5,
        fontFamily: "Gloock, sans-serif",
    },
    sub_title: {
        fontWeight: "semi-bold",
        letterSpacing: 0.6,
        fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
        fontFamily: "Roboto, sans-serif",
    },
    body: {
        fontWeight: "normal",
        fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)",
        fontFamily: "Roboto, sans-serif",
    },
    caption: {
        fontWeight: "normal",
        fontSize: "clamp(0.8rem, 0.9vw, 0.9rem)",
        fontFamily: "Roboto, sans-serif",
    },
    all_text: {
        margin: 0,
        textAlign: "left",
    }
} satisfies Record<string, CSSProperties>;

type ThemedTextProps = {
    text: string;
    color: string;
    type: keyof Omit<typeof stylesText, "all_text">;
    style?: React.CSSProperties;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLParagraphElement>) => void;
};



export function ThemedText({ text, color, type, style, className = "", onClick = (): void => { } }: ThemedTextProps) {
    return (
        <p className={`${className}`} style={{ ...stylesText.all_text, ...stylesText[type], color, ...style }} onClick={onClick}>
            {text}
        </p>
    )
}