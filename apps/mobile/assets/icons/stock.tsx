import Svg, { Path } from "react-native-svg";

export default function StockIcon({ fill = "#444", size = 24 }: { fill?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Path
        fill={fill}
        d="M12 6v-6h-8v6h-4v7h16v-7h-4zM7 12h-6v-5h2v1h2v-1h2v5zM5 6v-5h2v1h2v-1h2v5h-6zM15 12h-6v-5h2v1h2v-1h2v5z"
      />
      <Path
        fill={fill}
        d="M0 16h3v-1h10v1h3v-2h-16v2z"
      />
    </Svg>
  );
}
