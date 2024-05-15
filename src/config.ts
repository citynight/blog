import type { NavigationLink, Site, User } from './types.ts'

export const SITE: Site = {
    author: 'Logan',
    url: 'https://1m.fit',
    title: '碎碎念',
    description: '我的碎碎念，记录随笔，分享生活。',
    shortDescription: '',
}

export const NavigationLinks: NavigationLink[] = [
    { name: 'Posts', url: '/posts' },
    { name: 'Category', url: '/categories' },
    { name: 'Timeline', url: '/timeline' },
    { name: 'About', url: '/posts/gblog' },
    { name: 'Friends', url: '/friends' },
]

export const Friends: User[] = [
    {
        avatar: 'https://tcxx.info/wp-content/themes/StarryW/images/bg/me.jpg',
        social: { twitter: 'Tiancaixinxin', blog: 'https://tcxx.info/', github: 'TCXX' },
        title: '我不是天才，我只是甜菜。',
        name: '甜欣屋',
        description: '技术圈的欧阳娜娜，旅居美国硅谷，生命不息作死不止，探索人生无限可能，女权主义者，希望世界和平',
    },
    {
        avatar: 'https://avatars.githubusercontent.com/u/6493255?v=4',
        social: { twitter: 'draven0xff', blog: 'https://draveness.me/', github: 'draveness' },
        title: '一个工程师',
        name: 'Draven',
        description: 'Go 语言设计与实现作者，偶像',
    },
    {
        avatar: 'https://pbs.twimg.com/profile_images/1598673328155262977/c_95AZZ8_400x400.jpg',
        social: { twitter: 'brendt_gd', github: 'brendt' },
        title: 'dev adv@phpstorm',
        name: 'Brent Roose',
        description: 'All In PHP & Laravel',
    },
]

export const FooterLinks = [
    {
        section: 'Blog',
        links: [
            { name: 'Posts', url: '/posts' },
            { name: 'Timeline', url: '/timeline' },
            { name: 'Categories', url: '/categories' },
            { name: 'About Me', url: '/posts/about-me' },
        ],
    },
    {
        section: 'Other',
        links: [
            { name: 'RSS', url: '/rss.xml' },
            { name: 'Site Map', url: '/sitemap-index.xml' },
            { name: 'Twitter', url: 'https://x.com/citynightcn' },
        ],
    },
]

export const GoogleAnalytics = {
    enable: false,
    id: 'G-TKQ4L3ZDSF',
}

export const SEO = {
    title: SITE.title,
    description: SITE.description,
    structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'inLanguage': 'en-US',
        '@id': SITE.url,
        'url': SITE.url,
        'name': SITE.title,
        'description': SITE.description,
        'isPartOf': {
            '@type': 'WebSite',
            'url': SITE.url,
            'name': SITE.title,
            'description': SITE.description,
        },
    },
}
