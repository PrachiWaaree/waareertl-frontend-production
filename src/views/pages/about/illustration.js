"use client";
/* eslint-disable @next/next/no-img-element, no-unused-vars */

import { getImageURL, useSwiperSliderOptions } from "@/lib";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import { Button } from "@/components";

export const AboutPageFooterIllustration = ({
    data = {},
    slug = "footer_icon",
}) => {
    const { image } = data;
    return (
        <>
            <section className="footer__icon_section" id={slug}>
                <div className="custom-container-fluid g-0">
                    <div className="icon__wrapper text-center">
                        <div className="img_block">
                            <img loading="lazy"
                            
                                className="img-fluid"
                                src={getImageURL(image?.src)}
                                alt="footer-illustration"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
