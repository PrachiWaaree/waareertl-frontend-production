"use client";
import { OptimizedImage } from "@/components";
import { getImageURL } from "@/lib";

export const OfficePageContact = ({ data = {}, slug="regional_contact" }) => {
    const { title, list = [] } = data;

    const items = [list[0], list[1], list[2]].filter(Boolean);

    return (
        <>
            <section className="regional_contact_section" id={slug}>
                <div className="custom-container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-12 col-md-12 col-lg-12 col-xl-10">
                            {title && (
                                <div className="section_header">
                                    <h4
                                        className="heading fs-48 text-center fw-300"
                                        dangerouslySetInnerHTML={{
                                            __html: title,
                                        }}
                                    />
                                </div>
                            )}
                            {items.length > 0 && (
                                <div className="regional_contact_inner">
                                    <div className="contact_col_wrap d-flex">
                                        {items.map(
                                            (item, idx) =>
                                                item && (
                                                    <div
                                                        className="contact_col"
                                                        key={idx}
                                                    >
                                                        <div
                                                            className={`employee_detail${
                                                                idx <
                                                                items.length - 1
                                                                    ? " v_seperator"
                                                                    : ""
                                                            }`}
                                                        >
                                                            <div className="emp_header">
                                                                {item?.employee_name && (
                                                                    <h3
                                                                        className="emp_name text-white fs-28 fw-400"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: item.employee_name,
                                                                        }}
                                                                    />
                                                                )}
                                                                {item?.designation && (
                                                                    <h4 className="emp_region text-white fs-20 fw-600">
                                                                        {item.designation
                                                                            .split(
                                                                                "|"
                                                                            )
                                                                            .map(
                                                                                (
                                                                                    part,
                                                                                    i
                                                                                ) => (
                                                                                    <span
                                                                                        key={
                                                                                            i
                                                                                        }
                                                                                        dangerouslySetInnerHTML={{
                                                                                            __html:
                                                                                                part.trim() +
                                                                                                (i ===
                                                                                                0
                                                                                                    ? " | "
                                                                                                    : ""),
                                                                                        }}
                                                                                    />
                                                                                )
                                                                            )}
                                                                    </h4>
                                                                )}
                                                            </div>
                                                            <div className="emp_body">
                                                                {item?.contact && (
                                                                    <div className="d-inline-flex align-items-center emp_contact fs-20">
                                                                        {item?.mobile_icon &&
                                                                            item
                                                                                .mobile_icon[0] && (
                                                                                <div className="icon__wrap">
                                                                                    <OptimizedImage
                                                                                        className="img-fluid"
                                                                                        src={getImageURL(
                                                                                            item
                                                                                                .mobile_icon[0]
                                                                                                ?.src
                                                                                        )}
                                                                                        alt={
                                                                                            item
                                                                                                .mobile_icon[0]
                                                                                                ?.alt ||
                                                                                            ""
                                                                                        }/>
                                                                                </div>
                                                                            )}
                                                                        <div className="content_wrap text-white">
                                                                            <a
                                                                                className="d-inline-flex"
                                                                                href={`tel:${item.contact.replace(
                                                                                    /[^0-9]/g,
                                                                                    ""
                                                                                )}`}
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html: item.contact,
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {item?.email && (
                                                                    <div className="d-inline-flex align-items-center emp_contact fs-20">
                                                                        {item?.email_icon &&
                                                                            item
                                                                                .email_icon[0] && (
                                                                                <div className="icon__wrap">
                                                                                    <OptimizedImage
                                                                                        className="img-fluid"
                                                                                        src={getImageURL(
                                                                                            item
                                                                                                .email_icon[0]
                                                                                                ?.src
                                                                                        )}
                                                                                        alt={
                                                                                            item
                                                                                                .email_icon[0]
                                                                                                ?.alt ||
                                                                                            ""
                                                                                        }/>
                                                                                </div>
                                                                            )}
                                                                        <div className="content_wrap text-white">
                                                                            <a
                                                                                className="d-inline-flex"
                                                                                href={`mailto:${item.email}`}
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html: item.email,
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
