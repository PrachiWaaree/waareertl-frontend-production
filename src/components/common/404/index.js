"use client";
import Link from "next/link";
import { OptimizedImage, Button } from "@/components";
import "./error.css";

export const PageNotFound = () => {
    return (
        <>
            <nav className="navbar white__bg">
                <div className="custom-container">
                    <div className="navbar_wrap">
                        <Link className="header_logo" href="/">
                            <OptimizedImage
                                fetchPriority="high"
                                className="img-fluid"
                                src={"/waaree_logo.webp"}
                                alt="waaree rtl logo"
                            />
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="error_inner_main text-center">
                <div className="image-box">
                    <OptimizedImage loading="lazy" src={"/404.webp"} alt="error" />
                </div>
                <Button role="button" label="Back to Home" href={"/"} />
            </div>
        </>
    );
};
