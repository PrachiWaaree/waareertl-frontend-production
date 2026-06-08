"use client";
/* eslint-disable @next/next/no-img-element, react-hooks/exhaustive-deps */

import { Controller, useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import { POST_REQUEST } from "@/utilities";
import { API_ENDPOINTS } from "@/config";
import "@/components/react-hook-form/upload-media.css";

export const RHFMedia = ({
    name,
    className = "",
    mediaType = "single",
    placeholder = "Choose file",
    onChange: customOnChange,
    ...other
}) => {
    const { control } = useFormContext();
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [previewFiles, setPreviewFiles] = useState([]);

    const isMultiple = mediaType === "multipal" || mediaType === "multiple";

    useEffect(() => {
        if (!control?._formValues) return;
        const value = control._formValues[name];

        if (!value) {
            setPreviewFiles([]);
            return;
        }

        if (isMultiple) {
            const paths = value.split(",").map((p) => p.trim());
            setPreviewFiles(paths.map((p) => ({ path: p, name: p })));
        } else {
            setPreviewFiles([{ path: value, name: value }]);
        }
    }, [control?._formValues?.[name]]);

    const sanitizeFileName = (name) => {
        const lower = (name || "").toLowerCase();
        const parts = lower.split(".");
        if (parts.length < 2) return name.replace(/[^a-z0-9._-]/gi, "_");
        const ext = parts.pop();
        const base = parts.join(".");
        const safeBase = base.replace(/[^a-z0-9._-]/gi, "_");
        return `${safeBase}.${ext}`;
    };

    const uploadFiles = async (files) => {
        const formData = new FormData();

        if (isMultiple) {
            Array.from(files).forEach((file) => {
                const safeName = sanitizeFileName(file.name);
                formData.append("files[]", file, safeName);
            });
        } else {
            const safeName = sanitizeFileName(files[0].name);
            formData.append("file", files[0], safeName);
        }

        formData.append("type", mediaType);

        try {
            const response = await POST_REQUEST(
                API_ENDPOINTS["media"],
                formData,
                {},
                { "Content-Type": "multipart/form-data" },
            );
            return response;
        } catch (error) {
            return {
                status: false,
                error: error.message || "Network error during upload",
            };
        }
    };

    const readMagicBytes = (file, length = 4) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            const blob = file.slice(0, length);
            reader.onloadend = () => {
                const arr = new Uint8Array(reader.result || new ArrayBuffer(0));
                resolve(arr);
            };
            reader.onerror = () => resolve(new Uint8Array());
            reader.readAsArrayBuffer(blob);
        });
    };

    const validateFiles = async (files) => {
        const maxByType = {
            image: 50 * 1024 * 1024,
            video: 50 * 1024 * 1024,
            audio: 100 * 1024 * 1024,
            document: 100 * 1024 * 1024,
            single: 100 * 1024 * 1024,
        };

        const allowedByType = {
            image: ["image/jpeg", "image/png", "image/webp"],
            video: ["video/mp4", "video/webm"],
            audio: ["audio/mpeg", "audio/mp3", "audio/wav"],
            document: [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ],
            single: [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ],
        };

        const maxSize = maxByType[mediaType] || maxByType.single;
        const allowed = allowedByType[mediaType] || allowedByType.single;

        for (const file of Array.from(files)) {
            const sizeOk = file.size > 0 && file.size <= maxSize;
            const typeOk = allowed.includes(file.type);
            const nameOk = (() => {
                const lower = (file.name || "").toLowerCase();
                const badExt = [
                    ".php",
                    ".asp",
                    ".jsp",
                    ".exe",
                    ".sh",
                    ".bat",
                    ".msi",
                ];
                if (badExt.some((ext) => lower.endsWith(ext))) return false;
                if (lower.includes("..")) return false;
                return true;
            })();

            if (!sizeOk) {
                return {
                    ok: false,
                    message: "File too large or empty",
                };
            }
            if (!typeOk || !nameOk) {
                return {
                    ok: false,
                    message: !typeOk
                        ? "Unsupported file type"
                        : "Invalid file name",
                };
            }

            // Magic bytes check for document types
            if (mediaType === "document" || mediaType === "single") {
                const bytes = await readMagicBytes(file, 8);
                const sig4 = Array.from(bytes.slice(0, 4))
                    .map((b) => b.toString(16).padStart(2, "0"))
                    .join("");
                const sig2 = Array.from(bytes.slice(0, 2))
                    .map((b) => String.fromCharCode(b))
                    .join("");

                const isPDF = sig2 === "%P" || sig4.startsWith("25504446"); // %PDF
                const isZIP = sig2 === "PK"; // docx/xlsx/pptx
                const isOLE = sig4 === "d0cf11e0"; // old .doc

                const declared = (file.type || "").toLowerCase();
                const ext = (file.name || "").toLowerCase().split(".").pop();

                let magicOk = false;
                if (ext === "pdf" || declared === "application/pdf")
                    magicOk = isPDF;
                else if (
                    ext === "docx" ||
                    declared ===
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                )
                    magicOk = isZIP;
                else if (ext === "doc" || declared === "application/msword")
                    magicOk = isOLE || isZIP;

                if (!magicOk) {
                    return {
                        ok: false,
                        message: "File content does not match declared type",
                    };
                }
            }
        }
        return { ok: true };
    };

    const handleFileChange = async (event, field) => {
        const files = event.target.files;

        if (!files || files.length === 0) {
            field.onChange("");
            setPreviewFiles([]);
            if (customOnChange) customOnChange(event);
            return;
        }

        const validation = await validateFiles(files);
        if (!validation.ok) {
            setUploadError(validation.message);
            field.onChange("");
            setPreviewFiles([]);
            if (customOnChange) customOnChange(event);
            return;
        }

        setIsUploading(true);
        setUploadError("");

        try {
            const response = await uploadFiles(files);

            if (response?.status === true) {
                if (isMultiple) {
                    const paths = response.file_paths || [];
                    field.onChange(paths.join(","));
                    setPreviewFiles(
                        paths.map((p, i) => ({
                            path: p,
                            name: files[i]?.name || p,
                        })),
                    );
                } else {
                    const path = response.file_path;
                    field.onChange(path);
                    setPreviewFiles([{ path, name: files[0]?.name || path }]);
                }
            } else {
                setUploadError(response?.message || "Upload failed");
                field.onChange("");
                setPreviewFiles([]);
            }
        } catch (error) {
            setUploadError("Unexpected error during upload");
            field.onChange("");
            setPreviewFiles([]);
        } finally {
            setIsUploading(false);
        }

        if (customOnChange) customOnChange(event);
    };

    const getAcceptAttribute = () => {
        switch (mediaType) {
            case "image":
                return "image/*";
            case "video":
                return "video/*";
            case "audio":
                return "audio/*";
            case "document":
                return ".pdf,.doc,.docx";
            default:
                return ".pdf,.doc,.docx";
        }
    };

    const renderPreview = () => {
        if (!previewFiles || previewFiles.length === 0) return null;

        return (
            <div className="file-preview">
                {previewFiles.map((fileData, index) => (
                    <div key={index} className="preview-item">
                        {fileData.path.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                            <img
                                loading="lazy"
                                src={fileData.path}
                                alt={`Preview ${index + 1}` || "Uploaded Image"}
                                className="preview-image"
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    objectFit: "cover",
                                }}
                            />
                        ) : (
                            <div className="file-icon">📄</div>
                        )}

                        <div className="file-info">
                            <span className="file-name">
                                {fileData.name || fileData.path}
                            </span>
                            <span className="file-status">✓ Uploaded</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const getDisplayText = (value) => {
        if (isUploading) return "Uploading...";
        if (value && value !== "") {
            if (isMultiple) {
                const count = value.split(",").filter(Boolean).length;
                return `${count} file(s) uploaded`;
            } else {
                return "File uploaded";
            }
        }
        return placeholder;
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div className="input-stack">
                    <div className={`file-upload-wrapper ${className}`}>
                        <input
                            type="file"
                            id={`file-${name}`}
                            className={`file-input ${error ? "error" : ""}`}
                            accept={getAcceptAttribute()}
                            multiple={isMultiple}
                            onChange={(event) => handleFileChange(event, field)}
                            style={{ display: "none" }}
                            disabled={isUploading}
                            {...other}
                        />
                        <label
                            htmlFor={`file-${name}`}
                            className={`file-label form-field ${
                                error ? "error" : ""
                            } ${isUploading ? "uploading" : ""}`}
                        >
                            <span className="file-label-text">
                                {getDisplayText(field.value)}
                            </span>
                            <span className="file-button">
                                {isUploading ? "Uploading..." : "Browse"}
                            </span>
                        </label>

                        {!isUploading && renderPreview()}

                        {isUploading && (
                            <div className="upload-progress">
                                <div className="progress-bar">
                                    <div className="progress-fill"></div>
                                </div>
                                <span className="progress-text">
                                    Uploading files...
                                </span>
                            </div>
                        )}
                    </div>

                    {uploadError && (
                        <div className="error-message upload-error">
                            {uploadError}
                        </div>
                    )}

                    {error?.message && (
                        <div className="error-message">{error.message}</div>
                    )}
                </div>
            )}
        />
    );
};
