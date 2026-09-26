import { motion } from 'framer-motion'

import { SOCIAL_ICONS } from './SocialIcons'
import { FOCUS_POINTS } from '../data/focusPoints'

// const SOCIAL_LINKS = [
//   {
//     id: 'douyin',
//     label: '抖音',
//     href: 'https://www.douyin.com/user/MS4wLjABAAAAlmQDgHf0NlbsjrfWENm8LyrIikxSRRq7mzlzQSIStQJkV7Ju52B6A55zw5TUDU5d',
//   },
//   {
//     id: 'bilibili',
//     label: 'B站',
//     href: 'https://space.bilibili.com/275344092?spm_id_from=333.937.0.0',
//   },
//   {
//     id: 'xiaohongshu',
//     label: '小红书',
//     href: 'https://www.xiaohongshu.com/user/profile/5ceba8c8000000000502fd69',
//   },
// ]
const SOCIAL_LINKS = [
  {
    id: 'youtube',
    label: 'Youtube',
    href: 'https://www.youtube.com/@priyanshugonewild',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/priyanshugonewild',
  },
  {
    id: 'artstation',
    label: 'ArtStation',
    href: 'https://www.artstation.com/priyanshuyadav',
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:business.priyanshuyt@gmail.com',
  },
]
// 履历数据（双语）。英文为译稿，可按需润色。
interface ResumeGroup {
  heading?: string
  logo?: string
  logoImg?: string
  sub?: string
  link?: string
  items?: string[]
  links?: { id: string; label: string; href: string }[]
}
interface ResumeEntry {
  period: string
  place: string
  role?: string
  logo?: { src: string; alt: string }
  points?: string[]
  groups?: ResumeGroup[]
}
const RESUME = {
  
    title: 'Résumé',
    entries: [
      // education 1
      {
        period: '2022 – 2025',
        place: 'B.Sc. in Animation & VFX',
        role: 'Arena Animation Andheri',
      },
      {
        //work 1
        period: 'Dec 2024 – Feb 2026',
        place: 'Cosmicweb · Vasai, India',
        role: 'Graphic Designer · Video Editor',
        logo: { src: `${import.meta.env.BASE_URL}images/cw.jpeg`, alt: 'HOTSAR' },
        points: [
          
          'Skills: Social Media Content, Graphic Design, Video Editing',
          'Work: Social Media Creatives, Promotional Graphics, Video Content, Visual Editing',
        ],
      },
      {
        //work2
        
        period: 'Jul 2025 – Jan 2026',
        place: 'Pixel Perfect Films · Marol, Mumbai',
        role: '3D Artist',
        logo: { src: `${import.meta.env.BASE_URL}images/ppf.jpeg`, alt: 'Bad Printer Studio' },
        points: [
          '3D Artist · Pixel Perfect Films',
          'Skills: 3D Modeling, Texturing & UV Mapping, Environment Design, Lighting',
          'Work: 3D Visualization, Scene Composition, Asset Creation, Lighting & Rendering',
        ],
      },
      {
        // work experience
        period: '2017 – Now',
        place: 'Content Creator',
        groups: [
          {
            heading: 'Priyanshwho',
            logoImg: `${import.meta.env.BASE_URL}images/creator.png`,
            sub: 'Creating since 9 years',
            items: ['Streamer · Gamer · Artist',
              '9K+ Subs on Youtube'
            ],
            links: SOCIAL_LINKS,
          },
        ],
      },
      {
        //work experience
        period: '2026 – Now',
        place: 'Indie Developer',
        groups: [{ logo: 'zooop', sub: 'AI creation platform', link: 'https://zooop.ai/' }],
      },
    ],
  
}

// 履历条目依次对应 glb 里的聚焦锚点（相机停靠点），顺序须与 entries 一致。
// 名单是唯一真源，见 data/focusPoints.ts（Scene.tsx 也从那里取）。
const POINT_ORDER = FOCUS_POINTS

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}
const itemV = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

function Group({ group }: { group: ResumeGroup }) {
  const heading =
    group.logo === 'zooop' ? (
      <a
        className="zooop-logo-link"
        href={group.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="ZOOOP"
      >

      </a>
    ) : group.link ? (
      <a className="about-link" href={group.link} target="_blank" rel="noopener noreferrer">
        {group.heading}
      </a>
    ) : (
      <span>{group.heading}</span>
    )

  return (
    <motion.div className="tl-group" variants={itemV}>
      <div className="tl-group-head">
        {group.logoImg && (
          <span className="tl-group-logo">
            <img src={group.logoImg} alt={group.heading || ''} loading="lazy" />
          </span>
        )}
        {heading}
        {group.sub && <span className="tl-group-sub">{group.sub}</span>}
      </div>
      {group.items && (
        <ul className="tl-points">
          {group.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      )}
      {group.links && (
      <div className="tl-logos">
        {group.links.map((l) => {
          const Icon = SOCIAL_ICONS[l.id as keyof typeof SOCIAL_ICONS]

          return (
            <a
              key={l.id}
              className="tl-logo"
              href={l.href}
              {...(!['email', 'mobile'].includes(l.id)
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              aria-label={l.label}
              title={l.label}
            >
              <Icon />
            </a>
          )
        })}
      </div>
    )}
    </motion.div>
  )
}

function Entry({ entry, index }: { entry: ResumeEntry; index: number }) {
  return (
    <motion.div
      className="tl-entry"
      data-point={POINT_ORDER[index]}
      variants={containerV}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
    >
      <motion.span className="tl-dot" variants={itemV} aria-hidden="true" />
      {/* tl-body 包住文字内容（点保持在外做时间轴标记）：移动端可给它加卡片衬底，
          且它紧贴内容高度，不含 tl-entry 用于排布的大 padding。
          用普通 div（非 motion）：framer 变体经 React context 穿透它，叶子元素仍是
          tl-entry 的直接 stagger 子级，入场动画与包裹前完全一致。 */}
      <div className="tl-body">
        <motion.div className="tl-period" variants={itemV}>
          {entry.period}
        </motion.div>
        <motion.div className="tl-head" variants={itemV}>
          {entry.logo && (
            <span className="tl-logo-chip">
              <img src={entry.logo.src} alt={entry.logo.alt} loading="lazy" />
            </span>
          )}
          <h3 className="tl-place">{entry.place}</h3>
        </motion.div>
        {entry.role && (
          <motion.div className="tl-role" variants={itemV}>
            {entry.role}
          </motion.div>
        )}
        {entry.points && (
          <motion.ul className="tl-points" variants={itemV}>
            {entry.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </motion.ul>
        )}
        {entry.groups && entry.groups.map((g, i) => <Group key={i} group={g} />)}
      </div>
    </motion.div>
  )
}

export default function Resume() {
  const data = RESUME
  return (
    <section className="resume" >
      <motion.h2
        className="resume-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {data.title}
      </motion.h2>
      <div className="timeline">
        {data.entries.map((e, i) => (
          <Entry key={i} entry={e} index={i} />
        ))}
      </div>
    </section>
  )
}
