import { OptimizedImage } from "@/components";
import { useEffect, useRef, useState } from "react";
import { getImageURL, useSwiperSliderOptions } from "@/lib";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

export const EpcPageFaq = ({ data = {}, slug="epc_faq" }) => {
    const { title, description, image, category = [], parent_class } = data;
    const [activeTab, setActiveTab] = useState(0);
    const [activeFaqIndexes, setActiveFaqIndexes] = useState(() =>
        category.map(() => 0)
    );
    const swiperRef = useRef(null);

    useEffect(() => {
        setActiveFaqIndexes(category.map(() => 0));
    }, [category]);

    const { options } = useSwiperSliderOptions({
        clickable: true,
        slidesPerView: 1,
        modules: [Navigation, Pagination],
        pagination: {
            el: ".faqtab_pagination",
            clickable: true,
            enabled: true,
            type: "bullets",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            600: {
                slidesPerView: 2,
                spaceBetween: 16,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 16,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 16,
            },
        },
    });

    const handleFaqClick = (tabIdx, faqIdx) => {
        setActiveFaqIndexes((prev) =>
            prev.map((val, idx) => (idx === tabIdx ? faqIdx : val))
        );
    };

    return (
        <section className={`faq_section ${parent_class}`} id={slug}>
            <div className="custom-container">
                <div className="row top__row">
                    <div className="section_header">
                        <h2
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
                <div className="row align-items-center">
                    <div className="col-12 col-lg-7 col-xl-7 col-md-7">
                        <Swiper
                            {...options}
                            ref={swiperRef}
                            className="item__tablist faqtab__slider"
                        >
                            {category?.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="list_item">
                                        <button
                                            type="button"
                                            className={`faq__tab${
                                                activeTab === index
                                                    ? " active"
                                                    : ""
                                            }`}
                                            data-id={item.title?.toLowerCase()}
                                            onClick={() => setActiveTab(index)}
                                        >
                                            <span
                                                className="fs-20 fw-600"
                                                dangerouslySetInnerHTML={{
                                                    __html: item?.title,
                                                }}
                                            />
                                        </button>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div className="faqtab_btn_wrap d-block d-lg-none">
                            <ul className="faqtab__slider_btn">
                                <li className="prev-btn-faq">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (
                                                swiperRef.current &&
                                                swiperRef.current.swiper
                                            ) {
                                                swiperRef.current.swiper.slidePrev();
                                            }
                                        }}
                                    >
                                        <svg
                                            width={45}
                                            height={45}
                                            viewBox="0 0 45 45"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                x={-1}
                                                y={1}
                                                width={43}
                                                height={43}
                                                rx="21.5"
                                                transform="matrix(-1 0 0 1 43 0)"
                                                stroke="#5B5B5B"
                                                strokeWidth={2}
                                            />
                                            <path
                                                d="M37.4685 21.1158C38.0206 21.1017 38.4797 21.5377 38.4938 22.0898C38.508 22.6419 38.0719 23.101 37.5198 23.1151L37.4685 21.1158ZM6.81525 23.6095C6.41484 23.2291 6.39861 22.5961 6.779 22.1957L12.9777 15.6707C13.3581 15.2703 13.9911 15.2541 14.3915 15.6345C14.7919 16.0148 14.8081 16.6478 14.4277 17.0482L8.91774 22.8482L14.7177 28.3582C15.1181 28.7386 15.1344 29.3715 14.754 29.772C14.3736 30.1724 13.7406 30.1886 13.3402 29.8082L6.81525 23.6095ZM37.4941 22.1155L37.5198 23.1151L7.52963 23.8841L7.50399 22.8845L7.47836 21.8848L37.4685 21.1158L37.4941 22.1155Z"
                                                fill="#5B5B5B"
                                            />
                                        </svg>
                                    </button>
                                </li>
                                <li className="next-btn-faq">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (
                                                swiperRef?.current &&
                                                swiperRef?.current.swiper
                                            ) {
                                                swiperRef?.current?.swiper?.slideNext();
                                            }
                                        }}
                                    >
                                        <svg
                                            width={45}
                                            height={45}
                                            viewBox="0 0 45 45"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                x={1}
                                                y={1}
                                                width={43}
                                                height={43}
                                                rx="21.5"
                                                stroke="#0DB02B"
                                                strokeWidth={2}
                                            />
                                            <path
                                                d="M7.53149 21.1158C6.97939 21.1017 6.52034 21.5377 6.50619 22.0898C6.49203 22.6419 6.92812 23.101 7.48023 23.1151L7.53149 21.1158ZM38.1848 23.6095C38.5852 23.2291 38.6014 22.5961 38.221 22.1957L32.0223 15.6707C31.6419 15.2703 31.0089 15.2541 30.6085 15.6345C30.2081 16.0148 30.1919 16.6478 30.5723 17.0482L36.0823 22.8482L30.2823 28.3582C29.8819 28.7386 29.8656 29.3715 30.246 29.772C30.6264 30.1724 31.2594 30.1886 31.6598 29.8082L38.1848 23.6095ZM7.50586 22.1155L7.48023 23.1151L37.4704 23.8841L37.496 22.8845L37.5216 21.8848L7.53149 21.1158L7.50586 22.1155Z"
                                                fill="#0DB02B"
                                            />
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="faqtab_pagination" />
                        {category.map((cat, idx) => (
                            <div
                                key={cat.title + idx}
                                className={`faq__tab_data${
                                    activeTab === idx ? " tab-active" : ""
                                }`}
                                data-id={cat?.title?.toLowerCase()}
                                style={{
                                    display:
                                        activeTab === idx ? "block" : "none",
                                }}
                            >
                                <div className="faq_accord_wrap">
                                    {Array.isArray(cat.faq_list) &&
                                    cat.faq_list.length > 0 ? (
                                        cat.faq_list.map((faq, faqIdx) => {
                                            const isActive =
                                                activeFaqIndexes[idx] ===
                                                faqIdx;
                                            return (
                                                <div
                                                    className={`single_faq${
                                                        isActive
                                                            ? " active"
                                                            : ""
                                                    }`}
                                                    key={faq?.question + faqIdx}
                                                >
                                                    <h5
                                                        className="faq_title fs-20 fw-600"
                                                        onClick={() =>
                                                            handleFaqClick(
                                                                idx,
                                                                faqIdx
                                                            )
                                                        }
                                                        dangerouslySetInnerHTML={{
                                                            __html: faq?.question,
                                                        }}
                                                    />

                                                    <div
                                                        className="faq_content__wrap"
                                                        style={{
                                                            display: isActive
                                                                ? "block"
                                                                : "none",
                                                            transition:
                                                                "all 0.3s",
                                                        }}
                                                    >
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: faq.answer,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="single_faq">
                                            <h5 className="faq_title fs-20 fw-600">
                                                No FAQs available.
                                            </h5>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-12 col-lg-5 col-xl-5 col-md-5">
                        <div className="faq_image">
                            <OptimizedImage
                                className="img-fluid"
                                src={getImageURL(image?.src)}
                                alt={image?.alt || ""}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
