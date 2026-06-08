"use client";
/* eslint-disable no-unused-vars */
import { OptimizedImage } from "@/components";

import { getImageURL, openLink, useSwiperSliderOptions } from "@/lib";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useState } from "react";

export const CsrPageTeam = ({ data = {}, slug = "csr_teams" }) => {
    const { title, description, parent_class, teams = [] } = data;
    const [selectedData, setSelectedData] = useState(null);

    const { sliderButtons, nextSlide, prevSlide, options } =
        useSwiperSliderOptions({
            clickable: true,
            loop: false,
            modules: [Navigation],
            centeredSlides: true,
            slidesPerView: 4,
            navigation: {
                prevEl: ".prev-btn-team-slider",
                nextEl: ".next-btn-team-slider",
            },
            breakpoints: {
                260: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    centeredSlides: true,
                },
                600: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                767: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                    centeredSlides: false,
                },
                1025: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                    centeredSlides: false,
                },
            },
        });

    if (!title || !Array.isArray(teams) || teams.length === 0) {
        return null;
    }

    return (
        <section
            className={`team__section meet_committee_sec ${parent_class}`}
            id={slug}
        >
            <div className="custom-container">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-8 col-xl-6">
                        <div className="section_header text-center">
                            <h4
                                className="heading fs-48 fw-300"
                                dangerouslySetInnerHTML={{
                                    __html: title,
                                }}
                            />
                            {description && (
                                <div className="content__wrap text-center">
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: description,
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="custom-container">
                <div class="item__tab_data tab-active" data-id="executive">
                    <div className="team__slider_wrap">
                        <div className="row justify-content-center">
                            <div className="col-12 col-xl-10">
                                <div className="team__slider swiper">
                                    <Swiper {...options}>
                                        {teams.map((member, index) => {
                                            const { name, designation, image } =
                                                member;
                                            const memberImage =
                                                Array.isArray(image) &&
                                                image[0];

                                            return (
                                                <SwiperSlide key={index}>
                                                    <div
                                                        className="single__item"
                                                        onClick={() => {
                                                            setSelectedData(
                                                                member
                                                            );
                                                            openLink(
                                                                `#${slug}`
                                                            );
                                                        }}
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <div className="img__bg" />
                                                        <div className="img__wrap">
                                                            {memberImage && (
                                                                <OptimizedImage
                                                                    className="img-fluid"
                                                                    src={getImageURL(
                                                                        memberImage.src
                                                                    )}
                                                                    alt={
                                                                        memberImage.alt ||
                                                                        name ||
                                                                        "Team member"
                                                                    }/>
                                                            )}
                                                        </div>
                                                        <div className="content__area text-center theme-gradient-1">
                                                            <h4
                                                                className="heading fs-28 fw-400 text-white"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: name,
                                                                }}
                                                            />

                                                            <h5
                                                                className="sub-heading fs-20 fw-600 text-white"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: designation,
                                                                }}
                                                            />

                                                            <div className="btn-group">
                                                                <div className="btn-inner">
                                                                    <span className="btn_icon">
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width={
                                                                                31
                                                                            }
                                                                            height={
                                                                                16
                                                                            }
                                                                            viewBox="0 0 31 16"
                                                                            fill="none"
                                                                        >
                                                                            <path
                                                                                d="M30.2071 8.70711C30.5976 8.31659 30.5976 7.68342 30.2071 7.2929L23.8431 0.928934C23.4526 0.53841 22.8195 0.53841 22.4289 0.928934C22.0384 1.31946 22.0384 1.95262 22.4289 2.34315L28.0858 8L22.4289 13.6569C22.0384 14.0474 22.0384 14.6805 22.4289 15.0711C22.8195 15.4616 23.4526 15.4616 23.8431 15.0711L30.2071 8.70711ZM0.5 8L0.5 9L29.5 9L29.5 8L29.5 7L0.5 7L0.5 8Z"
                                                                                fill="white"
                                                                            />
                                                                        </svg>
                                                                    </span>
                                                                    <span className="btn_icon on-hover">
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width={
                                                                                50
                                                                            }
                                                                            height={
                                                                                16
                                                                            }
                                                                            viewBox="0 0 50 16"
                                                                            fill="none"
                                                                        >
                                                                            <path
                                                                                d="M49.7071 8.70711C50.0976 8.31658 50.0976 7.68342 49.7071 7.29289L43.3431 0.928932C42.9526 0.538408 42.3195 0.538408 41.9289 0.928932C41.5384 1.31946 41.5384 1.95262 41.9289 2.34315L47.5858 8L41.9289 13.6569C41.5384 14.0474 41.5384 14.6805 41.9289 15.0711C42.3195 15.4616 42.9526 15.4616 43.3431 15.0711L49.7071 8.70711ZM0 8V9H49V8V7H0V8Z"
                                                                                fill="white"
                                                                            />
                                                                        </svg>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            );
                                        })}
                                    </Swiper>
                                </div>

                                <div className="slider__btn_wrapper"></div>
                            </div>
                        </div>

                        <ul className="team__slider_btn list-unstyled">
                            <li className="prev-btn-team" onClick={prevSlide}>
                                <a
                                    href="#!"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <svg
                                        width={87}
                                        height={87}
                                        viewBox="0 0 87 87"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect
                                            x={-1}
                                            y={1}
                                            width={85}
                                            height={85}
                                            rx="42.5"
                                            transform="matrix(-1 0 0 1 85 0)"
                                            stroke="#5B5B5B"
                                            strokeWidth={2}
                                        />
                                        <path
                                            d="M62.9744 42.0003C63.5265 41.9862 63.9855 42.4223 63.9997 42.9744C64.0138 43.5265 63.5777 43.9855 63.0256 43.9997L62.9744 42.0003ZM23.3112 44.725C22.9108 44.3446 22.8946 43.7117 23.275 43.3113L29.4737 36.7863C29.8541 36.3858 30.4871 36.3696 30.8875 36.75C31.2879 37.1304 31.3041 37.7633 30.9237 38.1638L25.4138 43.9637L31.2137 49.4737C31.6142 49.8541 31.6304 50.4871 31.25 50.8875C30.8696 51.2879 30.2367 51.3041 29.8362 50.9237L23.3112 44.725ZM63 43L63.0256 43.9997L24.0256 44.9997L24 44L23.9744 43.0003L62.9744 42.0003L63 43Z"
                                            fill="#5B5B5B"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li className="next-btn-team" onClick={nextSlide}>
                                <a
                                    href="#!"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <svg
                                        width={87}
                                        height={87}
                                        viewBox="0 0 87 87"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect
                                            x={1}
                                            y={1}
                                            width={85}
                                            height={85}
                                            rx="42.5"
                                            stroke="#0DB02B"
                                            strokeWidth={2}
                                        />
                                        <path
                                            d="M24.0256 42.0003C23.4735 41.9862 23.0145 42.4223 23.0003 42.9744C22.9862 43.5265 23.4223 43.9855 23.9744 43.9997L24.0256 42.0003ZM63.6888 44.725C64.0892 44.3446 64.1054 43.7117 63.725 43.3113L57.5263 36.7863C57.1459 36.3858 56.5129 36.3696 56.1125 36.75C55.7121 37.1304 55.6959 37.7633 56.0763 38.1638L61.5862 43.9637L55.7863 49.4737C55.3858 49.8541 55.3696 50.4871 55.75 50.8875C56.1304 51.2879 56.7633 51.3041 57.1638 50.9237L63.6888 44.725ZM24 43L23.9744 43.9997L62.9744 44.9997L63 44L63.0256 43.0003L24.0256 42.0003L24 43Z"
                                            fill="#0DB02B"
                                        />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <RenderTeamModal
                selectedData={selectedData}
                onClose={() => setSelectedData(null)}
            />
        </section>
    );
};

const RenderTeamModal = ({ selectedData, onClose }) => {
    const isActive = !!selectedData;

    // If no selectedData, don't render the modal or overlay
    if (!isActive) return null;

    const memberImage = Array.isArray(selectedData?.image)
        ? selectedData.image[0]
        : null;

    return (
        <>
            <div
                className={`team-overlay ${isActive ? "active" : ""}`}
                onClick={onClose}
            />

            <div className={`team__modal ${isActive ? "active" : ""}`}>
                <div className="team__modal_wrapper">
                    <button
                        className="team-close-modal"
                        type="button"
                        onClick={onClose}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={52}
                            height={52}
                            viewBox="0 0 52 52"
                            fill="none"
                        >
                            <circle cx={26} cy={26} r={26} fill="#0DB02B" />
                            <path
                                d="M18.1955 17.8366C18.7845 17.3562 19.6531 17.3904 20.2023 17.9392L26.1418 23.8777L32.0812 17.9392L32.1955 17.8366C32.7845 17.3562 33.6531 17.3904 34.2023 17.9392L34.3049 18.0534C34.7533 18.6033 34.7533 19.3961 34.3049 19.946L34.2023 20.0603L28.2629 25.9987L34.3449 32.0808L34.4474 32.195C34.8959 32.745 34.8959 33.5386 34.4474 34.0886L34.3449 34.2028C33.7957 34.752 32.9263 34.7859 32.3371 34.3054L32.2228 34.2028L26.1408 28.1208L20.0597 34.2028C19.5108 34.7511 18.6421 34.7858 18.0529 34.3054L17.9387 34.2028C17.3533 33.617 17.353 32.6664 17.9387 32.0808L24.0197 25.9987L18.0812 20.0603C17.4958 19.4745 17.4956 18.5248 18.0812 17.9392L18.1955 17.8366Z"
                                fill="white"
                            />
                        </svg>
                    </button>

                    <div className="team__modal_detail">
                        <div className="team__member">
                            <div className="single__item">
                                <div className="img__bg" />
                                <div className="img__wrap">
                                    {memberImage?.src && (
                                        <OptimizedImage
                                            className="img-fluid"
                                            src={getImageURL(memberImage.src)}
                                            alt={
                                                memberImage.alt ||
                                                selectedData?.name ||
                                                ""
                                            }/>
                                    )}
                                </div>

                                {Array.isArray(selectedData?.cta) &&
                                selectedData.cta.length > 0 ? (
                                    <div className="content__area ">
                                        <div className="btn-group text-center theme-gradient-1 overflow-hidden">
                                            {selectedData.cta.map(
                                                (item, index) => {
                                                    const hasIcon =
                                                        Array.isArray(
                                                            item?.icon
                                                        ) && item.icon[0]?.src;
                                                    const iconSrc = hasIcon
                                                        ? item.icon[0].src
                                                        : null;
                                                    const iconAlt = hasIcon
                                                        ? item.icon[0].alt ||
                                                          "Social Media"
                                                        : "Social Media";

                                                    const linkUrl =
                                                        item?.url?.url ||
                                                        item?.url ||
                                                        "#";
                                                    const hasValidUrl =
                                                        linkUrl &&
                                                        linkUrl !== "" &&
                                                        linkUrl !== "#";

                                                    if (!hasIcon) return null;

                                                    return (
                                                        <a
                                                            key={`cta-${index}`}
                                                            href={linkUrl}
                                                            target={
                                                                hasValidUrl
                                                                    ? "_blank"
                                                                    : "_self"
                                                            }
                                                            rel={
                                                                hasValidUrl
                                                                    ? "noopener noreferrer"
                                                                    : undefined
                                                            }
                                                            onClick={
                                                                !hasValidUrl
                                                                    ? (e) =>
                                                                          e.preventDefault()
                                                                    : undefined
                                                            }
                                                            className="primary_text_btn fs-16 text-white fw-400"
                                                            title={
                                                                iconSrc.includes(
                                                                    "linkedin"
                                                                )
                                                                    ? "LinkedIn Profile"
                                                                    : "Social Profile"
                                                            }
                                                        >
                                                            <span className="btn_icon">
                                                                <OptimizedImage
                                                                    src={getImageURL(
                                                                        iconSrc
                                                                    )}
                                                                    alt={
                                                                        iconAlt
                                                                    }/>
                                                            </span>
                                                        </a>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    /* Fallback - Show default LinkedIn icon if no CTA data found */
                                    <div className="content__area ">
                                        <div className="btn-group text-center theme-gradient-1 overflow-hidden">
                                            <a
                                                href="#"
                                                onClick={(e) =>
                                                    e.preventDefault()
                                                }
                                                className="primary_text_btn fs-16 text-white fw-400"
                                                title="LinkedIn Profile"
                                            >
                                                <span className="btn_icon">
                                                    <OptimizedImage
                                                        src={getImageURL(
                                                            "/upload/media/linkedin_1752821494.svg"
                                                        )}
                                                        alt="LinkedIn"/>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="team__member_detail">
                            {(selectedData?.name ||
                                selectedData?.designation) && (
                                <div className="content__area">
                                    {selectedData?.name && (
                                        <h4
                                            className="heading fs-28 fw-600"
                                            dangerouslySetInnerHTML={{
                                                __html: selectedData?.name,
                                            }}
                                        />
                                    )}

                                    {selectedData?.designation && (
                                        <h5
                                            className="sub-heading fs-18 fw-500"
                                            dangerouslySetInnerHTML={{
                                                __html: selectedData?.designation,
                                            }}
                                        />
                                    )}
                                </div>
                            )}
                            {selectedData?.exp_title &&
                                selectedData?.experience && (
                                    <div className="content__wrap">
                                        <h4
                                            className="heading fs-20 fw-600 text-gradient"
                                            dangerouslySetInnerHTML={{
                                                __html: selectedData?.exp_title,
                                            }}
                                        />

                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: selectedData?.experience,
                                            }}
                                        />
                                    </div>
                                )}
                            {selectedData?.edu_title &&
                                selectedData?.education && (
                                    <div className="content__wrap">
                                        <h4
                                            className="heading fs-20 fw-600 text-gradient"
                                            dangerouslySetInnerHTML={{
                                                __html: selectedData?.edu_title,
                                            }}
                                        />

                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: selectedData?.education,
                                            }}
                                        />
                                    </div>
                                )}
                            {selectedData?.thought &&
                                selectedData?.leadership_thought && (
                                    <div className="content__wrap">
                                        <h4
                                            className="heading fs-20 fw-600 text-gradient"
                                            dangerouslySetInnerHTML={{
                                                __html: selectedData?.thought,
                                            }}
                                        />
                                        <div className="quote-icon-left">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={33}
                                                height={25}
                                                viewBox="0 0 33 25"
                                                fill="none"
                                            >
                                                <path
                                                    d="M33 13.1985L24.996 13.1985C25.1328 7.3652 26.7873 6.70304 28.8653 6.51404L29.6667 6.4147L29.6667 0.00035723L28.743 0.0498568C26.0295 0.202523 23.0295 0.69169 21.028 3.16253C19.2735 5.32853 18.5 8.8672 18.5 14.2994L18.5 24.3652L33 24.3652L33 13.1985Z"
                                                    fill="url(#paint0_linear_3235_515)"
                                                />
                                                <path
                                                    d="M14.5 24.3652L14.5 13.1985L6.60282 13.1985C6.73965 7.3652 8.34066 6.70304 10.4187 6.51404L11.1667 6.4147L11.1667 0.00035723L10.2963 0.0498568C7.58282 0.202523 4.55598 0.69169 2.55448 3.16253C0.800143 5.32853 -2.50053e-05 8.8672 -2.54802e-05 14.2994L-2.63602e-05 24.3652L14.5 24.3652Z"
                                                    fill="url(#paint1_linear_3235_515)"
                                                />
                                                <defs>
                                                    <linearGradient
                                                        id="paint0_linear_3235_515"
                                                        x1="18.5"
                                                        y1="12.1828"
                                                        x2={33}
                                                        y2="12.1828"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#0DB02B" />
                                                        <stop
                                                            offset={1}
                                                            stopColor="#28A9E2"
                                                        />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint1_linear_3235_515"
                                                        x1="-2.46842e-05"
                                                        y1="12.1828"
                                                        x2="14.5"
                                                        y2="12.1828"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#0DB02B" />
                                                        <stop
                                                            offset={1}
                                                            stopColor="#28A9E2"
                                                        />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </div>

                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: selectedData?.leadership_thought,
                                            }}
                                        />

                                        <div className="quote-icon-right">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={33}
                                                height={25}
                                                viewBox="0 0 33 25"
                                                fill="none"
                                            >
                                                <path
                                                    d="M-9.76223e-07 11.1667L8.00401 11.1667C7.86718 17 6.21268 17.6622 4.13467 17.8512L3.33334 17.9505L3.33334 24.3649L4.25701 24.3154C6.97051 24.1627 9.97052 23.6735 11.972 21.2027C13.7265 19.0367 14.5 15.498 14.5 10.0659L14.5 1.26763e-06L0 0L-9.76223e-07 11.1667Z"
                                                    fill="url(#paint0_linear_3235_518)"
                                                />
                                                <path
                                                    d="M18.5 0L18.5 11.1667L26.3972 11.1667C26.2603 17 24.6593 17.6622 22.5813 17.8512L21.8333 17.9505L21.8333 24.3649L22.7037 24.3154C25.4172 24.1627 28.444 23.6735 30.4455 21.2027C32.1999 19.0367 33 15.498 33 10.0659L33 1.26763e-06L18.5 0Z"
                                                    fill="url(#paint1_linear_3235_518)"
                                                />
                                                <defs>
                                                    <linearGradient
                                                        id="paint0_linear_3235_518"
                                                        x1="14.5"
                                                        y1="12.1824"
                                                        x2="-1.06502e-06"
                                                        y2="12.1824"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#0DB02B" />
                                                        <stop
                                                            offset={1}
                                                            stopColor="#28A9E2"
                                                        />
                                                    </linearGradient>
                                                    <linearGradient
                                                        id="paint1_linear_3235_518"
                                                        x1={33}
                                                        y1="12.1824"
                                                        x2="18.5"
                                                        y2="12.1824"
                                                        gradientUnits="userSpaceOnUse"
                                                    >
                                                        <stop stopColor="#0DB02B" />
                                                        <stop
                                                            offset={1}
                                                            stopColor="#28A9E2"
                                                        />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
