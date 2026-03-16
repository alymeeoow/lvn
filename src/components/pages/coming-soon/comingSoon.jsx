import { useEffect, useRef, useState } from "react";
import "../../../assets/styles/comingSoon.css";

export default function ComingSoon() {
  const [open, setOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const timerRef = useRef(null);

  const toggle = () => setOpen((v) => !v);

  useEffect(() => {

    if (timerRef.current) clearTimeout(timerRef.current);

    if (open) {
   
      setShowBanner(false);
      timerRef.current = setTimeout(() => {
        setShowBanner(true);
      }, 700)
    } else {

      setShowBanner(false);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [open]);

  return (
    <div className="cs-page">
      <div className={`cs fullscreen ${open ? "open" : "closed"}`}>
        <main className="cs-scene">
          <div className="cs-stage">
            <div className="cs-wrap">
              {/* Bubble */}
              <div className={`cs-bubble ${open ? "hide" : ""}`}>
                <span>Click me!</span>
              </div>

              <section
                className={`cs-banner ${showBanner ? "show" : ""}`}
                aria-hidden={!showBanner}
              >
                <div className="cs-bannerContent">
                  <div className="cs-cross cs-cross--tl" />
                  <div className="cs-cross cs-cross--tr" />
                  <div className="cs-cross cs-cross--bl" />
                  <div className="cs-cross cs-cross--br" />

                  <div className="cs-mini-vial cs-vial--tl" />
                  <div className="cs-mini-vial cs-vial--br" />

                  <h1 className="cs-bannerTitle">
                    <span>COMING</span>
                    <span>SOON!</span>
                  </h1>

                  <p className="cs-bannerSub">
                    A New Era of <br /> Medical Wellness
                  </p>

                  <div className="cs-bannerBrand">
                    <span className="cs-brandMark" aria-hidden="true" />
                    <span className="cs-brandText">LVNN</span>
                  </div>
                </div>
              </section>

              {/* Vial */}
              <svg viewBox="0 0 900 900" className="cs-vial" aria-hidden="true">
                <defs>
                  <linearGradient id="capTop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#1a1a1a" />
                    <stop offset="1" stopColor="#0b0b0b" />
                  </linearGradient>

                  <linearGradient id="metal" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#f3f6fa" stopOpacity="0.95" />
                    <stop offset="0.35" stopColor="#cfd6dd" stopOpacity="0.95" />
                    <stop offset="0.7" stopColor="#9aa3ac" stopOpacity="0.9" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0.55" />
                  </linearGradient>

                  <linearGradient id="glassFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#fbfdff" stopOpacity="0.95" />
                    <stop offset="0.5" stopColor="#e8eef6" stopOpacity="0.45" />
                    <stop offset="1" stopColor="#c7d0dc" stopOpacity="0.25" />
                  </linearGradient>

                  <linearGradient id="glassEdge" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#ffffff" stopOpacity="0.62" />
                    <stop offset="0.55" stopColor="#ffffff" stopOpacity="0.06" />
                    <stop offset="1" stopColor="#000000" stopOpacity="0.22" />
                  </linearGradient>

                  <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow
                      dx="0"
                      dy="22"
                      stdDeviation="22"
                      floodColor="#000"
                      floodOpacity="0.22"
                    />
                  </filter>
                </defs>

                <g className="cs-cap" filter="url(#softShadow)">
                  <path
                    d="M320 128 C320 106 338 88 360 88 L540 88 C562 88 580 106 580 128 L580 186 C580 208 562 226 540 226 L360 226 C338 226 320 208 320 186 Z"
                    fill="url(#capTop)"
                  />
                  <path
                    d="M334 226 L566 226 L552 292 C548 308 534 320 518 320 L382 320 C366 320 352 308 348 292 Z"
                    fill="url(#metal)"
                  />
                  <path
                    d="M352 242 L548 242 L540 276 C537 287 528 294 518 294 L382 294 C372 294 363 287 360 276 Z"
                    fill="#fff"
                    opacity="0.14"
                  />
                </g>

                <g className="cs-bottle" filter="url(#softShadow)">
                  <path
                    d="M335 220 C335 220 335 260 250 290 C200 310 180 340 180 400 L180 700 C180 780 220 840 450 840 C680 840 720 780 720 700 L720 400 C720 340 700 310 650 290 C565 260 565 220 565 220 Z"
                    fill="url(#glassFill)"
                    stroke="rgba(0,0,0,0.22)"
                    strokeWidth="6"
                  />
                  <path
                    d="M355 240 C355 240 355 270 280 295 C240 310 210 340 210 400 L210 700 C210 760 240 810 450 810 C660 810 690 760 690 700 L690 400 C690 340 660 310 620 295 C545 270 545 240 545 240"
                    fill="none"
                    stroke="url(#glassEdge)"
                    strokeWidth="14"
                    opacity="0.85"
                  />
                  <text
                    x="450"
                    y="530"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#222"
                    opacity="0.8"
                    style={{
                      fontSize: "120px",
                      fontWeight: "800",
                      fontFamily: "inherit",
                      letterSpacing: "8px",
                    }}
                  >
                    LVNN
                  </text>
                </g>
              </svg>

              {/* Click areas */}
              <button
                type="button"
                className="cs-hit cs-hitCap"
                onClick={toggle}
                aria-label={open ? "Close vial cap" : "Open vial cap"}
              />
              <button
                type="button"
                className="cs-hit cs-hitBottle"
                onClick={toggle}
                aria-label={open ? "Close vial" : "Open vial"}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
