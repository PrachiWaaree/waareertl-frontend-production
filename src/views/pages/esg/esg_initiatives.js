import { OptimizedImage } from "@/components";
import { getImageURL } from "@/lib";

export const EsgInitiatives = ({ data = {} }) => {
    const { heading, description, bg_image, image } = data;

    return (
        <section className="our_initiatives_section">
            <div className="our_initiatives_bg">
                <OptimizedImage src={getImageURL(bg_image?.src)} alt={bg_image?.alt}/>
            </div>

            <div className="custom-container">
                <div className="row align-items-center">
                    <div className="col-12 col-xl-6 col-sm-6 col-lg-6">
                        <div className="section_header">
                            <h3
                                className="heading fs-48 fw-300"
                                dangerouslySetInnerHTML={{
                                    __html: heading,
                                }}
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

                    <div className="col-12 col-xl-6 col-sm-6 col-lg-6">
                        <div className="our_initiatives_right">
                            <OptimizedImage
                                src={getImageURL(image?.src)}
                                alt={image?.alt}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
