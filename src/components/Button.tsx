import { Colors } from "../contsants/Colors";
import { ThemedText } from "./ThemedText";
import "./Button.css"

type ButtonType = {
    text: string;
    backgroundColor: string;
    textColor?: string;
    onClick: () => void;
    style?: React.CSSProperties;
    className?: string;
};

export function Button({ text, backgroundColor, textColor, onClick, style, className = "" }: ButtonType) {
    return (
        <div className={`button ${className}`} style={{ backgroundColor, ...style }} onClick={onClick}>
            <ThemedText text={text} color={textColor || Colors.Background} type="sub_title" />
        </div>
    )
}