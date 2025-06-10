import "./progressCircle.css";

const Circle = ({ color, percentage = 0, size, strokeWidth }) => {
  const radius = size / 2 - strokeWidth - 15;
  const circ = 2 * Math.PI * radius;
  const strokePct = ((100 - Math.round(percentage)) * circ) / 100;

  return (
    <circle
      r={radius}
      cx="50%"
      cy="50%"
      fill="transparent"
      stroke={strokePct !== circ ? color : ""}
      strokeWidth={strokeWidth}
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
      strokeLinecap="round"
    />
  );
};

export default function ProgressCircle({
  percentage = 0,
  isPlaying = false,
  size = 100,
  color = "#1db954",
  image,
}) {
  const outerOffset = size * 0.15;
  const outerSize = size - outerOffset * 2;

  const innerOffset = size * 0.28;
  const innerSize = size - innerOffset * 2;

  const center = size / 2;

  return (
    <div className="progress-circle flex">
      <svg width={size} height={size}>
        <defs>
          <clipPath id="myCircle">
            <circle cx={center} cy={center} r={outerSize / 2} fill="#FFFFFF" />
          </clipPath>
          <clipPath id="myInnerCircle">
            <circle cx={center} cy={center} r={innerSize / 2} fill="#FFFFFF" />
          </clipPath>
        </defs>

        <g>
          <Circle strokeWidth={8} color="#3B4F73" size={size} />
          <Circle
            strokeWidth={6}
            color={color}
            percentage={percentage}
            size={size}
          />
        </g>

        {/* Vinyl Record Image */}
        <image
          className={isPlaying ? "active" : ""}
          x={outerOffset}
          y={outerOffset}
          width={outerSize}
          height={outerSize}
          href="https://pngimg.com/uploads/vinyl/vinyl_PNG107.png"
          clipPath="url(#myCircle)"
        />

        {/* Album Cover Image */}
        <image
          className={isPlaying ? "active" : ""}
          x={innerOffset}
          y={innerOffset}
          width={innerSize}
          height={innerSize}
          href={image}
          clipPath="url(#myInnerCircle)"
        />
      </svg>
    </div>
  );
}
