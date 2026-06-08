"use client";
/* eslint-disable no-unused-vars */

import { Button, OptimizedImage } from "@/components";
import { getImageURL } from "@/lib";

export const EsgStakeholders = ({ data = {} }) => {
    const { title, description, image, stakeholders } = data;

    return (
        <section className="stakeholders_section">
            <div
                className="stakeholders_bg"
                style={{
                    backgroundImage: `url(${getImageURL(image?.src)})`,
                }}
            >
                <div className="stakeholders_mobile_box">
                    <div className="section_header_main">
                        <div className="section_header text-center">
                            <h3
                                className="heading fs-48 fw-300"
                                dangerouslySetInnerHTML={{ __html: title }}
                            />

                            <div className="content__wrap">
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: description,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="stakeholder_box_main_inner">
                        {stakeholders?.map((stakeholder, index) => (
                            <div
                                key={index}
                                className={`stakeholder_box_main box-${
                                    index + 1
                                }`}
                            >
                                <div className="box_up">
                                    <div className="imm_ico_box">
                                        <OptimizedImage
                                            src={getImageURL(
                                                stakeholder?.icon?.src,
                                            )}
                                            alt=""/>
                                    </div>
                                    <span className="fs-20 fw-600 text-center">
                                        {stakeholder?.name}
                                    </span>
                                </div>
                                <div className="box_line">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={58}
                                        height={69}
                                        viewBox="0 0 58 69"
                                        fill="none"
                                    >
                                        <circle
                                            cx={8}
                                            cy={8}
                                            r="7.5"
                                            transform="matrix(-1 0 0 1 57 52)"
                                            fill="#0DB02B"
                                            stroke="white"
                                        />
                                        <line
                                            x1="1.38597"
                                            y1="0.682146"
                                            x2="43.386"
                                            y2="51.6821"
                                            stroke="white"
                                            strokeDasharray="2 2"
                                        />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
