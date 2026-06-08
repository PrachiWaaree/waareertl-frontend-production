import { Button } from "@/components";
import { getImageURL } from "@/lib";

export const WaareeEnergiesPageBanner = ({
    data = {},
    slug = "gallery_banner",
}) => {
    const {
        title,
        description,
        ["cta-button"]: CtaButton,
        ["backgroundimage"]: BgImage,
    } = data;

    return (
        <>
            <section className="inner__banner banner__txt" id={slug}>
                <div
                    className="inner__banner_bg"
                    style={{
                        backgroundImage: `url(${getImageURL(BgImage?.src)})`,
                        backgroundSize: "cover",
                        backgroundPosition: "50% 50%",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="section_white_overlay" />
                    <div className="custom-container">
                        <div className="row">
                            <div className="col-12 col-md-10 col-lg-6 col-xl-6">
                                <div className="inner__banner_area">
                                    <div className="section_header">
                                        <h1
                                            className="heading fs-72 fw-300"
                                            dangerouslySetInnerHTML={{
                                                __html: title,
                                            }}
                                        />
                                    </div>
                                    <div className="content_wrap fs-20 fw-400">
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: description,
                                            }}
                                        />
                                    </div>

                                    {CtaButton?.title && (
                                        <Button
                                            label={CtaButton?.title}
                                            href={
                                                CtaButton?.url_type ===
                                                "external"
                                                    ? CtaButton?.url_1 ||
                                                      CtaButton?.external_url ||
                                                      CtaButton?.url
                                                    : CtaButton?.url ||
                                                      CtaButton?.url_1
                                            }
                                            openNewTab={
                                                CtaButton?.open_new_tab ===
                                                "yes"
                                            }
                                        />
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
