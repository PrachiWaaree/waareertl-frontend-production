"use client";

export const PrivacyPolicyDescription = ({
    data = {},
    slug = "description",
}) => {
    const { description, parent_class } = data;

    return (
        <>
            <section className={`blog_detail_main ${parent_class}`} id={slug}>
                <div className="section_overlay" />
                <div className="custom-container">
                    <div className="shape_main">
                        <div className="shape_part" />
                    </div>
                    <div className="blog_detail_inner_main">
                        <div className="row">
                            <div className="col-12 ">
                                <div className="blog_detail_inner_left">
                                    {description && (
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: description,
                                            }}
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
