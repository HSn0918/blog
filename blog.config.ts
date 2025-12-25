// Purpose: This file is used to configure the blog, including the author, title, description, and other settings.

import Intro from "./components/intro.mdx"; // introduction or about me

// Page Config
// The following is the configuration of the blog, including the author, title, description, and other settings.
const blogConfig: any = {
  // author name
  author: "HSn",

  // Logo
  logo: {
    // how to change the favicon of the website?
    // change the app/favicon.ico file directly，or refer to the document below
    // https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons

    // you can use image or text as the logo, you can choose both, but the image will be displayed first
    text: "HSn", // null || text

    // whether the logo is a link to the home page
    isHomeLink: true, // true | false
  },

  // website title
  title: "HSn 的博客",

  // light | dark
  theme: "light",


  // routes
  routes: [
    {
      name: "博客",
      value: "/blog",
    },
    {
      name: "标签",
      value: "/tags",
    },
    {
      name: "项目",
      value: "/project",
    },
    {
      name: "友链",
      value: "/links",
    },
    {
      name: "关于",
      value: "/about",
    },
  ],

  // socials links
  socials: {
    email: "hsn@linux.do",
    github: "https://github.com/hsn0918",
    twitter: "https://twitter.com/hsn289744493",
    linkedin: "",
    facebook: "",
    instagram: "",
    youtube: "",
  },

  // home page config
  home: {
    title: "HSn 的博客",

    // introduction or about me
    // Why use components instead of configurations? Because this makes the homepage more customizable instead of a hard-coded template.
    intro: Intro, // file path of the introduction
  },

  // blog page config
  blog: {
    title: "博客",
    description: "一些博客",

    // pinnedSort is used to sort the pinned articles, the default is "desc" (descending), you can also set it to "asc" (ascending)
    pinnedSort: "desc", // "asc" | "desc"
  },

  // tags page config
  tags: {
    title: "标签",
    description: "所有标签，按字母顺序排列。",
  },

  // project page config
  project: {
    title: "项目展示",
    description: "一些自己制作的小工具",

    // status color and text
    getStatus: (status: string) => {
      // you can customize the status color and text！

      // dev: Under development or planning.
      // active: Currently focused on this project.
      // filed: Not upgrading will only fix bugs.
      // offline: Going offline soon.
      // none: Keep running.
      if (!status) return {};

      switch (status) {
        case "active":
          return {
            variant: "default",
            text: "活跃",
          };
        case "dev":
          return {
            variant: "secondary",
            text: "开发中",
          };
        case "filed":
          return {
            variant: "outline",
            text: "停更",
          };
        case "offline":
          return {
            variant: "destructive",
            text: "下线",
          };
      }
    },

    // name, description, href are required
    // github: username/repo
    // status: getStatus return value
    // and so on
    // you can add more fields according to your needs ,but you need to modify the code in the project/page.tsx file
    projects: [
      {
        name: "kubernetes-mcp",
        href: "https://github.com/HSn0918/kubernetes-mcp",
        description: "Kubernetes 相关的 MCP 工具与集成",
        status: "active",
      },
      {
        name: "tinyredis",
        href: "https://github.com/MiniApplication/tinyredis",
        description: "轻量级 Redis 实现与学习项目",
        status: "active",
      },
      {
        name: "doc2x-client",
        href: "https://github.com/HSn0918/doc2x-client",
        description: "文档转换的客户端工具",
        status: "active",
      },
      {
        name: "Learning-Notes",
        href: "https://github.com/HSn0918/Learning-Notes",
        description: "学习笔记与资料整理",
        status: "active",
      },
      {
        name: "image-tool",
        href: "https://github.com/HSn0918/image-tool",
        description: "图像处理小工具，https://image.huangsn.dev/",
        status: "active",
      },
    ],
  },

  // links page config
  links: {
    title: "友链",
    description: "朋友们的站点。",
    items: [],
  },

  // about page config
  about: {
    title: "关于",
    description: "关于 HSn。",
  },

  // Footer
  footer: {
    isShow: true,
    // whether to display the "Powered by NextBlog" in the footer，you can set it to false，but I hope you can keep it，thank you！
    isShowPoweredBy: true,
  },
};

// Plugins Config
// Why define the following as plugins? Because these are some dispensable functions that can be added or removed at will.
const pluginConfig = {
  // Comment
  comment: {
    engine: "giscus", // "" | giscus | utterances

    // giscus doc: https://giscus.app
    giscus: {
      repo: "hsn0918/next-blog",
      repoId: "R_kgDOKTZ_kQ",
      category: "Announcements",
      categoryId: "DIC_kwDOKTZ_kc4CfMXK",
      mapping: "pathname",
      reactionsEnabled: "1",
      emitMetadata: "0",
      inputPosition: "top",
      theme: "light",
      lang: "en",
      loading: "lazy",
    },

    // utterances doc: https://utteranc.es
    utterances: {
      src: "https://utteranc.es/client.js",
      repo: "hsn0918/next-blog",
      "issue-term": "pathname",
      theme: "github-light",
      crossorigin: "anonymous",
      label: "",
      async: true,
    },
  },

  // Pagination
  pagination: {
    engine: "default", // "" | default:pagination button | loadMore:loading more button
    pageSize: 5,
  },

  // Search
  search: {
    engine: "cmdk", //  "" | "cmdk"
  },

  //   Analytics
  analytics: {
    engine: "vercel", // "" | "vercel"
    // vercel doc: https://vercel.com/docs/analytics
  },

  // newsletter
  newsletter: {
    engine: "", // "" | "buttondown"

    title: "订阅邮件", // required
    description: "获取最新发布、功能更新与指南。",

    position: {
      footer: false, // in the footer
      blog: false, // on the blog list page
    },

    // buttondown doc: https://buttondown.com
    buttondown: {
      username: "yuanli", //  your buttondown username
    },
  },
};

export { blogConfig, pluginConfig };
