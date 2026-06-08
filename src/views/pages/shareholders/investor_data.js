"use client";
/* eslint-disable no-unused-vars, react-hooks/exhaustive-deps */

import { useEffect, useRef, useState } from "react";
import { getImageURL, slugify, useSwiperSliderOptions } from "@/lib";
import { Button, OptimizedImage } from "@/components";
import { Controller, useForm } from "react-hook-form";
import { POST_REQUEST, cleanSEOTags } from "@/utilities";
import { ErrorMessage } from "@/components";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const ShareHolderRelationDataPage = ({
    data = {},
    slug = "investor_data",
}) => {
    const { title, description } = data;
    const tabbing = data?.tabbing || [];
    const tabCount = tabbing.length;
    const [activeTab, setActiveTab] = useState(0);
    const [content, setContent] = useState();
    const [activeAccordian, setActiveAccordian] = useState(0);

    const [filteredList, setFilteredList] = useState([]);
    const [paginationData, setPaginationData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const methods = useForm({
        defaultValues: {},
    });

    useEffect(() => {
        if (window.location.hash.substring(1)) {
            const activeTab = window.location.hash.substring(1).toLowerCase();

            const filter_data = data?.tabbing?.findIndex(
                (item) =>
                    item?.title?.toLowerCase() === activeTab.toLowerCase() ||
                    slugify(item?.title) == slugify(activeTab),
            );

            setActiveTab(filter_data);
        }
    }, []);

    const { options: dynamicSliderOptions } = useSwiperSliderOptions({
        slidesPerView: 1,
        modules: [Pagination],
        pagination: {
            el: ".nav__tab_cfi-pagination",
            clickable: true,
        },
        breakpoints: {
            260: {
                slidesPerView: 1.2,
                spaceBetween: 0,
            },
            640: {
                slidesPerView: Math.min(tabCount, 2),
                spaceBetween: 0,
            },
            768: {
                slidesPerView: Math.min(tabCount, 3),
                spaceBetween: 0,
            },
            992: {
                slidesPerView: Math.min(tabCount, 4),
                spaceBetween: 0,
            },
            1200: {
                slidesPerView: Math.min(tabCount, 4),
                spaceBetween: 0,
            },
            1500: {
                slidesPerView: tabCount,
                spaceBetween: 0,
            },
        },
    });

    const { register, setValue, watch, getValues, handleSubmit } = methods;
    useEffect(() => {
        if (data?.tabbing && data.tabbing[activeTab]) {
            setContent(data.tabbing[activeTab]);

            const tabContent = data.tabbing[activeTab];
            const initialList = getListFromContent(tabContent);
            setFilteredList(initialList);

            if (tabContent?.reference_of_investor?.pages) {
                setPaginationData(tabContent.reference_of_investor.pages);
                setCurrentPage(
                    tabContent.reference_of_investor?.pages?.current_page || 1,
                );
            }
        }
    }, [activeTab, data]);

    useEffect(() => {
        if (content?.reference_of_investor?.filter_list?.length) {
            content.reference_of_investor?.filter_list?.forEach((filter) => {
                if (filter?.slug) {
                    register(filter?.slug);
                    setValue(filter?.slug, "all");
                }
            });
        }
    }, [content, register, setValue]);

    const getListFromContent = (tabContent) => {
        if (tabContent?.reference_of_investor?.list) {
            return Array?.isArray(tabContent?.reference_of_investor?.list)
                ? tabContent?.reference_of_investor?.list
                : [];
        } else if (Array.isArray(tabContent?.reference_of_investor)) {
            return tabContent?.reference_of_investor;
        } else if (tabContent?.accordian_list) {
            return tabContent.accordian_list;
        }
        return [];
    };

    const onSubmit = handleSubmit(async (formData, props = {}) => {
        setLoading(true);
        try {
            const allFiltersAreDefault = Object.values(formData).every(
                (v) => v === "all" || v === "",
            );

            let payload = {
                template_id:
                    paginationData?.filters?.template_id ||
                    content?.template_id,
                page: props?.page || 1,
                limit: paginationData?.filters?.limit || 10,
                tags: {},
                conditions: [],
                tag_conditions:
                    content?.reference_of_investor?.tag_conditions || [],
                sort: content?.reference_of_investor?.sort || {},
            };

            Object?.entries(formData)?.forEach(([fieldName, fieldValue]) => {
                if (
                    fieldName !== "search" &&
                    fieldValue !== "all" &&
                    fieldValue !== "" &&
                    fieldName !== "date" &&
                    fieldName !== "page"
                ) {
                    payload.tags = {
                        ...payload.tags,
                        [fieldName]: fieldValue,
                    };
                }
                if (fieldName === "search" && !!fieldValue) {
                    payload.conditions = [
                        ...payload.conditions,
                        {
                            field: fieldName,
                            operator: "like",
                            value: `${fieldValue}`,
                        },
                    ];
                }
            });

            const url = paginationData?.filters?.url;

            if (url) {
                const response = await POST_REQUEST(url, payload);
                if (response?.pages) {
                    setPaginationData(response?.pages);
                    setCurrentPage(response?.pages?.current_page);
                    if (response?.list) {
                        if (response?.pages?.current_page > 1) {
                            setFilteredList((prev) => {
                                const list = response?.list || [];
                                const combined = [...prev, ...list];
                                return Array.from(
                                    new Map(
                                        combined.map((item) => [
                                            item?.id ||
                                                item?.name ||
                                                item?.template_fields?.document
                                                    ?.src,
                                            item,
                                        ]),
                                    ).values(),
                                );
                            });
                        } else {
                            setFilteredList(response?.list);
                        }
                    }
                } else {
                    setFilteredList(Array.isArray(response) ? response : []);
                }
            }
        } catch (error) {
            console.error("Filter error:", error);
        } finally {
            setLoading(false);
        }
    });

    const handleLoadMore = async () => {
        setLoading(true);

        try {
            const nextPage = currentPage + 1;
            const formData = getValues();
            setCurrentPage(nextPage);
            await onSubmit({ page: nextPage });
        } catch (error) {
            console.error("Load more error:", error);
        } finally {
            setLoading(false);
        }
    };

    const renderTabNav = () => {
        if (tabCount <= 1) return null;

        // If 2 tabs, render simple nav (no slider)
        if (tabCount === 2) {
            return (
                <div className="custom-container-fluid tab__area g-0">
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="nav__tab_wrapper d-flex">
                                {tabbing?.map((item, key) => {
                                    const url = slugify(item?.title);

                                    return (
                                        <a
                                            key={item?.id || url || key}
                                            href={`#${url}`}
                                            onClick={() => setActiveTab(key)}
                                            className={`nav__item__tab fs-18 ${
                                                activeTab === key
                                                    ? "active"
                                                    : ""
                                            }`}
                                            data-id={url}
                                        >
                                            {item?.title}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="custom-container-fluid tab__area g-0">
                <div className="row">
                    <div className="col-12 text-center">
                        <div className="nav__tab_slider_wrapper">
                            <Swiper
                                {...dynamicSliderOptions}
                                className="nav__tab_wrapper nav__tab_cfi_slider swiper d-flex"
                            >
                                {tabbing?.map((item, key) => {
                                    const url = slugify(item?.title);

                                    return (
                                        <SwiperSlide
                                            key={item?.id || url || key}
                                        >
                                            <a
                                                href={`#${url}`}
                                                onClick={() =>
                                                    setActiveTab(key)
                                                }
                                                className={`nav__item__tab fs-18 ${
                                                    activeTab === key
                                                        ? "active"
                                                        : ""
                                                }`}
                                                data-id={url}
                                            >
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: cleanSEOTags(
                                                            item?.title,
                                                        ),
                                                    }}
                                                />
                                            </a>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                        <div className="nav__tab_cfi-pagination" />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <section className="investor__section">
                <div className="share__holding">
                    <div className="custom-container sh__tab_data">
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-11 col-xl-8">
                                <div className="section_header text-center">
                                    <h3
                                        className="heading fs-36 fw-500"
                                        dangerouslySetInnerHTML={{
                                            __html: cleanSEOTags(title),
                                        }}
                                    />
                                    {description ? (
                                        <div className="content__wrap fs-16 text-center">
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: cleanSEOTags(
                                                        description,
                                                    ),
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Render tab navigation according to tab count */}
                    {renderTabNav()}
                    {content?.type === "pdf_with_large_icon" &&
                        content?.reference_of_investor && (
                            <PdfLargeIconContainer
                                content={content}
                                filteredList={filteredList}
                                onSubmit={onSubmit}
                                register={register}
                                getValues={getValues}
                                paginationData={paginationData}
                                handleLoadMore={handleLoadMore}
                                loading={loading}
                                methods={methods}
                            />
                        )}

                    {content?.type === "accordian" && (
                        <AccordianComponent
                            list={content?.accordian_list}
                            setActiveAccordian={setActiveAccordian}
                            activeAccordian={activeAccordian}
                        />
                    )}

                    {content?.type === "image_with_pdf" &&
                        content?.reference_of_investor && (
                            <ImageWithPdf
                                content={content}
                                filteredList={filteredList}
                                onSubmit={onSubmit}
                                register={register}
                                getValues={getValues}
                                paginationData={paginationData}
                                handleLoadMore={handleLoadMore}
                                loading={loading}
                                methods={methods}
                            />
                        )}

                    {content?.type === "icon_with_doc" &&
                        content?.reference_of_investor && (
                            <IconWithDoc
                                content={content}
                                filteredList={filteredList}
                                onSubmit={onSubmit}
                                register={register}
                                getValues={getValues}
                                paginationData={paginationData}
                                handleLoadMore={handleLoadMore}
                                loading={loading}
                                methods={methods}
                            />
                        )}

                    {content?.type === "small_pdf_icon" &&
                        content?.reference_of_investor && (
                            <SmallPdfIcon
                                content={content}
                                filteredList={filteredList}
                                onSubmit={onSubmit}
                                register={register}
                                getValues={getValues}
                                paginationData={paginationData}
                                handleLoadMore={handleLoadMore}
                                loading={loading}
                                methods={methods}
                            />
                        )}
                </div>
            </section>
        </>
    );
};

function SmallPdfIcon({
    content,
    filteredList,
    onSubmit,
    register,
    getValues,
    paginationData,
    handleLoadMore,
    loading,
    methods,
}) {
    return (
        <div className="share__holding policies__tab_data">
            <div className="nav__tab_details tab-active">
                <div className="custom-container">
                    <div className="row">
                        <div className="col-12">
                            {content?.reference_of_investor?.filter_list
                                ?.length > 0 && (
                                <div className="select-group text-center">
                                    <FilterList
                                        filterList={
                                            content?.reference_of_investor
                                                .filter_list
                                        }
                                        onSubmit={onSubmit}
                                        register={register}
                                        getValues={getValues}
                                        control={methods.control}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="download__item_wrapper d-flex">
                                {filteredList?.length === 0 && (
                                    <ErrorMessage>No data found</ErrorMessage>
                                )}
                                {filteredList?.map((item, index) => (
                                    <div
                                        className="item__wrap"
                                        key={
                                            item?.id ||
                                            item?.name ||
                                            item?.template_fields?.document
                                                ?.src ||
                                            index
                                        }
                                    >
                                        <div className="single__item">
                                            <div className="img__wrap">
                                                <OptimizedImage
                                                    className="img-fluid"
                                                    src={getImageURL(
                                                        "/upload/media/pdf_icon_1753344870.webp",
                                                    )}
                                                    alt="Pdf Icon"/>
                                            </div>
                                            <div className="content_block text-center">
                                                <h5
                                                    className="heading fs-20 fw-600"
                                                    dangerouslySetInnerHTML={{
                                                        __html: cleanSEOTags(
                                                            item?.name,
                                                        ),
                                                    }}
                                                />

                                                <div className="btn-group">
                                                    <Button
                                                        label="Download Now"
                                                        href={getImageURL(
                                                            item
                                                                ?.template_fields
                                                                ?.document?.src,
                                                        )}
                                                        target="_blank"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {paginationData?.current_page <
                                paginationData?.total_pages && (
                                <div className="tab__load_more text-center">
                                    <button
                                        className="primary_btn"
                                        onClick={handleLoadMore}
                                        disabled={loading}
                                    >
                                        <span className="btn_text">
                                            {loading
                                                ? "Loading..."
                                                : "Load More"}
                                        </span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function IconWithDoc({
    content,
    filteredList,
    onSubmit,
    register,
    getValues,
    paginationData,
    handleLoadMore,
    loading,
    methods,
}) {
    return (
        <>
            <div className="share__holding ipo__tab_data">
                <div className="custom-container">
                    <div className="row">
                        <div className="col-12">
                            {content?.reference_of_investor?.filter_list
                                ?.length > 0 && (
                                <div className="select-group text-center">
                                    <FilterList
                                        filterList={
                                            content.reference_of_investor
                                                .filter_list
                                        }
                                        onSubmit={onSubmit}
                                        register={register}
                                        getValues={getValues}
                                        control={methods.control}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="download__item_wrapper d-flex">
                                {filteredList?.length === 0 && (
                                    <ErrorMessage>No data found</ErrorMessage>
                                )}
                                {filteredList?.map((item, index) => (
                                    <div
                                        className="item__wrap"
                                        key={
                                            item?.id ||
                                            item?.name ||
                                            item?.template_fields?.document
                                                ?.src ||
                                            index
                                        }
                                    >
                                        <div className="single__item">
                                            <div className="img__wrap">
                                                <OptimizedImage
                                                    className="img-fluid"
                                                    src={getImageURL(
                                                        item?.template_fields
                                                            ?.thumbnail_image
                                                            ?.src,
                                                    )}
                                                    alt={item?.name}/>
                                            </div>
                                            <div className="content_block text-center">
                                                <h5
                                                    className="heading fs-20 fw-600"
                                                    dangerouslySetInnerHTML={{
                                                        __html: cleanSEOTags(
                                                            item?.name,
                                                        ),
                                                    }}
                                                />

                                                <div className="btn-group">
                                                    <Button
                                                        label="Download Now"
                                                        href={getImageURL(
                                                            item
                                                                ?.template_fields
                                                                ?.document?.src,
                                                        )}
                                                        target="_blank"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {paginationData?.current_page <
                                paginationData?.total_pages && (
                                <div className="tab__load_more text-center">
                                    <button
                                        className="primary_btn"
                                        onClick={handleLoadMore}
                                        disabled={loading}
                                    >
                                        <span className="btn_text">
                                            {loading
                                                ? "Loading..."
                                                : "Load More"}
                                        </span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="line__seperator_block">
                <div className="custom-container">
                    <div className="row">
                        <div className="col-12">
                            <div className="tab__line_seperator"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function ImageWithPdf({
    content,
    filteredList,
    onSubmit,
    register,
    getValues,
    paginationData,
    handleLoadMore,
    loading,
    methods,
}) {
    return (
        <div className="postal__block pb__tab_data">
            <div className="custom-container">
                <div className="row">
                    <div className="col-12">
                        {content?.reference_of_investor?.filter_list?.length >
                            0 && (
                            <div className="select-group text-center">
                                <FilterList
                                    filterList={
                                        content.reference_of_investor
                                            .filter_list
                                    }
                                    onSubmit={onSubmit}
                                    register={register}
                                    getValues={getValues}
                                    control={methods.control}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="download__item_wrapper d-flex">
                            {filteredList?.length === 0 && (
                                <ErrorMessage>No data found</ErrorMessage>
                            )}
                            {filteredList?.map((item, index) => (
                                <div
                                    className="item__wrap"
                                    key={
                                        item?.id ||
                                        item?.name ||
                                        item?.template_fields?.document?.src ||
                                        index
                                    }
                                >
                                    <div className="single__item">
                                        <div className="img__wrap">
                                            <OptimizedImage
                                                className="img-fluid"
                                                src={getImageURL(
                                                    item?.template_fields
                                                        ?.thumbnail_image?.src,
                                                )}
                                                alt={item?.name}/>
                                        </div>
                                        <div className="content_block text-center">
                                            <h5
                                                className="heading fs-20 fw-600"
                                                dangerouslySetInnerHTML={{
                                                    __html: cleanSEOTags(
                                                        item?.name,
                                                    ),
                                                }}
                                            />

                                            <div className="btn-group">
                                                <Button
                                                    label="Download Now"
                                                    href={getImageURL(
                                                        item?.template_fields
                                                            ?.document?.src,
                                                    )}
                                                    target="_blank"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {paginationData?.current_page <
                            paginationData?.total_pages && (
                            <div className="tab__load_more text-center">
                                <button
                                    className="primary_btn"
                                    onClick={handleLoadMore}
                                    disabled={loading}
                                >
                                    <span className="btn_text">
                                        {loading ? "Loading..." : "Load More"}
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* tab line seperator start */}
            <div className="line__seperator_block">
                <div className="custom-container">
                    <div className="row">
                        <div className="col-12">
                            <div className="tab__line_seperator" />
                        </div>
                    </div>
                </div>
            </div>
            {/* tab line seperator end */}
        </div>
    );
}

function PdfLargeIconContainer({
    content,
    filteredList,
    onSubmit,
    register,
    getValues,
    paginationData,
    handleLoadMore,
    loading,
    methods,
}) {
    return (
        <div
            className="nav__tab_details tab-active"
            data-id="shareholding-pattern"
        >
            <div className="custom-container">
                <div className="row">
                    <div className="col-12">
                        {content?.reference_of_investor?.filter_list?.length >
                            0 && (
                            <div className="select-group text-center">
                                <FilterList
                                    filterList={
                                        content.reference_of_investor
                                            .filter_list
                                    }
                                    onSubmit={onSubmit}
                                    register={register}
                                    getValues={getValues}
                                    control={methods.control}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="download__item_wrapper d-flex">
                            {filteredList?.length === 0 && (
                                <ErrorMessage>No data found</ErrorMessage>
                            )}
                            {filteredList?.map((item, index) => (
                                <div
                                    className="item__wrap"
                                    key={
                                        item?.id ||
                                        item?.name ||
                                        item?.template_fields?.document?.src ||
                                        index
                                    }
                                >
                                    <div className="single__item">
                                        <div className="img__wrap">
                                            <OptimizedImage
                                                className="img-fluid"
                                                src={getImageURL(
                                                    "/upload/media/pdf_icon_1753344870.webp",
                                                )}
                                                alt="Pdf Icon"/>
                                        </div>
                                        <div className="content_block text-center">
                                            <h5
                                                className="heading fs-20 fw-600"
                                                dangerouslySetInnerHTML={{
                                                    __html: item?.name,
                                                }}
                                            />

                                            <div className="btn-group">
                                                <Button
                                                    label="Download Now"
                                                    href={getImageURL(
                                                        item?.template_fields
                                                            ?.document?.src,
                                                    )}
                                                    target="_blank"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {paginationData?.current_page <
                            paginationData?.total_pages && (
                            <div className="tab__load_more text-center">
                                <button
                                    className="primary_btn"
                                    onClick={handleLoadMore}
                                    disabled={loading}
                                >
                                    <span className="btn_text">
                                        {loading ? "Loading..." : "Load More"}
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function AccordianComponent({ list, setActiveAccordian, activeAccordian }) {
    return (
        <div className="board__director nav__tab_details tab-active bd__tab_data">
            <div className="custom-container">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-11 col-xl-8">
                        <div className="faq__tab_data">
                            <div className="faq_accord_wrap">
                                {(!list || list.length === 0) && (
                                    <ErrorMessage>No data found</ErrorMessage>
                                )}
                                {Array.isArray(list) && list.map((item, index) => (
                                    <div
                                        key={item?.id || item?.title || index}
                                        className={`single_faq ${
                                            activeAccordian === index
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setActiveAccordian(index)
                                        }
                                    >
                                        <h5 className="faq_title fs-28 fw-600">
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: item?.title,
                                                }}
                                            />
                                        </h5>
                                        <div
                                            className={`faq_content__wrap ${
                                                activeAccordian !== index
                                                    ? "hide"
                                                    : ""
                                            }`}
                                        >
                                            <div className="committee_acordian">
                                                {Array.isArray(item?.list) && item.list.map(
                                                    (listItem, listIndex) => (
                                                        <div
                                                            key={listIndex}
                                                            className="committee_acordian_left"
                                                        >
                                                            <div
                                                                className="committee_title fs-20 fw-600"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: cleanSEOTags(
                                                                        listItem?.name,
                                                                    ),
                                                                }}
                                                            />

                                                            <div
                                                                className="committee_title_slogan fs-16 fw-400"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: cleanSEOTags(
                                                                        listItem?.designation,
                                                                    ),
                                                                }}
                                                            />

                                                            <div
                                                                className="committee_title_data fs-16 fw-400"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: cleanSEOTags(
                                                                        listItem?.sub_designation,
                                                                    ),
                                                                }}
                                                            />
                                                            <div
                                                                className="committee_title_data fs-16 fw-400"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: cleanSEOTags(
                                                                        listItem?.additional_details,
                                                                    ),
                                                                }}
                                                            />
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CustomDropdown({ options, label, value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedLabel =
        value === "all"
            ? `All ${label}`
            : options?.find((o) => o.id == value)?.name;

    return (
        <div
            className={`custom__select-wrapper form-field ${
                isOpen ? "active" : ""
            }`}
            ref={dropdownRef}
        >
            <div
                className="custom__select-trigger"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span
                    dangerouslySetInnerHTML={{
                        __html: selectedLabel,
                    }}
                />
            </div>

            {isOpen && (
                <div className="list__wrap">
                    <ul className="custom__select-list list-unstyled">
                        <li
                            className={value === "all" ? "selected" : ""}
                            onClick={() => {
                                onChange("all");
                                setIsOpen(false);
                            }}
                        >
                            <a>All {label}</a>
                        </li>

                        {options?.map((item) => (
                            <li
                                key={item?.id}
                                className={value == item?.id ? "selected" : ""}
                                onClick={() => {
                                    onChange(item?.id);
                                    setIsOpen(false);
                                }}
                            >
                                <a
                                    dangerouslySetInnerHTML={{
                                        __html: item?.name,
                                    }}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
export default function FilterList({
    filterList,
    onSubmit,
    register,
    getValues,
    control,
}) {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
        >
            <div className="row justify-content-center">
                {Array.isArray(filterList) &&
                    filterList.map((filter, idx) => {
                        const filterName = filter?.name;
                        const filterSlug = filter?.slug;
                        let options = filter?.tags;

                        if (!filterSlug || !options?.length) return null;

                        if (filterSlug === "year" && Array.isArray(options)) {
                            options = [...options].sort((a, b) => {
                                return b.name.localeCompare(a.name, undefined, {
                                    numeric: true,
                                    sensitivity: "base",
                                });
                            });
                        }

                        return (
                            <div key={idx} className="col-12 col-md-6">
                                <Controller
                                    name={filterSlug}
                                    control={control}
                                    defaultValue="all"
                                    render={({ field }) => (
                                        <CustomDropdown
                                            label={filterName}
                                            options={options}
                                            value={field.value}
                                            onChange={(value) => {
                                                field.onChange(value);
                                                setTimeout(() => {
                                                    onSubmit(getValues());
                                                }, 300);
                                            }}
                                        />
                                    )}
                                />
                                {/* <CustomDropdown
                                    name={filterSlug}
                                    label={filterName}
                                    options={options}
                                    register={register}
                                    getValues={getValues}
                                    onSubmit={onSubmit}
                                /> */}
                            </div>
                        );
                    })}
            </div>
        </form>
    );
}
