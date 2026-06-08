/* eslint-disable no-unused-vars */
import { OptimizedImage } from "@/components";
import { getImageURL } from "@/lib";
import { useEffect, useState } from "react";

export const MediaPageMediaBytesSection = ({
    data = {},
    slug = "media_bytes",
}) => {
    const { title, media_cards } = data;

    const [modalOpen, setModalOpen] = useState(false);
    const [modalVideo, setModalVideo] = useState("");
    const [isEmbed, setIsEmbed] = useState(true);

    const getVideoData = (item) => {
        const youtubeUrl =
            typeof item?.template_fields?.youtube_embeded_url === "string"
                ? item?.template_fields?.youtube_embeded_url
                : typeof item?.template_fields?.youtube_embeded_url ===
                      "object" && item?.template_fields?.youtube_embeded_url
                ? item.template_fields?.youtube_embeded_url
                : "";

        if (
            youtubeUrl &&
            typeof youtubeUrl === "string" &&
            youtubeUrl.trim() !== ""
        ) {
            return { url: youtubeUrl, isEmbed: true };
        }

        const videoSrc = item?.template_fields?.video?.src;
        if (
            videoSrc &&
            typeof videoSrc === "string" &&
            videoSrc.trim() !== ""
        ) {
            return { url: getImageURL(videoSrc), isEmbed: false };
        }

        return { url: "", isEmbed: true };
    };

    const handleOpenModal = (item) => {
        const { url, isEmbed } = getVideoData(item);
        setModalVideo(url);
        setIsEmbed(isEmbed);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setModalVideo("");
        setIsEmbed(true);
    };

    useEffect(() => {
        if (!modalOpen) return;
        const onKeyDown = (e) => {
            if (e.key === "Escape") handleCloseModal();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [modalOpen]);

    if (!title && (!Array.isArray(media_cards) || media_cards.length === 0)) {
        return null;
    }

    return (
        <>
            <section className="media__section" id={slug}>
                <div className="custom-container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-11 col-xl-10">
                            {title ? (
                                <div className="row top__row">
                                    <div className="col-12">
                                        <div className="section_header">
                                            <h3
                                                className="heading fs-48 fw-300"
                                                dangerouslySetInnerHTML={{
                                                    __html: title,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                            {media_cards?.length > 0 && (
                                <div className="row">
                                    <div className="col-12">
                                        <div className="media__item_wrapper d-flex">
                                            {media_cards?.map((item, index) => {
                                                const hasImage =
                                                    item?.template_fields
                                                        ?.thumbnail_image?.src;
                                                const hasTags =
                                                    Array.isArray(
                                                        item?.tag_data?.type
                                                    ) &&
                                                    item?.tag_data?.type
                                                        .length > 0;
                                                const hasPublishDate =
                                                    item?.publish_date;
                                                const hasName = item?.name;
                                                const hasShortDesc =
                                                    item?.template_fields
                                                        ?.short_description;

                                                const {
                                                    url: videoUrl,
                                                    isEmbed: videoIsEmbed,
                                                } = getVideoData(item);
                                                const hasVideo =
                                                    !!videoUrl &&
                                                    videoUrl.trim() !== "";

                                                if (
                                                    !hasImage &&
                                                    !hasTags &&
                                                    !hasPublishDate &&
                                                    !hasName &&
                                                    !hasShortDesc
                                                ) {
                                                    return null;
                                                }

                                                return (
                                                    <div
                                                        key={index}
                                                        className="item__wrap"
                                                    >
                                                        <div className="single__item">
                                                            {hasImage ? (
                                                                <div className="img__wrap">
                                                                    <OptimizedImage
                                                                        className="img-fluid"
                                                                        src={getImageURL(
                                                                            item
                                                                                ?.template_fields
                                                                                ?.thumbnail_image
                                                                                ?.src
                                                                        )}
                                                                        alt={
                                                                            item
                                                                                ?.template_fields
                                                                                ?.thumbnail_image
                                                                                ?.alt ||
                                                                            ""
                                                                        }/>
                                                                </div>
                                                            ) : null}

                                                            {hasVideo && (
                                                                <a
                                                                    href="#!"
                                                                    className="play__btn_wrap"
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        e.preventDefault();
                                                                        handleOpenModal(
                                                                            item
                                                                        );
                                                                    }}
                                                                >
                                                                    <svg
                                                                        width={
                                                                            138
                                                                        }
                                                                        height={
                                                                            138
                                                                        }
                                                                        viewBox="0 0 138 138"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <circle
                                                                            opacity="0.25"
                                                                            cx={
                                                                                69
                                                                            }
                                                                            cy={
                                                                                69
                                                                            }
                                                                            r={
                                                                                69
                                                                            }
                                                                            fill="white"
                                                                        />
                                                                        <circle
                                                                            opacity="0.5"
                                                                            cx={
                                                                                69
                                                                            }
                                                                            cy={
                                                                                69
                                                                            }
                                                                            r={
                                                                                49
                                                                            }
                                                                            fill="white"
                                                                        />
                                                                        <circle
                                                                            cx={
                                                                                69
                                                                            }
                                                                            cy={
                                                                                69
                                                                            }
                                                                            r={
                                                                                28
                                                                            }
                                                                            fill="white"
                                                                        />
                                                                        <path
                                                                            d="M84 69L60.75 81.9904L60.75 56.0096L84 69Z"
                                                                            fill="#0DB02B"
                                                                        />
                                                                    </svg>
                                                                </a>
                                                            )}

                                                            {(hasTags ||
                                                                hasPublishDate ||
                                                                hasName ||
                                                                hasShortDesc) && (
                                                                <div className="content_block">
                                                                    {(hasTags ||
                                                                        hasPublishDate) && (
                                                                        <div className="top__block d-flex">
                                                                            {hasTags ? (
                                                                                <ul className="h5 heading fs-16 list-unstyled text-white">
                                                                                    {item?.tag_data?.type.map(
                                                                                        (
                                                                                            tag,
                                                                                            tagIndex
                                                                                        ) =>
                                                                                            tag?.name ? (
                                                                                                <li
                                                                                                    key={
                                                                                                        tagIndex
                                                                                                    }
                                                                                                >
                                                                                                    {
                                                                                                        tag.name
                                                                                                    }
                                                                                                </li>
                                                                                            ) : null
                                                                                    )}
                                                                                </ul>
                                                                            ) : null}
                                                                            {hasPublishDate ? (
                                                                                <div
                                                                                    className="publish__date fw-500 text-white"
                                                                                    dangerouslySetInnerHTML={{
                                                                                        __html: item.publish_date,
                                                                                    }}
                                                                                />
                                                                            ) : null}
                                                                        </div>
                                                                    )}
                                                                    {(hasName ||
                                                                        hasShortDesc) && (
                                                                        <div className="content__wrap text-white">
                                                                            {hasName ? (
                                                                                <h4
                                                                                    className="heading fw-600 fs-20  text-white"
                                                                                    dangerouslySetInnerHTML={{
                                                                                        __html: item.name,
                                                                                    }}
                                                                                />
                                                                            ) : null}
                                                                            {hasShortDesc ? (
                                                                                <p
                                                                                    dangerouslySetInnerHTML={{
                                                                                        __html: item
                                                                                            ?.template_fields
                                                                                            ?.short_description,
                                                                                    }}
                                                                                />
                                                                            ) : null}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {modalOpen && (
                <div className="client_modal" style={{ display: "block" }}>
                    <div
                        className="popup-bg"
                        onClick={handleCloseModal}
                        style={{ cursor: "pointer" }}
                    />
                    <div className="popup-content">
                        <div
                            className="close-btn"
                            onClick={handleCloseModal}
                            style={{ cursor: "pointer" }}
                        >
                            ✖
                        </div>
                        {isEmbed && modalVideo ? (
                            <iframe
                                id="video"
                                width="100%"
                                height="100%"
                                src={modalVideo}
                                frameBorder={0}
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                        ) : !isEmbed && modalVideo ? (
                            <video
                                id="video"
                                width="100%"
                                height="100%"
                                controls
                                autoPlay
                                style={{ background: "#000" }}
                            >
                                <source src={modalVideo} />
                                Your browser does not support the video tag.
                            </video>
                        ) : null}
                    </div>
                </div>
            )}
        </>
    );
};
