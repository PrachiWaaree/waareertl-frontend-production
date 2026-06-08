"use client";
import { OptimizedImage } from "@/components";
import { getImageURL } from "@/lib";

export const OfficePageMap = ({ data = {}, slug="our_office_map" }) => {
    const {
        location_locator = [],
        image,
        title,
        description,
        parent_class,
    } = data;

    return (
        <>
            <section
                className={`global__presence_section ${parent_class || ""}`} id={slug}
            >
                <div className="section_overlay" />
                <div className="custom-container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-11 col-xl-10">
                            <div className="section_header text-center">
                                <h2
                                    className="heading fs-48 fw-300"
                                    dangerouslySetInnerHTML={{ __html: title }}
                                />
                            </div>
                            <div className="content__wrap text-center">
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: description,
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="global__map_wrapper">
                                <div className="global__map text-center">
                                    {location_locator?.map((loc, idx) => (
                                        <div
                                            className={`location location-${
                                                idx + 1
                                            }`}
                                            key={idx}
                                        >
                                            <div className="location__details">
                                                <div className="location__msg">
                                                    <h4 className="heading fs-36 fw-500">
                                                        {loc?.location_name}
                                                    </h4>
                                                    <div className="content__wrap">
                                                        <p
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    loc?.description ||
                                                                    "",
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="location_pin">
                                                    {loc.location_pin && (
                                                        <OptimizedImage
                                                            className="img-fluid"
                                                            src={getImageURL(
                                                                loc
                                                                    ?.location_pin
                                                                    ?.src
                                                            )}
                                                            alt={
                                                                loc
                                                                    ?.location_pin
                                                                    ?.alt || ""
                                                            }/>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="location_map">
                                                {loc.location && (
                                                    <OptimizedImage
                                                        className="img-fluid"
                                                        src={getImageURL(
                                                            loc?.location?.src
                                                        )}
                                                        alt={
                                                            loc?.location
                                                                ?.alt || ""
                                                        }/>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {image && (
                                        <OptimizedImage
                                            className="img-fluid"
                                            src={getImageURL(image?.src)}
                                            alt={image?.alt}/>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
