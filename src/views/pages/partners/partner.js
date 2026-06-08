"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { OptimizedImage } from "@/components";
import { getImageURL, useSwiperSliderOptions } from "@/lib";

export const PartnerPagePartner = ({ data = {} }) => {
    const { title, description, group_slider = [] } = data;

    // Only render if at least one of title, description, or group_slider has data
    const hasTitle = typeof title === "string" && title.trim() !== "";
    const hasDescription =
        typeof description === "string" && description.trim() !== "";
    const hasSlider = Array.isArray(group_slider) && group_slider.length > 0;

    const { options } = useSwiperSliderOptions({
        slidesPerView: 1,
        noSwiping: false,
        modules: [Navigation],
        navigation: {
            prevEl: ".prev-btn-grp",
            nextEl: ".next-btn-grp",
        },
        spaceBetween: 16,
        breakpoints: {
            260: {
                slidesPerView: 1,
                spaceBetween: 16,
            },
            600: {
                slidesPerView: 2,
                spaceBetween: 16,
            },
            992: {
                slidesPerView: 2,
                spaceBetween: 16,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 16,
            },
        },
    });

    if (!hasTitle && !hasDescription && !hasSlider) {
        return null;
    }

    return (
        <section className="award__section grp__company_section partner_section">
            <div className="custom-container">
                <div className="row">
                    {(hasTitle || hasDescription) && (
                        <div className="col-12 col-lg-4 col-xl-3">
                            <div className="grp__company_block">
                                {hasTitle && (
                                    <div className="section_header">
                                        <h4
                                            className="heading fs-48 fw-300"
                                            dangerouslySetInnerHTML={{
                                                __html: title,
                                            }}
                                        />
                                    </div>
                                )}
                                {hasDescription && (
                                    <div className="content__wrap">
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: description,
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {hasSlider && (
                        <div className="col-12 col-lg-8 col-xl-9">
                            <div className="grp__company_slider_wrap">
                                <Swiper
                                    {...options}
                                    className="grp__company_slider"
                                >
                                    {group_slider.map((item, idx) => (
                                        <SwiperSlide
                                            key={idx}
                                            className="d-flex"
                                        >
                                            <div className="single__item">
                                                <div className="img__wrap">
                                                    {item?.image?.src && (
                                                        <OptimizedImage
                                                            src={getImageURL(
                                                                item.image.src
                                                            )}
                                                            alt={
                                                                item?.image
                                                                    ?.alt ||
                                                                item?.title ||
                                                                ""
                                                            }
                                                        />
                                                    )}
                                                </div>
                                                {item?.title && (
                                                    <div className="award__content theme-gradient-1 text-center">
                                                        <h4 className="heading fs-20 fw-600 text-white">
                                                            {item.title}
                                                        </h4>
                                                    </div>
                                                )}
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <ul className="grp__company__slider_btn list-unstyled justify-content-center">
                                    <li className="prev-btn-grp">
                                        <a
                                            href="#!"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <svg
                                                width={55}
                                                height={54}
                                                viewBox="0 0 55 54"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect
                                                    x="-0.631579"
                                                    y="0.631579"
                                                    width="53.3546"
                                                    height="52.7368"
                                                    rx="26.3684"
                                                    transform="matrix(-1 0 0 1 53.3548 0)"
                                                    stroke="#5B5B5B"
                                                    strokeWidth="1.26316"
                                                />
                                                <path
                                                    d="M39.6086 26.053C39.9573 26.044 40.2472 26.3194 40.2561 26.6681C40.2651 27.0168 39.9896 27.3068 39.6409 27.3157L39.6086 26.053ZM14.5582 27.7738C14.3053 27.5336 14.295 27.1338 14.5353 26.8809L18.4503 22.7599C18.6905 22.507 19.0903 22.4967 19.3432 22.737C19.5961 22.9772 19.6063 23.377 19.3661 23.6299L15.8861 27.293L19.5492 30.773C19.8021 31.0133 19.8124 31.413 19.5721 31.6659C19.3319 31.9188 18.9321 31.929 18.6792 31.6888L14.5582 27.7738ZM39.6248 26.6843L39.6409 27.3157L15.0094 27.9473L14.9932 27.3159L14.977 26.6845L39.6086 26.053L39.6248 26.6843Z"
                                                    fill="#5B5B5B"
                                                />
                                            </svg>
                                        </a>
                                    </li>
                                    <li className="next-btn-grp">
                                        <a
                                            href="#!"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <svg
                                                width={55}
                                                height={54}
                                                viewBox="0 0 55 54"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect
                                                    x="1.0139"
                                                    y="0.631579"
                                                    width="53.3546"
                                                    height="52.7368"
                                                    rx="26.3684"
                                                    stroke="#0DB02B"
                                                    strokeWidth="1.26316"
                                                />
                                                <path
                                                    d="M15.3917 26.053C15.043 26.044 14.7531 26.3194 14.7441 26.6681C14.7352 27.0168 15.0106 27.3068 15.3593 27.3157L15.3917 26.053ZM40.4421 27.7738C40.695 27.5336 40.7052 27.1338 40.465 26.8809L36.55 22.7599C36.3097 22.507 35.91 22.4967 35.6571 22.737C35.4042 22.9772 35.3939 23.377 35.6342 23.6299L39.1142 27.293L35.451 30.773C35.1981 31.0133 35.1879 31.413 35.4281 31.6659C35.6684 31.9188 36.0681 31.929 36.321 31.6888L40.4421 27.7738ZM15.3755 26.6843L15.3593 27.3157L39.9909 27.9473L40.0071 27.3159L40.0233 26.6845L15.3917 26.053L15.3755 26.6843Z"
                                                    fill="#0DB02B"
                                                />
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
