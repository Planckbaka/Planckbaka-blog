'use client';

import React, { useState, useEffect, useCallback } from 'react';

// TypeScript 类型定义
interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
}

// 导航项数据
const navItems: NavItem[] = [
    {
        label: "Home",
        href: "#home",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19Z"></path>
            </svg>
        ),
    },
    {
        label: "Projects",
        href: "#projects",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M4 5V19H20V7H11.5858L9.58579 5H4ZM12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5Z"></path>
            </svg>
        ),
    },
    {
        label: "Contact",
        href: "#contact",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M21.7267 2.95694L16.2734 22.0432C16.1225 22.5716 15.7979 22.5956 15.5563 22.1126L11 13L1.9229 9.36919C1.41322 9.16532 1.41953 8.86022 1.95695 8.68108L21.0432 2.31901C21.5716 2.14285 21.8747 2.43866 21.7267 2.95694ZM19.0353 5.09647L6.81221 9.17085L12.4488 11.4255L15.4895 17.5068L19.0353 5.09647Z"></path>
            </svg>
        ),
    },
];

const Navbar: React.FC = () => {
    const [isScrolling, setIsScrolling] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('');
    const [navWidth, setNavWidth] = useState<string>('100%');
    const [isMounted, setIsMounted] = useState(false);

    // 滚动处理函数
    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;
        const maxScroll = 1000;

        if (scrollY > 0) {
            setIsScrolling(true);

            // 计算宽度变化（仅在桌面端）
            if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                const scrollProgress = Math.min(scrollY / maxScroll, 1);
                const easeProgress = 1 - Math.pow(1 - scrollProgress, 4);

                const minWidth = 528;
                const maxWidth = window.innerWidth * 0.8;
                const currentWidth = maxWidth - (maxWidth - minWidth) * easeProgress;

                setNavWidth(`${currentWidth}px`);
            }
        } else {
            setIsScrolling(false);
            setNavWidth('80%');
        }
    }, []);

    // 平滑滚动到锚点
    const handleAnchorClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
            });
        }
    }, []);

    // 客户端挂载检测
    useEffect(() => {
        setIsMounted(true);
        setNavWidth('80%');
    }, []);

    // 设置滚动监听
    useEffect(() => {
        if (!isMounted) return;

        let rafId: number | null = null;

        const throttledScroll = () => {
            if (!rafId) {
                rafId = requestAnimationFrame(() => {
                    handleScroll();
                    rafId = null;
                });
            }
        };

        window.addEventListener('scroll', throttledScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', throttledScroll);
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
        };
    }, [handleScroll, isMounted]);

    // Intersection Observer 监听当前section
    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        const observerOptions = {
            threshold: 0.6,
            rootMargin: '-20% 0px -20% 0px'
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    if (id) {
                        setActiveSection(id);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    return (
        <>
            <div className="flex justify-center w-full">
                <nav
                    className={`
            fixed left-1/2 -translate-x-1/2 z-[100] 
            backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
            md:top-6 md:bottom-auto bottom-0
            border border-transparent
            ${
                        isScrolling
                            ? 'bg-white/10   backdrop-blur-xl border-white/20 md:rounded-full shadow-2xl'
                            : 'bg-transparent backdrop-blur-md shadow-lg border-transparent'
                    }
            md:w-auto w-full
            max-md:rounded-t-2xl max-md:border-[#ffffff10]
          `}
                    style={{
                        width: isMounted && window.innerWidth >= 768 ? navWidth : '100%',
                    }}
                >
                    <div className="container mx-auto flex justify-center items-center p-3">
                        <ul className="flex w-full justify-between md:space-x-6 md:justify-center md:gap-12 gap-6 transition-all duration-300 ease-out">
                            {navItems.map((item) => {
                                const isActive = activeSection === item.href.substring(1);

                                return (
                                    <li key={item.href} className="flex-1 md:flex-none">
                                        <a
                                            href={item.href}
                                            onClick={(e) => handleAnchorClick(e, item.href)}
                                            className={`
                        flex flex-col items-center gap-1 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] text-xs md:text-base relative group hover:bg-white/30 hover:backdrop-blur-sm hover:shadow-md transform hover:scale-105 px-4 py-2 rounded-lg
                        ${
                                                isActive
                                                    ? 'text-white font-semibold bg-white/20 shadow-sm'
                                                    : 'text-[var(--white-icon)] hover:text-white'
                                            }
                      `}
                                        >
                                            {/* 活跃状态指示器 - 仅桌面端显示 */}
                                            <div
                                                className={`
                          absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full 
                          transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] bg-gradient-to-r from-blue-500 to-purple-600 hidden md:block shadow-lg shadow-blue-500/50
                          ${
                                                    isActive
                                                        ? 'opacity-100 scale-100'
                                                        : 'opacity-0 scale-0'
                                                }
                        `}
                                            />

                                            {/* 移动端活跃状态指示器 */}
                                            <div
                                                className={`
                          absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full 
                          transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] bg-gradient-to-r from-blue-500 to-purple-600 md:hidden shadow-lg shadow-blue-500/50
                          ${
                                                    isActive
                                                        ? 'opacity-100 scale-100'
                                                        : 'opacity-0 scale-0'
                                                }
                        `}
                                            />

                                            {/* 图标 - 仅移动端显示 */}
                                            <span className="md:hidden flex items-center justify-center w-6 h-6">
                        {item.icon}
                      </span>

                                            {/* 标签文本 */}
                                            <span className="hidden md:inline-block">{item.label}</span>
                                            <span className="md:hidden">{item.label}</span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </nav>
            </div>

            {/* 移动端底部间距 */}
            <style jsx global>{`
        @media (max-width: 767px) {
          body {
            padding-bottom: 70px;
          }
        }
      `}</style>
        </>
    );
};

export default Navbar;