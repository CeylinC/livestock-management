import Svg, { Polyline, Rect, Line } from "react-native-svg";

export default function BarnIcon({ fill = "none", stroke = "#020202" }: { fill?: string; stroke?: string }) {
  return (
    <Svg viewBox="0 0 24 24">
      <Polyline
        points="23.45 10.09 19.64 4.36 12 1.5 4.36 4.36 0.55 10.09"
        fill="none"
        stroke={stroke}
        strokeWidth={1.91}
        strokeMiterlimit={10}
      />
      <Rect
        x="3.41"
        y="8.18"
        width="17.18"
        height="14.32"
        fill={fill}
        stroke={stroke}
        strokeWidth={1.91}
        strokeMiterlimit={10}
      />
      <Rect
        x="7.23"
        y="12.95"
        width="9.55"
        height="9.55"
        fill={fill}
        stroke={stroke}
        strokeWidth={1.91}
        strokeMiterlimit={10}
      />
      <Line
        x1="23.45"
        y1="22.5"
        x2="0.55"
        y2="22.5"
        stroke={stroke}
        strokeWidth={1.91}
        strokeMiterlimit={10}
      />
      <Line
        x1="16.77"
        y1="12.95"
        x2="7.23"
        y2="22.5"
        stroke={stroke}
        strokeWidth={1.91}
        strokeMiterlimit={10}
      />
      <Line
        x1="7.23"
        y1="12.95"
        x2="16.77"
        y2="22.5"
        stroke={stroke}
        strokeWidth={1.91}
        strokeMiterlimit={10}
      />
    </Svg>
  );
}
