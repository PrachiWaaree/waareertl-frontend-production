"use client";
/* eslint-disable @next/next/no-img-element */

import { getImageURL } from "@/lib";
//

export const AwardsPageAwardCounter = ({ data = {}, slug="about_awards" }) => {
    const { awards } = data;

    return (
        <>
            <section className="awards__counter" id={slug}>
                <div className="custom-container">
                    <ul className="counter__list list-unstyled">
                        {awards.map((item, index) => (
                            <li className="counter__item" key={index}>
                                <div className="img__wrap">
                                    <img loading="lazy"
                                    
                                        className="img-fluid"
                                        src={getImageURL(item?.icon?.src)}
                                        alt={item?.icon?.alt}
                                    />
                                </div>
                                <div className="content__wrap">
                                    <h4
                                        className="heading fs-36 fw-600 text-gradient"
                                        dangerouslySetInnerHTML={{
                                            __html: item?.number,
                                        }}
                                    />
                                    <div className="content_wrap fs-20 fw-600">
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: item?.award_name,
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
