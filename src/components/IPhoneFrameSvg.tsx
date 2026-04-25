import type { CSSProperties } from 'react';

export interface IPhoneFrameSvgProps {
  className?: string;
  style?: CSSProperties;
  /** Override the body/bezel color of the frame. Default is the natural silver/dark chrome look. */
  frameColor?: string;
}

/**
 * Realistic iPhone 16 Pro-style device frame SVG.
 *
 * The SVG is 451 × 914 with a transparent screen cutout at:
 *   x=22.34  y=18.88  width=401.66  height=869.24  borderRadius=56.645
 *
 * Pass `frameColor` to tint the bezel (e.g. "#1a1a1a" for space black).
 */
export default function IPhoneFrameSvg({
  className,
  style,
  frameColor,
}: IPhoneFrameSvgProps) {
  /* If a custom frameColor is supplied, we override the fill/stroke of the main body rects. */
  const bodyFill = frameColor ?? 'black';
  const bodyStroke = frameColor ?? '#303640';

  return (
    <svg
      className={className}
      style={style}
      width="451"
      height="914"
      viewBox="0 0 451 914"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── Right-side button ── */}
      <g clipPath="url(#mp-clip0)">
        <g filter="url(#mp-f0)">
          <rect width="3.462" height="108.018" rx="0.346" transform="matrix(-1 0 0 1 449.73 276.624)" fill="#DEDEDE" />
          <rect x="0.173" y="-0.173" width="3.808" height="108.364" rx="0.519" transform="matrix(-1 0 0 1 450.077 276.624)" stroke="black" strokeWidth="0.346" />
        </g>
        <g filter="url(#mp-f1)">
          <rect x="0.173" y="-0.173" width="3.116" height="107.672" rx="0.242" transform="matrix(-1 0 0 1 449.725 276.969)" stroke="#FAFAF8" strokeWidth="0.346" />
        </g>
        <g filter="url(#mp-f2)">
          <rect width="3.116" height="7.617" rx="0.173" transform="matrix(-1 0 0 1 449.379 276.969)" fill="url(#mp-lg0)" />
        </g>
        <g filter="url(#mp-f3)">
          <rect x="449.379" y="384.295" width="3.116" height="7.617" rx="0.173" transform="rotate(180 449.379 384.295)" fill="url(#mp-lg1)" />
        </g>
      </g>

      {/* ── Left-side buttons ── */}
      <g clipPath="url(#mp-clip1)">
        <g filter="url(#mp-f4)">
          <rect x="0.34" y="186.608" width="3.462" height="32.89" rx="0.346" fill="#DEDEDE" />
          <rect x="0.167" y="186.435" width="3.808" height="33.236" rx="0.519" stroke="black" strokeWidth="0.346" />
        </g>
        <g filter="url(#mp-f5)">
          <rect x="0.518" y="186.781" width="3.116" height="32.544" rx="0.242" stroke="#FAFAF8" strokeWidth="0.346" />
        </g>
        <g filter="url(#mp-f6)">
          <rect x="0.691" y="186.954" width="3.116" height="3.808" rx="0.173" fill="url(#mp-lg2)" />
        </g>
        <g filter="url(#mp-f7)">
          <rect width="3.116" height="3.808" rx="0.173" transform="matrix(1 0 0 -1 0.691 219.152)" fill="url(#mp-lg3)" />
        </g>
      </g>

      <g clipPath="url(#mp-clip2)">
        <g filter="url(#mp-f8)">
          <rect x="0.34" y="252.042" width="3.462" height="69.242" rx="0.346" fill="#DEDEDE" />
          <rect x="0.167" y="251.869" width="3.808" height="69.589" rx="0.519" stroke="black" strokeWidth="0.346" />
        </g>
        <g filter="url(#mp-f9)">
          <rect x="0.518" y="252.216" width="3.116" height="68.896" rx="0.242" stroke="#FAFAF8" strokeWidth="0.346" />
        </g>
        <g filter="url(#mp-f10)">
          <rect x="0.691" y="252.389" width="3.116" height="7.617" rx="0.173" fill="url(#mp-lg4)" />
        </g>
        <g filter="url(#mp-f11)">
          <rect width="3.116" height="7.617" rx="0.173" transform="matrix(1 0 0 -1 0.691 320.939)" fill="url(#mp-lg5)" />
        </g>
      </g>

      <g clipPath="url(#mp-clip3)">
        <g filter="url(#mp-f12)">
          <rect x="0.34" y="339.98" width="3.462" height="69.242" rx="0.346" fill="#DEDEDE" />
          <rect x="0.167" y="339.807" width="3.808" height="69.589" rx="0.519" stroke="black" strokeWidth="0.346" />
        </g>
        <g filter="url(#mp-f13)">
          <rect x="0.518" y="340.153" width="3.116" height="68.896" rx="0.242" stroke="#FAFAF8" strokeWidth="0.346" />
        </g>
        <g filter="url(#mp-f14)">
          <rect x="0.691" y="340.326" width="3.116" height="7.617" rx="0.173" fill="url(#mp-lg6)" />
        </g>
        <g filter="url(#mp-f15)">
          <rect width="3.116" height="7.617" rx="0.173" transform="matrix(1 0 0 -1 0.691 408.876)" fill="url(#mp-lg7)" />
        </g>
      </g>

      {/* ── Main phone body ── */}
      <g clipPath="url(#mp-clip4)" mask="url(#mp-screenCutout)">
        <rect x="3.457" width="439.425" height="907" rx="72.093" fill={bodyFill} />
        <rect x="7.403" y="3.948" width="431.529" height="899.104" rx="68.145" stroke="#515868" strokeWidth="4.463" />
        <rect x="4.315" y="0.858" width="437.708" height="905.284" rx="71.235" stroke={bodyStroke} strokeWidth="1.717" />
        <g opacity="0.9" filter="url(#mp-f16)">
          <rect x="5.172" y="2.06" width="435.992" height="903.224" rx="70.72" stroke="#717989" strokeWidth="1.717" />
        </g>
        <g opacity="0.8" filter="url(#mp-f17)">
          <rect x="11.012" y="7.553" width="424.319" height="891.895" rx="64.541" stroke="#646464" strokeWidth="0.687" />
        </g>

        {/* Dynamic island */}
        <rect x="159.66" y="32.614" width="127.021" height="37.077" rx="18.538" fill={bodyFill} />
        <g opacity="0.75">
          <rect x="252.695" y="42.569" width="17.165" height="17.165" rx="8.583" fill="#121212" />
          <rect x="252.695" y="42.569" width="17.165" height="17.165" rx="8.583" stroke="#0E0E0E" strokeWidth="0.687" />
          <g filter="url(#mp-f18)">
            <path d="M259.367 47.327C256.467 48.177 255.5 53.065 259.367 54.977C258.4 52.427 258.4 50.089 259.367 47.327Z" fill="#50A99A" />
          </g>
          <g filter="url(#mp-f19)">
            <path d="M258.732 49.092C257.282 49.55 256.799 52.182 258.732 53.212C258.249 51.838 258.249 50.58 258.732 49.092Z" fill="#50A99A" />
          </g>
          <g opacity="0.4" filter="url(#mp-f20)">
            <path d="M259.323 48.428C258.08 48.615 257.172 52.054 258.673 52.967C258.142 51.741 258.407 49.288 259.323 48.428Z" fill="#D0FFF7" />
          </g>
          <g filter="url(#mp-f21)">
            <path d="M263.192 47.327C266.092 48.177 267.058 53.065 263.192 54.977C264.159 52.427 264.159 50.089 263.192 47.327Z" fill="#3E518C" />
          </g>
          <g filter="url(#mp-f22)">
            <path d="M263.826 49.092C265.276 49.55 265.76 52.182 263.826 53.212C264.31 51.838 264.31 50.58 263.826 49.092Z" fill="#26408D" />
          </g>
          <g opacity="0.5" filter="url(#mp-f23)">
            <path d="M263.232 48.428C264.475 48.615 265.382 52.054 263.882 52.967C264.413 51.741 264.147 49.288 263.232 48.428Z" fill="#0D308C" />
          </g>
        </g>

        {/* Front camera */}
        <g opacity="0.4">
          <rect width="24.718" height="24.718" rx="12.359" transform="matrix(-1 0 0 1 190.559 38.793)" fill="#141414" />
          <rect width="16.067" height="16.067" rx="8.033" transform="matrix(-1 0 0 1 186.23 43.118)" fill="black" />
          <g filter="url(#mp-f24)">
            <path d="M180.615 46.332C184.269 47.403 185.487 53.562 180.615 55.972C181.833 52.759 181.833 49.813 180.615 46.332Z" fill="#50A99A" />
          </g>
          <g filter="url(#mp-f25)">
            <path d="M181.413 48.556C183.24 49.133 183.849 52.449 181.413 53.747C182.022 52.017 182.022 50.431 181.413 48.556Z" fill="#50A99A" />
          </g>
          <g opacity="0.5" filter="url(#mp-f26)">
            <path d="M180.655 47.72C182.221 47.956 183.365 52.288 181.474 53.439C182.143 51.894 181.808 48.804 180.655 47.72Z" fill="#D0FFF7" />
          </g>
          <g filter="url(#mp-f27)">
            <path d="M175.788 46.332C172.134 47.403 170.916 53.562 175.788 55.972C174.57 52.759 174.57 49.813 175.788 46.332Z" fill="#3E518C" />
          </g>
          <g filter="url(#mp-f28)">
            <path d="M174.986 48.556C173.159 49.133 172.55 52.449 174.986 53.747C174.377 52.017 174.377 50.431 174.986 48.556Z" fill="#26408D" />
          </g>
          <g opacity="0.5" filter="url(#mp-f29)">
            <path d="M175.736 47.72C174.17 47.956 173.026 52.288 174.917 53.439C174.248 51.894 174.582 48.804 175.736 47.72Z" fill="#0D308C" />
          </g>
        </g>

        {/* Corner reflections */}
        <g opacity="0.4">
          <g opacity="0.75" style={{ mixBlendMode: 'screen' }}>
            <rect x="3.457" y="809.503" width="6.179" height="5.493" fill="#7C7C7C" />
          </g>
          <g opacity="0.75" style={{ mixBlendMode: 'screen' }}>
            <rect x="93.746" y="900.135" width="5.493" height="6.179" fill="#7C7C7C" />
          </g>
          <g opacity="0.75" style={{ mixBlendMode: 'screen' }}>
            <rect x="436.699" y="91.661" width="6.179" height="5.493" fill="#7C7C7C" />
          </g>
          <g opacity="0.75" style={{ mixBlendMode: 'screen' }}>
            <rect x="3.457" y="91.661" width="6.179" height="5.493" fill="#7C7C7C" />
          </g>
          <g opacity="0.75" style={{ mixBlendMode: 'screen' }}>
            <rect x="353.281" y="0" width="5.493" height="6.179" fill="#7C7C7C" />
          </g>
          <g opacity="0.75" style={{ mixBlendMode: 'screen' }}>
            <rect x="436.699" y="809.159" width="6.179" height="5.493" fill="#7C7C7C" />
          </g>
        </g>
      </g>

      {/* ── Definitions (filters, gradients, clip-paths) ── */}
      <defs>
        <mask id="mp-screenCutout">
          <rect width="100%" height="100%" fill="white" />
          <rect x="22.34" y="18.88" width="401.66" height="869.24" rx="56.645" fill="black" />
        </mask>

        {/* Filters — shortened IDs to mp-fN for namespace safety */}
        <filter id="mp-f0" x="445.576" y="275.931" width="4.849" height="109.403" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="0.173" result="e" />
        </filter>
        <filter id="mp-f1" x="445.916" y="276.277" width="4.157" height="108.71" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="0.173" result="e" />
        </filter>
        <filter id="mp-f2" x="445.916" y="276.623" width="3.81" height="8.309" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="0.173" result="e" />
        </filter>
        <filter id="mp-f3" x="445.916" y="376.332" width="3.81" height="8.309" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="0.173" result="e" />
        </filter>
        <filter id="mp-f4" x="-0.354" y="185.916" width="4.849" height="34.275" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="0.173" result="e" />
        </filter>
        <filter id="mp-f5" x="-0.002" y="186.262" width="4.157" height="33.583" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="0.173" result="e" />
        </filter>
        <filter id="mp-f6" x="0.345" y="186.608" width="3.81" height="4.501" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="0.173" result="e" />
        </filter>
        <filter id="mp-f7" x="0.345" y="214.998" width="3.81" height="4.501" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="0.173" result="e" />
        </filter>
        <filter id="mp-f8" x="-0.354" y="251.35" width="4.849" height="70.627" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="0.173" result="e" />
        </filter>
        <filter id="mp-f9" x="-0.002" y="251.696" width="4.157" height="69.935" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="0.173" result="e" />
        </filter>
        <filter id="mp-f10" x="0.345" y="252.042" width="3.81" height="8.309" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="0.173" result="e" />
        </filter>
        <filter id="mp-f11" x="0.345" y="312.976" width="3.81" height="8.309" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="0.173" result="e" />
        </filter>
        <filter id="mp-f12" x="-0.354" y="339.288" width="4.849" height="70.627" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="0.173" result="e" />
        </filter>
        <filter id="mp-f13" x="-0.002" y="339.634" width="4.157" height="69.935" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="0.173" result="e" />
        </filter>
        <filter id="mp-f14" x="0.345" y="339.98" width="3.81" height="8.309" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="0.173" result="e" />
        </filter>
        <filter id="mp-f15" x="0.345" y="400.913" width="3.81" height="8.309" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="0.173" result="e" />
        </filter>
        <filter id="mp-f16" x="3.283" y="0.172" width="439.771" height="907" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="0.515" result="e" />
        </filter>
        <filter id="mp-f17" x="9.981" y="6.523" width="426.381" height="893.955" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="0.343" result="e" />
        </filter>
        <filter id="mp-f18" x="254.904" y="45.414" width="6.376" height="11.476" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="0.956" result="e" />
        </filter>
        <filter id="mp-f19" x="255.544" y="47.179" width="5.099" height="7.945" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="0.956" result="e" />
        </filter>
        <filter id="mp-f20" x="256.616" y="47.153" width="3.984" height="7.089" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="0.638" result="e" />
        </filter>
        <filter id="mp-f21" x="261.279" y="45.414" width="6.376" height="11.476" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="0.956" result="e" />
        </filter>
        <filter id="mp-f22" x="261.915" y="47.179" width="5.099" height="7.945" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="0.956" result="e" />
        </filter>
        <filter id="mp-f23" x="261.955" y="47.153" width="3.984" height="7.089" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="0.638" result="e" />
        </filter>
        <filter id="mp-f24" x="178.203" y="43.922" width="8.035" height="14.46" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="1.205" result="e" />
        </filter>
        <filter id="mp-f25" x="179.004" y="46.146" width="6.425" height="10.011" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="1.205" result="e" />
        </filter>
        <filter id="mp-f26" x="179.853" y="46.917" width="3.407" height="7.325" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="0.402" result="e" />
        </filter>
        <filter id="mp-f27" x="170.164" y="43.922" width="8.035" height="14.46" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="1.205" result="e" />
        </filter>
        <filter id="mp-f28" x="170.969" y="46.146" width="6.425" height="10.011" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="1.205" result="e" />
        </filter>
        <filter id="mp-f29" x="173.13" y="46.917" width="3.407" height="7.325" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="s" /><feGaussianBlur stdDeviation="0.402" result="e" />
        </filter>

        {/* Linear gradients for button highlights */}
        <linearGradient id="mp-lg0" x1="1.558" y1="0" x2="1.558" y2="7.617" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2D2E2A" /><stop offset="0.76" stopColor="#DEDEDE" />
        </linearGradient>
        <linearGradient id="mp-lg1" x1="450.937" y1="384.295" x2="450.937" y2="391.912" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2D2E2A" /><stop offset="0.76" stopColor="#DEDEDE" />
        </linearGradient>
        <linearGradient id="mp-lg2" x1="2.249" y1="186.954" x2="2.249" y2="190.763" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2D2E2A" /><stop offset="0.76" stopColor="#DEDEDE" />
        </linearGradient>
        <linearGradient id="mp-lg3" x1="1.558" y1="0" x2="1.558" y2="3.808" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2D2E2A" /><stop offset="0.76" stopColor="#DEDEDE" />
        </linearGradient>
        <linearGradient id="mp-lg4" x1="2.249" y1="252.389" x2="2.249" y2="260.005" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2D2E2A" /><stop offset="0.76" stopColor="#DEDEDE" />
        </linearGradient>
        <linearGradient id="mp-lg5" x1="1.558" y1="0" x2="1.558" y2="7.617" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2D2E2A" /><stop offset="0.76" stopColor="#DEDEDE" />
        </linearGradient>
        <linearGradient id="mp-lg6" x1="2.249" y1="340.326" x2="2.249" y2="347.943" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2D2E2A" /><stop offset="0.76" stopColor="#DEDEDE" />
        </linearGradient>
        <linearGradient id="mp-lg7" x1="1.558" y1="0" x2="1.558" y2="7.617" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2D2E2A" /><stop offset="0.76" stopColor="#DEDEDE" />
        </linearGradient>

        {/* Clip-paths for buttons and body */}
        <clipPath id="mp-clip0">
          <path d="M450.07 276.97c0-.383-.31-.693-.692-.693h-2.77v108.711h2.77c.382 0 .692-.31.692-.693V276.97Z" fill="white" />
        </clipPath>
        <clipPath id="mp-clip1">
          <path d="M0 186.954c0-.382.31-.692.692-.692h2.77v33.582H.692A.692.692 0 010 219.152v-32.198Z" fill="white" />
        </clipPath>
        <clipPath id="mp-clip2">
          <path d="M0 252.389c0-.383.31-.693.692-.693h2.77v69.935H.692A.692.692 0 010 320.939v-68.55Z" fill="white" />
        </clipPath>
        <clipPath id="mp-clip3">
          <path d="M0 340.326c0-.382.31-.692.692-.692h2.77v69.935H.692A.692.692 0 010 408.876v-68.55Z" fill="white" />
        </clipPath>
        <clipPath id="mp-clip4">
          <rect x="3.457" width="439.425" height="907" rx="72.093" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
