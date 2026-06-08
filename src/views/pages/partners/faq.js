import { OptimizedImage } from "@/components";
import { useState } from "react";
import { getImageURL } from "@/lib";

export const PartnerPageFaq = ({ data = {}, slug="partners_faq" }) => {
    const { title, description, image, faq_list = [] } = data;
    const [activeFaqIndex, setActiveFaqIndex] = useState(0);

    const handleFaqClick = (faqIdx) => {
        setActiveFaqIndex(faqIdx === activeFaqIndex ? -1 : faqIdx);
    };

    return (
        <section className="faq_section">
            <div className="custom-container">
                <div className="row top__row">
                    <div className="section_header">
                        <h4
                            className="heading fs-48 fw-300"
                            dangerouslySetInnerHTML={{ __html: title }}
                        />

                        {description && (
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
                <div className="row align-items-center" id={slug}>
                    <div className="col-12 col-lg-7 col-xl-7 col-md-7">
                        {faq_list && faq_list.length > 0 && (
                            <div
                                className="faq__tab_data tab-active"
                                data-id="general"
                            >
                                <div className="faq_accord_wrap">
                                    {faq_list.map((faq, idx) => (
                                        <div
                                            key={idx}
                                            className={`single_faq${
                                                activeFaqIndex === idx
                                                    ? " active"
                                                    : ""
                                            }`}
                                        >
                                            <h5
                                                className="faq_title fs-20 fw-600"
                                                onClick={() =>
                                                    handleFaqClick(idx)
                                                }
                                                style={{ cursor: "pointer" }}
                                                dangerouslySetInnerHTML={{
                                                    __html: faq.question,
                                                }}
                                            />
                                            {activeFaqIndex === idx && (
                                                <div className="faq_content__wrap">
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: faq.answer,
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {(!faq_list || faq_list.length === 0) && (
                            <div>No FAQs available.</div>
                        )}
                    </div>
                    <div className="col-12 col-lg-5 col-xl-5 col-md-5">
                        {image?.src && (
                            <div className="faq_image">
                                <OptimizedImage
                                    className="img-fluid"
                                    src={getImageURL(image?.src)}
                                    alt={image?.alt || ""}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
