"use client";

import { Button, OptimizedImage } from "@/components";
import { getImageURL } from "@/lib";

export const HomePageProject = ({ data = {}, slug = "projects" }) => {
    const { heading, button, project_list = [] } = data;

    if (!heading && !button && (!project_list || project_list.length === 0))
        return null;

    return (
        <section className="our_featured" id={slug}>
            <div className="custom-container">
                <div className="row top_row">
                    <div className="section_header d-flex justify-content-end">
                        <div className="col-12 col-md-12 col-lg-6 col-xl-6">
                            {heading && (
                                <h4
                                    className="heading fs-48 fw-300"
                                    dangerouslySetInnerHTML={{
                                        __html: heading,
                                    }}
                                />
                            )}
                        </div>
                        <div className="col-12 col-md-12 col-lg-6 col-xl-6">
                            {button && button.title && (
                                <div className="btn-group justify-content-end d-flex">
                                    <Button
                                        label={button.title}
                                        href={button.url}
                                        target={
                                            button.open_new_tab === "yes"
                                                ? "_blank"
                                                : undefined
                                        }
                                        rel={
                                            button.open_new_tab === "yes"
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row our_featured_inner bottom_row">
                    {project_list && project_list.length > 0 && (
                        <>
                            {/* First project on left */}
                            <div className="col-12 col-md-12 col-lg-6 col-xl-6 featured_col">
                                {project_list[0] && (
                                    <div className="featured_solor">
                                        <div className="item__wrap">
                                            <div className="single__item">
                                                <div className="img__wrap">
                                                    <OptimizedImage
                                                        className="img-fluid"
                                                        src={getImageURL(
                                                            project_list[0]
                                                                .image?.src
                                                        )}
                                                        alt={
                                                            project_list[0]
                                                                .image?.alt ||
                                                            ""
                                                        }
                                                    />
                                                </div>
                                                <div className="content_block text-white d-flex">
                                                    <div className="content_block_left">
                                                        <h4
                                                            className="fs-28 fw-600"
                                                            dangerouslySetInnerHTML={{
                                                                __html: project_list[0]
                                                                    ?.title,
                                                            }}
                                                        />

                                                        <p
                                                            dangerouslySetInnerHTML={{
                                                                __html: project_list[0]
                                                                    ?.description,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="content_block_right">
                                                        {project_list[0]?.link?.url && (
                                                            <div className="small_arrow">
                                                                <a
                                                                    href={
                                                                        project_list[0]
                                                                            .link
                                                                            ?.url ||
                                                                        "#"
                                                                    }
                                                                    aria-label={project_list[0]?.title ? "View " + project_list[0].title : "View project"}
                                                                    target={
                                                                        project_list[0]
                                                                            .link
                                                                            ?.open_new_tab ===
                                                                        "yes"
                                                                            ? "_blank"
                                                                            : undefined
                                                                    }
                                                                    rel={
                                                                        project_list[0]
                                                                            .link
                                                                            ?.open_new_tab ===
                                                                        "yes"
                                                                            ? "noopener noreferrer"
                                                                            : undefined
                                                                    }
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width={20}
                                                                        height={20}
                                                                        viewBox="0 0 20 20"
                                                                        fill="none"
                                                                    >
                                                                        <path
                                                                            d="M0.292893 18.2929C-0.0976311 18.6834 -0.0976311 19.3166 0.292893 19.7071C0.683418 20.0976 1.31658 20.0976 1.70711 19.7071L1 19L0.292893 18.2929ZM19.4229 1.57712C19.4229 1.02483 18.9752 0.577119 18.4229 0.577119L9.42288 0.577119C8.87059 0.577119 8.42288 1.02483 8.42288 1.57712C8.42288 2.1294 8.87059 2.57712 9.42288 2.57712L17.4229 2.57712L17.4229 10.5771C17.4229 11.1294 17.8706 11.5771 18.4229 11.5771C18.9752 11.5771 19.4229 11.1294 19.4229 10.5771L19.4229 1.57712ZM1 19L1.70711 19.7071L19.13 2.28423L18.4229 1.57712L17.7158 0.870012L0.292893 18.2929L1 19Z"
                                                                            fill="currentColor"
                                                                        />
                                                                    </svg>
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="col-12 col-md-12 col-lg-6 col-xl-6 featured_col">
                                <div className="right_featured">
                                    {project_list
                                        .slice(1, 3)
                                        .map((project, idx) => (
                                            <div
                                                className="featured_solor"
                                                key={idx}
                                            >
                                                <div className="item__wrap">
                                                    <div className="single__item">
                                                        <div className="img__wrap">
                                                            <OptimizedImage
                                                                className="img-fluid"
                                                                src={getImageURL(
                                                                    project
                                                                        .image
                                                                        ?.src
                                                                )}
                                                                alt={
                                                                    project
                                                                        .image
                                                                        ?.alt ||
                                                                    ""
                                                                }
                                                            />
                                                        </div>
                                                        <div className="content_block text-white d-flex">
                                                            <div className="content_block_left">
                                                                <h4
                                                                    className="fs-28 fw-600"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: project?.title,
                                                                    }}
                                                                />

                                                                <p
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: project?.description,
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="content_block_right">
                                                                {project?.link?.url && (
                                                                    <div className="small_arrow">
                                                                        <a
                                                                            href={
                                                                                project
                                                                                    .link
                                                                                    ?.url ||
                                                                                "#"
                                                                            }
                                                                            aria-label={project?.title ? "View " + project.title : "View project"}
                                                                            target={
                                                                                project
                                                                                    .link
                                                                                    ?.open_new_tab ===
                                                                                "yes"
                                                                                    ? "_blank"
                                                                                    : undefined
                                                                            }
                                                                            rel={
                                                                                project
                                                                                    .link
                                                                                    ?.open_new_tab ===
                                                                                "yes"
                                                                                    ? "noopener noreferrer"
                                                                                    : undefined
                                                                            }
                                                                        >
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width={
                                                                                    20
                                                                                }
                                                                                height={
                                                                                    20
                                                                                }
                                                                                viewBox="0 0 20 20"
                                                                                fill="none"
                                                                            >
                                                                                <path
                                                                                    d="M0.292893 18.2929C-0.0976311 18.6834 -0.0976311 19.3166 0.292893 19.7071C0.683418 20.0976 1.31658 20.0976 1.70711 19.7071L1 19L0.292893 18.2929ZM19.4229 1.57712C19.4229 1.02483 18.9752 0.577119 18.4229 0.577119L9.42288 0.577119C8.87059 0.577119 8.42288 1.02483 8.42288 1.57712C8.42288 2.1294 8.87059 2.57712 9.42288 2.57712L17.4229 2.57712L17.4229 10.5771C17.4229 11.1294 17.8706 11.5771 18.4229 11.5771C18.9752 11.5771 19.4229 11.1294 19.4229 10.5771L19.4229 1.57712ZM1 19L1.70711 19.7071L19.13 2.28423L18.4229 1.57712L17.7158 0.870012L0.292893 18.2929L1 19Z"
                                                                                    fill="currentColor"
                                                                                />
                                                                            </svg>
                                                                        </a>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};
