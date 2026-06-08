"use client";

//
import { ErrorMessage, Button } from "@/components";
import { getAbsoluteURL, getImageURL } from "@/lib";
import { cleanSEOTags } from "@/utilities";

export const InvestorDiscloser = ({
    data = {},
    slug = "disclosure_regulation_table",
}) => {
    const { row_heading = [], row_description = [] } = data;
    let counter = 0;
    const renderLinkCell = (row) => {
        const columnTwo = row?.column_two?.[0];
        const files = columnTwo?.files;
        const links = columnTwo?.links;

        const hasFile = files && files.src;
        const hasLink = links && (links.url || links.url_1);

        if (hasFile) {
            const pdfUrl = getImageURL(files.src);
            const buttonUrl = links?.url || pdfUrl || "#";
            return (
                <div className="pdf_icon_inner d-flex justify-content-center align-items-center gap-2">
                    <div>
                        <Button
                            role="button"
                            label="Link"
                            as="a"
                            href={getAbsoluteURL(buttonUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            srText={`for ${cleanSEOTags(row?.column_one) || "particulars"}`}
                        />
                    </div>
                </div>
            );
        }
        if (hasLink) {
            const buttonUrl = links.url || links.url_1 || "#";
            const openNewTab = links?.open_new_tab === "yes";
            return (
                <Button
                    role="button"
                    label="Link"
                    as="a"
                    href={getAbsoluteURL(buttonUrl)}
                    target={openNewTab ? "_blank" : undefined}
                    rel={openNewTab ? "noopener noreferrer" : undefined}
                    srText={`for ${cleanSEOTags(row?.column_one) || "particulars"}`}
                />
            );
        }
        return "Not Applicable";
    };

    return (
        <>
            <div
                className="team__section governance_table_tabing disclosure__table"
                id={slug}
            >
                <div className="custom-container">
                    <div
                        className="item__tab_data tab-active"
                        data-id="quarterly-corporate-one"
                    >
                        <div className="table_quarterly_corporate">
                            <table className="fs-20 fw-600">
                                <thead>
                                    <tr>
                                        <th>SR. No.</th>
                                        <th
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    cleanSEOTags(row_heading?.[0]
                                                        ?.column_name) ||
                                                    "Particulars as per LODR",
                                            }}
                                        />

                                        <th
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    cleanSEOTags(row_heading?.[1]
                                                        ?.column_name) || "Link",
                                            }}
                                        />
                                    </tr>
                                </thead>
                                <tbody>
                                

                                        {Array.isArray(row_description) && row_description.length > 0 ? (
                                        row_description.map((row, idx) => {
                                            if (!row?.column_one) return null;

                                            counter++;

                                            return (
                                            <tr key={idx}>
                                                <td>{counter}.</td>
                                                <td
                                                dangerouslySetInnerHTML={{
                                                    __html: cleanSEOTags(row.column_one) || "-",
                                                }}
                                                />
                                                <td>{renderLinkCell(row)}</td>
                                            </tr>
                                            );
                                        })
                                        ) : (
                                        <tr>
                                            <td colSpan={3} className="text-center">
                                            <ErrorMessage>No data available</ErrorMessage>
                                            </td>
                                        </tr>
                                        )}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
