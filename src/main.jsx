import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight, ArrowUpRight, BookOpen, CalendarDays, Check, ChevronDown,
  ClipboardList, Globe2, Headphones, Menu, MessageCircle, Mic, PenLine, X,
} from 'lucide-react'
import { courses, faqs, steps } from './content'
import './styles.css'

const courseIcons = { book: BookOpen, headphones: Headphones, message: MessageCircle }
const navLinks = [
  ['Home', '#/'],
  ['Results', '#/results'],
  ['About us', '#/about'],
  ['Contact', '#/contact'],
]

function Brand() {
  return <a className="brand" href="#/" aria-label="BandBridge home">
    <span className="brand-mark"><BookOpen size={21} strokeWidth={2.4} /></span>
    <span>Band<span className="brand-accent">Bridge</span></span>
  </a>
}

function Header({ path, onDemo }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const coursesMenu = useRef(null)

  function closeMenus() {
    setMenuOpen(false)
    if (coursesMenu.current) coursesMenu.current.open = false
  }

  function navLink([label, href]) {
    return <a key={label} href={href} aria-current={href.slice(1) === path ? 'page' : undefined} onClick={closeMenus}>{label}</a>
  }

  return <header className="site-header" onKeyDown={(event) => {
    if (event.key === 'Escape') closeMenus()
  }}>
    <div className="announcement">
      <div className="shell announcement-inner">
        <span><CalendarDays size={15} /> Free introductory coaching session</span>
        <button onClick={() => onDemo()}>Book a free demo <ArrowUpRight size={15} /></button>
      </div>
    </div>
    <div className="shell navbar">
      <Brand />
      <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      <nav id="navigation" className={menuOpen ? 'nav open' : 'nav'} aria-label="Main navigation">
        {navLink(navLinks[0])}
        <details className="course-menu" ref={coursesMenu}>
          <summary className={path.startsWith('/courses') ? 'current' : undefined}>Online courses <ChevronDown size={15} /></summary>
          <div className="course-menu-panel">
            <a href="#/courses" onClick={closeMenus}>All courses</a>
            {courses.map((course) => <a key={course.id} href={'#/courses/' + course.id} onClick={closeMenus}>{course.name}</a>)}
          </div>
        </details>
        {navLinks.slice(1).map(navLink)}
      </nav>
      <button className="button button-small nav-demo" onClick={() => { closeMenus(); onDemo() }}>Free demo <ArrowUpRight size={16} /></button>
    </div>
  </header>
}

function PrepIllustration() {
  const skills = [[Headphones, 'Listening'], [BookOpen, 'Reading'], [PenLine, 'Writing'], [Mic, 'Speaking']]
  return <div className="prep-art" aria-hidden="true">
    <Globe2 className="globe" size={370} strokeWidth={0.42} />
    <div className="art-kicker"><span /> THE PRACTICE ROOM</div>
    <div className="prep-board">
      <div className="board-heading">
        <div><span>EXAM PREPARATION</span><strong>IELTS</strong></div>
        <span className="board-icon"><ClipboardList size={23} /></span>
      </div>
      <div className="board-skills">
        {skills.map(([Icon, label]) => <div key={label}><Icon size={18} /><span>{label}</span></div>)}
      </div>
      <div className="board-footer"><span>FOUR SKILLS. ONE PLAN.</span><span>01 / 04</span></div>
    </div>
    <div className="art-tag"><span><Check size={18} /></span><div><strong>Make a plan</strong><small>Start with a free demo</small></div></div>
    <span className="art-caption">THE BAND<span>BRIDGE</span> METHOD</span>
  </div>
}

function CourseCards() {
  return <div className="course-grid">
    {courses.map((course) => {
      const Icon = courseIcons[course.icon]
      return <article className="course-card" key={course.id}>
        <div className="card-top"><span className="course-icon"><Icon size={24} /></span><span className="card-type">{course.type}</span></div>
        <h3>{course.name}</h3>
        <p>{course.description}</p>
        <a className="text-link" href={'#/courses/' + course.id}>Explore {course.name} <ArrowRight size={17} /></a>
      </article>
    })}
  </div>
}

function Faq() {
  return <section className="shell section faq">
    <div><p className="eyebrow">GOOD TO KNOW</p><h2>Frequently asked<br className="wide-only" /> questions.</h2></div>
    <div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={18} /></summary><p>{answer}</p></details>)}</div>
  </section>
}

function DemoBanner({ onDemo }) {
  return <section className="shell demo-banner">
    <span className="demo-icon"><CalendarDays size={28} /></span>
    <div><h2>Try a free demo class.</h2><p>Talk through your goals and see what a lesson could look like.</p></div>
    <button className="button button-white" onClick={() => onDemo()}>Book my demo <ArrowRight size={18} /></button>
  </section>
}

function Home({ onDemo }) {
  return <>
    <section className="shell hero">
      <div className="hero-copy">
        <p className="eyebrow hero-label"><span /> LIVE ONLINE ENGLISH COACHING</p>
        <h1>English for your<br className="wide-only" /> <em>next big step.</em></h1>
        <p className="hero-description">Prepare for IELTS or PTE, or speak English with more confidence. Build a study plan around your goals and practise the skills you’ll actually use.</p>
        <div className="actions">
          <button className="button" onClick={() => onDemo()}>Book a free demo <ArrowUpRight size={19} /></button>
          <a className="button button-outline" href="#/courses">Explore courses <ArrowRight size={18} /></a>
        </div>
      </div>
      <PrepIllustration />
    </section>
    <DemoBanner onDemo={onDemo} />
    <section className="shell section">
      <p className="eyebrow">FIND YOUR COURSE</p>
      <h2>Choose what you want to work on.</h2>
      <p className="section-intro">Find the right starting point for your exam or everyday English.</p>
      <CourseCards />
    </section>
    <section className="method">
      <div className="shell section">
        <p className="eyebrow">HOW IT WORKS</p>
        <h2>A plan for your preparation.</h2>
        <div className="steps">{steps.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      </div>
    </section>
    <Faq />
  </>
}

function PageIntro({ eyebrow, title, children }) {
  return <section className="page-intro"><div className="shell"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{children}</div></section>
}

function CoursePage({ course, onDemo }) {
  const [track, setTrack] = useState('Academic')
  const general = track === 'General Training'
  const trackCopy = general
    ? 'Practise everyday reading texts, letter writing and the speaking and listening skills shared with Academic.'
    : 'Practise academic reading, visual-data descriptions and essay writing, alongside listening and speaking.'
  return <>
    <PageIntro eyebrow={course.type} title={course.name + ' online coaching'}>
      <p>{course.intro}</p>
      <button className="button" onClick={() => onDemo(course.name)}>Book a free demo <ArrowUpRight size={18} /></button>
    </PageIntro>
    <section className="shell section course-detail">
      <p className="eyebrow">THE CURRICULUM</p><h2>What you’ll practise.</h2>
      {course.id === 'ielts' && <div className="track">
        <fieldset><legend>IELTS track</legend>{['Academic', 'General Training'].map((option) => <label key={option}><input type="radio" name="track" value={option} checked={track === option} onChange={() => setTrack(option)} /><span>{option}</span></label>)}</fieldset>
        <p aria-live="polite">{trackCopy}</p>
      </div>}
      <div className="module-grid">{course.modules.map(([title, body], index) => <article key={title}><span className="eyebrow">0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
    </section>
    <Faq />
  </>
}

function ResultsPage() {
  return <>
    <PageIntro eyebrow="STUDENT PROGRESS" title="Results"><p>Student stories and verified scores will appear here when available.</p></PageIntro>
    <section className="shell section">
      <p className="eyebrow">SAMPLE SCORECARD</p><h2>What a score breakdown looks like.</h2>
      <p className="section-intro">This example is for illustration and does not represent a student result.</p>
      <dl className="sample-scores">{[['Listening', '8.0'], ['Reading', '8.0'], ['Writing', '7.0'], ['Speaking', '7.0'], ['Overall', '7.5']].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </section>
  </>
}

function AboutPage({ onDemo }) {
  return <>
    <PageIntro eyebrow="ABOUT BANDBRIDGE" title="Prepare with a clear plan."><p>BandBridge is a coaching site for students preparing for an English exam and people who want to communicate more confidently.</p></PageIntro>
    <section className="shell section"><h2>How we approach practice.</h2><div className="steps">{steps.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
    <DemoBanner onDemo={onDemo} />
  </>
}

function ContactPage({ onDemo }) {
  return <PageIntro eyebrow="GET IN TOUCH" title="Let’s talk about your goals.">
    <p>Choose a course and tell us when you’d prefer to attend a demo. This preview lets you try the enquiry form locally.</p>
    <button className="button" onClick={() => onDemo()}>Open the demo form <ArrowUpRight size={18} /></button>
  </PageIntro>
}

function DemoDialog({ booking, onClose }) {
  const dialog = useRef(null)
  const [preview, setPreview] = useState(null)
  const today = new Date()
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10)

  useEffect(() => {
    dialog.current.showModal()
  }, [])

  function submit(event) {
    event.preventDefault()
    setPreview(Object.fromEntries(new FormData(event.currentTarget)))
  }

  return <dialog ref={dialog} aria-labelledby="demo-heading" onClose={onClose} className="demo-dialog">
    <button className="dialog-close" type="button" aria-label="Close demo form" onClick={() => dialog.current.close()}><X size={22} /></button>
    <p className="eyebrow">BANDBRIDGE · DEMO PREVIEW</p>
    <h2 id="demo-heading">{preview ? 'Your demo request preview' : 'Book a free demo'}</h2>
    {preview ? <div role="status" className="booking-summary">
      <p>{preview.course} · {preview.date} · {preview.time}</p>
      <p>This preview did not send your details or reserve a session.</p>
      <button className="button" type="button" onClick={() => dialog.current.close()}>Done <Check size={18} /></button>
    </div> : <>
      <p className="dialog-copy">Try the flow with sample details. This preview does not send or store your information.</p>
      <form className="booking-form" onSubmit={submit}>
        <label>Name<input name="name" autoComplete="name" required /></label>
        <label>Email<input name="email" type="email" autoComplete="email" required /></label>
        <label>Course<select name="course" defaultValue={booking.course || ''} required><option value="" disabled>Select a course</option>{courses.map(({ name }) => <option key={name}>{name}</option>)}</select></label>
        <div className="form-row">
          <label>Preferred date<input name="date" type="date" min={localToday} required /></label>
          <label>Preferred time<select name="time" defaultValue="" required><option value="" disabled>Select a time</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label>
        </div>
        <button className="button" type="submit">Preview request <ArrowRight size={18} /></button>
      </form>
    </>}
  </dialog>
}

function Footer({ onDemo }) {
  return <footer className="footer"><div className="shell footer-inner">
    <div><Brand /><p>English coaching for your next step.</p></div>
    <div className="footer-links"><a href="#/courses">Courses</a><a href="#/about">About</a><a href="#/contact">Contact</a><button onClick={() => onDemo()}>Book a demo <ArrowUpRight size={15} /></button></div>
  </div></footer>
}

function App() {
  const [path, setPath] = useState(() => window.location.hash.slice(1) || '/')
  const [booking, setBooking] = useState(null)
  const main = useRef(null)
  const firstRender = useRef(true)
  const onDemo = (course) => setBooking({ course })

  useEffect(() => {
    function readRoute() { setPath(window.location.hash.slice(1) || '/') }
    window.addEventListener('hashchange', readRoute)
    return () => window.removeEventListener('hashchange', readRoute)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!firstRender.current) main.current.focus({ preventScroll: true })
    firstRender.current = false
  }, [path])

  const course = courses.find(({ id }) => path === '/courses/' + id)
  let page
  if (course) page = <CoursePage key={course.id} course={course} onDemo={onDemo} />
  else if (path === '/courses') page = <>
    <PageIntro eyebrow="ONLINE COURSES" title="Find your course."><p>Choose exam preparation or build confidence in everyday conversations.</p></PageIntro>
    <section className="shell section"><CourseCards /></section>
  </>
  else if (path === '/results') page = <ResultsPage />
  else if (path === '/about') page = <AboutPage onDemo={onDemo} />
  else if (path === '/contact') page = <ContactPage onDemo={onDemo} />
  else if (path === '/') page = <Home onDemo={onDemo} />
  else page = <PageIntro eyebrow="PAGE NOT FOUND" title="This page is missing."><a className="button" href="#/">Back to home <ArrowRight size={18} /></a></PageIntro>

  return <>
    <a className="skip-link" href="#main" onClick={(event) => { event.preventDefault(); main.current.focus() }}>Skip to content</a>
    <Header path={path} onDemo={onDemo} />
    <main id="main" ref={main} tabIndex="-1">{page}</main>
    <Footer onDemo={onDemo} />
    {booking && <DemoDialog booking={booking} onClose={() => setBooking(null)} />}
  </>
}

createRoot(document.getElementById('root')).render(<App />)
