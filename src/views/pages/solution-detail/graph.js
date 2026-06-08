"use client";
import { OptimizedImage } from "@/components";

import { getImageURL } from "@/lib";

export const SolutionDetailPageGraphSection = ({
    data = {},
    slug = "solution_graph",
}) => {
    const { heading, description, image } = data;

    return (
        <>
            <section className="globally_installed_section" id={slug}>
                <div className="custom-container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-12 col-md-12 col-lg-4">
                            <h4
                                className="fs-48 text-gradient"
                                dangerouslySetInnerHTML={{ __html: heading }}
                            />

                            <div className="content__wrap fs-24">
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: description,
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-10 col-lg-8">
                            <div className="img__wrapper">
                                <OptimizedImage
                                    className="img-fluid"
                                    src={getImageURL(image?.src)}
                                    alt={image?.alt}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
