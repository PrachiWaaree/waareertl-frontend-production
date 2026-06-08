"use client";
/* eslint-disable no-unused-vars */

import { Button } from "@/components";
import { useSwiperSliderOptions } from "@/lib";

export const SolarPageExpertSection = ({
    data = {},
    slug = "talk-to-experts",
}) => {
    const { title, subtitle, ["cta-button"]: button } = data;

    const getButtonHref = (btn) => {
        let url = "";
        if (btn?.url_type === "external") {
            url = btn?.external_url || btn?.url;
        } else {
            url = btn?.url;
        }
        if (typeof url === "string") {
            return url;
        }
        return "";
    };

    return (
        <section className="inspired__section saving_talk_expert" id={slug}>
            <div className="custom-container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-12 col-lg-12 col-xl-10">
                        <div className="saving_talk_expert_bg">
                            <div className="section_header text-center">
                                <h4
                                    className="heading fs-48 fw-300"
                                    dangerouslySetInnerHTML={{ __html: title }}
                                />
                                <p
                                    className="heading fs-16 fw-400"
                                    dangerouslySetInnerHTML={{
                                        __html: subtitle,
                                    }}
                                />
                            </div>

                            <div className="btn-group text-center">
                                <Button
                                    label={button?.title}
                                    href={getButtonHref(button)}
                                    target={
                                        button?.open_new_tab === "yes"
                                            ? "_blank"
                                            : undefined
                                    }
                                />

                                {/* <a href="javascript:void(0);" className="primary_btn">
                  <span className="btn_icon" style={{}}>
                    <svg
                      width={30}
                      height={30}
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x={1}
                        y={1}
                        width={28}
                        height={28}
                        rx={14}
                        stroke="currentColor"
                        strokeWidth={2}
                      />
                      <path
                        d="M6.5 14C5.94772 14 5.5 14.4477 5.5 15C5.5 15.5523 5.94772 16 6.5 16V14ZM24.2071 15.7071C24.5976 15.3166 24.5976 14.6834 24.2071 14.2929L17.8431 7.92893C17.4526 7.53841 16.8195 7.53841 16.4289 7.92893C16.0384 8.31946 16.0384 8.95262 16.4289 9.34315L22.0858 15L16.4289 20.6569C16.0384 21.0474 16.0384 21.6805 16.4289 22.0711C16.8195 22.4616 17.4526 22.4616 17.8431 22.0711L24.2071 15.7071ZM6.5 15V16H23.5V15V14H6.5V15Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span className="btn_text" style={{}}>
                    Talk to an Experts
                  </span>
                </a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
