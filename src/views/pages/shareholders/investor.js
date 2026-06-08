"use client";
/* eslint-disable no-unused-vars */

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getImageURL, useSwiperSliderOptions } from "@/lib";
import { ErrorMessage, Fade, OptimizedImage } from "@/components";
import { Navigation } from "swiper/modules";
import { cleanSEOTags } from "@/utilities";

const getTabImage = (tab) => {
    if (tab?.background_image?.src) {
        return getImageURL(tab.background_image.src);
    }
    return undefined;
};

export const ShareHolderRelationPage = ({
    data = {},
    slug = "investor_data",
}) => {
    const tabing = Array.isArray(data?.tabing) ? data.tabing : [];

    const {
        options: mainSliderOptions,
        nextSlide,
        prevSlide,
        sliderButtons: { hasNext, hasPrev },
    } = useSwiperSliderOptions({
        modules: [Navigation],
        centeredSlidesBounds: true,
        centeredSlides: true,
        slidesPerView: "auto",
        breakpoints: {
            260: {
                slidesPerView: 1.2,
                spaceBetween: 20,
            },
            600: {
                slidesPerView: 3.2,
                spaceBetween: 20,
            },
            767: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },
    });

    const renderDesktopTabs = () => (
        <ul className="list-unstyled justify-content-center d-flex">
            {tabing.map((tab, idx) => {
                const tabCta = tab.tab_cta || {};
                const imgSrc = getTabImage(tab);
                const alt = tab.background_image?.alt || tabCta.title || "";
                const url = tabCta.url || "#";
                const openNewTab = tabCta.open_new_tab === "yes";
                const urlType = tabCta.url_type || "internal";

                return (
                    <li className="intesterclick" key={idx}>
                        {!!imgSrc && (
                            <div className="img__wrap">
                                <OptimizedImage
                                    className="img-fluid"
                                    src={imgSrc}
                                    alt={alt}/>
                            </div>
                        )}
                        <a
                            href={url}
                            target={openNewTab ? "_blank" : undefined}
                            rel={openNewTab ? "noopener noreferrer" : undefined}
                            data-tag={tabCta.title
                                ?.toLowerCase()
                                .replace(/\s+/g, "-")}
                            dangerouslySetInnerHTML={{
                                __html: cleanSEOTags(tabCta.title) || "",
                            }}
                        />
                    </li>
                );
            })}
        </ul>
    );

    const renderMobileTabs = () => (
        <div className="investor_slider_wrap tabbing_up_invester">
            <Swiper
                {...mainSliderOptions}
                className="investor__relation_m_slider"
            >
                {tabing.map((tab, idx) => {
                    const tabCta = tab.tab_cta || {};
                    const imgSrc = getTabImage(tab);
                    const alt = tab.background_image?.alt || tabCta.title || "";
                    const url = tabCta.url || "#";
                    const openNewTab = tabCta.open_new_tab === "yes";
                    const urlType = tabCta.url_type || "internal";
                    return (
                        <SwiperSlide key={idx}>
                            <div className="intesterclick">
                                {!!imgSrc && (
                                    <div className="img__wrap">
                                        <OptimizedImage
                                            className="img-fluid"
                                            src={imgSrc}
                                            alt={alt}/>
                                    </div>
                                )}
                                <a
                                    href={url}
                                    target={openNewTab ? "_blank" : undefined}
                                    rel={
                                        openNewTab
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    data-tag={tabCta.title
                                        ?.toLowerCase()
                                        .replace(/\s+/g, "-")}
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            cleanSEOTags(tabCta.title) || "",
                                    }}
                                />
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );

    return (
        <>
            <section className="intester_main" id={slug}>
                <div className="section_overlay"></div>
                <div className="custom-container">
                    <div className="tabbing_up_invester d-none d-lg-block">
                        {renderDesktopTabs()}
                    </div>
                    <div className="d-block d-lg-none">
                        {renderMobileTabs()}
                    </div>
                    <ul className="invester__slider_btn list-unstyled">
                        <li
                            className={
                                "prev-btn-invester" +
                                (!hasPrev ? " swiper-button-disabled" : "")
                            }
                        >
                            <a
                                href="#!"
                                onClick={(e) => {
                                    e.preventDefault();
                                    prevSlide();
                                }}
                            >
                                <svg
                                    width={65}
                                    height={65}
                                    viewBox="0 0 65 65"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        x="-0.9375"
                                        y="0.9375"
                                        width="59.0625"
                                        height="58.125"
                                        rx="29.0625"
                                        transform="matrix(-1 0 0 1 61.125 3)"
                                        stroke="#0DB02B"
                                        strokeWidth={2}
                                    />
                                    <path
                                        d="M50.8125 33C51.3303 33 51.75 33.4197 51.75 33.9375C51.75 34.4553 51.3303 34.875 50.8125 34.875V33.9375V33ZM13.5751 34.6004C13.209 34.2343 13.209 33.6407 13.5751 33.2746L19.5413 27.3084C19.9074 26.9423 20.501 26.9423 20.8671 27.3084C21.2332 27.6745 21.2332 28.2681 20.8671 28.6342L15.5638 33.9375L20.8671 39.2408C21.2332 39.6069 21.2332 40.2005 20.8671 40.5666C20.501 40.9327 19.9074 40.9327 19.5413 40.5666L13.5751 34.6004ZM50.8125 33.9375V34.875H14.238V33.9375V33H50.8125V33.9375Z"
                                        fill="#0DB02B"
                                    />
                                </svg>
                            </a>
                        </li>
                        <li
                            className={
                                "next-btn-invester" +
                                (!hasNext ? " swiper-button-disabled" : "")
                            }
                        >
                            <a
                                href="#!"
                                onClick={(e) => {
                                    e.preventDefault();
                                    nextSlide();
                                }}
                            >
                                <svg
                                    width={65}
                                    height={65}
                                    viewBox="0 0 65 65"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        x={3}
                                        y="3.9375"
                                        width="59.0625"
                                        height="58.125"
                                        rx="29.0625"
                                        stroke="#0DB02B"
                                        strokeWidth="1.875"
                                    />
                                    <path
                                        d="M14.25 33C13.7322 33 13.3125 33.4197 13.3125 33.9375C13.3125 34.4553 13.7322 34.875 14.25 34.875V33.9375V33ZM51.4874 34.6004C51.8535 34.2343 51.8535 33.6407 51.4874 33.2746L45.5212 27.3084C45.1551 26.9423 44.5615 26.9423 44.1954 27.3084C43.8293 27.6745 43.8293 28.2681 44.1954 28.6342L49.4987 33.9375L44.1954 39.2408C43.8293 39.6069 43.8293 40.2005 44.1954 40.5666C44.5615 40.9327 45.1551 40.9327 45.5212 40.5666L51.4874 34.6004ZM14.25 33.9375V34.875H50.8245V33.9375V33H14.25V33.9375Z"
                                        fill="#0DB02B"
                                    />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
};

const RenderInvestorContent = ({ data }) => {
    const { type, accordian, cards, table_structure } = data || {};

    switch (type) {
        case "pdf_with_large_icon":
            if (
                !Array.isArray(pdf_with_large_icon) ||
                pdf_with_large_icon.length === 0
            ) {
                return (
                    <ErrorMessage>
                        No content available for this section.
                    </ErrorMessage>
                );
            }
            <Fade show={true} unmountOnExit></Fade>;
        case "image_with_pdf":
            return <Fade show={true} unmountOnExit></Fade>;

        case "small_pdf_icon":
            return <Fade show={true} unmountOnExit></Fade>;
        case "icon_with_doc":
            return <Fade show={true} unmountOnExit></Fade>;
        case "accordian":
            return <DynamicAccordion accordionData={accordian} />;

        default:
            return (
                <ErrorMessage>
                    Content for this section is not available.
                </ErrorMessage>
            );
    }
};

const DynamicAccordion = ({ accordionData = [] }) => {
    const [activeAccordion, setActiveAccordion] = useState(0);

    if (!Array.isArray(accordionData) || accordionData.length === 0) {
        return (
            <Fade show={true} unmountOnExit>
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10 col-xl-9">
                        <div className="item__tab_data tab-active">
                            <div className="faq__tab_data">
                                <div className="error_msg_wrapper">
                                    <ErrorMessage>
                                        No accordion data available.
                                    </ErrorMessage>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>
        );
    }

    return (
        <Fade show={true} unmountOnExit>
            <div className="board__director bd__tab_data">
                <div className="custom-container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-11 col-xl-8">
                            <div className="section_header text-center">
                                <h3 className="heading fs-36 fw-500">
                                    Board of Directors
                                </h3>
                                <div className="content__wrap fs-16 text-center">
                                    <p>
                                        Meet the visionary leaders guiding
                                        Waaree&apos;s strategic direction,
                                        compliance, and corporate governance
                                        with integrity and experience.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="custom-container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-11 col-xl-8">
                            <div className="item__tab_data tab-active">
                                <div
                                    className="faq__tab_data"
                                    style={{ display: "block", opacity: 1 }}
                                >
                                    <div className="faq_accord_wrap">
                                        <div className="single_faq active">
                                            <h5 className="faq_title fs-28 fw-600">
                                                <span>AUDIT COMMITTEE </span>
                                            </h5>
                                            <div className="faq_content__wrap">
                                                <div className="committee_acordian">
                                                    <div className="committee_acordian_left">
                                                        <div className="committee_title fs-20 fw-600">
                                                            {" "}
                                                            Mr. Rajender Mohan
                                                            Malla{" "}
                                                        </div>
                                                        <div className="committee_title_slogan fs-16 fw-400">
                                                            {" "}
                                                            Chairman{" "}
                                                        </div>
                                                        <div className="committee_title_data fs-16 fw-400">
                                                            {" "}
                                                            (Non-executive
                                                            Independent
                                                            Director){" "}
                                                        </div>
                                                    </div>
                                                    <div className="committee_acordian_left">
                                                        <div className="committee_title fs-20 fw-600">
                                                            {" "}
                                                            Mrs. Richa Manoj
                                                            Goyal{" "}
                                                        </div>
                                                        <div className="committee_title_slogan fs-16 fw-400">
                                                            {" "}
                                                            Member{" "}
                                                        </div>
                                                        <div className="committee_title_data fs-16 fw-400">
                                                            {" "}
                                                            (Non-executive
                                                            Independent
                                                            Director){" "}
                                                        </div>
                                                    </div>
                                                    <div className="committee_acordian_left">
                                                        <div className="committee_title fs-20 fw-600">
                                                            {" "}
                                                            Mr. Hitesh Pranjivan
                                                            Mehta{" "}
                                                        </div>
                                                        <div className="committee_title_slogan fs-16 fw-400">
                                                            {" "}
                                                            Member{" "}
                                                        </div>
                                                        <div className="committee_title_data fs-16 fw-400">
                                                            {" "}
                                                            (Whole-time
                                                            Director){" "}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="single_faq">
                                            <h5 className="faq_title fs-28 fw-600">
                                                <span>
                                                    {" "}
                                                    NOMINATION AND REMUNERATION
                                                    COMMITTEE{" "}
                                                </span>
                                            </h5>
                                            <div className="faq_content__wrap">
                                                <p>
                                                    Lorem ipsum dolor sit amet
                                                    consectetur. Morbi in in
                                                    quis neque leo purus
                                                    fermentum. Proin enim
                                                    tincidunt quam nisl augue.
                                                    Sem eget vitae sed ut. Nec
                                                    vel sit est auctor lacus.
                                                    Ornare pretium lobortis
                                                    egestas lectus odio pretium
                                                    nunc. Arcu fames ligula
                                                    morbi enim lorem facilisi
                                                    platea magnis. Posuere
                                                    ultrices cursus aliquet
                                                    purus. Auctor ut volutpat
                                                    quis vulputate quis diam
                                                    scelerisque lorem. Massa
                                                    lacinia nunc ipsum augue at.
                                                    Non urna in integer et cras
                                                    elementum. At libero sed sit
                                                    sed cras risus. Risus urna
                                                    nibh a non sagittis a. Nam
                                                    enim eget purus at proin
                                                    amet. Elit nunc tempus
                                                </p>
                                            </div>
                                        </div>
                                        <div className="single_faq">
                                            <h5 className="faq_title fs-28 fw-600">
                                                <span>
                                                    CORPORATE SOCIAL
                                                    RESPONSIBILITY
                                                    COMMITTEE{" "}
                                                </span>
                                            </h5>
                                            <div className="faq_content__wrap">
                                                <p>
                                                    Lorem ipsum dolor sit amet
                                                    consectetur. Morbi in in
                                                    quis neque leo purus
                                                    fermentum. Proin enim
                                                    tincidunt quam nisl augue.
                                                    Sem eget vitae sed ut. Nec
                                                    vel sit est auctor lacus.
                                                    Ornare pretium lobortis
                                                    egestas lectus odio pretium
                                                    nunc. Arcu fames ligula
                                                    morbi enim lorem facilisi
                                                    platea magnis. Posuere
                                                    ultrices cursus aliquet
                                                    purus. Auctor ut volutpat
                                                    quis vulputate quis diam
                                                    scelerisque lorem. Massa
                                                    lacinia nunc ipsum augue at.
                                                    Non urna in integer et cras
                                                    elementum. At libero sed sit
                                                    sed cras risus. Risus urna
                                                    nibh a non sagittis a. Nam
                                                    enim eget purus at proin
                                                    amet. Elit nunc tempus
                                                </p>
                                            </div>
                                        </div>
                                        <div className="single_faq">
                                            <h5 className="faq_title fs-28 fw-600">
                                                <span>
                                                    STAKEHOLDERS RELATIONSHIP
                                                    COMMITTEE{" "}
                                                </span>
                                            </h5>
                                            <div className="faq_content__wrap">
                                                <p>
                                                    Lorem ipsum dolor sit amet
                                                    consectetur. Morbi in in
                                                    quis neque leo purus
                                                    fermentum. Proin enim
                                                    tincidunt quam nisl augue.
                                                    Sem eget vitae sed ut. Nec
                                                    vel sit est auctor lacus.
                                                    Ornare pretium lobortis
                                                    egestas lectus odio pretium
                                                    nunc. Arcu fames ligula
                                                    morbi enim lorem facilisi
                                                    platea magnis. Posuere
                                                    ultrices cursus aliquet
                                                    purus. Auctor ut volutpat
                                                    quis vulputate quis diam
                                                    scelerisque lorem. Massa
                                                    lacinia nunc ipsum augue at.
                                                    Non urna in integer et cras
                                                    elementum. At libero sed sit
                                                    sed cras risus. Risus urna
                                                    nibh a non sagittis a. Nam
                                                    enim eget purus at proin
                                                    amet. Elit nunc tempus
                                                </p>
                                            </div>
                                        </div>
                                        <div className="single_faq">
                                            <h5 className="faq_title fs-28 fw-600">
                                                <span>
                                                    RISK MANAGEMENT
                                                    COMMITTEE{" "}
                                                </span>
                                            </h5>
                                            <div className="faq_content__wrap">
                                                <p>
                                                    Lorem ipsum dolor sit amet
                                                    consectetur. Morbi in in
                                                    quis neque leo purus
                                                    fermentum. Proin enim
                                                    tincidunt quam nisl augue.
                                                    Sem eget vitae sed ut. Nec
                                                    vel sit est auctor lacus.
                                                    Ornare pretium lobortis
                                                    egestas lectus odio pretium
                                                    nunc. Arcu fames ligula
                                                    morbi enim lorem facilisi
                                                    platea magnis. Posuere
                                                    ultrices cursus aliquet
                                                    purus. Auctor ut volutpat
                                                    quis vulputate quis diam
                                                    scelerisque lorem. Massa
                                                    lacinia nunc ipsum augue at.
                                                    Non urna in integer et cras
                                                    elementum. At libero sed sit
                                                    sed cras risus. Risus urna
                                                    nibh a non sagittis a. Nam
                                                    enim eget purus at proin
                                                    amet. Elit nunc tempus
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    );
};
