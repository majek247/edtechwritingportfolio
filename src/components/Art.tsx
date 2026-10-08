export type ArtKind = "hero" | "bank" | "nodes" | "embed" | "stack" | "fraud" | "growth";

const Defs = () => (
  <defs>
    <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#145139" />
      <stop offset="1" stopColor="#06140F" />
    </linearGradient>
    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#7BE0A4" />
      <stop offset="1" stopColor="#1f7a52" />
    </linearGradient>
    <radialGradient id="glow" cx=".72" cy=".28" r=".7">
      <stop offset="0" stopColor="#7BE0A4" stopOpacity=".38" />
      <stop offset="1" stopColor="#7BE0A4" stopOpacity="0" />
    </radialGradient>
  </defs>
);

const F = "Manrope, system-ui, sans-serif";
const S = "Fraunces, Georgia, serif";

const Chip = ({ x, y, w, label }: { x: number; y: number; w: number; label: string }) => (
  <g>
    <rect x={x} y={y} width={w} height="42" rx="21" fill="#0B2A1F" stroke="#7BE0A4" strokeOpacity=".35" />
    <circle cx={x + 22} cy={y + 21} r="8" fill="#7BE0A4" />
    <text x={x + 38} y={y + 26} fill="#F7F4EE" fontSize="13" fontFamily={F} fontWeight="600">{label}</text>
  </g>
);

export default function Art({ kind, className = "" }: { kind: ArtKind; className?: string }) {
  return (
    <svg viewBox="0 0 600 460" className={className} role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <Defs />
      <rect width="600" height="460" fill="url(#g1)" />
      <rect width="600" height="460" fill="url(#glow)" />

      {kind === "hero" && (
        <g>
          <g transform="rotate(-9 300 230)"><rect x="150" y="50" width="340" height="320" rx="30" fill="#0F3A2A" stroke="#7BE0A4" strokeOpacity=".25" /></g>
          <g transform="rotate(7 300 230)"><rect x="130" y="70" width="340" height="320" rx="30" fill="#145139" opacity=".95" /></g>
          <g transform="rotate(-2 300 230)">
            <rect x="100" y="50" width="360" height="340" rx="30" fill="#F7F4EE" />
            <rect x="100" y="210" width="360" height="180" rx="0" fill="#0B2A1F" opacity="0" />
            <path d="M100 330 190 210l60 80 50-60 110 100v10a30 30 0 0 1-30 30H130a30 30 0 0 1-30-30z" fill="#0B2A1F" />
            <path d="M190 210l-30 40 30-14 25 20z" fill="#7BE0A4" opacity=".7" />
            <path d="M300 230l-28 38 28-12 30 22z" fill="#7BE0A4" opacity=".5" />
            <text x="130" y="110" fill="#06140F" fontSize="30" fontFamily={S} fontWeight="500">Words that</text>
            <text x="130" y="146" fill="#06140F" fontSize="30" fontFamily={S} fontWeight="500">move money</text>
            <text x="130" y="176" fill="#4b5f55" fontSize="13" fontFamily={F}>Clear, researched fintech writing.</text>
          </g>
          <circle cx="92" cy="338" r="34" fill="#0B2A1F" stroke="#7BE0A4" strokeOpacity=".5" />
          <path d="M76 346l12-12 8 8 12-14" stroke="#7BE0A4" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <Chip x={330} y={392} w={215} label="SEO-driven · Fintech-first" />
        </g>
      )}

      {kind === "bank" && (
        <g>
          <rect x="195" y="28" width="210" height="400" rx="34" fill="#06140F" stroke="#7BE0A4" strokeOpacity=".4" strokeWidth="2" />
          <rect x="209" y="46" width="182" height="364" rx="24" fill="#0B2A1F" />
          <text x="226" y="96" fill="#B9D8C6" fontSize="12" fontFamily={F}>Total balance</text>
          <text x="226" y="132" fill="#F7F4EE" fontSize="32" fontFamily={S}>$12,840</text>
          <text x="226" y="154" fill="#7BE0A4" fontSize="12" fontFamily={F} fontWeight="600">+12% from last month</text>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={228 + i * 28} y={330 - [30, 52, 44, 82, 70, 110][i]} width="18" height={[30, 52, 44, 82, 70, 110][i]} rx="5" fill="url(#g2)" opacity={0.45 + i * 0.11} />
          ))}
          <rect x="226" y="350" width="148" height="38" rx="12" fill="#145139" />
          <text x="300" y="374" textAnchor="middle" fill="#F7F4EE" fontSize="13" fontFamily={F} fontWeight="600">Connect account</text>
          <Chip x={28} y={110} w={190} label="Secure connection" />
          <Chip x={392} y={250} w={180} label="Smarter choices" />
        </g>
      )}

      {kind === "nodes" && (
        <g>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
            const x = 300 + Math.cos(a) * 170, y = 230 + Math.sin(a) * 150;
            return (
              <g key={i}>
                <line x1="300" y1="230" x2={x} y2={y} stroke="#7BE0A4" strokeOpacity=".35" strokeDasharray="4 6" />
                <circle cx={x} cy={y} r="34" fill="#0B2A1F" stroke="#7BE0A4" strokeOpacity=".5" />
                <text x={x} y={y + 4} textAnchor="middle" fill="#F7F4EE" fontSize="11" fontFamily={F} fontWeight="600">{["Bank", "Lender", "Wallet", "Retail", "Payroll", "Insurer"][i]}</text>
              </g>
            );
          })}
          <circle cx="300" cy="230" r="62" fill="#7BE0A4" opacity=".14" />
          <circle cx="300" cy="230" r="44" fill="url(#g2)" />
          <rect x="288" y="226" width="24" height="18" rx="4" fill="#06140F" />
          <path d="M293 226v-6a7 7 0 0 1 14 0v6" stroke="#06140F" strokeWidth="3" fill="none" />
        </g>
      )}

      {kind === "embed" && (
        <g>
          <rect x="120" y="60" width="360" height="110" rx="22" fill="#145139" />
          <rect x="100" y="150" width="400" height="120" rx="22" fill="#0F3A2A" stroke="#7BE0A4" strokeOpacity=".3" />
          <rect x="80" y="250" width="440" height="150" rx="26" fill="#F7F4EE" />
          <text x="112" y="296" fill="#06140F" fontSize="24" fontFamily={S}>Checkout</text>
          <rect x="112" y="314" width="376" height="30" rx="10" fill="#E6E1D6" />
          <text x="124" y="334" fill="#4b5f55" fontSize="12" fontFamily={F}>Pay in 3 · Insured delivery · Instant refund</text>
          <rect x="112" y="354" width="150" height="32" rx="16" fill="#0B2A1F" />
          <text x="187" y="375" textAnchor="middle" fill="#7BE0A4" fontSize="13" fontFamily={F} fontWeight="700">Pay later</text>
        </g>
      )}

      {kind === "stack" && (
        <g>
          {["Brand & customer", "Platform (BaaS)", "Licensed bank", "Compliance layer"].map((t, i) => (
            <g key={t} transform={`translate(0 ${i * 86})`}>
              <path d="M300 60 500 110 300 160 100 110z" fill={["#7BE0A4", "#2a8f60", "#145139", "#0F3A2A"][i]} stroke="#06140F" strokeOpacity=".4" />
              <text x="300" y="116" textAnchor="middle" fill={i === 0 ? "#06140F" : "#F7F4EE"} fontSize="13" fontFamily={F} fontWeight="700">{t}</text>
            </g>
          ))}
        </g>
      )}

      {kind === "growth" && (
        <g>
          {[0, 1, 2, 3].map((i) => <line key={i} x1="60" x2="540" y1={110 + i * 80} y2={110 + i * 80} stroke="#7BE0A4" strokeOpacity=".12" />)}
          <path d="M60 380 150 320 240 340 330 240 420 200 540 100V400H60z" fill="url(#g2)" opacity=".25" />
          <path d="M60 380 150 320 240 340 330 240 420 200 540 100" stroke="#7BE0A4" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round" />
          {[[150, 320], [330, 240], [540, 100]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="8" fill="#06140F" stroke="#7BE0A4" strokeWidth="3" />)}
          <Chip x={330} y={44} w={210} label="Revenue per customer" />
        </g>
      )}

      {kind === "fraud" && (
        <g>
          <path d="M300 40 460 96v110c0 100-66 170-160 214-94-44-160-114-160-214V96z" fill="#0B2A1F" stroke="#7BE0A4" strokeOpacity=".5" strokeWidth="2" />
          <path d="M240 220l44 44 82-90" stroke="#7BE0A4" strokeWidth="14" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x="20" y={300 + i * 44} width="190" height="34" rx="10" fill="#0F3A2A" stroke={i === 1 ? "#F2A65A" : "#7BE0A4"} strokeOpacity=".5" />
              <circle cx="40" cy={317 + i * 44} r="6" fill={i === 1 ? "#F2A65A" : "#7BE0A4"} />
              <text x="56" y={322 + i * 44} fill="#F7F4EE" fontSize="11" fontFamily={F} fontWeight="600">{["Approved · 41 ms", "Flagged · review", "Approved · 38 ms"][i]}</text>
            </g>
          ))}
          <Chip x={380} y={330} w={190} label="Risk score 0.94" />
        </g>
      )}
    </svg>
  );
}
