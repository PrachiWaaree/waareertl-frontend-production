"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { OptimizedImage } from "@/components";
import { getImageURL } from "@/lib";
import {
    clearNonEssentialCookies,
    getCookieConsentStatus,
    setCookieConsentStatus,
} from "@/utilities/cookie-consent";


export const CommonFooter = ({ data = {} }) => {
    const {
        copyright,
        list = [],
        content_no,
        email,
        address,
        logo,
        ["social-link"]: socialLinks = [],
        terms_conditions,
        privacy_policy,
    } = data;

    const [showCookieBanner, setShowCookieBanner] = useState(false);

    useEffect(() => {
        const status = getCookieConsentStatus();
        if (!status) {
            const timer = setTimeout(() => {
                setShowCookieBanner(true);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptCookies = () => {
        setCookieConsentStatus("accepted");
        setShowCookieBanner(false);
    };

    const handleRejectCookies = () => {
        clearNonEssentialCookies();
        setCookieConsentStatus("rejected");
        setShowCookieBanner(false);
    };

    const handleCloseBanner = () => {
        handleRejectCookies();
    };


    function resolveLinkProps(link) {
        if (!link) {
            return {
                href: "#",
                target: undefined,
                rel: undefined,
            };
        }
        let href = "#";
        let target;
        let rel;
        if (link.url_type === "internal") {
            href = link.url ? `/${link.url.replace(/^\/+/, "")}` : "#";
            target = link.open_new_tab === "yes" ? "_blank" : undefined;
            rel =
                link.open_new_tab === "yes" ? "noopener noreferrer" : undefined;
        } else if (link.url_type === "external") {
            href = link.url || "#";
            target = "_blank";
            rel = "noopener noreferrer";
        } else {
            href = link.url || "#";
            target = link.open_new_tab === "yes" ? "_blank" : undefined;
            rel =
                link.open_new_tab === "yes" ? "noopener noreferrer" : undefined;
        }
        return { href, target, rel };
    }

    return (
        <>
            <footer className="footer">
                <div className="custom-container">
                    <div className="row footer-row">
                        <div className="col col-12 col-md-12 col-lg-3 col-xl-5 footer-left-col">
                            <div className="footer_company_info">
                                <div className="footer_logo">
                                    <Link href="/">
                                        <OptimizedImage
                                            className="img-fluid"
                                            src={getImageURL(logo?.src)}
                                            alt={logo?.alt || "Waare RTL"}
                                        />
                                    </Link>
                                </div>
                                <div className="footer_bottom">
                                    <div className="address">
                                        <ul className="address_list">
                                            <li>
                                                <div className="address_content fs-16">
                                                    <h5 className="h5 heading text-white fs-16 fw-600">
                                                        Registered Office
                                                    </h5>
                                                    <div className="content_wrap fs-16">
                                                        <p>{address}</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="address_content fs-16">
                                                    <h5 className="h5 heading text-white fs-16 fw-600">
                                                        Contact Us
                                                    </h5>
                                                    <div className="footer_call">
                                                        Toll Free -{" "}
                                                        <a
                                                            href={`tel:${content_no}`}
                                                        >
                                                            {content_no}
                                                        </a>
                                                    </div>
                                                    <div className="footer_email">
                                                        Email -{" "}
                                                        <a
                                                            href={`mailto:${email}`}
                                                        >
                                                            {email}
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {Array.isArray(list) &&
                            list.map((item, index) => (
                                <div
                                    className="col col-6 col-sm-4 col-md col-lg-auto col-xl"
                                    key={index.title || index}
                                >
                                    <div className="footer__nav">
                                        <h5 className="h5 heading text-white fs-18 fw-500">
                                            {item?.title}
                                        </h5>
                                        <ul className="footer_top_menu">
                                            {Array.isArray(item?.list) &&
                                                item.list.map(
                                                    (list_item, idx) => {
                                                        const { title, link } =
                                                            list_item || {};
                                                        const {
                                                            href,
                                                            target,
                                                            rel,
                                                        } =
                                                            resolveLinkProps(
                                                                link
                                                            );
                                                        const isInternal = link?.url_type === "internal";
                                                        return (
                                                            <li key={idx}>
                                                                {isInternal ? (
                                                                    <Link
                                                                        href={href}
                                                                        target={target}
                                                                        rel={rel}
                                                                    >
                                                                        {title}
                                                                    </Link>
                                                                ) : (
                                                                    <a
                                                                        href={href}
                                                                        target={target}
                                                                        rel={rel}
                                                                    >
                                                                        {title}
                                                                    </a>
                                                                )}
                                                            </li>
                                                        );
                                                    }
                                                )}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="seperator border--solid" />
                    <div className="row align-items-center copyright__row">
                        <div className="col-12 col-md-5">
                            <div className="social__menu">
                                <div className="heading fs-18 fw-600 text-white">
                                    Follow us on
                                </div>
                                <ul className="followus_menu">
                                    {Array.isArray(socialLinks) &&
                                        socialLinks.map((item, index) => {
                                            const { icon, link } = item || {};
                                            const { href, target, rel } =
                                                resolveLinkProps(link);
                                            return (
                                                <li key={index}>
                                                    <a
                                                        href={href}
                                                        target={target}
                                                        rel={rel}
                                                    >
                                                        <OptimizedImage
                                                            className="img-fluid"
                                                            src={getImageURL(
                                                                icon?.src
                                                            )}
                                                            alt={icon?.alt || ""}
                                                        />
                                                    </a>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-md-7">
                            <div className="copyright fs-18 fw-600 text-white d-flex">
                                <ul>
                                    {terms_conditions && (
                                        <li>
                                            <a
                                                href={terms_conditions.url}
                                                target={
                                                    terms_conditions.open_new_tab ===
                                                    "yes"
                                                        ? "_blank"
                                                        : "_self"
                                                }
                                                rel={
                                                    terms_conditions.open_new_tab ===
                                                    "yes"
                                                        ? "noopener noreferrer"
                                                        : undefined
                                                }
                                            >
                                                Terms &amp; Conditions
                                            </a>
                                        </li>
                                    )}
                                    {privacy_policy && (
                                        <li>
                                            <a
                                                href={privacy_policy.url}
                                                target={
                                                    privacy_policy.open_new_tab ===
                                                    "yes"
                                                        ? "_blank"
                                                        : "_self"
                                                }
                                                rel={
                                                    privacy_policy.open_new_tab ===
                                                    "yes"
                                                        ? "noopener noreferrer"
                                                        : undefined
                                                }
                                            >
                                                Privacy Policy
                                            </a>
                                        </li>
                                    )}
                                </ul>
                                <p>{copyright}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {showCookieBanner && (
                <div className="cookie-box">
                    <button
                        className="cookie-close"
                        onClick={handleCloseBanner}
                        aria-label="Close cookie banner"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M6 6L18 18M18 6L6 18"
                                stroke="#aaa"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>

                    <div className="row cookie_row">
                        <div className="cookie_left">
                            <div className="cookie_img">
                                <OptimizedImage src="/cookie-img.png" alt="cookies" />
                            </div>
                        </div>

                        <div className="cookie_right">
                            <div className="cookie_content">
                                <div className="cookie_content_row">
                                    <div className="cookie_content_left">
                                        <h3 className="fs-28">
                                            We use cookies
                                        </h3>
                                        <p>
                                            This website uses cookies to improve
                                            your experience, analyze traffic,
                                            and personalize content. By clicking{" "}
                                            <strong>&quot;Accept&quot;</strong>, you agree
                                            to our use of cookies.{" "}
                                            <span>
                                                <Link
                                                    className="primary_text_btn"
                                                    href="/privacy-policy"
                                                >
                                                    Privacy Policy
                                                </Link>
                                            </span>
                                        </p>
                                    </div>

                                    <div className="cookie_content_right">
                                        <div className="cookie-buttons">
                                            <button
                                                className="primary_btn accept-btn"
                                                onClick={handleAcceptCookies}
                                            >
                                                <span className="btn_text">
                                                    Accept All
                                                </span>
                                            </button>

                                            <button
                                                className="primary_btn reject-btn"
                                                onClick={handleRejectCookies}
                                            >
                                                Reject Cookies
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>

    );
};
