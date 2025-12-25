import type {Metadata} from "next";
import Link from "next/link";
import PageContainer from "@/components/page-container";
import {blogConfig} from "@/blog.config";
import {getMetadata} from "@/lib/utils";
import {CardDescription, CardTitle} from "@/components/ui/card";

export const metadata: Metadata = getMetadata("links");

const Links = () => {
    const {items} = blogConfig.links;

    return (
        <PageContainer>
            {items?.length ? (
                items.map((item: any, index: number) => (
                    <div className={'not-prose'} key={index}>
                        <CardTitle>
                            <Link className={'underline underline-offset-4'} href={item.href}>
                                {item.name}
                            </Link>
                        </CardTitle>
                        {item.description && (
                            <CardDescription className={'text-base'}>
                                {item.description}
                            </CardDescription>
                        )}
                    </div>
                ))
            ) : (
                <div className={'text-base text-zinc-500'}>
                    暂无友链。
                </div>
            )}
        </PageContainer>
    );
};

export default Links;
