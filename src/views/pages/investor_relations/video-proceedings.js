"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getAbsoluteURL, getImageURL } from "@/lib";
import { cleanSEOTags } from "@/utilities";

/* ------------------------------------------------------------------ *
 * Speaker colours — the rail, the chapter dots and the now-playing
 * strip all read from here, so a session stays visually consistent.
 * Keys are set per chapter in the CMS; anything unknown falls back.
 * ------------------------------------------------------------------ */
const ROLE_COLORS = {
    mod: "#8A9A94",
    chair: "#7A4FB0",
    ceo: "#0DB02B",
    cfo: "#28A9E2",
    strat: "#EE5A24",
    qa: "#2B5D6E",
};
const DEFAULT_ROLE_COLOR = "#5B5B5B";

const IconDoc = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
    </svg>
);

const IconDownload = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M12 3v12" />
        <path d="M7 11l5 5 5-5" />
        <path d="M4 21h16" />
    </svg>
);

const IconPlay = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M8 5v14l11-7z" />
    </svg>
);

const IconPause = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
);

const IconBack = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
    >
        <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
        <path d="M3 3v5h5" />
    </svg>
);

const IconForward = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
    >
        <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
        <path d="M21 3v5h-5" />
    </svg>
);

const roleColor = (key) => ROLE_COLORS[String(key || "").toLowerCase()] || DEFAULT_ROLE_COLOR;

/* ------------------------------------------------------------------ *
 * Parsing helpers — everything arrives from the CMS as free text, so
 * each of these has to cope with whatever an editor actually typed.
 * ------------------------------------------------------------------ */

/** Accepts a full YouTube URL in any common form, or a bare 11-char ID. */
export const parseVideoId = (value = "") => {
    const raw = String(value || "").trim();
    if (!raw) return "";
    if (/^[\w-]{11}$/.test(raw)) return raw;

    const patterns = [
        /[?&]v=([\w-]{11})/,
        /youtu\.be\/([\w-]{11})/,
        /youtube\.com\/embed\/([\w-]{11})/,
        /youtube\.com\/live\/([\w-]{11})/,
        /youtube\.com\/shorts\/([\w-]{11})/,
    ];
    for (const pattern of patterns) {
        const match = raw.match(pattern);
        if (match) return match[1];
    }
    return "";
};

/**
 * "1:02:30" | "12:30" | "750" | 750 → seconds.
 *
 * A range is accepted too — "0:00 - 2:30", "0:00 to 2:30", an en or em
 * dash — and the start is kept. Writing one is natural, and each chapter
 * already ends where the next begins, so the second half is confirmation
 * rather than information. Without this the split on ":" produced NaN and
 * every chapter silently landed at zero.
 */
export const toSeconds = (value) => {
    if (typeof value === "number" && Number.isFinite(value)) {
        return Math.max(0, Math.round(value));
    }
    let raw = String(value ?? "").trim();
    if (!raw) return 0;

    const rangeAt = raw.search(/\s*[-–—]\s*|\s+to\s+/i);
    if (rangeAt > 0) raw = raw.slice(0, rangeAt).trim();

    if (/^\d+$/.test(raw)) return Number(raw);

    const parts = raw.split(":").map((part) => Number(part.trim()));
    if (parts.some((part) => !Number.isFinite(part))) return 0;

    return parts.reduce((total, part) => total * 60 + part, 0);
};

/**
 * Splits "0:00 - 1:30" into its two times. A chapter may carry its own
 * end, and the next one need not begin where it stopped — a short gap
 * between speakers is normal. `end` is null when only a start was given,
 * and the chapter then runs to wherever the next one starts.
 */
export const toRange = (value) => {
    const raw = String(value ?? "").trim();
    if (!raw) return { start: 0, end: null };

    const at = raw.search(/\s*[\u002d\u2013\u2014]\s*|\s+to\s+/i);
    if (at <= 0) return { start: toSeconds(raw), end: null };

    const rest = raw.slice(at).replace(/^\s*(?:[\u002d\u2013\u2014]|to)\s*/i, "");
    const end = rest ? toSeconds(rest) : 0;

    return { start: toSeconds(raw.slice(0, at)), end: end > 0 ? end : null };
};

const formatTime = (seconds) => {
    const total = Math.max(0, Math.round(Number(seconds) || 0));
    const hrs = Math.floor(total / 3600);
    const mins = Math.floor((total % 3600) / 60);
    const secs = String(total % 60).padStart(2, "0");
    return hrs
        ? `${hrs}:${String(mins).padStart(2, "0")}:${secs}`
        : `${mins}:${secs}`;
};

const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(`${String(value).slice(0, 10)}T00:00:00`);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

/**
 * The admin Field Key box runs `.convert-slug`, which lowercases and turns
 * spaces into HYPHENS. So "Session List" is stored as `session-list` while
 * this file reads `session_list`. Rather than depend on an editor typing the
 * underscore by hand — a mismatch that fails silently — every incoming key is
 * normalised to underscores before it is read.
 */
const normalizeKeys = (row) => {
    if (!row || typeof row !== "object" || Array.isArray(row)) return row;

    const out = {};
    Object.entries(row).forEach(([key, value]) => {
        out[key.replace(/-/g, "_")] = value;
    });
    return out;
};

/** Repeater fields arrive either as a bare array or wrapped in `{ list }`. */
const asList = (value) => {
    const raw = Array.isArray(value)
        ? value
        : Array.isArray(value?.list)
          ? value.list
          : [];
    return raw.map(normalizeKeys);
};

// Whatever an editor happened to call the link and upload fields. Guessing
// wrong here produces a row that silently disappears, so both lists are wide.
const DOC_LINK_KEYS = ["link", "links", "url", "external_link", "document_link"];
const DOC_FILE_KEYS = ["file", "files", "document", "doc", "attachment", "pdf"];

/** Document rows: an external link wins over an uploaded file. */
const documentHref = (doc = {}) => {
    for (const key of DOC_LINK_KEYS) {
        const link = doc[key];
        const raw =
            typeof link === "string"
                ? link
                : link?.url_type === "external"
                  ? link?.external_url || link?.url
                  : link?.url || link?.url_1;

        if (typeof raw === "string" && raw.trim()) {
            return getAbsoluteURL(raw.trim());
        }
    }

    for (const key of DOC_FILE_KEYS) {
        const src = doc[key]?.src || (typeof doc[key] === "string" ? doc[key] : "");
        if (src) return getImageURL(src);
    }

    return "";
};

/* ------------------------------------------------------------------ *
 * YouTube IFrame Player API
 *
 * `react-lite-youtube-embed` is only a thumbnail facade and exposes no
 * player object, so it can't drive the chapter rail. The real API is
 * already allowed by the site CSP (script-src + frame-src + connect-src
 * all list youtube.com), so no config change is needed.
 * ------------------------------------------------------------------ */
let apiPromise = null;

const loadYouTubeAPI = () => {
    if (typeof window === "undefined") return Promise.resolve(null);
    if (window.YT?.Player) return Promise.resolve(window.YT);
    if (apiPromise) return apiPromise;

    apiPromise = new Promise((resolve) => {
        // Chain rather than overwrite: other embeds on the page may be waiting
        // on this same global callback.
        const previous = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
            if (typeof previous === "function") previous();
            resolve(window.YT);
        };

        if (!document.querySelector("script[data-yt-api]")) {
            const script = document.createElement("script");
            script.src = "https://www.youtube.com/iframe_api";
            script.async = true;
            script.dataset.ytApi = "true";
            document.head.appendChild(script);
        }
    });

    return apiPromise;
};

export const VideoProceedings = ({ data: rawData = {}, slug = "video_proceedings" }) => {
    const data = normalizeKeys(rawData);
    const {
        title,
        description,
        compliance_note,
        type_filter_label = "Type",
        year_filter_label = "Financial year",
        quarter_filter_label = "Quarter",
        archive_title = "All recordings",
        // Layout treatment, set in the CMS: classic | theatre | contents | compact
        variant = "classic",
    } = data;

    /* ---------------- normalise CMS data ---------------- */
    const sessions = useMemo(() => {
        return asList(data.session_list)
            .map((session, index) => {
                const videoId = parseVideoId(
                    session?.youtube_url || session?.video_url || session?.video_id,
                );

                // A recording can be a video or an audio file. Earnings
                // calls are often published as audio only; the chapter
                // rail works the same either way.
                const audioUrl = String(
                    session?.audio_url || session?.audio || "",
                ).trim();

                const chapters = asList(session?.chapter_list)
                    .map((chapter) => ({
                        time: toRange(chapter?.time).start,
                        endTime: toRange(chapter?.time).end,
                        speaker: chapter?.speaker || "",
                        role: chapter?.role || "",
                        colorKey: chapter?.color_key || chapter?.["color-key"] || "",
                    }))
                    .filter((chapter) => chapter.speaker)
                    .sort((a, b) => a.time - b.time);

                return {
                    id: session?.session_id || `session-${index + 1}`,
                    title: session?.title || "",
                    type: session?.session_type || "",
                    typeLabel: session?.session_type_label || session?.session_type || "",
                    fy: session?.financial_year || "",
                    quarter: session?.quarter || "",
                    date: session?.date || "",
                    venue: session?.venue || "",
                    duration: toSeconds(session?.duration),
                    videoId,
                    audioUrl,
                    chapters,
                    documents: asList(session?.document_list)
                        .map((doc) => ({
                            label: doc?.label || "",
                            note: doc?.note || "",
                            href: documentHref(doc),
                        }))
                        .filter((doc) => doc.label && doc.href),
                };
            })
            .filter(
                (session) =>
                    session.title && (session.videoId || session.audioUrl),
            );
    }, [data.session_list]);

    /* ---------------- filters ---------------- */
    const [typeFilter, setTypeFilter] = useState("all");
    const [yearFilter, setYearFilter] = useState("all");
    const [quarterFilter, setQuarterFilter] = useState("all");

    /**
     * Session types shown as filter chips.
     *
     * Declared in the CMS as one `value = Label` per line, so a category can
     * exist before any recording does — an Earnings call tab is useful from
     * day one even while the archive holds only a general meeting. Falls back
     * to whatever the sessions themselves carry when nothing is declared, so
     * an existing page keeps working untouched.
     */
    const types = useMemo(() => {
        const declared = String(data.session_types || "")
            .split(/[\r\n]+/)
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => {
                const [value, ...rest] = line.split("=");
                const key = value.trim();
                const label = rest.join("=").trim();
                return [key, label || key];
            })
            .filter(([key]) => key);

        if (declared.length) return declared;

        const seen = new Map();
        sessions.forEach((s) => {
            if (s.type && !seen.has(s.type)) seen.set(s.type, s.typeLabel || s.type);
        });
        return [...seen.entries()];
    }, [sessions, data.session_types]);

    const typesDeclared = Boolean(String(data.session_types || "").trim());

    const years = useMemo(
        () => [...new Set(sessions.map((s) => s.fy).filter(Boolean))],
        [sessions],
    );
    // Once any recording carries a quarter, offer all four: an earnings archive
    // fills up one quarter at a time, and seeing Q1-Q4 with the empty ones
    // greyed shows what exists without the list changing shape each quarter.
    const quarters = useMemo(() => {
        const present = sessions.map((s) => s.quarter).filter(Boolean);
        if (!present.length) return [];
        const full = ["Q1", "Q2", "Q3", "Q4"];
        const extra = [...new Set(present)].filter((q) => !full.includes(q));
        return [...full, ...extra.sort()];
    }, [sessions]);

    const filtered = useMemo(
        () =>
            sessions
                .filter(
                    (s) =>
                        (typeFilter === "all" || s.type === typeFilter) &&
                        (yearFilter === "all" || s.fy === yearFilter) &&
                        (quarterFilter === "all" ||
                            s.quarter === quarterFilter),
                )
                // Newest first: a filter change opens the most recent match.
                .sort((a, b) => String(b.date).localeCompare(String(a.date))),
        [sessions, typeFilter, yearFilter, quarterFilter],
    );

    const filtersActive =
        typeFilter !== "all" || yearFilter !== "all" || quarterFilter !== "all";

    /**
     * Quarters that have no recording under the current type and year are
     * offered as disabled rather than hidden, so the set of quarters stays in
     * the same place and a visitor can see what exists without guessing.
     */
    const availableQuarters = useMemo(() => {
        const set = new Set(
            sessions
                .filter(
                    (s) =>
                        (typeFilter === "all" || s.type === typeFilter) &&
                        (yearFilter === "all" || s.fy === yearFilter),
                )
                .map((s) => s.quarter)
                .filter(Boolean),
        );
        return set;
    }, [sessions, typeFilter, yearFilter]);

    const resetFilters = () => {
        setTypeFilter("all");
        setYearFilter("all");
        setQuarterFilter("all");
    };

    /* ---------------- selection + player ---------------- */
    const [activeId, setActiveId] = useState("");
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [copied, setCopied] = useState(false);

    const mountRef = useRef(null);
    const playerRef = useRef(null);
    const audioRef = useRef(null);
    const rafRef = useRef(null);
    const stageRef = useRef(null);
    const pendingSeekRef = useRef(0);

    // Drawn from the filtered list, so a session the visitor has filtered out
    // can never stay on the stage.
    const active = useMemo(
        () => filtered.find((s) => s.id === activeId) || filtered[0] || null,
        [filtered, activeId],
    );

    // Open the deep-linked session if the URL carries one, else the newest.
    useEffect(() => {
        if (!sessions.length || activeId) return;

        const hash =
            typeof window !== "undefined"
                ? window.location.hash.replace(/^#/, "")
                : "";
        const [hashId, query] = hash.split("?");
        const match = sessions.find((s) => s.id === hashId);

        if (match) {
            const seconds = Number(new URLSearchParams(query || "").get("t")) || 0;
            pendingSeekRef.current = seconds;
            setActiveId(match.id);
            return;
        }

        const newest = [...sessions].sort((a, b) =>
            String(b.date).localeCompare(String(a.date)),
        )[0];
        setActiveId(newest.id);
    }, [sessions, activeId]);

    /**
     * The player follows the filters. Changing one opens the newest matching
     * recording, so the stage never shows a session the visitor has just
     * filtered out. Skipped on the first run so a deep link survives.
     */
    const didInitFilters = useRef(false);
    useEffect(() => {
        if (!didInitFilters.current) {
            didInitFilters.current = true;
            return;
        }
        if (!filtered.length) return;

        pendingSeekRef.current = 0;
        setActiveId(filtered[0].id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeFilter, yearFilter, quarterFilter]);

    // A quarter that no longer exists under the chosen type and year would
    // otherwise leave the page stuck on an empty result.
    useEffect(() => {
        if (quarterFilter !== "all" && !availableQuarters.has(quarterFilter)) {
            setQuarterFilter("all");
        }
    }, [availableQuarters, quarterFilter]);

    /**
     * React unmounts the player's container as soon as the stage is
     * hidden — selecting a filter with no recordings, for instance — and
     * the effect cleanup then runs against an iframe that has already
     * gone. The YouTube API throws in that case, and an uncaught error
     * during teardown takes the whole page down with it.
     */
    const destroyPlayer = useCallback(() => {
        const player = playerRef.current;
        playerRef.current = null;
        if (player?.destroy) {
            try {
                player.destroy();
            } catch {
                // Already detached; nothing left to release.
            }
        }
        // Clear by hand: everything inside the wrapper was created
        // outside React, so React will not clean it up.
        const host = mountRef.current;
        if (host) {
            try {
                host.innerHTML = "";
            } catch {
                // Wrapper already gone with the surrounding markup.
            }
        }
    }, []);

    const stopTracking = useCallback(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
    }, []);

    const startTracking = useCallback(() => {
        stopTracking();
        const step = () => {
            const player = playerRef.current;
            if (player?.getCurrentTime) {
                setCurrentTime(player.getCurrentTime() || 0);
            } else if (audioRef.current) {
                setCurrentTime(audioRef.current.currentTime || 0);
            }
            rafRef.current = requestAnimationFrame(step);
        };
        rafRef.current = requestAnimationFrame(step);
    }, [stopTracking]);

    // Build the player once per video.
    useEffect(() => {
        if (!active?.videoId || !mountRef.current) return undefined;

        let cancelled = false;
        setCurrentTime(0);
        setDuration(0);
        setPlaying(false);

        loadYouTubeAPI().then((YT) => {
            if (cancelled || !YT?.Player || !mountRef.current) return;

            destroyPlayer();

            // A fresh child for the API to replace, so the wrapper that
            // React rendered is never the element swapped for an iframe.
            const target = document.createElement("div");
            mountRef.current.appendChild(target);

            playerRef.current = new YT.Player(target, {
                videoId: active.videoId,
                playerVars: {
                    rel: 0,
                    modestbranding: 1,
                    playsinline: 1,
                    start: Math.round(pendingSeekRef.current) || 0,
                },
                events: {
                    onReady: (event) => {
                        if (cancelled) return;
                        setDuration(event.target.getDuration() || 0);
                        if (pendingSeekRef.current) {
                            event.target.seekTo(pendingSeekRef.current, true);
                            setCurrentTime(pendingSeekRef.current);
                            pendingSeekRef.current = 0;
                        }
                    },
                    onStateChange: (event) => {
                        if (cancelled) return;
                        const isPlaying = event.data === YT.PlayerState.PLAYING;
                        setPlaying(isPlaying);
                        setDuration(event.target.getDuration() || 0);
                        if (isPlaying) startTracking();
                        else stopTracking();
                    },
                },
            });
        });

        return () => {
            cancelled = true;
            stopTracking();
            destroyPlayer();
        };
    }, [active?.videoId, startTracking, stopTracking, destroyPlayer]);

    // Audio sources, mirroring the YouTube effect above.
    useEffect(() => {
        if (!active?.audioUrl || active?.videoId) return undefined;
        const audio = audioRef.current;
        if (!audio) return undefined;

        setCurrentTime(0);
        setDuration(0);
        setPlaying(false);

        const onMeta = () => {
            setDuration(audio.duration || 0);
            if (pendingSeekRef.current) {
                audio.currentTime = pendingSeekRef.current;
                setCurrentTime(pendingSeekRef.current);
                pendingSeekRef.current = 0;
            }
        };
        const onPlay = () => {
            setPlaying(true);
            startTracking();
        };
        const onStop = () => {
            setPlaying(false);
            stopTracking();
        };
        // Covers scrubbing with the native control, which fires no
        // play event and would otherwise leave the rail behind.
        const onSeeked = () => setCurrentTime(audio.currentTime || 0);

        audio.addEventListener("loadedmetadata", onMeta);
        audio.addEventListener("play", onPlay);
        audio.addEventListener("pause", onStop);
        audio.addEventListener("ended", onStop);
        audio.addEventListener("seeked", onSeeked);

        return () => {
            audio.removeEventListener("loadedmetadata", onMeta);
            audio.removeEventListener("play", onPlay);
            audio.removeEventListener("pause", onStop);
            audio.removeEventListener("ended", onStop);
            audio.removeEventListener("seeked", onSeeked);
            stopTracking();
        };
    }, [active?.audioUrl, active?.videoId, startTracking, stopTracking]);

    useEffect(() => stopTracking, [stopTracking]);

    /* ---------------- player actions ---------------- */
    const seekTo = useCallback((seconds) => {
        const player = playerRef.current;
        const target = Math.max(0, seconds);
        setCurrentTime(target);
        if (player?.seekTo) {
            player.seekTo(target, true);
            player.playVideo?.();
        } else if (audioRef.current?.readyState) {
            audioRef.current.currentTime = target;
            audioRef.current.play?.();
        } else {
            pendingSeekRef.current = target;
        }
    }, []);

    const togglePlay = () => {
        const player = playerRef.current;
        if (player) {
            if (playing) player.pauseVideo?.();
            else player.playVideo?.();
            return;
        }
        const audio = audioRef.current;
        if (!audio) return;
        if (playing) audio.pause();
        else audio.play();
    };

    const selectSession = (id) => {
        if (id === activeId) return;
        pendingSeekRef.current = 0;
        setActiveId(id);
        stageRef.current?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "auto"
                : "smooth",
            block: "start",
        });
    };

    /* ---------------- derived view data ---------------- */
    // Prefer the real length from the player; fall back to the CMS value so the
    // archive still shows a duration before a session has ever been opened.
    const totalSeconds =
        duration ||
        active?.duration ||
        (active?.chapters?.length
            ? active.chapters[active.chapters.length - 1].time
            : 0);

    const segments = useMemo(() => {
        if (!active?.chapters?.length || !totalSeconds) return [];
        return active.chapters.map((chapter, index) => {
            // A typed end wins; otherwise the chapter runs to the next one.
            const end =
                chapter.endTime ??
                active.chapters[index + 1]?.time ??
                totalSeconds;
            return { ...chapter, end, span: Math.max(end - chapter.time, 1) };
        });
    }, [active, totalSeconds]);

    const activeIndex = useMemo(() => {
        if (!segments.length) return -1;
        let index = 0;
        segments.forEach((segment, i) => {
            if (currentTime >= segment.time) index = i;
        });
        return index;
    }, [segments, currentTime]);

    const activeChapter = activeIndex >= 0 ? segments[activeIndex] : null;

    // The coloured bands cover the first chapter through to the end, which is
    // the whole video only when the first chapter starts at 0:00. Position the
    // playhead against that same span, otherwise it drifts away from the
    // colours for any recording whose first chapter starts later.
    const railStart = segments[0]?.time ?? 0;
    const railEnd = Math.max(
        segments[segments.length - 1]?.end ?? totalSeconds,
        totalSeconds || 0,
        railStart + 1,
    );
    const railSpan = Math.max(railEnd - railStart, 1);

    // Segments sit at their real position on the timeline rather than
    // being packed end to end, so a chapter that stops before the next
    // one starts leaves the gap visible instead of silently closing it.
    const railPct = (seconds) =>
        Math.min(100, Math.max(0, ((seconds - railStart) / railSpan) * 100));
    const progressPct = totalSeconds
        ? Math.min(100, Math.max(0, ((currentTime - railStart) / railSpan) * 100))
        : 0;

    const handleRailClick = (event) => {
        if (!totalSeconds) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const ratio = (event.clientX - rect.left) / rect.width;
        seekTo(railStart + Math.min(Math.max(ratio, 0), 1) * railSpan);
    };

    const handleRailKeyDown = (event) => {
        const step = event.shiftKey ? 60 : 10;
        if (event.key === "ArrowRight") {
            event.preventDefault();
            seekTo(currentTime + step);
        } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            seekTo(currentTime - step);
        } else if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            togglePlay();
        }
    };

    const copyMoment = async () => {
        if (!active) return;
        const base = window.location.href.split("#")[0];
        const url = `${base}#${active.id}?t=${Math.round(currentTime)}`;
        try {
            await navigator.clipboard.writeText(url);
        } catch {
            // Clipboard is blocked in some embedded contexts — the URL is still
            // in the address bar, so this is not worth surfacing as an error.
        }
        window.history.replaceState(null, "", `#${active.id}?t=${Math.round(currentTime)}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
    };

    if (!sessions.length) return null;

    return (
        <section
            className={`video_proceedings is-${
                ["classic", "theatre", "contents", "compact"].includes(
                    String(variant).toLowerCase(),
                )
                    ? String(variant).toLowerCase()
                    : "classic"
            }`}
            id={slug}
        >
            <div className="custom-container">
                {(title || description) && (
                    <div className="vp__header">
                        {title && (
                            <h2
                                className="heading fs-48 fw-300"
                                dangerouslySetInnerHTML={{
                                    __html: cleanSEOTags(title),
                                }}
                            />
                        )}
                        {description && (
                            // div, not p: CMS editor HTML arrives wrapped in its own <p>,
                            // and a nested <p> breaks hydration.
                            <div
                                className="desc fs-18 fw-400"
                                dangerouslySetInnerHTML={{
                                    __html: cleanSEOTags(description),
                                }}
                            />
                        )}
                    </div>
                )}

                {/* ---------------- filters ---------------- */}
                {(typesDeclared ||
                    types.length > 1 ||
                    years.length > 1 ||
                    quarters.length > 1) && (
                    <div className="vp__filters" role="group" aria-label={type_filter_label}>
                        {(typesDeclared || types.length > 1) && (
                            <div className="vp__chips">
                                <button
                                    type="button"
                                    className="vp__chip"
                                    aria-pressed={typeFilter === "all"}
                                    onClick={() => setTypeFilter("all")}
                                >
                                    All
                                </button>
                                {types.map(([key, label]) => (
                                    <button
                                        key={key}
                                        type="button"
                                        className="vp__chip"
                                        aria-pressed={typeFilter === key}
                                        onClick={() => setTypeFilter(key)}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="vp__selects">
                            {(typesDeclared || years.length > 1) && (
                                <label className="vp__field">
                                    <span>{year_filter_label}</span>
                                    <select
                                        value={yearFilter}
                                        onChange={(e) => setYearFilter(e.target.value)}
                                    >
                                        <option value="all">All years</option>
                                        {years.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            )}
                            {(typesDeclared || quarters.length > 1) && (
                                <label className="vp__field">
                                    <span>{quarter_filter_label}</span>
                                    <select
                                        value={quarterFilter}
                                        onChange={(e) => setQuarterFilter(e.target.value)}
                                    >
                                        <option value="all">All quarters</option>
                                        {quarters.map((quarter) => (
                                            <option
                                                key={quarter}
                                                value={quarter}
                                                disabled={
                                                    !availableQuarters.has(
                                                        quarter,
                                                    )
                                                }
                                            >
                                                {quarter}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            )}
                        </div>
                    </div>
                )}

                {/* ---------------- stage ---------------- */}
                {filtersActive && filtered.length > 0 && (
                    <p className="vp__matchnote" aria-live="polite">
                        {filtered.length > 1
                            ? `Showing the latest of ${filtered.length} matching recordings. Choose another from the list below.`
                            : "Showing the only recording that matches your filters."}
                    </p>
                )}

                {filtered.length === 0 && (
                    <div className="vp__empty vp__empty--stage">
                        <p>No recordings match these filters.</p>
                        <button
                            type="button"
                            className="vp__chip"
                            onClick={resetFilters}
                        >
                            Show all recordings
                        </button>
                    </div>
                )}

                {active && (
                    <div className="vp__stage" ref={stageRef}>
                        <div className="vp__main">
                            {active.videoId ? (
                                <div className="vp__frame">
                                    <div ref={mountRef} />
                                </div>
                            ) : (
                                <div className="vp__audio">
                                    <span className="vp__brand">
                                        WAAREE ENERGIES
                                    </span>

                                    <div className="vp__audioTitle">
                                        {active.title}
                                        <span>
                                            {[
                                                formatDate(active.date),
                                                active.venue,
                                            ]
                                                .filter(Boolean)
                                                .join(", ")}
                                        </span>
                                    </div>

                                    {!playing && (
                                        <button
                                            type="button"
                                            className="vp__bigplay"
                                            aria-label="Play recording"
                                            onClick={togglePlay}
                                        >
                                            <IconPlay />
                                        </button>
                                    )}

                                    {activeChapter && (
                                        <div className="vp__lower">
                                            <i
                                                style={{
                                                    background: roleColor(
                                                        activeChapter.colorKey,
                                                    ),
                                                }}
                                            />
                                            <div>
                                                <strong>
                                                    {activeChapter.speaker}
                                                </strong>
                                                {activeChapter.role && (
                                                    <small>
                                                        {activeChapter.role}
                                                    </small>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <div className="vp__controls">
                                        <button
                                            type="button"
                                            className="vp__ctl"
                                            aria-label={
                                                playing ? "Pause" : "Play"
                                            }
                                            onClick={togglePlay}
                                        >
                                            {playing ? (
                                                <IconPause />
                                            ) : (
                                                <IconPlay />
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            className="vp__ctl"
                                            aria-label="Back 15 seconds"
                                            onClick={() =>
                                                seekTo(currentTime - 15)
                                            }
                                        >
                                            <IconBack />
                                        </button>
                                        <button
                                            type="button"
                                            className="vp__ctl"
                                            aria-label="Forward 15 seconds"
                                            onClick={() =>
                                                seekTo(currentTime + 15)
                                            }
                                        >
                                            <IconForward />
                                        </button>
                                        <span className="vp__time">
                                            {formatTime(currentTime)} /{" "}
                                            {formatTime(totalSeconds)}
                                        </span>
                                    </div>

                                    {/* Controls above drive this; the
                                        native ones would duplicate the
                                        chapter rail's job. */}
                                    <audio
                                        ref={audioRef}
                                        src={active.audioUrl}
                                        preload="metadata"
                                    />
                                </div>
                            )}

                            {segments.length > 0 && (
                                <>
                                    <div
                                        className="vp__rail"
                                        role="slider"
                                        tabIndex={0}
                                        aria-label="Seek within recording"
                                        aria-valuemin={0}
                                        aria-valuemax={Math.round(totalSeconds)}
                                        aria-valuenow={Math.round(currentTime)}
                                        aria-valuetext={`${formatTime(currentTime)}${
                                            activeChapter ? `, ${activeChapter.speaker}` : ""
                                        }`}
                                        onClick={handleRailClick}
                                        onKeyDown={handleRailKeyDown}
                                    >
                                        {segments.map((segment, index) => (
                                            <span
                                                key={`${segment.time}-${index}`}
                                                className={`vp__seg${
                                                    index === activeIndex ? " is-on" : ""
                                                }${index < activeIndex ? " is-done" : ""}`}
                                                style={{
                                                    left: `${railPct(segment.time)}%`,
                                                    width: `${Math.max(
                                                        railPct(segment.end) -
                                                            railPct(segment.time),
                                                        0.4,
                                                    )}%`,
                                                    background: roleColor(segment.colorKey),
                                                }}
                                                title={segment.speaker}
                                            />
                                        ))}
                                        <span
                                            className="vp__playhead"
                                            style={{ left: `${progressPct}%` }}
                                        />
                                    </div>

                                    <div className="vp__railcap">
                                        <span>{formatTime(currentTime)}</span>
                                        <span>{formatTime(totalSeconds)}</span>
                                    </div>
                                </>
                            )}

                            {activeChapter && (
                                <div className="vp__now">
                                    <span
                                        className="vp__nowbar"
                                        style={{ background: roleColor(activeChapter.colorKey) }}
                                    />
                                    <div className="vp__nowtext">
                                        <strong>{activeChapter.speaker}</strong>
                                        {activeChapter.role && <small>{activeChapter.role}</small>}
                                    </div>
                                    <button
                                        type="button"
                                        className="vp__share"
                                        onClick={copyMoment}
                                    >
                                        {copied ? "Link copied" : "Copy link to this moment"}
                                    </button>
                                </div>
                            )}
                        </div>

                        <aside className="vp__side">
                            <h3 className="fs-24 fw-500">{active.title}</h3>
                            <p className="vp__meta">
                                {[formatDate(active.date), active.venue]
                                    .filter(Boolean)
                                    .join(" · ")}
                            </p>

                            {segments.length > 0 && (
                                <ol className="vp__chapters">
                                    {segments.map((segment, index) => (
                                        <li key={`${segment.time}-${index}`}>
                                            <button
                                                type="button"
                                                aria-current={index === activeIndex}
                                                onClick={() => seekTo(segment.time)}
                                            >
                                                <span
                                                    className="vp__dot"
                                                    style={{
                                                        background: roleColor(segment.colorKey),
                                                    }}
                                                />
                                                <span className="vp__who">
                                                    <strong>{segment.speaker}</strong>
                                                    {segment.role && <small>{segment.role}</small>}
                                                </span>
                                                <span className="vp__tc">
                                                    {formatTime(segment.time)}
                                                    <i>
                                                        –{formatTime(segment.end)}
                                                    </i>
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                </ol>
                            )}

                            {active.documents.length > 0 && (
                                <div className="vp__docs">
                                    {active.documents.map((doc, index) => (
                                        <a
                                            key={`${doc.label}-${index}`}
                                            className="vp__doc"
                                            href={doc.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <span className="vp__docIcon">
                                                <IconDoc />
                                            </span>
                                            <span className="vp__docText">
                                                <strong>{doc.label}</strong>
                                                {doc.note && (
                                                    <small>{doc.note}</small>
                                                )}
                                            </span>
                                            <span className="vp__docGo">
                                                <IconDownload />
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </aside>
                    </div>
                )}

                {/* ---------------- archive ---------------- */}
                <div className="vp__archive">
                    <h3 className="fs-28 fw-400">{archive_title}</h3>
                    <p className="vp__count">
                        {filtered.length} of {sessions.length} recordings
                    </p>

                    {filtered.length > 0 ? (
                        <div className="vp__tablewrap">
                            <table className="vp__table">
                                <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Session</th>
                                        <th scope="col">Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((session) => (
                                        <tr
                                            key={session.id}
                                            aria-selected={session.id === active?.id}
                                            onClick={() => selectSession(session.id)}
                                        >
                                            <td className="vp__date">
                                                {formatDate(session.date)}
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="vp__rowtitle"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        selectSession(session.id);
                                                    }}
                                                >
                                                    {session.title}
                                                </button>
                                            </td>
                                            <td>
                                                {session.typeLabel && (
                                                    <span className="vp__tag">
                                                        {session.typeLabel}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="vp__empty">
                            <p>No recordings match these filters.</p>
                            <button type="button" className="vp__chip" onClick={resetFilters}>
                                Show all recordings
                            </button>
                        </div>
                    )}
                </div>

                {compliance_note && (
                    <div
                        className="vp__compliance"
                        dangerouslySetInnerHTML={{
                            __html: cleanSEOTags(compliance_note),
                        }}
                    />
                )}
            </div>
        </section>
    );
};
