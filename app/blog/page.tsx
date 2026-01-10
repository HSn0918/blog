import {getPostsData} from "@/app/server-utils";
import BlogContent from "@/components/blog-content";
import type {Metadata} from "next";
import {getMetadata} from "@/lib/utils";
import PageContainer from "@/components/page-container";
import {Suspense} from "react";

export const metadata: Metadata = getMetadata("blog")

const Blog = () => {

    return (
        <PageContainer>
            <Suspense fallback={null}>
                <BlogContent posts={getPostsData()}/>
            </Suspense>
        </PageContainer>
    )
}

export default Blog
