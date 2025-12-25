'use client';

import {Separator} from "@/components/ui/separator";
import {usePathname, useSearchParams} from "next/navigation";
import {blogConfig, pluginConfig} from "@/blog.config";
import Newsletter from "@/plugins/newsletter";


const Title = () => {
    const pathname = usePathname()
    const nameArr = pathname.split('/')
    const name = nameArr[nameArr.length - 1]

    const data = name ? blogConfig[name] : blogConfig.home

    // 如果是博客页面并带有tag参数
    const searchParams = useSearchParams()
    const tag = searchParams.get('tag')
    const {engine: newsletterEngine} = pluginConfig.newsletter

    if (name === 'blog' || tag) {
        return <div className={'container pt-8'}>
            <h1>{tag ? tag : data?.title}</h1>
            {data?.description &&
                <p className={'text-zinc-600'}>
                    {tag ? `标签「${tag}」下的文章列表。` :
                        data?.description}
                </p>
            }
            {newsletterEngine && (
                <p>
                    <Newsletter/>
                </p>
            )}
            <Separator/>
        </div>
    }

    return (
        data && <div className={'container pt-8'}>
            <h1>{data?.title}</h1>
            {data?.description && <p className={'text-zinc-600'}>{data?.description}</p>}
            <Separator/>
        </div>
    );
}


export default Title
