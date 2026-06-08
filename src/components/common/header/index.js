"use client";
/* eslint-disable no-unused-vars */

import * as yup from "yup";
import { getImageURL } from "@/lib";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Collapse, Fade } from "@/components/transitions";
import { getCookie, setCookie } from "@/utilities/set-lang";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { API_ENDPOINTS } from "@/config";
import { POST_REQUEST, cleanSEOTags } from "@/utilities";
import { OptimizedImage } from "@/components";
import { useCommonContext } from "@/contexts";

const normalizeMenuItems = (items = []) => {
    if (!Array.isArray(items)) {
        return [];
    }

    return items
        .map((item = {}) => {
            const normalizedSubmenu = normalizeMenuItems(item?.submenu);
            const title = item?.link?.title?.toString()?.trim?.() || "";
            const url = item?.link?.url?.toString()?.trim?.() || "";
            const hasLink = Boolean(title || url);

            if (!hasLink && normalizedSubmenu.length === 0) {
                return null;
            }

            return {
                ...item,
                link: {
                    ...item?.link,
                    title,
                    url,
                },
                submenu: normalizedSubmenu,
            };
        })
        .filter(Boolean);
};

export const CommonHeader = ({ data = {} }) => {
    const { logo, menu, ["secondary-menu"]: secondaryMenu } = data;
    const normalizedMenu = useMemo(() => normalizeMenuItems(menu), [menu]);
    const normalizedSecondaryMenu = useMemo(
        () => normalizeMenuItems(secondaryMenu),
        [secondaryMenu],
    );
    const [levelActive, setLevelActive] = useState({ 1: "", 2: "", 3: "" }); // --- IGNORE ---

    const searchParams = useSearchParams();
    const methods = useForm({
        defaultValues: {
            search: searchParams?.get("search") || "",
        },
        resolver: yupResolver(
            yup.object().shape({
                search: yup.string().min(3).required(),
            }),
        ),
    });

    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const [currentLang, setCurrentLang] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loadingSuggestions, setLoadingSuggestions] = useState(false);
    const [redirecting, setRedirecting] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);
    const [showRecentSearches, setShowRecentSearches] = useState(false);

    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const closeMenu = useCallback(() => setMenuOpen(false), []);

    const activeInactiveMenu = (index, title) => {
        setLevelActive((prevState) => {
            let data = { ...prevState };

            // set clicked level
            if (data[index] != title) {
                data[index] = title;
            } else {
                data[index] = "";
            }

            // reset all next levels
            const totalLevels = Object.keys(prevState).length;
            for (let i = index + 1; i <= totalLevels; i++) {
                data[i] = "";
            }

            return data;
        });
    };

    const handleActionClick = useCallback(
        async (action = "") => {
            switch (action) {
                case "get_lang":
                    return (await getCookie("lang"))?.value;

                case "lang_change": {
                    const newLang = currentLang === "en" ? "ar" : "en";

                    await setCookie("lang", newLang);
                    setCurrentLang(newLang);
                    router.refresh();

                    break;
                }
            }
        },
        [currentLang, router],
    );

    const getLanguage = useCallback(async () => {
        setCurrentLang(await handleActionClick("get_lang"));
    }, [handleActionClick]);

    useEffect(() => {
        setIsMounted(true);
        if (typeof window !== "undefined") {
            const handleScroll = () => {
                const scrollPosition = window.scrollY;
                setIsScrolled(scrollPosition > 50);
            };

            window.addEventListener("scroll", handleScroll);

            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }
    }, []);

    useEffect(() => {
        if (typeof document !== "undefined") {
            document.body.style.overflow = menuOpen ? "hidden" : "inherit";
        }
    }, [menuOpen]);

    useEffect(() => {
        getLanguage();
        setRecentSearches(getRecentSearches());
    }, [getLanguage]);

    const RECENT_SEARCHES_KEY = "waaree_recent_searches";
    const MAX_RECENT_SEARCHES = 10;

    const getRecentSearches = () => {
        if (typeof window === "undefined") return [];
        try {
            const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error("Error reading recent searches:", error);
            return [];
        }
    };

    const saveRecentSearch = (searchTerm) => {
        if (typeof window === "undefined" || !searchTerm?.trim()) return;

        try {
            const currentSearches = getRecentSearches();
            const trimmedTerm = searchTerm.trim();

            const filteredSearches = currentSearches.filter(
                (term) => term !== trimmedTerm,
            );
            const newSearches = [trimmedTerm, ...filteredSearches].slice(
                0,
                MAX_RECENT_SEARCHES,
            );

            localStorage.setItem(
                RECENT_SEARCHES_KEY,
                JSON.stringify(newSearches),
            );
            setRecentSearches(newSearches);
        } catch (error) {
            console.error("Error saving recent search:", error);
        }
    };

    const clearRecentSearches = () => {
        if (typeof window === "undefined") return;
        try {
            localStorage.removeItem(RECENT_SEARCHES_KEY);
            setRecentSearches([]);
        } catch (error) {
            console.error("Error clearing recent searches:", error);
        }
    };

    const fetchSearchSuggestions = useCallback(
        async (searchTerm) => {
            if (
                !searchTerm ||
                searchTerm.length < 2 ||
                redirecting ||
                !searchActive
            ) {
                setSearchSuggestions([]);
                setShowSuggestions(false);
                return;
            }

            setLoadingSuggestions(true);

            try {
                const response = await POST_REQUEST(API_ENDPOINTS["SEARCH"], {
                    lang: currentLang || "en",
                    name: searchTerm.trim(),
                    page: 1,
                    limit: 7,
                    search: true,
                });

                if (!redirecting && searchActive) {
                    setShowSuggestions(true);

                    if (
                        response?.list &&
                        Array.isArray(response.list) &&
                        response.list.length > 0
                    ) {
                        const validSuggestions = response.list.filter(
                            (item) => item && item.name && item.slug,
                        );
                        setSearchSuggestions(validSuggestions);
                    } else {
                        setSearchSuggestions([]);
                    }
                }
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                if (!redirecting && searchActive) {
                    setSearchSuggestions([]);
                    setShowSuggestions(true);
                }
            } finally {
                if (!redirecting && searchActive) {
                    setLoadingSuggestions(false);
                }
            }
        },
        [currentLang, redirecting, searchActive],
    );

    const searchTimeoutRef = useRef(null);

    const debouncedSearch = useCallback(
        (searchTerm) => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }

            if (redirecting || !searchActive) {
                return;
            }

            searchTimeoutRef.current = setTimeout(() => {
                if (
                    !redirecting &&
                    searchActive &&
                    searchTerm &&
                    searchTerm.length >= 2
                ) {
                    fetchSearchSuggestions(searchTerm);
                }
            }, 300);
        },
        [fetchSearchSuggestions, redirecting, searchActive],
    );

    const [trackingSuggestionClick, setTrackingSuggestionClick] =
        useState(false);

    const handleSuggestionClick = async (suggestion, url, routerPush) => {
        if (trackingSuggestionClick) return;
        setTrackingSuggestionClick(true);

        setShowSuggestions(false);
        setShowRecentSearches(false);
        methods.setValue("search", suggestion.name);
        saveRecentSearch(suggestion.name);

        setRedirecting(true);

        if (routerPush) {
            routerPush(url);
        } else if (url) {
            window.location.href = url;
        }
    };

    const handleSearchInputChange = (e) => {
        try {
            const value = e.target.value;

            methods.setValue("search", value);

            if (!value || value.length < 2) {
                setSearchSuggestions([]);
                setShowSuggestions(false);
                if (recentSearches.length > 0) {
                    setShowRecentSearches(true);
                } else {
                    setShowRecentSearches(false);
                }
                return;
            }

            setShowRecentSearches(false);

            if (!redirecting) {
                debouncedSearch(value);
            }
        } catch (error) {
            console.error("Error in search input change:", error);
        }
    };

    const handleSearchBlur = () => {
        setTimeout(() => {
            setShowSuggestions(false);
            setShowRecentSearches(false);
        }, 200);
    };

    const handleRecentSearchClick = async (searchTerm) => {
        methods.setValue("search", searchTerm);
        setShowRecentSearches(false);
        setShowSuggestions(false);

        if (trackingSuggestionClick) return;
        setTrackingSuggestionClick(true);

        setRedirecting(true);

        try {
            const response = await POST_REQUEST(API_ENDPOINTS["SEARCH"], {
                lang: currentLang || "en",
                name: searchTerm.trim(),
                page: 1,
                limit: 1,
                search: true,
            });

            if (
                response?.list &&
                Array.isArray(response.list) &&
                response.list.length > 0
            ) {
                const suggestion = response.list[0];

                if (suggestion && suggestion.name && suggestion.slug) {
                    const url = suggestion.slug?.startsWith("/")
                        ? suggestion.slug
                        : `/${suggestion.slug}`;

                    if (typeof window !== "undefined") {
                        window.location.href = url;
                    }
                    return;
                }
            }

            const query = new URLSearchParams({
                search: searchTerm.trim(),
                page: 1,
            });
            const url = `/search/?${query.toString()}`;

            if (typeof window !== "undefined") {
                window.location.href = url;
            }
        } catch (error) {
            console.error(
                "Error fetching suggestions for recent search:",
                error,
            );

            const query = new URLSearchParams({
                search: searchTerm.trim(),
                page: 1,
            });
            const url = `/search/?${query.toString()}`;

            if (typeof window !== "undefined") {
                window.location.href = url;
            }
        }
    };

    useEffect(() => {
        if (!searchActive) {
            setShowSuggestions(false);
            setShowRecentSearches(false);
            setSearchSuggestions([]);
            setLoadingSuggestions(false);
            setRedirecting(false);
            methods.setValue("search", "");
        }
    }, [searchActive, methods]);

    useEffect(() => {
        if (typeof document !== "undefined") {
            if (redirecting) {
                document.body.style.overflow = "hidden";
                document.body.style.position = "fixed";
                document.body.style.top = `-${window.scrollY}px`;
                document.body.style.width = "100%";
            } else {
                const scrollY = document.body.style.top;
                document.body.style.overflow = "";
                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.width = "";
                if (scrollY) {
                    window.scrollTo(0, parseInt(scrollY || "0") * -1);
                }
            }
        }

        return () => {
            if (typeof document !== "undefined") {
                document.body.style.overflow = "";
                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.width = "";
            }
        };
    }, [redirecting]);

    const handleSearchSubmit = methods["handleSubmit"](async (data) => {
        const query = new URLSearchParams({
            search: data?.search?.trim(),
            page: 1,
        });

        const url = `/search/?${query}`;

        saveRecentSearch(data?.search);
        router.push(url);

        setSearchActive(false);
    });

    return (
        <nav className={`navbar white__bg ${isScrolled ? "fixed-top" : ""}`}>
            <div className="custom-container">
                <div className="navbar_wrap">
                    <Link className="header_logo" href="/">
                        <OptimizedImage
                            className="img-fluid"
                            src={getImageURL(logo?.src)}
                            alt={logo?.alt || "Logo"}
                        />
                    </Link>
                    <div className="nav_wrapper">
                        <div
                            className={`aside-menu ${menuOpen ? "active" : ""}`}
                        >
                            {/* <ul className={`menu ${menuOpen ? "active" : ""}`}>
                                {normalizedMenu?.map((item, index) => (
                                    <RenderMenu
                                        item={item}
                                        level={1}
                                        key={index}
                                        activeInactiveMenu={activeInactiveMenu}
                                        levelActive={levelActive}
                                    />
                                ))}

                                <li
                                    className={`aside__menu ${
                                        menuOpen ? "active" : ""
                                    }`}
                                >
                                    <RenderSidebarMenu
                                        level={1}
                                        items={secondaryMenu}
                                        activeInactiveMenu={activeInactiveMenu}
                                        levelActive={levelActive}
                                    />
                                </li>
                            </ul> */}

                            <ul className={`menu ${menuOpen ? "active" : ""}`}>
                                {normalizedMenu?.map((item, index) => (
                                    <RenderMenu
                                        item={item}
                                        level={1}
                                        key={index}
                                        activeInactiveMenu={activeInactiveMenu}
                                        levelActive={levelActive}
                                    />
                                ))}

                                {normalizedSecondaryMenu.length > 0 ? (
                                    <li
                                        className={`aside__menu ${
                                            menuOpen ? "active" : ""
                                        }`}
                                    >
                                        <RenderSidebarMenu
                                            level={1}
                                            items={normalizedSecondaryMenu}
                                            activeInactiveMenu={
                                                activeInactiveMenu
                                            }
                                            levelActive={levelActive}
                                        />
                                    </li>
                                ) : (
                                    ""
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="shop_menu nav__icon_menu lg">
                        <a className="stock__item" href="javascript:void(0);">
                            WAAREEENER <span>₹2,683.80</span>
                            <span className="icon_wrap">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={8}
                                    height={15}
                                    viewBox="0 0 8 15"
                                    fill="none"
                                >
                                    <path
                                        d="M4.35355 0.646446C4.15829 0.451184 3.84171 0.451184 3.64645 0.646446L0.464466 3.82843C0.269203 4.02369 0.269203 4.34027 0.464466 4.53553C0.659728 4.7308 0.97631 4.7308 1.17157 4.53553L4 1.70711L6.82843 4.53553C7.02369 4.7308 7.34027 4.7308 7.53553 4.53553C7.7308 4.34027 7.7308 4.02369 7.53553 3.82843L4.35355 0.646446ZM4 15L4.5 15L4.5 1L4 1L3.5 1L3.5 15L4 15Z"
                                        fill="#0DB02B"
                                    />
                                </svg>
                            </span>
                        </a>
                        <ul>
                            <li>
                                <a
                                    href={isMounted ? `/${
                                        currentLang === "en" ? "ar" : "en"
                                    }` : "#"}
                                    aria-label={isMounted ? (currentLang === "en" ? "Switch to Arabic" : "Switch to English") : "Switch Language"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleActionClick("lang_change");
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="26"
                                        height="26"
                                        viewBox="0 0 26 26"
                                        fill="none"
                                    >
                                        <path
                                            d="M22.1018 19.0144C22.6443 18.1951 23.0794 17.2978 23.3866 16.3427C23.7243 15.2928 23.9067 14.1697 23.9067 13C23.9067 11.8369 23.727 10.721 23.3942 9.67834C23.0926 8.7335 22.6644 7.84319 22.1292 7.02725C20.8322 7.51818 19.4322 7.90812 17.9552 8.17999C16.3741 8.47101 14.7116 8.62692 13 8.62692C11.2884 8.62692 9.62598 8.47101 8.04484 8.17999C6.56786 7.90812 5.16793 7.51818 3.87083 7.02725C3.33568 7.8432 2.9074 8.73351 2.60573 9.6784C2.27294 10.7211 2.09328 11.8369 2.09328 13C2.09328 14.1697 2.27571 15.2928 2.61339 16.3426C2.9206 17.2977 3.35566 18.1951 3.89818 19.0144C5.19268 18.5265 6.58894 18.139 8.06133 17.869C9.63769 17.5799 11.2946 17.4251 13 17.4251C14.7055 17.4251 16.3624 17.58 17.9388 17.869C19.4111 18.139 20.8073 18.5265 22.1018 19.0144ZM24.4244 16.6758C24.0436 17.8595 23.4835 18.9636 22.7761 19.9561C22.6414 20.1849 22.3563 20.2874 22.1022 20.1858C20.76 19.649 19.2957 19.2258 17.7423 18.941C16.2418 18.6658 14.6513 18.5184 12.9999 18.5184C11.3487 18.5184 9.75822 18.6658 8.25772 18.9409C6.7182 19.2233 5.26612 19.64 3.93372 20.17C3.6988 20.2845 3.40862 20.2167 3.25088 19.9973C2.52992 18.9945 1.96148 17.8755 1.57559 16.6757C1.20185 15.5138 1 14.2785 1 13C1 11.732 1.19908 10.5052 1.56799 9.3496C1.94506 8.16834 2.4984 7.06831 3.19667 6.08075C3.33233 5.85404 3.6163 5.75317 3.8692 5.85476C5.21502 6.39534 6.68319 6.82124 8.2413 7.10804C9.74681 7.38518 11.3429 7.53366 13 7.53366C14.6571 7.53366 16.2532 7.38518 17.7587 7.10804C19.3028 6.82385 20.7591 6.40417 22.095 5.87058C22.3309 5.75522 22.6223 5.82391 22.7797 6.0448C23.4897 7.04129 24.0505 8.15441 24.432 9.34954C24.8009 10.5052 25 11.732 25 13C25 14.2785 24.7981 15.5138 24.4244 16.6758Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M22.1022 20.1858C22.3563 20.2874 22.6414 20.1849 22.7761 19.9561C23.4835 18.9636 24.0436 17.8595 24.4244 16.6758C24.7981 15.5138 25 14.2785 25 13C25 11.732 24.8009 10.5052 24.432 9.34954C24.0505 8.15441 23.4897 7.04129 22.7797 6.0448M22.1022 20.1858L22.3053 19.6783M22.1022 20.1858C20.76 19.649 19.2957 19.2258 17.7423 18.941C16.2418 18.6658 14.6513 18.5184 12.9999 18.5184C11.3487 18.5184 9.75822 18.6658 8.25772 18.9409C6.7182 19.2233 5.26612 19.64 3.93372 20.17C3.6988 20.2845 3.40862 20.2167 3.25088 19.9973C2.52992 18.9945 1.96148 17.8755 1.57559 16.6757C1.20185 15.5138 1 14.2785 1 13C1 11.732 1.19908 10.5052 1.56799 9.3496C1.94506 8.16834 2.4984 7.06831 3.19667 6.08075C3.33233 5.85404 3.6163 5.75317 3.8692 5.85476C5.21502 6.39534 6.68319 6.82124 8.2413 7.10804C9.74681 7.38518 11.3429 7.53366 13 7.53366C14.6571 7.53366 16.2532 7.38518 17.7587 7.10804C19.3028 6.82385 20.7591 6.40417 22.095 5.87058C22.3309 5.75522 22.6223 5.82391 22.7797 6.0448M22.7797 6.0448L22.3345 6.362M22.1018 19.0144C22.6443 18.1951 23.0794 17.2978 23.3866 16.3427C23.7243 15.2928 23.9067 14.1697 23.9067 13C23.9067 11.8369 23.727 10.721 23.3942 9.67834C23.0926 8.7335 22.6644 7.84319 22.1292 7.02725C20.8322 7.51818 19.4322 7.90812 17.9552 8.17999C16.3741 8.47101 14.7116 8.62692 13 8.62692C11.2884 8.62692 9.62598 8.47101 8.04484 8.17999C6.56786 7.90812 5.16793 7.51818 3.87083 7.02725C3.33568 7.8432 2.9074 8.7335 2.60573 9.6784C2.27294 10.7211 2.09328 11.8369 2.09328 13C2.09328 14.1697 2.27571 15.2928 2.61339 16.3426C2.9206 17.2977 3.35566 18.1951 3.89818 19.0144C5.19268 18.5265 6.58894 18.139 8.06133 17.869C9.63769 17.5799 11.2946 17.4251 13 17.4251C14.7055 17.4251 16.3624 17.58 17.9388 17.869C19.4111 18.139 20.8073 18.5265 22.1018 19.0144Z"
                                            stroke="white"
                                            strokeWidth="0.5"
                                        />
                                        <path
                                            d="M21.4595 6.11259C20.5141 4.95297 19.335 3.99126 17.9938 3.29943C16.4995 2.52859 14.8019 2.09332 13.0004 2.09332C11.1988 2.09332 9.50114 2.52859 8.00684 3.29943C6.66567 3.99127 5.48652 4.95298 4.54119 6.11259C5.69915 6.53222 6.93917 6.86828 8.2416 7.10803C9.74717 7.38517 11.3433 7.53365 13.0004 7.53365C14.6575 7.53365 16.2536 7.38517 17.7591 7.10803C19.0616 6.86828 20.3016 6.53222 21.4595 6.11259ZM18.4935 2.33001C20.1883 3.20427 21.648 4.47081 22.7529 6.00955C22.7894 6.05294 22.8198 6.10271 22.8421 6.15825C22.9547 6.43834 22.8188 6.75671 22.5386 6.86923C21.1287 7.43555 19.5888 7.87932 17.9555 8.17999C16.3744 8.471 14.7119 8.62691 13.0003 8.62691C11.2888 8.62691 9.62631 8.471 8.04517 8.17999C6.42665 7.88204 4.90061 7.44238 3.50113 6.88332C3.44792 6.86651 3.39649 6.84126 3.34866 6.8072C3.10276 6.63203 3.04544 6.29064 3.22061 6.04479C4.32851 4.48973 5.79912 3.2111 7.50715 2.32996C9.15491 1.48 11.0227 1.00001 13.0004 1.00001C14.978 1.00001 16.8457 1.47999 18.4935 2.33001Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M22.5386 6.86923C22.8188 6.75671 22.9547 6.43834 22.8421 6.15825C22.8198 6.10271 22.7894 6.05294 22.7529 6.00955C21.648 4.47081 20.1883 3.20427 18.4935 2.33001C16.8457 1.47999 14.978 1.00001 13.0004 1.00001C11.0227 1.00001 9.15491 1.48 7.50715 2.32996C5.79912 3.2111 4.32851 4.48973 3.22061 6.04479C3.04544 6.29064 3.10276 6.63203 3.34866 6.8072C3.39649 6.84126 3.44792 6.86651 3.50113 6.88332C4.90061 7.44238 6.42665 7.88204 8.04517 8.17999C9.62631 8.471 11.2888 8.62691 13.0004 8.62691C14.7119 8.62691 16.3744 8.471 17.9555 8.17999C19.5888 7.87932 21.1287 7.43555 22.5386 6.86923ZM22.5386 6.86923L22.3349 6.36199M21.4595 6.11259C20.5141 4.95297 19.335 3.99126 17.9938 3.29943C16.4995 2.52859 14.8019 2.09332 13.0004 2.09332C11.1988 2.09332 9.50114 2.52859 8.00684 3.29943C6.66567 3.99127 5.48652 4.95298 4.54119 6.11259C5.69915 6.53222 6.93917 6.86828 8.2416 7.10803C9.74717 7.38517 11.3433 7.53365 13.0004 7.53365C14.6575 7.53365 16.2536 7.38517 17.7591 7.10803C19.0616 6.86828 20.3016 6.53222 21.4595 6.11259Z"
                                            stroke="white"
                                            strokeWidth="0.5"
                                        />
                                        <path
                                            d="M12.9985 23.9067C14.793 23.9067 16.4834 23.4757 17.9718 22.7119C19.3053 22.0276 20.4798 21.0759 21.4249 19.9275C20.2717 19.5118 19.0373 19.1787 17.7408 18.941C16.2402 18.6658 14.6498 18.5184 12.9985 18.5184C11.3473 18.5184 9.75675 18.6658 8.25618 18.941C6.95974 19.1787 5.72527 19.5117 4.5721 19.9275C5.51721 21.0759 6.69176 22.0276 8.02527 22.7119C9.51363 23.4757 11.2039 23.9067 12.9985 23.9067ZM18.4671 23.6813C16.8245 24.5243 14.9653 25 12.9985 25C11.0317 25 9.17255 24.5243 7.52983 23.6813C5.84151 22.8149 4.38582 21.5607 3.28063 20.0369C3.24151 19.9919 3.20911 19.9397 3.1857 19.8813C3.07362 19.601 3.21 19.2828 3.4903 19.1707C4.89722 18.6081 6.43225 18.1675 8.05976 17.869C9.63612 17.5799 11.2931 17.4251 12.9985 17.4251C14.7039 17.4251 16.3608 17.5799 17.9372 17.869C19.5498 18.1647 21.071 18.6013 22.4673 19.1566C22.5216 19.1736 22.5741 19.1994 22.6229 19.2344C22.8679 19.4107 22.9238 19.7523 22.7476 19.9974C21.6388 21.5395 20.1704 22.8073 18.4671 23.6813Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M22.7476 19.9974C22.9238 19.7523 22.8679 19.4107 22.6229 19.2344C22.5741 19.1994 22.5216 19.1736 22.4673 19.1566C21.071 18.6013 19.5498 18.1647 17.9372 17.869C16.3608 17.5799 14.7039 17.4251 12.9985 17.4251C11.2931 17.4251 9.63612 17.5799 8.05976 17.869C6.43225 18.1675 4.89722 18.6081 3.4903 19.1707C3.21 19.2828 3.07362 19.601 3.1857 19.8813C3.20911 19.9397 3.24151 19.9919 3.28063 20.0369C4.38582 21.5607 5.84151 22.8149 7.52983 23.6813C9.17255 24.5243 11.0317 25 12.9985 25C14.9653 25 16.8245 24.5243 18.4671 23.6813C20.1704 22.8073 21.6388 21.5395 22.7476 19.9974ZM22.7476 19.9974L22.3038 19.6782M12.9985 23.9067C14.793 23.9067 16.4834 23.4757 17.9718 22.7119C19.3053 22.0276 20.4798 21.0759 21.4249 19.9275C20.2717 19.5118 19.0373 19.1787 17.7408 18.941C16.2402 18.6658 14.6498 18.5184 12.9985 18.5184C11.3473 18.5184 9.75675 18.6658 8.25618 18.941C6.95974 19.1787 5.72527 19.5117 4.5721 19.9275C5.51721 21.0759 6.69176 22.0276 8.02527 22.7119C9.51363 23.4757 11.2039 23.9067 12.9985 23.9067Z"
                                            stroke="white"
                                            strokeWidth="0.5"
                                        />
                                        <path
                                            d="M18.1688 13C18.1688 9.92253 17.5512 7.14593 16.5528 5.14472C15.6122 3.25942 14.3539 2.09337 13.0012 2.09337C11.6484 2.09337 10.3901 3.25943 9.44958 5.14472C8.45114 7.14593 7.83355 9.92253 7.83355 13C7.83355 16.0775 8.45114 18.8541 9.44958 20.8553C10.3901 22.7406 11.6484 23.9066 13.0012 23.9066C14.3539 23.9066 15.6122 22.7406 16.5528 20.8553C17.5512 18.8541 18.1688 16.0775 18.1688 13ZM17.5307 4.65791C18.6004 6.80193 19.2621 9.75203 19.2621 13C19.2621 16.248 18.6004 19.1981 17.5307 21.3421C16.4032 23.6021 14.8042 25 13.0012 25C11.1981 25 9.59909 23.6021 8.47156 21.3421C7.40193 19.1981 6.74023 16.248 6.74023 13C6.74023 9.75202 7.40194 6.80193 8.47156 4.65791C9.59911 2.39788 11.1981 1.00006 13.0012 1.00006C14.8042 1.00006 16.4032 2.39788 17.5307 4.65791Z"
                                            fill="white"
                                            stroke="white"
                                            strokeWidth="0.5"
                                        />
                                        <path
                                            d="M13.5484 1.54663C13.5484 1.24474 13.3037 1 13.0018 1C12.6999 1 12.4551 1.24474 12.4551 1.54663V24.4534C12.4551 24.7552 12.6999 25 13.0018 25C13.3037 25 13.5484 24.7552 13.5484 24.4534V1.54663Z"
                                            fill="white"
                                            stroke="white"
                                            strokeWidth="0.5"
                                        />
                                        <path
                                            d="M1.54663 12.4534C1.24474 12.4534 1 12.6981 1 13C1 13.3019 1.24474 13.5466 1.54663 13.5466H24.4534C24.7552 13.5466 25 13.3019 25 13C25 12.6981 24.7552 12.4534 24.4534 12.4534H1.54663Z"
                                            fill="white"
                                            stroke="white"
                                            strokeWidth="0.5"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#!"
                                    aria-label={searchActive ? "Close Search" : "Open Search"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSearchActive(!searchActive);
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={26}
                                        height={26}
                                        viewBox="0 0 26 26"
                                        fill="none"
                                    >
                                        <path
                                            d="M11.6667 5C15.3485 5 18.3333 7.98477 18.3333 11.6667M19.2117 19.2065L25 25M22.3333 11.6667C22.3333 17.5577 17.5577 22.3333 11.6667 22.3333C5.77563 22.3333 1 17.5577 1 11.6667C1 5.77563 5.77563 1 11.6667 1C17.5577 1 22.3333 5.77563 22.3333 11.6667Z"
                                            stroke="white"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li
                                className={`mobile_toggle_menu ${
                                    normalizedSecondaryMenu.length <= 0
                                        ? "mobile-toggle-menu"
                                        : ""
                                }`}
                            >
                                <a
                                    className="nav_toggler"
                                    onClick={toggleMenu}
                                    role="button"
                                    aria-label="Toggle Navigation Menu"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={26}
                                        height={16}
                                        viewBox="0 0 26 16"
                                        fill="none"
                                    >
                                        <path
                                            d="M6 8L20 8"
                                            stroke="white"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M1 1H25"
                                            stroke="white"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M1 15H25"
                                            stroke="white"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <button
                        className="nav_toggle"
                        onClick={toggleMenu}
                        type="button"
                        aria-label="Toggle Navigation Menu"
                    >
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </button>

                    <button
                        className={`nav_close ${menuOpen ? "active" : ""}`}
                        type="button"
                        onClick={toggleMenu}
                    >
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16.3394 9.32245C16.7434 8.94589 16.7657 8.31312 16.3891 7.90911C16.0126 7.50509 15.3798 7.48283 14.9758 7.85938L12.0497 10.5866L9.32245 7.66048C8.94589 7.25647 8.31312 7.23421 7.90911 7.61076C7.50509 7.98731 7.48283 8.62008 7.85938 9.0241L10.5866 11.9502L7.66048 14.6775C7.25647 15.054 7.23421 15.6868 7.61076 16.0908C7.98731 16.4948 8.62008 16.5171 9.0241 16.1405L11.9502 13.4133L14.6775 16.3394C15.054 16.7434 15.6868 16.7657 16.0908 16.3891C16.4948 16.0126 16.5171 15.3798 16.1405 14.9758L13.4133 12.0497L16.3394 9.32245Z"
                                fill="currentColor"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <Fade show={searchActive} duration={0.2} unmountOnExit>
                <div className={`search-form-main active-search`}>
                    <div className="search-cross">
                        <button
                            type="button"
                            className="search-main search_btn"
                            data-faitracker-form-bind="true"
                            onClick={() => setSearchActive(false)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={45}
                                height={45}
                                viewBox="0 0 45 45"
                                fill="none"
                            >
                                <path
                                    d="M12.5438 30.5455C12.0166 31.0727 12.0166 31.9273 12.5438 32.4545C13.071 32.9818 13.9258 32.9818 14.453 32.4545L12.5438 30.5455ZM23.453 23.4545C23.9802 22.9273 23.9802 22.0727 23.453 21.5455C22.9258 21.0182 22.0711 21.0182 21.5439 21.5455L23.453 23.4545ZM21.5439 21.5455C21.0167 22.0727 21.0167 22.9273 21.5439 23.4545C22.0711 23.9818 22.9258 23.9818 23.453 23.4545L21.5439 21.5455ZM32.453 14.4546C32.9802 13.9274 32.9802 13.0726 32.453 12.5454C31.9258 12.0182 31.0711 12.0182 30.5439 12.5454L32.453 14.4546ZM23.453 21.5455C22.9258 21.0182 22.0711 21.0182 21.5439 21.5455C21.0167 22.0727 21.0167 22.9273 21.5439 23.4545L23.453 21.5455ZM30.5439 32.4545C31.0711 32.9818 31.9258 32.9818 32.453 32.4545C32.9802 31.9273 32.9802 31.0727 32.453 30.5455L30.5439 32.4545ZM21.5439 23.4545C22.0711 23.9818 22.9258 23.9818 23.453 23.4545C23.9802 22.9273 23.9802 22.0727 23.453 21.5455L21.5439 23.4545ZM14.453 12.5454C13.9258 12.0182 13.071 12.0182 12.5438 12.5454C12.0166 13.0726 12.0166 13.9274 12.5438 14.4546L14.453 12.5454ZM14.453 32.4545L23.453 23.4545L21.5439 21.5455L12.5438 30.5455L14.453 32.4545ZM23.453 23.4545L32.453 14.4546L30.5439 12.5454L21.5439 21.5455L23.453 23.4545ZM21.5439 23.4545L30.5439 32.4545L32.453 30.5455L23.453 21.5455L21.5439 23.4545ZM23.453 21.5455L14.453 12.5454L12.5438 14.4546L21.5439 23.4545L23.453 21.5455Z"
                                    fill="black"
                                />
                            </svg>
                        </button>
                    </div>
                    <h3 className="heading fs-38 fw-300">
                        Find What You Need, Instantly!
                    </h3>
                    <div style={{ position: "relative" }}>
                        <form
                            onSubmit={handleSearchSubmit}
                            className="search-form"
                        >
                            <input
                                type="text"
                                {...methods["register"]("search")}
                                placeholder="Search ..."
                                className="form-control"
                                autoComplete="off"
                                onChange={handleSearchInputChange}
                                onBlur={handleSearchBlur}
                                onFocus={() => {
                                    if (!methods.getValues("search")) {
                                        if (recentSearches.length > 0) {
                                            setShowRecentSearches(true);
                                        }
                                    } else if (
                                        methods.getValues("search").length >= 2
                                    ) {
                                        setShowSuggestions(true);
                                    }
                                }}
                            />
                        </form>

                        {showRecentSearches && recentSearches.length > 0 && (
                            <div className="search-suggestions-dropdown">
                                <div
                                    style={{
                                        padding: "8px 16px",
                                        borderBottom: "1px solid #eee",
                                        fontSize: "0.875rem",
                                        fontWeight: "600",
                                        color: "#666",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <span>Recent Searches</span>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            clearRecentSearches();
                                        }}
                                        style={{
                                            background: "none",
                                            border: "none",
                                            color: "#999",
                                            cursor: "pointer",
                                            fontSize: "0.75rem",
                                            padding: "2px 6px",
                                            borderRadius: "3px",
                                        }}
                                    >
                                        Clear All
                                    </button>
                                </div>
                                {recentSearches.map((searchTerm, index) => (
                                    <div
                                        key={index}
                                        className="suggestion-item recent-search-item"
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            await handleRecentSearchClick(
                                                searchTerm,
                                            );
                                        }}
                                        style={{
                                            padding: "12px 16px",
                                            cursor: "pointer",
                                            borderBottom:
                                                index <
                                                recentSearches.length - 1
                                                    ? "1px solid #f0f0f0"
                                                    : "none",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                        }}
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            style={{
                                                color: "#999",
                                                flexShrink: 0,
                                            }}
                                        >
                                            <path
                                                d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <span style={{ color: "#333" }}>
                                            {searchTerm}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                        {showSuggestions &&
                            methods.getValues("search") &&
                            methods.getValues("search").length >= 2 && (
                                <div className="search-suggestions-dropdown">
                                    {loadingSuggestions && (
                                        <div
                                            style={{
                                                padding: "12px 16px",
                                                textAlign: "center",
                                                color: "#666",
                                            }}
                                        >
                                            Loading suggestions...
                                        </div>
                                    )}

                                    {!loadingSuggestions &&
                                        searchSuggestions.length === 0 && (
                                            <div
                                                style={{
                                                    padding: "12px 16px",
                                                    textAlign: "center",
                                                    color: "#999",
                                                    fontStyle: "italic",
                                                }}
                                            >
                                                No data found
                                            </div>
                                        )}

                                    {!loadingSuggestions &&
                                        searchSuggestions.length > 0 &&
                                        searchSuggestions.map(
                                            (suggestion, index) => {
                                                const isDocument =
                                                    !!suggestion.document;
                                                const url = isDocument
                                                    ? suggestion.document
                                                    : suggestion.slug?.startsWith(
                                                            "/",
                                                        )
                                                      ? suggestion.slug
                                                      : `/${suggestion.slug}`;
                                                return (
                                                    <Link
                                                        key={
                                                            suggestion.id ||
                                                            index
                                                        }
                                                        href={url}
                                                        target={
                                                            isDocument
                                                                ? "_blank"
                                                                : undefined
                                                        }
                                                        className="suggestion-item"
                                                        onMouseDown={(e) =>
                                                            e.preventDefault()
                                                        }
                                                        onClick={async (e) => {
                                                            if (isDocument) {
                                                                saveRecentSearch(
                                                                    cleanSEOTags(
                                                                        suggestion.name,
                                                                    ),
                                                                );
                                                                setShowSuggestions(
                                                                    false,
                                                                );
                                                                setSearchActive(
                                                                    false,
                                                                );
                                                            } else {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                await handleSuggestionClick(
                                                                    suggestion,
                                                                    url,
                                                                    router.push,
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent:
                                                                    "space-between",
                                                                alignItems:
                                                                    "center",
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    fontWeight:
                                                                        "500",
                                                                    marginBottom:
                                                                        "4px",
                                                                }}
                                                                dangerouslySetInnerHTML={{
                                                                    __html: cleanSEOTags(
                                                                        suggestion.name,
                                                                    ),
                                                                }}
                                                            />
                                                            {isDocument && (
                                                                <svg
                                                                    width="20"
                                                                    height="20"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    style={{
                                                                        color: "#666",
                                                                        flexShrink: 0,
                                                                    }}
                                                                >
                                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                                    <polyline points="7 10 12 15 17 10"></polyline>
                                                                    <line
                                                                        x1="12"
                                                                        y1="15"
                                                                        x2="12"
                                                                        y2="3"
                                                                    ></line>
                                                                </svg>
                                                            )}
                                                        </div>
                                                        {suggestion.type && (
                                                            <span className="type-tag">
                                                                {
                                                                    suggestion.type
                                                                }
                                                            </span>
                                                        )}
                                                    </Link>
                                                );
                                            },
                                        )}
                                </div>
                            )}
                    </div>
                </div>
            </Fade>
        </nav>
    );
};

const RenderMenu = ({
    item = {},
    level = 1,
    activeInactiveMenu,
    levelActive,
}) => {
    const [isActive, setIsActive] = useState(false);
    const { is1200 } = useCommonContext();
    const RenderLevel1 = ({ activeInactiveMenu, levelActive }) => {
        return (
            <div
                className={`dropdown ${
                    is1200 ? (isActive ? "mobile-active" : "") : ""
                }`}
            >
                <div className="dropdown_wrap">
                    <div className="dropdown_nav">
                        <ul
                            className="mega_menu"
                            style={
                                item?.submenu?.length > 5
                                    ? { overflowY: "auto" }
                                    : {}
                            }
                        >
                            {item?.submenu?.map((subItem, subIndex) => (
                                <RenderMenu
                                    item={subItem}
                                    level={level + 1}
                                    key={subIndex}
                                    activeInactiveMenu={activeInactiveMenu}
                                    levelActive={levelActive}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    const RenderLevel2 = ({ activeInactiveMenu, levelActive }) => {
        return (
            <ul
                className={`dropdown submenu ${
                    is1200 ? (isActive ? "mobile-active" : "") : ""
                }`}
            >
                {item?.submenu?.map((subItem, subIndex) => (
                    <RenderMenu
                        item={subItem}
                        level={level + 1}
                        key={subIndex}
                        activeInactiveMenu={activeInactiveMenu}
                        levelActive={levelActive}
                    />
                ))}
            </ul>
        );
    };

    const hasSubmenu = !!item?.submenu?.length;

    return (
        <li
            className={`${level === 1 ? "menu_item" : ""} ${
                hasSubmenu ? "has-dropdown" : ""
            }`}
        >
            <a
                href={
                    item?.link?.url
                        ? item?.link?.url?.startsWith("/")
                            ? item?.link?.url
                            : `/${item?.link?.url}`
                        : "#"
                }
                onClick={(e) => {
                    if (is1200 && hasSubmenu) {
                        e.preventDefault();
                        setIsActive(!isActive);

                        activeInactiveMenu(level, item?.link?.title);
                    }

                    if (!item?.link?.url) {
                        e.preventDefault();
                    }
                }}
                style={{ cursor: "pointer" }}
            >
                {item?.link?.title}
                {hasSubmenu && (
                    <span
                        className="nav_icon"
                        style={{
                            ...(level > 1 &&
                                !is1200 && {
                                    transform: "rotate(270deg)",
                                }),
                            ...(is1200 && {
                                transform: `rotate(${
                                    levelActive &&
                                    levelActive[level] == item?.link?.title
                                        ? "180deg"
                                        : "0deg"
                                })`,
                            }),
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={10}
                            height={7}
                            viewBox="0 0 10 7"
                            fill="none"
                        >
                            <path
                                d="M1 1.5L5 5.5L9 1.5"
                                stroke="#5B5B5B"
                                strokeWidth={2}
                            />
                        </svg>
                    </span>
                )}
            </a>

            {hasSubmenu && level === 1 ? (
                is1200 ? (
                    <Collapse
                        show={
                            levelActive &&
                            levelActive[level] == item?.link?.title
                                ? true
                                : false
                        }
                    >
                        <RenderLevel1
                            activeInactiveMenu={activeInactiveMenu}
                            levelActive={levelActive}
                        />
                    </Collapse>
                ) : (
                    <RenderLevel1
                        activeInactiveMenu={activeInactiveMenu}
                        levelActive={levelActive}
                    />
                )
            ) : hasSubmenu ? (
                is1200 ? (
                    <Collapse
                        show={
                            levelActive &&
                            levelActive[level] == item?.link?.title
                                ? true
                                : false
                        }
                    >
                        <RenderLevel2
                            activeInactiveMenu={activeInactiveMenu}
                            levelActive={levelActive}
                        />
                    </Collapse>
                ) : (
                    <RenderLevel2
                        activeInactiveMenu={activeInactiveMenu}
                        levelActive={levelActive}
                    />
                )
            ) : null}
        </li>
    );
};

const RenderSidebarMenu = ({
    items,
    activeInactiveMenu,
    levelActive,
    level,
}) => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <ul className="aside__list list-unstyled">
            {items?.map((item, index) => {
                const hasSubmenu = item?.submenu && item?.submenu?.length > 0;
                // const isOpen = openIndex === index;
                const isOpen =
                    levelActive && levelActive[level] == item?.link?.title;

                return (
                    <li key={index}>
                        <a href={item?.link?.url}>{item?.link?.title}</a>

                        {hasSubmenu && (
                            <>
                                <SidebarIcon
                                    isActive={isOpen}
                                    onClick={() => {
                                        handleToggle(index);
                                        activeInactiveMenu(
                                            level,
                                            item?.link?.title,
                                        );
                                    }}
                                />

                                <ul
                                    className={`sidebar_mega_menu ${
                                        isOpen ? "show" : ""
                                    }`}
                                    style={{
                                        display: isOpen ? "block" : "none",
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    <RenderSidebarMenu
                                        items={item?.submenu}
                                        level={level + 1}
                                        activeInactiveMenu={activeInactiveMenu}
                                        levelActive={levelActive}
                                    />
                                </ul>
                            </>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

const SidebarIcon = ({ isActive, onClick }) => (
    <span
        className={`sidebar_icon ${isActive ? "active" : ""}`}
        onClick={onClick}
        style={{
            cursor: "pointer",
            transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
        }}
    >
        <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    </span>
);
