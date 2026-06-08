"use client";

import { getImageURL } from "@/lib";
import { Button, OptimizedImage } from "@/components";

export const FoundationPageAwards = ({ data = {}, slug="foundation_awards" }) => {
    const { button, awards, parent_class } = data;

    return (
        <>
            <section
                className={"awards__counter epc-award " + (parent_class || "")} id={slug}
            >
                <div className="custom-container">
                    <ul className="counter__list list-unstyled">
                        {awards?.map((item, index) => (
                            <li className="counter__item" key={index}>
                                <div className="img__wrap">
                                    <OptimizedImage
                                        className="img-fluid"
                                        src={getImageURL(item?.icon?.src)}
                                        alt={item?.icon?.alt}/>
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
                                                __html: item?.description,
                                            }}
                                        />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {!!button?.title?.trim() && (
                        <div className="btn-group text-center">
                            <Button
                                label={button.title}
                                href={button.url || "#"}
                                target={
                                    button.open_new_tab === "yes"
                                        ? "_blank"
                                        : undefined
                                }
                            />
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};
