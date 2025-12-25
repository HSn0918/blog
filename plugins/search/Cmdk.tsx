import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {useEffect, useState} from "react";
import Link from "next/link";
import Time from "@/components/time";
import {CommandLoading} from "cmdk";

const Cmdk = ({open, setOpen}: any) => {
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])
    useEffect(() => {
        let active = true
        const loadPosts = async () => {
            try {
                const res = await fetch('/posts.json')
                if (!res.ok) throw new Error('posts.json not found')
                const data = await res.json()
                if (active) {
                    setPosts(data.data || [])
                }
            } catch {
                try {
                    const res = await fetch('/api/get_posts')
                    if (!res.ok) throw new Error('api not available')
                    const data = await res.json()
                    if (active) {
                        setPosts(data.data || [])
                    }
                } catch {
                    if (active) {
                        setPosts([])
                    }
                }
            } finally {
                if (active) {
                    setLoading(false)
                }
            }
        }
        loadPosts()
        return () => {
            active = false
        }
    }, []);

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="输入关键词搜索..."/>
            <CommandList className={'space-y-4 max-h-[480px]'}>
                {loading && <CommandLoading>正在加载数据...</CommandLoading>}
                <CommandEmpty>未找到结果。</CommandEmpty>
                <CommandGroup heading="博客">
                    <div className={'space-y-4'}>
                        {posts.map((post: any) => (
                            <Link href={`/blog/${post?.id}`}>
                                <CommandItem className={'flex flex-col justify-center items-start'}>
                                    <div>
                                        <Time date={post.date}/>

                                    </div>
                                    <span className={'text-lg'}>{post.title}</span>
                                </CommandItem>
                            </Link>
                        ))}
                    </div>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}


export default Cmdk
