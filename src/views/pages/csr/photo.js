"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import { Button, OptimizedImage } from "@/components";
import { getImageURL } from "@/lib";
import { useEffect, useState } from "react";

export const CsrPageGallery = ({ data = {}, slug="csr_project_gallery" }) => {
    const {
        description,
        card_heading,
        card_description,
        card_button,
        bg_image,
        title,
        parent_class,
        year_list = [],
    } = data;

    const [selectedYear, setSelectedYear] = useState();

    const [years, setYears] = useState([]);

    const filteredProjects =
        year_list?.find((item) => item?.year === selectedYear)?.project_list ||
        [];

    useEffect(() => {
        let result = [];

        year_list?.map((item) => {
            const year = parseInt(item?.year);
            if (
                !result?.includes(year) &&
                !!year &&
                !isNaN(year) &&
                !!item?.project_list?.length
            ) {
                result = [...result, year];
            }
        });

        const sortedYears = result?.sort((a, b) => b - a);

        setYears(sortedYears);
        setSelectedYear(sortedYears?.[0]?.toString());
    }, []);
    return (
        <>
            <section className={`foundation_sustain_section ${parent_class}`} id={slug}>
                <div className="section_overlay" />
                <div className="custom-container">
                    <div className="row align-items-start">
                        <div className="col-12 col-lg-4 col-xl-3">
                            <div className="section_header">
                                <h3
                                    className="heading fs-48 fw-300"
                                    dangerouslySetInnerHTML={{ __html: title }}
                                />
                            </div>
                            <div className="content__wrap">
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: description,
                                    }}
                                />
                            </div>
                            <div className="search_year">
                                <select
                                    className="form-field"
                                    value={selectedYear}
                                    placeholder=""
                                    onChange={(e) =>
                                        setSelectedYear(
                                            e.target.value?.toString()
                                        )
                                    }
                                    name="options"
                                    aria-label="Filter initiatives by year"
                                    required=""
                                >
                                    {years.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-12 col-lg-8 col-xl-9">
                            <div className="foundation_gallery d-flex">
                                <div className="left_gallery">
                                    {!!filteredProjects?.[0]?.image?.src && (
                                        <div className="left_top_img img_design">
                                            <OptimizedImage
                                                src={getImageURL(
                                                    filteredProjects[0].image
                                                        .src
                                                )}
                                                alt={
                                                    filteredProjects[0].image
                                                        .alt || ""
                                                }/>
                                            <div className="content__wrap fs-20 fw-600 foundation_gallery_txt">
                                                <p>
                                                    {filteredProjects[0].name}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {!!filteredProjects?.[1]?.image?.src && (
                                        <div className="left_bottom_img img_design">
                                            <OptimizedImage
                                                src={getImageURL(
                                                    filteredProjects[1].image
                                                        .src
                                                )}
                                                alt={
                                                    filteredProjects[1].image
                                                        .alt || ""
                                                }/>
                                            <div className="content__wrap fs-20 fw-600 foundation_gallery_txt">
                                                <p>
                                                    {filteredProjects[1].name}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="center_gallery">
                                    {!!filteredProjects?.[2]?.image?.src && (
                                        <div className="ceter_tb_img img_design">
                                            <OptimizedImage
                                                src={getImageURL(
                                                    filteredProjects[2].image
                                                        .src
                                                )}
                                                alt={
                                                    filteredProjects[2].image
                                                        .alt || ""
                                                }/>
                                            <div className="content__wrap fs-20 fw-600 foundation_gallery_txt">
                                                <p>
                                                    {filteredProjects[2].name}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {!!filteredProjects?.[3]?.image?.src && (
                                        <div className="ceter_tb_img img_design">
                                            <OptimizedImage
                                                src={getImageURL(
                                                    filteredProjects[3].image
                                                        .src
                                                )}
                                                alt={
                                                    filteredProjects[3].image
                                                        .alt || ""
                                                }/>
                                            <div className="content__wrap fs-20 fw-600 foundation_gallery_txt">
                                                <p>
                                                    {filteredProjects[3].name}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="right_gallery">
                                    {!!filteredProjects?.[4]?.image?.src && (
                                        <div className="right_top_img img_design">
                                            <OptimizedImage
                                                src={getImageURL(
                                                    filteredProjects[4].image
                                                        .src
                                                )}
                                                alt={
                                                    filteredProjects[4].image
                                                        .alt || ""
                                                }/>
                                            <div className="content__wrap fs-20 fw-600 foundation_gallery_txt">
                                                <p>
                                                    {filteredProjects[4].name}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {!!filteredProjects?.[5]?.image?.src && (
                                        <div className="right_bottom_img img_design">
                                            <OptimizedImage
                                                src={getImageURL(
                                                    filteredProjects[5].image
                                                        .src
                                                )}
                                                alt={
                                                    filteredProjects[5].image
                                                        .alt || ""
                                                }/>
                                            <div className="content__wrap fs-20 fw-600 foundation_gallery_txt">
                                                <p>
                                                    {filteredProjects[5].name}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="foundation-bg">
                    <OptimizedImage
                        className="img-fluid"
                        src={getImageURL(bg_image?.src)}
                        alt={bg_image?.alt || "Foundation Bg"}/>
                </div>

                <div className="inspired__section csr__inspired__section">
                    <div className="custom-container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-12 col-lg-12 col-xl-9">
                                <div className="saving_talk_expert_bg">
                                    <div className="section_header text-center">
                                        <h4
                                            className="heading fs-48 fw-300"
                                            dangerouslySetInnerHTML={{
                                                __html: card_heading,
                                            }}
                                        />
                                        <p
                                            className="heading fs-16 fw-400"
                                            dangerouslySetInnerHTML={{
                                                __html: card_description,
                                            }}
                                        />
                                    </div>
                                    <div className="btn-group text-center">
                                        <Button
                                            label={card_button?.title}
                                            href={card_button?.url}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
