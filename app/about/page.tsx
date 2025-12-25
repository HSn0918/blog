import type {Metadata} from "next";
import About from "@/components/about.mdx";
import PageContainer from "@/components/page-container";
import {getMetadata} from "@/lib/utils";

export const metadata: Metadata = getMetadata("about");

const AboutPage = () => {
    return (
        <PageContainer>
            <About/>
        </PageContainer>
    );
};

export default AboutPage;
