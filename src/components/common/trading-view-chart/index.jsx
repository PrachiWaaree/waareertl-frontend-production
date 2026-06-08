"use client";

import React, { useEffect, useRef, memo, useState } from "react";

function TradingViewWidget() {
    const container = useRef();
    const [exchange, setExchange] = useState("BSE");

    useEffect(() => {
        if (typeof window === "undefined") return;

        const currentContainer = container.current;
        if (!currentContainer) return;

        // Clear existing content to avoid duplication on re-render
        const widgetDiv = currentContainer.querySelector(
            ".tradingview-widget-container__widget",
        );
        if (widgetDiv) {
            widgetDiv.innerHTML = "";
        }

        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
        script.type = "text/javascript";
        script.async = true;

        let symbols = [["Waaree RTL", "BSE:WAAREERTL|1D"]];

        script.innerHTML = JSON.stringify({
            symbols: symbols,
            chartOnly: false,
            width: "100%",
            height: "100%",
            locale: "en",
            colorTheme: "light",
            autosize: true,
            showVolume: false,
            showMA: false,
            hideDateRanges: false,
            hideMarketStatus: false,
            hideSymbolLogo: false,
            scalePosition: "right",
            scaleMode: "Normal",
            fontFamily:
                "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
            fontSize: "10",
            noOverlays: false,
            valuesTracking: "1",
            changeMode: "price-and-percent",
            chartType: "area",
            maLineColor: "#2962FF",
            maLineWidth: 2,
            maLength: 9,
            lineWidth: 2,
            lineColor: "#2962FF",
            topColor: "rgba(41, 98, 255, 0.3)",
            bottomColor: "rgba(255, 128, 171, 0.3)",
            dateFormat: "MMM dd, yyyy",
            timeHoursFormat: "12-hours",
        });

        if (widgetDiv) {
            widgetDiv.appendChild(script);
        }

        return () => {
            if (widgetDiv) {
                widgetDiv.innerHTML = "";
            }
        };
    }, [exchange]);

    return (
        <div className="tradingview-widget-wrapper">
            <div className="exchange-toggle">
                <button
                    className={exchange === "BSE" ? "active" : ""}
                    onClick={() => setExchange("BSE")}
                >
                    BSE
                </button>
            </div>
            <div className="tradingview-widget-container" ref={container}>
                <div
                    className="tradingview-widget-container__widget"
                    style={{ height: "100%", width: "100%" }}
                ></div>
            </div>
            <div className="tradingview-attribution">
                <a
                    href="https://www.tradingview.com/symbols/BSE-WAAREERTL/"
                    rel="noopener nofollow"
                    target="_blank"
                >
                    <span className="blue-text">BSE Quotes</span>
                </a>
                <span className="gray-text"> by TradingView</span>
            </div>
            <div className="tradingview-disclaimer">
                The displayed data is not in real time and may have streaming
                delays.
            </div>
        </div>
    );
}

export const TradingViewChart = memo(TradingViewWidget);
