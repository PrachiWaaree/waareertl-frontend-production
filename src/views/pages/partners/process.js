"use client";

import { getImageURL } from "@/lib";
import { Button, OptimizedImage } from "@/components";

export const PartnerPageProcess = ({ data = {} }) => {
    const { title, partnership_process = [], cta } = data;

    if (
        !title ||
        !Array.isArray(partnership_process) ||
        partnership_process.length === 0
    ) {
        return null;
    }

    // Determine the correct URL for the button
    let buttonUrl = "";
    if (cta) {
        if (cta.url_type === "external" && cta.external_url) {
            buttonUrl = cta.external_url;
        } else if (cta.url) {
            buttonUrl = cta.url;
        } else if (cta.external_url) {
            buttonUrl = cta.external_url;
        }
    }

    // Determine if the button should open in a new tab
    const openInNewTab =
        cta && (cta.open_new_tab === "yes" || cta.open_new_tab === true);

    return (
        <section className="partnership_process_sec">
            <div className="custom-container">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10 col-xl-10">
                        <div className="section_header">
                            <h3
                                className="heading text-center fs-48 fw-300"
                                dangerouslySetInnerHTML={{ __html: title }}
                            />
                        </div>
                    </div>
                </div>
                <div className="partnership_inr_lines">
                    <div
                        className="partnership_process_inner d-flex"
                        aria-label="Partnership process steps"
                    >
                        {partnership_process.map((step, idx) => (
                            <div
                                className={`partnership_process_col step-${
                                    idx + 1
                                } fs-20 fw-600`}
                                role="group"
                                aria-labelledby={`step${idx + 1}-title`}
                                key={idx}
                            >
                                <div className="partnership_process_img">
                                    <OptimizedImage
                                        src={getImageURL(step?.image?.src)}
                                        alt={step?.image?.alt || ""}/>
                                </div>
                                <div className="step-header">{step?.title}</div>
                                {step?.subtitle && (
                                    <p
                                        className="step-text fs-28 fw-400"
                                        dangerouslySetInnerHTML={{
                                            __html: step?.subtitle,
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="partnership_process_line">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={1552}
                            height={542}
                            viewBox="0 0 1552 542"
                            fill="none"
                        >
                            <path
                                d="M0.0782094 255C0.0782094 257.946 2.46602 260.333 5.41154 260.333C8.35706 260.333 10.7449 257.946 10.7449 255C10.7449 252.054 8.35706 249.667 5.41154 249.667C2.46602 249.667 0.0782094 252.054 0.0782094 255ZM1540.78 281.5C1540.78 284.446 1543.17 286.833 1546.12 286.833C1549.06 286.833 1551.45 284.446 1551.45 281.5C1551.45 278.554 1549.06 276.167 1546.12 276.167C1543.17 276.167 1540.78 278.554 1540.78 281.5ZM1547.38 434.882L1548.38 434.874L1547.38 434.882ZM1165.18 434.61L1164.18 434.619L1165.18 434.61ZM1268.94 538.711L1268.93 539.711L1268.94 538.711ZM1162.38 105.109L1161.38 105.117L1162.38 105.109ZM774.899 106.891L775.899 106.883L774.899 106.891ZM777.656 431.609L776.656 431.617L777.656 431.609ZM383.884 105.109L382.884 105.117L383.884 105.109ZM5.41154 255L6.4115 254.991L5.00632 106.987L4.00636 106.997L3.00641 107.006L4.41159 255.009L5.41154 255ZM109.002 1V2H278.888V1V0H109.002V1ZM383.884 105.109L382.884 105.117L385.671 433.4L386.671 433.392L387.671 433.383L384.884 105.1L383.884 105.109ZM491.667 537.5V538.5H672.66V537.5V536.5H491.667V537.5ZM777.656 431.609L778.656 431.6L775.899 106.883L774.899 106.891L773.899 106.9L776.656 431.617L777.656 431.609ZM879.895 1V2H1057.39V1V0H879.895V1ZM1162.38 105.109L1161.38 105.117L1164.18 434.619L1165.18 434.61L1166.18 434.602L1163.38 105.1L1162.38 105.109ZM1268.94 538.711L1268.93 539.711L1441.14 541.739L1441.15 540.739L1441.16 539.739L1268.95 537.711L1268.94 538.711ZM1547.38 434.882L1548.38 434.874L1547.12 281.492L1546.12 281.5L1545.12 281.508L1546.38 434.89L1547.38 434.882ZM1441.15 540.739L1441.14 541.739C1500.5 542.438 1548.87 494.244 1548.38 434.874L1547.38 434.882L1546.38 434.89C1546.86 493.14 1499.41 540.425 1441.16 539.739L1441.15 540.739ZM1165.18 434.61L1164.18 434.619C1164.67 492.322 1211.23 539.032 1268.93 539.711L1268.94 538.711L1268.95 537.711C1212.34 537.045 1166.66 491.216 1166.18 434.602L1165.18 434.61ZM1057.39 1V2C1114.48 2 1160.9 48.026 1161.38 105.117L1162.38 105.109L1163.38 105.1C1162.89 46.9111 1115.58 0 1057.39 0V1ZM774.899 106.891L775.899 106.883C775.408 49.1023 822.113 2 879.895 2V1V0C821.001 0 773.399 48.0081 773.899 106.9L774.899 106.891ZM672.66 537.5V538.5C731.554 538.5 779.156 490.492 778.656 431.6L777.656 431.609L776.656 431.617C777.147 489.398 730.443 536.5 672.66 536.5V537.5ZM386.671 433.392L385.671 433.4C386.165 491.589 433.476 538.5 491.667 538.5V537.5V536.5C434.574 536.5 388.156 490.474 387.671 433.383L386.671 433.392ZM278.888 1V2C335.981 2 382.399 48.026 382.884 105.117L383.884 105.109L384.884 105.1C384.39 46.9111 337.079 0 278.888 0V1ZM4.00636 106.997L5.00632 106.987C4.45735 49.1665 51.178 2 109.002 2V1V0C50.0661 0 2.44688 48.0735 3.00641 107.006L4.00636 106.997Z"
                                fill="url(#paint0_linear_6573_8530)"
                            />
                            <defs>
                                <linearGradient
                                    id="paint0_linear_6573_8530"
                                    x1="1548.26"
                                    y1="271.5"
                                    x2={3}
                                    y2="271.5"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#0DB02B" />
                                    <stop offset={1} stopColor="#28A9E2" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
                {cta && cta?.title && buttonUrl && (
                    <div className="btn-group text-center">
                        <Button
                            label={cta?.title}
                            href={buttonUrl}
                            target={openInNewTab ? "_blank" : undefined}
                            rel={
                                openInNewTab ? "noopener noreferrer" : undefined
                            }
                        />
                    </div>
                )}
            </div>
        </section>
    );
};
