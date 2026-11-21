import { type CSSProperties, type ReactNode } from "react";
import "./ThemedText.css"

const stylesText = {
    big_title: {
        fontWeight: 400,
        fontSize: "clamp(2.5rem, 6vw, 6.5rem)",
        letterSpacing: "0.01em",
        fontFamily: "Gloock, serif",
        lineHeight: 1.06,
    },
    title: {
        fontWeight: 400,
        fontSize: "clamp(1.35rem, 2.2vw, 2.05rem)",
        letterSpacing: "0.02em",
        fontFamily: "Gloock, serif",
    },
    sub_title: {
        fontWeight: 500,
        letterSpacing: "0.02em",
        fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
        fontFamily: "Roboto, sans-serif",
    },
    body: {
        fontWeight: 400,
        fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)",
        lineHeight: 1.7,
        fontFamily: "Roboto, sans-serif",
    },
    caption: {
        fontWeight: 400,
        fontSize: "clamp(0.8rem, 0.9vw, 0.9rem)",
        letterSpacing: "0.03em",
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

/**
 *Segments encadrés par [[...]] sont rendus avec un surlignage jaune "feutre",
 * ex : "C'est [[Nathan]]".
 */
const HIGHLIGHT_PATTERN = /\[\[(.+?)\]\]/g;

function renderWithHighlights(text: string): ReactNode[] {
    const nodes: ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    HIGHLIGHT_PATTERN.lastIndex = 0;

    while ((match = HIGHLIGHT_PATTERN.exec(text)) !== null) {
        if (match.index > lastIndex) {
            nodes.push(text.slice(lastIndex, match.index));
        }
        nodes.push(
            <span key={match.index} className="ThemedHighlight">
                {match[1]}
            </span>,
        );
        lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
        nodes.push(text.slice(lastIndex));
    }
    return nodes.length > 0 ? nodes : [text];
}

export function ThemedText({ text, color, type, style, className = "", onClick = (): void => { } }: ThemedTextProps) {
    return (
        <p
            className={`${className}`}
            style={{ ...stylesText.all_text, ...stylesText[type], color, ...style }}
            onClick={onClick}
        >
            {renderWithHighlights(text)}
        </p>
    )
}
