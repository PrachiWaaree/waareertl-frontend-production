import {
    HomePageForm,
    HomePageAbout,
    AboutPageVideo,
    HomePageBanner,
    HomePageSustain,
    AboutPageLegacy,
    AboutPageValues,
    HomePageResource,
    HomePageSolution,
    AboutPageMission,
    AboutPageWhoWeAre,
    LeadershipPageTeam,
    AwardsPageOurAwards,
    LeadershipPageBanner,
    LeadershipPageFounder,
    LeadershipPagePurpose,
    AboutPageCompanyGroup,
    LeadershipPageInspired,
    LeadershipPageResource,
    AwardsPageAwardCounter,
    AwardsPageRecognitions,
    AwardsPageCertifications,
    AboutPageTrustedClient,
    AboutPageSustainability,
    AwardsPageInspired,
    ProductPageExploreModule,
    ProductPageSpotlight,
    ProductPagePlaceholder,
    ProductPageForm,
    ProductPageDetails,
    FoundationPageAwards,
    OfficePageMap,
    WaareeEnergiesPageBanner,
    WaareeEnergiesPageRtl,
    WaareeEnergiesPageFocus,
    WaareeEnergiesPagePhotoSection,
    OfficePageLocation,
    OfficePageContact,
    FoundationPageAbout,
    FoundationPageInitiatives,
    FoundationPageGallery,
    CaseStudiesSection,
    EventPageWebinarSection,
    EventPageUpcomingSection,
    BlogListingSection,
    EpcPageCapabilities,
    EpcPageFaq,
    EpcPageForm,
    EpcPageGallery,
    BlogListingPageFeaturedSection,
    WhitepaperPageFeaturedSection,
    WhitepaperListingSection,
    MediaPageDigitalSection,
    MediaPagePrintMediaSection,
    CsrPageVision,
    CsrPageGallery,
    CsrPagePolicies,
    CsrAboutUs,
    CsrPageTeam,
    BlogDetailPageDetailSection,
    BlogDetailRelatedSection,
    WhitepaperDetailRelatedSection,
    MediaPageMediaBytesSection,
    DownloadCentreList,
    FoundationPageResource,
    EnquiryPageSlider,
    PartnerPageScope,
    PartnerpageLocation,
    SolarPageCalculatorSection,
    PartnerPageFaq,
    AboutPageResource,
    SolarPageExpertSection,
    InvestorRelationPage,
    CaseStudyDetailPageOverviewSection,
    CaseStudyDetailPageApproachSection,
    CaseStudyDetailPageHighlightSection,
    CaseStudyDetailPageOutcomeSection,
    CaseStudyDetailPageValueSection,
    CaseStudyDetailPageBreadcrumbSection,
    InvestorRelationPageNewsletter,
    EsgPageCommitment,
    EsgPageKeyInitiatives,
    EsgPageIconSlider,
    EsgPolicies,
    EsgInitiatives,
    EsgCommitment,
    EsgFounder,
    EsgLifeCyle,
    EsgStakeholders,
    EsgOurResponsibility,
    EsgForm,
    EsgAnchored,
    LifeAtWaareeEnvironemtSection,
    LifeAtWaareeHrInitiatives,
    LifeAtWaareePeople,
    LifeAtWaareeWhyWaaree,
    LifeAtWaareeProcess,
    PartnerPageAbout,
    PartnerPagePartner,
    PartnerPageProcess,
    PartnerPagetestimonials,
    PartnerPageForm,
    ProductFeatureSection,
    ProductPageEfficiencySection,
    ProductPageVideoSection,
    ProductPageComparision,
    ProductPagerelatedProducts,
    ProductDetailPageForm,
    CsrPageMapSection,
    ProductPageResource,
    CareerListing,
    PrimePageDownloadCenter,
    HomePageProject,
    HomePageWhyChooseUs,
    HomePageSuccessStories,
    HomePageClientSection,
    ClientPageBanner,
    ClientPageVoice,
    ClientPageBrand,
    WhyRtlPageImpact,
    WhyRtlPageValues,
    WhyRtlPageVision,
    WhyRtlPageGsapSection,
    OurProjectPageModule,
    OurProjectPageMap,
    GrievancePageSolution,
    GrievancePageAbout,
    SolutionDetailPageEmpoweringSection,
    SolutionDetailPageAwardsSection,
    SolutionDetailPageGraphSection,
    SolutionDetailPageBenefitSection,
    SolutionDetailPageTechnologySection,
    SolutionDetailPageProjectSection,
    SolutionDetailPageWhyChooseSection,
    AboutPageFooterIllustration,
    GlobalBrandsSection,
    SearchResults,
    PrivacyPolicyDescription,
    SpaceDivision,
    ShareHolderRelationPage,
    ShareHolderRelationDataPage,
    InvestorPageListing,
    InvestorDiscloser,
    HomePageWaareeStocks,
    VideoProceedings,
} from "@/views";

import { SolutionDetailPageRelatedSection } from "@/views/pages/solution-detail/related_solution";

export const ALL_SECTIONS = {
    //Home Page
    ["home-banner"]: (data, slug) => <HomePageBanner data={data} slug={slug} />,
    ["home-about-us"]: (data, slug) => (
        <HomePageAbout data={data} slug={slug} />
    ),
    ["waaree_solutions"]: (data, slug) => (
        <HomePageSolution data={data} slug={slug} />
    ),
    ["sustain-&-reliable"]: (data, slug) => (
        <HomePageSustain data={data} slug={slug} />
    ),
    ["projects"]: (data, slug) => <HomePageProject data={data} slug={slug} />,
    ["why_choose"]: (data, slug) => (
        <HomePageWhyChooseUs data={data} slug={slug} />
    ),
    ["success_stories"]: (data, slug) => (
        <HomePageSuccessStories data={data} slug={slug} />
    ),
    ["icon-slider"]: (data, slug) => (
        <HomePageClientSection data={data} slug={slug} />
    ),
    ["home-form"]: (data, slug) => <HomePageForm data={data} slug={slug} />,
    ["resources"]: (data, slug) => <HomePageResource data={data} slug={slug} />,

    ["section_divider"]: (data, slug) => (
        <SpaceDivision data={data} slug={slug} />
    ),

    //Client Page

    ["client-banner"]: (data, slug) => (
        <ClientPageBanner data={data} slug={slug} />
    ),
    ["client_voice"]: (data, slug) => (
        <ClientPageVoice data={data} slug={slug} />
    ),
    ["waaree_brands"]: (data, slug) => (
        <ClientPageBrand data={data} slug={slug} />
    ),

    //Why Rtl
    ["our_impact"]: (data, slug) => (
        <WhyRtlPageImpact data={data} slug={slug} />
    ),
    ["core_values"]: (data, slug) => (
        <WhyRtlPageValues data={data} slug={slug} />
    ),
    ["gsap"]: (data, slug) => <WhyRtlPageGsapSection data={data} slug={slug} />,
    ["vision_mission"]: (data, slug) => (
        <WhyRtlPageVision data={data} slug={slug} />
    ),
    ["footer_icon"]: (data, slug) => (
        <AboutPageFooterIllustration data={data} slug={slug} />
    ),

    //Leadership
    ["page-banner"]: (data, slug) => (
        <LeadershipPageBanner data={data} slug={slug} />
    ),
    ["purpose"]: (data, slug) => (
        <LeadershipPagePurpose data={data} slug={slug} />
    ),
    ["founder"]: (data, slug) => (
        <LeadershipPageFounder data={data} slug={slug} />
    ),
    ["teams"]: (data, slug) => <LeadershipPageTeam data={data} slug={slug} />,
    ["leadership_inspired"]: (data, slug) => (
        <LeadershipPageInspired data={data} slug={slug} />
    ),
    ["leadership_resource"]: (data, slug) => (
        <LeadershipPageResource data={data} slug={slug} />
    ),

    //About
    ["who_we_are"]: (data, slug) => (
        <AboutPageWhoWeAre data={data} slug={slug} />
    ),
    ["legacy"]: (data, slug) => <AboutPageLegacy data={data} slug={slug} />,
    ["mission"]: (data, slug) => <AboutPageMission data={data} slug={slug} />,
    ["values"]: (data, slug) => <AboutPageValues data={data} slug={slug} />,
    ["company_group"]: (data, slug) => (
        <AboutPageCompanyGroup data={data} slug={slug} />
    ),
    ["sustainability"]: (data, slug) => (
        <AboutPageSustainability data={data} slug={slug} />
    ),
    ["video"]: (data, slug) => <AboutPageVideo data={data} slug={slug} />,
    ["trusted_client"]: (data, slug) => (
        <AboutPageTrustedClient data={data} slug={slug} />
    ),
    ["about_resources"]: (data, slug) => (
        <AboutPageResource data={data} slug={slug} />
    ),
    ["awards_inspired"]: (data, slug) => (
        <AwardsPageInspired data={data} slug={slug} />
    ),

    // Awards and Certificates

    ["about_awards"]: (data, slug) => (
        <AwardsPageAwardCounter data={data} slug={slug} />
    ),
    ["our_awards"]: (data, slug) => (
        <AwardsPageOurAwards data={data} slug={slug} />
    ),
    ["recognitions"]: (data, slug) => (
        <AwardsPageRecognitions data={data} slug={slug} />
    ),
    ["certifications"]: (data, slug) => (
        <AwardsPageCertifications data={data} slug={slug} />
    ),

    // Products

    ["explore-modules"]: (data, slug) => (
        <ProductPageExploreModule data={data} slug={slug} />
    ),
    ["innovative"]: (data, slug) => (
        <ProductPageSpotlight data={data} slug={slug} />
    ),
    ["graph"]: (data, slug) => (
        <ProductPagePlaceholder data={data} slug={slug} />
    ),
    ["product_form"]: (data, slug) => (
        <ProductPageForm data={data} slug={slug} />
    ),
    ["product"]: (data, slug) => <ProductPageDetails data={data} slug={slug} />,

    // gallery
    ["gallery_banner"]: (data, slug) => (
        <WaareeEnergiesPageBanner data={data} slug={slug} />
    ),
    ["waaree_rtl"]: (data, slug) => (
        <WaareeEnergiesPageRtl data={data} slug={slug} />
    ),
    ["focus_area"]: (data, slug) => (
        <WaareeEnergiesPageFocus data={data} slug={slug} />
    ),
    ["gallery_photo"]: (data, slug) => (
        <WaareeEnergiesPagePhotoSection data={data} slug={slug} />
    ),

    //Foundation Page

    ["foundation_awards"]: (data, slug) => (
        <FoundationPageAwards data={data} slug={slug} />
    ),
    ["about_waaree"]: (data, slug) => (
        <FoundationPageAbout data={data} slug={slug} />
    ),
    ["project_gallery"]: (data, slug) => (
        <FoundationPageGallery data={data} slug={slug} />
    ),
    ["foundation_initiatives"]: (data, slug) => (
        <FoundationPageInitiatives data={data} slug={slug} />
    ),
    ["foundation_resource"]: (data, slug) => (
        <FoundationPageResource data={data} slug={slug} />
    ),

    //Our Office Page

    ["our_office_map"]: (data, slug) => (
        <OfficePageMap data={data} slug={slug} />
    ),
    ["location"]: (data, slug) => (
        <OfficePageLocation data={data} slug={slug} />
    ),
    ["regional_contact"]: (data, slug) => (
        <OfficePageContact data={data} slug={slug} />
    ),

    // Case-Studies Page
    ["case_study"]: (data, slug) => (
        <CaseStudiesSection data={data} slug={slug} />
    ),
    // ["global_brands"]: (data, slug) => <GlobalBrandsSection data={data} slug={slug} />,

    // Events Page
    ["events_webinars"]: (data, slug) => (
        <EventPageWebinarSection data={data} slug={slug} />
    ),
    ["upcoming_events"]: (data, slug) => (
        <EventPageUpcomingSection data={data} slug={slug} />
    ),

    //Search

    ["global_brands"]: (data, slug) => (
        <GlobalBrandsSection data={data} slug={slug} />
    ),

    ["search_results"]: (data, slug) => (
        <SearchResults data={data} slug={slug} />
    ),

    // Blog-Listing page

    ["blog-listing"]: (data, slug) => (
        <BlogListingSection data={data} slug={slug} />
    ),
    ["featured-blog"]: (data, slug) => (
        <BlogListingPageFeaturedSection data={data} slug={slug} />
    ),

    // Solutions EPC Page
    ["epc_capabilities"]: (data, slug) => (
        <EpcPageCapabilities data={data} slug={slug} />
    ),
    ["epc_faq"]: (data, slug) => <EpcPageFaq data={data} slug={slug} />,
    ["epc_form"]: (data, slug) => <EpcPageForm data={data} slug={slug} />,
    ["initiative_gallery"]: (data, slug) => (
        <EpcPageGallery data={data} slug={slug} />
    ),

    //Download center List
    ["download_center_list"]: (data, slug) => (
        <DownloadCentreList data={data} slug={slug} />
    ),

    // Whitepaper Section
    ["featured_whitepaper"]: (data, slug) => (
        <WhitepaperPageFeaturedSection data={data} slug={slug} />
    ),
    ["whitepaper_listing"]: (data, slug) => (
        <WhitepaperListingSection data={data} slug={slug} />
    ),

    //  Media Press
    ["digital_press"]: (data, slug) => (
        <MediaPageDigitalSection data={data} slug={slug} />
    ),
    ["print_media"]: (data, slug) => (
        <MediaPagePrintMediaSection data={data} slug={slug} />
    ),
    ["media_bytes"]: (data, slug) => (
        <MediaPageMediaBytesSection data={data} slug={slug} />
    ),

    //CSR Page
    ["csr_vision"]: (data, slug) => <CsrPageVision data={data} slug={slug} />,
    ["csr_policies"]: (data, slug) => (
        <CsrPagePolicies data={data} slug={slug} />
    ),
    ["csr_project_gallery"]: (data, slug) => (
        <CsrPageGallery data={data} slug={slug} />
    ),
    ["csr_about_us"]: (data, slug) => <CsrAboutUs data={data} slug={slug} />,
    ["csr_teams"]: (data, slug) => <CsrPageTeam data={data} slug={slug} />,
    ["csr_map"]: (data, slug) => <CsrPageMapSection data={data} slug={slug} />,
    ["crs_contact_section"]: (data, slug) => (
        <CsrPageMapSection data={data} slug={slug} />
    ),

    //Blog Detail Page
    ["title_description"]: (data, slug) => (
        <BlogDetailPageDetailSection data={data} slug={slug} />
    ),
    ["related_blogs"]: (data, slug) => (
        <BlogDetailRelatedSection data={data} slug={slug} />
    ),

    //Whitepaper Detail Page
    ["related_whitepaper"]: (data, slug) => (
        <WhitepaperDetailRelatedSection data={data} slug={slug} />
    ),

    ["enquiry_tabbing"]: (data, slug) => (
        <EnquiryPageSlider data={data} slug={slug} />
    ),

    // Solar calculator
    ["install_solar"]: (data, slug) => (
        <SolarPageCalculatorSection data={data} slug={slug} />
    ),
    ["talk-to-experts"]: (data, slug) => (
        <SolarPageExpertSection data={data} slug={slug} />
    ),

    //Partner with us
    ["scope_of_work"]: (data, slug) => (
        <PartnerPageScope data={data} slug={slug} />
    ),
    ["partners_faq"]: (data, slug) => (
        <PartnerPageFaq data={data} slug={slug} />
    ),
    ["franchise_location"]: (data, slug) => (
        <PartnerpageLocation data={data} slug={slug} />
    ),
    ["about_channel"]: (data, slug) => (
        <PartnerPageAbout data={data} slug={slug} />
    ),
    ["partner_with_us"]: (data, slug) => (
        <PartnerPagePartner data={data} slug={slug} />
    ),
    ["process"]: (data, slug) => <PartnerPageProcess data={data} slug={slug} />,
    ["testimonials"]: (data, slug) => (
        <PartnerPagetestimonials data={data} slug={slug} />
    ),
    ["partner_form"]: (data, slug) => (
        <PartnerPageForm data={data} slug={slug} />
    ),

    //Inverstor Relations
    ["shareholders_investor"]: (data, slug) => (
        <InvestorRelationPage data={data} slug={slug} />
    ),
    ["newsletter"]: (data, slug) => (
        <InvestorRelationPageNewsletter data={data} slug={slug} />
    ),

    //Case Study Detail
    ["case_study_breadcrumb"]: (data, slug) => (
        <CaseStudyDetailPageBreadcrumbSection data={data} slug={slug} />
    ),
    ["case_study_overview"]: (data, slug) => (
        <CaseStudyDetailPageOverviewSection data={data} slug={slug} />
    ),
    ["case_study_approach"]: (data, slug) => (
        <CaseStudyDetailPageApproachSection data={data} slug={slug} />
    ),
    ["case_study_highlight"]: (data, slug) => (
        <CaseStudyDetailPageHighlightSection data={data} slug={slug} />
    ),
    ["case_study_outcome"]: (data, slug) => (
        <CaseStudyDetailPageOutcomeSection data={data} slug={slug} />
    ),
    ["case_study_benefit"]: (data, slug) => (
        <CaseStudyDetailPageValueSection data={data} slug={slug} />
    ),

    //Esg Page
    ["esg_accordian"]: (data, slug) => (
        <EsgPageCommitment data={data} slug={slug} />
    ),
    ["our_key"]: (data, slug) => (
        <EsgPageKeyInitiatives data={data} slug={slug} />
    ),
    ["esg-slider"]: (data, slug) => (
        <EsgPageIconSlider data={data} slug={slug} />
    ),
    ["esg_policies"]: (data, slug) => <EsgPolicies data={data} slug={slug} />,
    ["esg_initiatives"]: (data, slug) => (
        <EsgInitiatives data={data} slug={slug} />
    ),
    ["esg_commitment"]: (data, slug) => (
        <EsgCommitment data={data} slug={slug} />
    ),
    ["esg_responsibility"]: (data, slug) => (
        <EsgOurResponsibility data={data} slug={slug} />
    ),
    ["founder"]: (data, slug) => <EsgFounder data={data} slug={slug} />,
    ["esg_life_cycle"]: (data, slug) => <EsgLifeCyle data={data} slug={slug} />,
    ["esg_stakeholders"]: (data, slug) => (
        <EsgStakeholders data={data} slug={slug} />
    ),
    ["esg_form"]: (data, slug) => <EsgForm data={data} slug={slug} />,
    ["esg_anchored"]: (data, slug) => <EsgAnchored data={data} slug={slug} />,

    //Life at Waaree
    ["waaree_enviroments"]: (data, slug) => (
        <LifeAtWaareeEnvironemtSection data={data} slug={slug} />
    ),
    ["hr-initiative"]: (data, slug) => (
        <LifeAtWaareeHrInitiatives data={data} slug={slug} />
    ),
    ["waaree_people"]: (data, slug) => (
        <LifeAtWaareePeople data={data} slug={slug} />
    ),
    ["why_waaree"]: (data, slug) => (
        <LifeAtWaareeWhyWaaree data={data} slug={slug} />
    ),
    ["waaree_process"]: (data, slug) => (
        <LifeAtWaareeProcess data={data} slug={slug} />
    ),

    // Products details

    ["product_features"]: (data, slug) => (
        <ProductFeatureSection data={data} slug={slug} />
    ),
    ["product_efficiency_card"]: (data, slug) => (
        <ProductPageEfficiencySection data={data} slug={slug} />
    ),
    ["product_video"]: (data, slug) => (
        <ProductPageVideoSection data={data} slug={slug} />
    ),
    ["product_comparison"]: (data, slug) => (
        <ProductPageComparision data={data} slug={slug} />
    ),
    ["related_products"]: (data, slug) => (
        <ProductPagerelatedProducts data={data} slug={slug} />
    ),
    ["product-detail-form"]: (data, slug) => (
        <ProductDetailPageForm data={data} slug={slug} />
    ),
    ["product_resources"]: (data, slug) => (
        <ProductPageResource data={data} slug={slug} />
    ),

    //Careers
    ["career"]: (data, slug) => <CareerListing data={data} slug={slug} />,

    //Waaree Prime
    ["download"]: (data, slug) => (
        <PrimePageDownloadCenter data={data} slug={slug} />
    ),

    //Our Projects
    ["project_listing"]: (data, slug) => (
        <OurProjectPageModule data={data} slug={slug} />
    ),
    ["project_map"]: (data, slug) => (
        <OurProjectPageMap data={data} slug={slug} />
    ),

    //Grievance Page
    ["how-concerns"]: (data, slug) => (
        <GrievancePageSolution data={data} slug={slug} />
    ),
    ["about_grievance"]: (data, slug) => (
        <GrievancePageAbout data={data} slug={slug} />
    ),

    // SOlution Detail Page
    ["left_image_right_text"]: (data, slug) => (
        <SolutionDetailPageEmpoweringSection data={data} slug={slug} />
    ),
    ["solution_detail_awards"]: (data, slug) => (
        <SolutionDetailPageAwardsSection data={data} slug={slug} />
    ),
    ["solution_graph"]: (data, slug) => (
        <SolutionDetailPageGraphSection data={data} slug={slug} />
    ),
    ["technology"]: (data, slug) => (
        <SolutionDetailPageTechnologySection data={data} slug={slug} />
    ),
    ["technology_approach"]: (data, slug) => (
        <SolutionDetailPageTechnologySection data={data} slug={slug} />
    ),
    ["benefit"]: (data, slug) => (
        <SolutionDetailPageBenefitSection data={data} slug={slug} />
    ),
    ["solution_slider"]: (data, slug) => (
        <SolutionDetailPageProjectSection data={data} slug={slug} />
    ),
    ["card_slider"]: (data, slug) => (
        <SolutionDetailPageWhyChooseSection data={data} slug={slug} />
    ),
    ["related_solution"]: (data, slug) => (
        <SolutionDetailPageRelatedSection data={data} slug={slug} />
    ),

    ["description"]: (data, slug) => (
        <PrivacyPolicyDescription data={data} slug={slug} />
    ),

    ["investor_list"]: (data, slug) => (
        <ShareHolderRelationPage data={data} slug={slug} />
    ),

    ["investor_data"]: (data, slug) => (
        <ShareHolderRelationDataPage data={data} slug={slug} />
    ),

    ["multiple_shareholder_data"]: (data, slug) => (
        <InvestorPageListing data={data} slug={slug} />
    ),

    ["disclosure_table"]: (data, slug) => (
        <InvestorDiscloser data={data} slug={slug} />
    ),
    ["stocks"]: (data, slug) => (
        <HomePageWaareeStocks data={data} slug={slug} />
    ),

    // Investor video proceedings — earnings calls, AGMs, investor meets
    ["video_proceedings"]: (data, slug) => (
        <VideoProceedings data={data} slug={slug} />
    ),
};

