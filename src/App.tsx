import React, { useEffect, useRef, useState } from 'react';
import IntelligenceChart from './components/IntelligenceChart';

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slidesRef = useRef<(HTMLElement | null)[]>([]);
  const [promptModal, setPromptModal] = useState<{ title: string; content: string } | null>(null);
  const [videoModal, setVideoModal] = useState<string | null>(null);
  const videoModalRef = useRef<HTMLVideoElement | null>(null);
  const [imageModal, setImageModal] = useState<string | null>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          const index = slidesRef.current.indexOf(entry.target as HTMLElement);
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    }, observerOptions);

    slidesRef.current.forEach(slide => {
      if (slide) observer.observe(slide);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        if (activeIndex < slidesRef.current.length - 1) {
          slidesRef.current[activeIndex + 1]?.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (activeIndex > 0) {
          slidesRef.current[activeIndex - 1]?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  const scrollToSlide = (index: number) => {
    slidesRef.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  const slideTitles = [
    "首页：拥抱AI时代",
    "本次分享主要内容",
    "第一篇章：震撼世界的中国速度",
    "大模型性能跑分对比",
    "国产AI四大课代表",
    "第二篇章：AI最前沿的魔法应用",
    "Gemini：一句话生成互动网页",
    "Seedance 2.0：瞬间生产大片",
    "OpenClaw：真正的智能体架构",
    "自动化内容运营案例",
    "AI 自动化报刊案例",
    "新型 AI 平台的崛起",
    "AGI：通用人工智能的演进",
    "第三篇章：AI时代的教育本质",
    "刘嘉教授：从知识传递到能力培养",
    "通识教育的五个能力维度",
    "通识能力总结：成长路径",
    "教育升华：灵魂的唤醒",
    "时代寄语：Sam Altman",
    "参考、推荐与致谢"
  ];

  const prompts = {
    solar: '请帮我生成一个给三年级小学生解释日食原理的炫酷互动网页，包含光线的线路图、本影半影的介绍，最后在新增一个界面出5道题目，让小朋友可以自主答题。',
    quadratic: '创造一个交互式的网页，设计一个二次函数图象的平移与变换的交互式SVG动画，演示二次函数随a h k变化而变化。网页中也新增一个课后小测验的模块，用五道选择题来检查学习成果。',
    gas: '用 HTML + CSS + JavaScript 做一个交互式网页，主题是高中化学「理想气体定律 PV=nRT」。一个可视化的气体容器（可以用 canvas 或简单 SVG 画气缸 + 活塞）。几个滑块或输入框调节：体积 V（L）、温度 T（K）、物质的量 n（mol）；实时计算并显示压力 P（atm）；分子运动动画（粒子随机碰撞，密度随体积变化）；显示 PV = nRT 公式，数值同步更新；加一个 P-V 关系曲线图（用 Chart.js 或 canvas 画）。',
  };

  return (
    <>
      <div className="bg-container">
        <div className="orb orb-cyan"></div>
        <div className="orb orb-pink"></div>
      </div>
      <div className="scanline"></div>

      <div className="nav-dots" id="nav-dots">
        {slideTitles.map((title, index) => (
          <div
            key={index}
            className={`dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => scrollToSlide(index)}
          >
            <span className="dot-tooltip">{title}</span>
          </div>
        ))}
      </div>

      {/* Prompt 弹窗 */}
      {promptModal && (
        <div className="prompt-overlay" onClick={() => setPromptModal(null)}>
          <div className="prompt-modal" onClick={e => e.stopPropagation()}>
            <button className="prompt-close" onClick={() => setPromptModal(null)}>✕</button>
            <h3 className="prompt-modal-title">{promptModal.title}</h3>
            <p className="prompt-modal-content">{promptModal.content}</p>
          </div>
        </div>
      )}

      {/* 视频灯箱 */}
      {videoModal && (
        <div className="prompt-overlay" onClick={() => { videoModalRef.current?.pause(); setVideoModal(null); }}>
          <div className="video-lightbox" onClick={e => e.stopPropagation()}>
            <button className="prompt-close" onClick={() => { videoModalRef.current?.pause(); setVideoModal(null); }}>✕</button>
            <video ref={videoModalRef} controls autoPlay playsInline style={{ width: '100%', borderRadius: '12px' }}>
              <source src={videoModal} type="video/mp4" />
            </video>
          </div>
        </div>
      )}

      {/* 图片灯箱 */}
      {imageModal && (
        <div className="prompt-overlay" onClick={() => setImageModal(null)}>
          <div className="video-lightbox" onClick={e => e.stopPropagation()}>
            <button className="prompt-close" onClick={() => setImageModal(null)}>✕</button>
            <img src={imageModal} alt="" style={{ width: '100%', borderRadius: '12px', display: 'block' }} />
          </div>
        </div>
      )}


      <main id="presentation">
        {/* Slide 1: Title */}
        <section className="slide" ref={el => slidesRef.current[0] = el}>
          <div className="corner corner-tl"></div>
          <div className="corner corner-tr"></div>
          <div className="corner corner-bl"></div>
          <div className="corner corner-br"></div>
          <div className="slide-content">
            <div className="badge reveal">SYS.INIT // 2026</div>
            <h1 className="reveal delay-1">拥抱 <span className="glow">AI 时代</span><br />做未来教育的引路人</h1>
            <p className="subtitle reveal delay-2">人工智能的发展现状及AI时代对未来教育的思考</p>
            <div className="reveal delay-3"
              style={{ marginTop: '3rem', fontFamily: 'var(--font-decor)', color: 'var(--accent-pink)', letterSpacing: '0.2em', fontSize: 'var(--small-size)' }}>
              小学教师专题分享 / 赵熙
            </div>
          </div>
        </section>

        {/* Slide 2: 演讲大纲 */}
        <section className="slide" ref={el => slidesRef.current[1] = el}>
          <div className="slide-content">
            <h2 className="reveal" style={{ marginBottom: '4rem' }}>本次分享主要内容</h2>
            <div className="feature-grid reveal delay-1" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', maxWidth: '1200px', gap: '2rem' }}>
              <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                <div className="card-icon" style={{ color: 'var(--accent-cyan)', fontSize: '3rem', marginBottom: '1.5rem' }}>01</div>
                <h3 className="card-title" style={{ fontSize: '1.5rem', lineHeight: '1.4' }}>震撼世界的<br />"中国速度"</h3>
              </div>
              <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                <div className="card-icon" style={{ color: 'var(--accent-blue)', fontSize: '3rem', marginBottom: '1.5rem' }}>02</div>
                <h3 className="card-title" style={{ fontSize: '1.5rem', lineHeight: '1.4' }}>AI最前沿的<br />魔法应用</h3>
              </div>
              <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                <div className="card-icon" style={{ color: 'var(--accent-pink)', fontSize: '3rem', marginBottom: '1.5rem' }}>03</div>
                <h3 className="card-title" style={{ fontSize: '1.5rem', lineHeight: '1.4' }}>未来教育的<br />本质与使命</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 3: 第一篇章 - 震撼世界的“中国速度” */}
        <section className="slide" ref={el => slidesRef.current[2] = el}>
          <div className="slide-content">
            <div className="badge reveal">CHAPTER 01</div>
            <h1 className="reveal delay-1" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>震撼世界的<span className="glow">“中国速度”</span></h1>
            <div className="reveal delay-2" style={{ width: '2px', height: '60px', background: 'linear-gradient(to bottom, var(--accent-cyan), transparent)', margin: '2rem 0' }}></div>
            <p className="subtitle reveal delay-3" style={{ maxWidth: '800px', opacity: 0.8 }}>
              从算力基建到模型迭代，中国 AI 正在大模型赛道上展现出惊人的爆发力与创新速度。
            </p>
          </div>
        </section>

        {/* Slide 4: 中国速度 */}
        <section className="slide align-left" ref={el => slidesRef.current[3] = el}>
          <div className="slide-content" style={{ justifyContent: 'flex-start', paddingTop: '10vh', paddingLeft: '2vw', paddingRight: '2vw' }}>
            <h2 className="reveal" style={{ paddingLeft: '4vw' }}>震撼世界的"中国速度"</h2>
            <p className="subtitle reveal delay-1" style={{ marginBottom: '1rem', paddingLeft: '4vw' }}>中美顶尖大模型性能跑分差距</p>
            <div className="reveal delay-2" style={{ width: '100%', height: '65vh', minHeight: '500px', maxWidth: '1600px', margin: '0 auto' }}>
              <IntelligenceChart />
            </div>
          </div>
        </section>

        {/* Slide 4: 国产AI四大课代表 */}
        {/* Slide 5: 国产AI四大课代表 */}
        <section className="slide align-left" ref={el => slidesRef.current[4] = el}>
          <div className="slide-content">
            <h2 className="reveal">震撼世界的"中国速度"</h2>
            <p className="subtitle reveal delay-1" style={{ textAlign: 'left', marginBottom: '2rem' }}>国产 AI"课代表"</p>
            <div className="feature-grid four-cols reveal delay-2">
              <div className="card">
                <div className="card-icon" style={{ color: 'var(--accent-cyan)' }}>DeepSeek</div>
                <p>开源顶流，V4模型蓄势待发。</p>
              </div>
              <div className="card">
                <div className="card-icon" style={{ color: 'var(--accent-pink)' }}>Kimi</div>
                <p>k2.5性能比肩GPT-5.2，低成本王者。</p>
              </div>
              <div className="card">
                <div className="card-icon" style={{ color: 'var(--accent-blue)' }}>GLM</div>
                <p>GLM5刷新开源记录，编码性能卓越。</p>
              </div>
              <div className="card">
                <div className="card-icon" style={{ color: '#a855f7' }}>MiniMax</div>
                <p>M2.5极致性价比，流畅不降智。</p>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 6: 第二篇章 - AI最前沿的魔法应用 */}
        <section className="slide" ref={el => slidesRef.current[5] = el}>
          <div className="slide-content">
            <div className="badge reveal">CHAPTER 02</div>
            <h1 className="reveal delay-1" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>AI 最前沿的<span className="glow">"魔法"应用</span></h1>
            <div className="reveal delay-2" style={{ width: '2px', height: '60px', background: 'linear-gradient(to bottom, var(--accent-cyan), transparent)', margin: '2rem 0' }}></div>
            <div className="feature-grid reveal delay-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', maxWidth: '1100px', gap: '2rem' }}>
              <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
                <div className="card-icon" style={{ color: 'var(--accent-cyan)', fontSize: '2.5rem', marginBottom: '1rem' }}>01</div>
                <h3 className="card-title" style={{ fontSize: '1.3rem', lineHeight: '1.4' }}>应用魔法<br />Gemini 一句话生成互动网页</h3>
              </div>
              <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
                <div className="card-icon" style={{ color: 'var(--accent-pink)', fontSize: '2.5rem', marginBottom: '1rem' }}>02</div>
                <h3 className="card-title" style={{ fontSize: '1.3rem', lineHeight: '1.4' }}>视觉震撼<br />Seedance 2.0 瞬间生产大片</h3>
              </div>
              <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
                <div className="card-icon" style={{ color: 'var(--accent-blue)', fontSize: '2.5rem', marginBottom: '1rem' }}>03</div>
                <h3 className="card-title" style={{ fontSize: '1.3rem', lineHeight: '1.4' }}>AI 活了<br />OpenClaw 带来真正的智能</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 6: 应用魔法 - Gemini */}
        <section className="slide align-left" ref={el => slidesRef.current[6] = el}>
          <div className="slide-content">
            <h2 className="reveal">应用魔法：Gemini 一句话生成互动网页</h2>
            <p className="subtitle reveal delay-1" style={{ textAlign: 'left', marginBottom: '2rem' }}>一句话建网站，打破"聊天工具"认知</p>
            <div className="feature-grid reveal delay-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', maxWidth: '1400px' }}>
              <a href="https://solar-eclipse-simulation.zhaolaoban.top" target="_blank" rel="noopener noreferrer" className="card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>🌑</div>
                <h3 className="card-title">探索日食奥秘</h3>
                <p>AI 生成的 3D 互动日食模拟，拖拽观察日月地运行轨迹。</p>
                <div className="card-links">
                  <p className="prompt-link">🔗 点击体验</p>
                  <p className="prompt-link" onClick={e => { e.preventDefault(); e.stopPropagation(); setPromptModal({ title: '🌑 探索日食奥秘', content: prompts.solar }); }}>💬 查看 Prompt</p>
                </div>
              </a>
              <a href="https://quadratic-function-explorer.zhaolaoban.top" target="_blank" rel="noopener noreferrer" className="card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>📐</div>
                <h3 className="card-title">一元二次方程</h3>
                <p>实时调节参数，直观感受抛物线的形态变化与数学之美。</p>
                <div className="card-links">
                  <p className="prompt-link">🔗 点击体验</p>
                  <p className="prompt-link" onClick={e => { e.preventDefault(); e.stopPropagation(); setPromptModal({ title: '📐 一元二次方程', content: prompts.quadratic }); }}>💬 查看 Prompt</p>
                </div>
              </a>
              <a href="https://gas-law-simulator.zhaolaoban.top" target="_blank" rel="noopener noreferrer" className="card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>🧪</div>
                <h3 className="card-title">理想气体定律</h3>
                <p>可视化温度、压强、体积的动态关系，让物理公式"活"起来。</p>
                <div className="card-links">
                  <p className="prompt-link">🔗 点击体验</p>
                  <p className="prompt-link" onClick={e => { e.preventDefault(); e.stopPropagation(); setPromptModal({ title: '🧪 理想气体定律', content: prompts.gas }); }}>💬 查看 Prompt</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Slide 7: 视觉震撼 - Seedance 2.0 */}
        <section className="slide align-left" ref={el => slidesRef.current[7] = el}>
          <div className="slide-content">
            <h2 className="reveal">视觉震撼：Seedance 2.0 瞬间生产大片</h2>
            <p className="subtitle reveal delay-1" style={{ textAlign: 'left', marginBottom: '2rem' }}>只需一句话，30秒生成电影级画质视频</p>
            <div className="video-grid reveal delay-2">
              <div className="video-card" onClick={() => setVideoModal('/resource/Hangzhou-video.mp4')} style={{ cursor: 'pointer' }}>
                <video preload="auto" muted playsInline>
                  <source src="/resource/Hangzhou-video.mp4#t=3" type="video/mp4" />
                </video>
                <p className="video-label">🎬 杭州宣传片</p>
              </div>
              <div className="video-card" onClick={() => setVideoModal('/resource/Tom-Cruise-fighting-Brad-Pitt.mp4')} style={{ cursor: 'pointer' }}>
                <video preload="auto" muted playsInline>
                  <source src="/resource/Tom-Cruise-fighting-Brad-Pitt.mp4#t=3" type="video/mp4" />
                </video>
                <p className="video-label">🎭 好莱坞动作大片</p>
              </div>
              <div className="video-card" onClick={() => setVideoModal('/resource/3-min-film.mp4')} style={{ cursor: 'pointer' }}>
                <video preload="auto" muted playsInline>
                  <source src="/resource/3-min-film.mp4#t=3" type="video/mp4" />
                </video>
                <p className="video-label">🎞️ 3分钟AI微电影</p>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 8: AI活了 - OpenClaw 架构 */}
        <section className="slide align-left" ref={el => slidesRef.current[8] = el}>
          <div className="slide-content">
            <h2 className="reveal">AI 活了：OpenClaw 带来真正的智能</h2>
            <p className="subtitle reveal delay-1" style={{ textAlign: 'left', marginBottom: '2rem' }}>真正接管电脑的智能体 (Agent)，找资料 → 写新闻稿 → 发邮件，全自动跨软件完成</p>
            <div className="reveal delay-2" style={{ display: 'flex', gap: '2rem', width: '100%', maxWidth: '1400px', alignItems: 'stretch', flexWrap: 'wrap' }}>
              <div className="arch-stack" style={{ flex: '0 0 280px' }}>
                <div className="arch-layer" style={{ borderColor: 'var(--accent-cyan)' }}>
                  <span className="arch-icon">🌐</span>
                  <div><strong>Gateway</strong><br /><span style={{ color: 'var(--text-secondary)', fontSize: 'var(--small-size)' }}>消息统一入口</span></div>
                </div>
                <div className="arch-arrow">↓</div>
                <div className="arch-layer" style={{ borderColor: 'var(--accent-pink)' }}>
                  <span className="arch-icon">🧠</span>
                  <div><strong>Agent</strong><br /><span style={{ color: 'var(--text-secondary)', fontSize: 'var(--small-size)' }}>AI 推理编排</span></div>
                </div>
                <div className="arch-arrow">↓</div>
                <div className="arch-layer" style={{ borderColor: 'var(--accent-blue)' }}>
                  <span className="arch-icon">🔧</span>
                  <div><strong>Skills</strong><br /><span style={{ color: 'var(--text-secondary)', fontSize: 'var(--small-size)' }}>可扩展能力模块</span></div>
                </div>
                <div className="arch-arrow">↓</div>
                <div className="arch-layer" style={{ borderColor: '#a855f7' }}>
                  <span className="arch-icon">💾</span>
                  <div><strong>Memory</strong><br /><span style={{ color: 'var(--text-secondary)', fontSize: 'var(--small-size)' }}>状态与长期记忆</span></div>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: '400px', background: 'transparent', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(0, 255, 204, 0.3)' }}>
                <img
                  alt="Star History Chart"
                  src="/resource/starhistory.png"
                  style={{ width: '100%', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Slide 9: OpenClaw应用 - 自动化小红书运营 */}
        <section className="slide align-left" ref={el => slidesRef.current[9] = el}>
          <div className="slide-content">
            <h2 className="reveal">OpenClaw 应用：自动化小红书运营</h2>
            <p className="subtitle reveal delay-1" style={{ textAlign: 'left', marginBottom: '2rem' }}>AI 自动完成选题、撰写、配图、发布全流程</p>
            <div className="reveal delay-2" style={{ width: '100%', maxWidth: '1000px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
              <img alt="自动运营小红书" src="/resource/自动运营小红书.png" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>
        </section>

        {/* Slide 10: OpenClaw应用 - 每日猫咪日报 */}
        <section className="slide align-left" ref={el => slidesRef.current[10] = el}>
          <div className="slide-content">
            <h2 className="reveal">OpenClaw 应用：每日猫咪日报</h2>
            <p className="subtitle reveal delay-1" style={{ textAlign: 'left', marginBottom: '2rem' }}>自动采集、编辑、排版，每天推送一份可爱日报</p>
            <div className="feature-grid reveal delay-2" style={{ gridTemplateColumns: 'repeat(3, 1fr)', maxWidth: '1400px', gap: '2rem' }}>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <img alt="猫咪日报" src="/resource/cat-1.png" onClick={() => setImageModal('/resource/cat-1.png')} style={{ width: '100%', display: 'block', aspectRatio: '16/10', objectFit: 'cover', cursor: 'pointer' }} />
                <p style={{ textAlign: 'center', padding: '1rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-decor)', fontSize: 'var(--body-size)', margin: 0 }}>猫咪日报</p>
              </div>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <img alt="每日做梦" src="/resource/cat-2.png" onClick={() => setImageModal('/resource/cat-2.png')} style={{ width: '100%', display: 'block', aspectRatio: '16/10', objectFit: 'cover', cursor: 'pointer' }} />
                <p style={{ textAlign: 'center', padding: '1rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-decor)', fontSize: 'var(--body-size)', margin: 0 }}>每日做梦</p>
              </div>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <img alt="复杂规划" src="/resource/cat-3.png" onClick={() => setImageModal('/resource/cat-3.png')} style={{ width: '100%', display: 'block', aspectRatio: '16/10', objectFit: 'cover', cursor: 'pointer' }} />
                <p style={{ textAlign: 'center', padding: '1rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-decor)', fontSize: 'var(--body-size)', margin: 0 }}>复杂规划</p>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 11: OpenClaw应用 - AI平台 */}
        <section className="slide align-left" ref={el => slidesRef.current[11] = el}>
          <div className="slide-content">
            <h2 className="reveal">OpenClaw 应用：各种 AI 平台的出现</h2>
            <p className="subtitle reveal delay-1" style={{ textAlign: 'left', marginBottom: '2rem' }}>逐渐出现了给 AI 看的平台，而不是给人看的平台</p>
            <div className="feature-grid reveal delay-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', maxWidth: '1000px', gap: '2rem' }}>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <img alt="Moltbook" src="/resource/Moltbook.png" onClick={() => setImageModal('/resource/Moltbook.png')} style={{ width: '100%', display: 'block', aspectRatio: '16/10', objectFit: 'cover', cursor: 'pointer' }} />
                <a href="https://www.moltbook.com" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '1rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-decor)', fontSize: 'var(--body-size)', textDecoration: 'none' }}>🔗 Moltbook</a>
              </div>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <img alt="RentAHuman" src="/resource/rentahuman.png" onClick={() => setImageModal('/resource/rentahuman.png')} style={{ width: '100%', display: 'block', aspectRatio: '16/10', objectFit: 'cover', cursor: 'pointer' }} />
                <a href="https://rentahuman.ai" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '1rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-decor)', fontSize: 'var(--body-size)', textDecoration: 'none' }}>🔗 RentAHuman</a>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 12: AGI - 通用人工智能 */}
        <section className="slide align-left" ref={el => slidesRef.current[12] = el}>
          <div className="slide-content">
            <h2 className="reveal">AGI — 通用人工智能</h2>
            <p className="subtitle reveal delay-1" style={{ textAlign: 'left', marginBottom: '2rem' }}>众多专家认为 AGI 将在 5~10 年内实现</p>
            <div className="reveal delay-2" style={{ display: 'flex', gap: '2.5rem', width: '100%', maxWidth: '1600px', alignItems: 'stretch' }}>
              {/* 四项核心能力 - 左侧 2x2 排列 */}
              <div className="card" style={{ flex: '0 0 420px', textAlign: 'center', padding: '2rem' }}>
                <h3 className="card-title" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', whiteSpace: 'nowrap' }}>
                  <span style={{ fontSize: '1.8rem' }}>🎯</span> AGI 四项核心能力
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="arch-layer" style={{ borderColor: 'var(--accent-cyan)', justifyContent: 'center', padding: '0.8rem', fontSize: 'var(--h3-size)', textAlign: 'center' }}><strong>跨领域<br />学习</strong></div>
                  <div className="arch-layer" style={{ borderColor: 'var(--accent-pink)', justifyContent: 'center', padding: '0.8rem', fontSize: 'var(--h3-size)', textAlign: 'center' }}><strong>抽象<br />推理</strong></div>
                  <div className="arch-layer" style={{ borderColor: 'var(--accent-blue)', justifyContent: 'center', padding: '0.8rem', fontSize: 'var(--h3-size)', textAlign: 'center' }}><strong>自主<br />决策</strong></div>
                  <div className="arch-layer" style={{ borderColor: '#a855f7', justifyContent: 'center', padding: '0.8rem', fontSize: 'var(--h3-size)', textAlign: 'center' }}><strong>自我<br />进化</strong></div>
                </div>
              </div>

              {/* 演化阶段 - 右侧横向排列 */}
              <div style={{ flex: 1, display: 'flex', gap: '1rem', alignItems: 'stretch' }}>
                <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', padding: '1.5rem', justifyContent: 'center' }}>
                  <div style={{ fontSize: '2.2rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-decor)' }}>01</div>
                  <div>
                    <strong style={{ color: 'var(--accent-cyan)', display: 'block', marginBottom: '0.5rem', fontSize: 'var(--h3-size)', whiteSpace: 'nowrap' }}>LLM 问答时代</strong>
                    <p style={{ margin: 0, fontSize: 'calc(var(--h3-size) * 0.8)', lineHeight: 1.4 }}>问它问题 → 它给文本<br />然后我们去行动</p>
                  </div>
                </div>

                <div style={{ color: 'var(--text-dim)', fontSize: '2rem', flexShrink: 0, alignSelf: 'center' }}>→</div>

                <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', padding: '1.5rem', justifyContent: 'center' }}>
                  <div style={{ fontSize: '2.2rem', color: 'var(--accent-pink)', fontFamily: 'var(--font-decor)' }}>02</div>
                  <div>
                    <strong style={{ color: 'var(--accent-pink)', display: 'block', marginBottom: '0.5rem', fontSize: 'var(--h3-size)', whiteSpace: 'nowrap' }}>Autonomous Agents</strong>
                    <p style={{ margin: 0, fontSize: 'calc(var(--h3-size) * 0.8)', lineHeight: 1.4 }}>不仅问它问题<br />还能让它去执行任务</p>
                  </div>
                </div>

                <div style={{ color: 'var(--text-dim)', fontSize: '2rem', flexShrink: 0, alignSelf: 'center' }}>→</div>

                <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', padding: '1.5rem', justifyContent: 'center' }}>
                  <div style={{ fontSize: '2.2rem', color: '#a855f7', fontFamily: 'var(--font-decor)' }}>03</div>
                  <div>
                    <strong style={{ color: '#a855f7', display: 'block', marginBottom: '0.5rem', fontSize: 'var(--h3-size)', whiteSpace: 'nowrap' }}>Generative Agents</strong>
                    <p style={{ margin: 0, fontSize: 'calc(var(--h3-size) * 0.8)', lineHeight: 1.4 }}>不再告诉它干什么<br />而是告诉它我们的目标</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 15: 第三篇章 - AI时代的教育本质与使命 */}
        <section className="slide" ref={el => slidesRef.current[13] = el}>
          <div className="slide-content">
            <div className="badge reveal">CHAPTER 03</div>
            <h1 className="reveal delay-1" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>AI 时代的<span className="glow">教育本质与使命</span></h1>
            <div className="reveal delay-2" style={{ width: '2px', height: '60px', background: 'linear-gradient(to bottom, var(--accent-cyan), transparent)', margin: '2rem 0' }}></div>
            <p className="subtitle reveal delay-3" style={{ maxWidth: 'none', opacity: 0.8, whiteSpace: 'nowrap' }}>
              当知识获取变得触手可及，教育的重心将从“授业”转向“解惑”与“育人”。
            </p>
          </div>
        </section>

        <section className="slide align-left" ref={el => slidesRef.current[14] = el}>
          <div className="slide-content">
            <h2 className="reveal">核心 — 从知识传递到能力培养</h2>
            <div className="reveal delay-1" style={{ display: 'flex', gap: '4rem', alignItems: 'center', marginTop: '2rem', width: '100%', maxWidth: '1200px' }}>
              <div style={{ flex: '0 0 350px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: '1px solid rgba(0, 255, 204, 0.3)' }}>
                <img src="/resource/liujia.jpg" alt="刘嘉教授" style={{ width: '100%', display: 'block' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '3rem', color: 'var(--accent-cyan)', marginBottom: '1rem', fontFamily: 'var(--font-main)' }}>刘嘉</h3>
                <div style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <p style={{ margin: 0, fontWeight: 600, color: '#fff' }}>教授</p>
                  <p style={{ margin: 0 }}>清华大学心理与认知科学系</p>
                  <p style={{ margin: 0 }}>清华大学基础科学讲席教授、北京智源人工智能研究院首席科学家</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 16: 通识教育的五个能力维度 (END) */}
        <section className="slide align-left" ref={el => slidesRef.current[15] = el}>
          <div className="slide-content">
            <h2 className="reveal" style={{ fontSize: '3.5rem', marginBottom: '3rem' }}>通识教育的五个能力维度</h2>
            <div className="feature-grid reveal delay-1" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: '1400px', width: '100%' }}>
              <div className="card" style={{ padding: '1.8rem 2.5rem' }}>
                <h3 className="card-title" style={{ color: 'var(--accent-cyan)', fontSize: '1.8rem', marginBottom: '0.8rem' }}>01 / 研究能力：好的问题比正确的答案更重要</h3>
                <p style={{ fontSize: '1.2rem', lineHeight: 1.6, margin: 0, opacity: 0.9 }}>研究能力就是透过现象找到问题的本质，并提出恰当的问题。</p>
              </div>
              <div className="card" style={{ padding: '1.8rem 2.5rem' }}>
                <h3 className="card-title" style={{ color: 'var(--accent-pink)', fontSize: '1.8rem', marginBottom: '0.8rem' }}>02 / 统计能力：在大数据时代保持理性判断</h3>
                <p style={{ fontSize: '1.2rem', lineHeight: 1.6, margin: 0, opacity: 0.9 }}>指不随波逐流、不被名人或情绪误导，能独立理解世界真实图景的能力。</p>
              </div>
              <div className="card" style={{ padding: '1.8rem 2.5rem' }}>
                <h3 className="card-title" style={{ color: 'var(--accent-blue)', fontSize: '1.8rem', marginBottom: '0.8rem' }}>03 / 逻辑能力：从第一性原理出发进行推理</h3>
                <p style={{ fontSize: '1.2rem', lineHeight: 1.6, margin: 0, opacity: 0.9 }}>结合研究与统计能力，通过逻辑推理从已有信息中推演出新的知识、观念与解决方案。</p>
              </div>
              <div className="card" style={{ padding: '1.8rem 2.5rem' }}>
                <h3 className="card-title" style={{ color: '#a855f7', fontSize: '1.8rem', marginBottom: '0.8rem' }}>04 / 心理能力：认识自我，获得自由</h3>
                <p style={{ fontSize: '1.2rem', lineHeight: 1.6, margin: 0, opacity: 0.9 }}>拥有面对挫折的韧性和内在自由，是应对 AI 时代不确定性的核心。</p>
              </div>
              <div className="card" style={{ padding: '1.8rem 2.5rem' }}>
                <h3 className="card-title" style={{ color: 'var(--accent-cyan)', fontSize: '1.8rem', marginBottom: '0.8rem' }}>05 / 修辞能力：说服他人，共同行动</h3>
                <p style={{ fontSize: '1.2rem', lineHeight: 1.6, margin: 0, opacity: 0.9 }}>懂得沟通与共情，去团结他人。如果不能让团队、组织、社会听懂并响应你的行动，就难以推动变革。</p>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 17: 通识能力总结金字塔 */}
        <section className="slide align-left" ref={el => slidesRef.current[16] = el}>
          <div className="slide-content">
            <h2 className="reveal" style={{ fontSize: '3.5rem', marginBottom: '3rem' }}>通识能力总结：成长路径</h2>
            <div className="reveal delay-1" style={{
              marginBottom: '3rem',
              fontSize: '1.2rem',
              lineHeight: 1.8,
              color: 'var(--text-secondary)',
              whiteSpace: 'nowrap'
            }}>
              这五个能力共同构成了一个完整的成长路径：通过<span style={{ color: 'var(--accent-cyan)' }}>研究、统计、逻辑能力</span>，我们发现真理；借助<span style={{ color: 'var(--accent-pink)' }}>心理能力</span>，我们获得内在自由；最终，以<span style={{ color: 'var(--accent-cyan)' }}>修辞能力</span>，服务社会、团结他人、推动改变。
            </div>

            <div className="reveal delay-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4rem', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4rem', maxWidth: '1400px' }}>
                {/* Pyramid Section */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '900px' }}>

                  {/* Level 3: Rhetoric */}
                  <div className="card" style={{
                    width: '40%',
                    height: '120px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0, 255, 204, 0.15)',
                    border: '1px solid var(--accent-cyan)',
                    borderRadius: '15px',
                    boxShadow: '0 0 30px rgba(0, 255, 204, 0.2)'
                  }}>
                    <h3 style={{ fontSize: '1.6rem', margin: 0 }}>修辞能力</h3>
                  </div>

                  {/* Level 2: Psychology */}
                  <div className="card" style={{
                    width: '70%',
                    height: '120px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 46, 115, 0.15)',
                    border: '1px solid var(--accent-pink)',
                    borderRadius: '15px'
                  }}>
                    <h3 style={{ fontSize: '1.6rem', margin: 0 }}>心理能力</h3>
                  </div>

                  {/* Level 1 Bottom Row (Truth) */}
                  <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                    {['研究能力', '统计能力', '逻辑能力'].map((name) => (
                      <div key={name} className="card" style={{
                        flex: 1,
                        height: '120px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(255, 215, 0, 0.12)',
                        border: '1px solid rgba(255, 215, 0, 0.4)',
                        borderRadius: '15px'
                      }}>
                        <h3 style={{ fontSize: '1.6rem', margin: 0 }}>{name}</h3>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Labels on the Right */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left', minWidth: '260px' }}>
                  <div style={{ height: '120px', display: 'flex', alignItems: 'center', color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '1.4rem' }}>
                    <span style={{ marginRight: '1rem' }}>←</span> Lv3. 推动改变
                  </div>
                  <div style={{ height: '120px', display: 'flex', alignItems: 'center', color: 'var(--accent-pink)', fontWeight: 600, fontSize: '1.3rem' }}>
                    <span style={{ marginRight: '1rem' }}>←</span> Lv2. 获得内在自由
                  </div>
                  <div style={{ height: '120px', display: 'flex', alignItems: 'center', color: '#FFD700', fontWeight: 600, fontSize: '1.3rem' }}>
                    <span style={{ marginRight: '1rem' }}>←</span> Lv1. 发现真理
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Slide 18: 教育升华 */}
        <section className="slide align-left" ref={el => slidesRef.current[17] = el}>
          <div className="slide-content" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="reveal" style={{
              fontSize: '3rem',
              lineHeight: 1.6,
              fontWeight: 500,
              maxWidth: '1200px',
              color: 'var(--text-primary)',
              textAlign: 'center',
              margin: 'auto'
            }}>
              “ 知识可以被轻易获取，<br />
              但<span style={{ color: 'var(--accent-pink)', fontWeight: 700 }}>灵魂的唤醒</span>，<br />
              永远只能由灵魂来完成。”
            </div>
          </div>
        </section>

        {/* Slide 19: Sam Altman 寄语 */}
        <section className="slide align-left" ref={el => slidesRef.current[18] = el}>
          <div className="slide-content" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div className="reveal" style={{
              fontSize: '2.2rem',
              lineHeight: 1.6,
              color: 'var(--text-primary)',
              fontStyle: 'italic',
              whiteSpace: 'nowrap',
              marginBottom: '3rem'
            }}>
              “世界将发生翻天覆地变化。我们正处于巨变的开端，人类有一个难能可贵的机会去打造未来。”
            </div>
            <div className="reveal delay-1" style={{
              fontSize: '1.8rem',
              color: 'var(--accent-cyan)',
              fontWeight: 600
            }}>
              ——— Sam Altman <span style={{ fontSize: '1.2rem', color: 'var(--text-dim)', fontWeight: 400, marginLeft: '1rem' }}>(CEO of OpenAI)</span>
            </div>
          </div>
        </section>
        {/* Slide 20: 参考来源与致谢 */}
        <section className="slide align-left" ref={el => slidesRef.current[19] = el}>
          <div className="slide-content">
            <h2 className="reveal" style={{ fontSize: '3.5rem', marginBottom: '3rem' }}>参考、推荐与致谢</h2>

            <div className="reveal delay-1" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: 'auto auto',
              gap: '4rem 8rem',
              width: '100%',
              maxWidth: '1200px'
            }}>
              {/* Box 1: References */}
              <div>
                <h3 style={{ color: 'var(--accent-cyan)', fontSize: '1.8rem', marginBottom: '1rem', borderBottom: '1px solid rgba(0, 255, 204, 0.3)', paddingBottom: '0.5rem' }}>参考来源</h3>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                  <li style={{ marginBottom: '0.8rem' }}>• 刘嘉：AI时代，我们该学什么？怎么学？</li>
                  <li>• 刘嘉：AI时代属于年轻人，不要用过时的经验束缚他们</li>
                </ul>
              </div>

              {/* Box 2: Apps */}
              <div>
                <h3 style={{ color: 'var(--accent-cyan)', fontSize: '1.8rem', marginBottom: '1rem', borderBottom: '1px solid rgba(0, 255, 204, 0.3)', paddingBottom: '0.5rem' }}>推荐 App</h3>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                  <li style={{ marginBottom: '0.5rem' }}>• <b>豆包、即梦AI</b></li>
                  <li style={{ marginBottom: '0.5rem' }}>• <b>Gemini</b>：理性且博学的全知学者</li>
                  <li>• <b>Grok</b>：漫游银河系的博学诗人</li>
                </ul>
              </div>

              {/* Box 3: Public Accounts */}
              <div>
                <h3 style={{ color: 'var(--accent-pink)', fontSize: '1.8rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 46, 115, 0.3)', paddingBottom: '0.5rem' }}>推荐公众号</h3>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                  <li style={{ marginBottom: '0.5rem' }}>• 新智元</li>
                  <li style={{ marginBottom: '0.5rem' }}>• 机器之心</li>
                  <li style={{ marginBottom: '0.5rem' }}>• 晚点LatePost</li>
                  <li>• 数字生命卡兹克</li>
                </ul>
              </div>

              {/* Box 4: Acknowledgments */}
              <div>
                <h3 style={{ color: 'var(--accent-pink)', fontSize: '1.8rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 46, 115, 0.3)', paddingBottom: '0.5rem' }}>致谢</h3>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                  <li style={{ marginBottom: '0.5rem' }}>• 感谢 <b>Gemini 3 Pro</b> 帮助我构思此次分享</li>
                  <li style={{ marginBottom: '0.5rem' }}>• <b>Antigravity + Claude 4.6</b> 制作了展示网页</li>
                  <li style={{ marginBottom: '0.5rem' }}>• <b>Google AI Studio</b> 提供了演示案例支持</li>
                  <li>• <b>Seedance</b> 生成了视频素材</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
