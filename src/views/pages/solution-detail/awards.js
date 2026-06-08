"use client";
import { OptimizedImage } from "@/components";

import { getImageURL } from "@/lib";

export const SolutionDetailPageAwardsSection = ({
    data = {},
    slug = "solution_detail_awards",
}) => {
    const { awards = [] } = data;

    return (
        <>
            <section className="awards__counter" id={slug}>
                <div className="custom-container">
                    <ul className="counter__list list-unstyled">
                        {awards.map((award, index) => (
                            <li className="counter__item" key={index}>
                                <div className="img__wrap">
                                    <OptimizedImage
                                        src={
                                            award.icon?.src
                                                ? getImageURL(award.icon.src)
                                                : ""
                                        }
                                        alt={
                                            award.icon?.alt ||
                                            award.description ||
                                            ""
                                        }/>
                                </div>
                                <div className="content__wrap">
                                    <h4
                                        className="heading fs-36 fw-600 text-gradient text-left"
                                        dangerouslySetInnerHTML={{
                                            __html: award?.number,
                                        }}
                                    />

                                    <div className="content_wrap fs-16 fw-600 text-left">
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: award?.description,
                                            }}
                                        />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
};
