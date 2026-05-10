import { useMemo } from 'react'
import { jsPDF } from 'jspdf'
import './App.css'

const portfolioData = {
  name: 'Mrudula Popuri',
  role: 'Senior .NET Full Stack Developer',
  email: 'mrudula.popuri95@gmail.com',
  phone: '+1 571 306 8105',
  location: 'United States',
  links: {
    linkedin: 'https://www.linkedin.com/in/mridula-p-350114126/',
    github: 'https://github.com/mrudu7',
  },
  summary:
    'Senior .NET Full Stack Developer with 7+ years of experience designing, developing, and modernizing enterprise applications using .NET 8, ASP.NET Core, Web APIs, Angular, and SQL Server. Experienced in API-driven architectures, microservices-based systems, cloud deployments, and large-scale application migrations. Strong background in building scalable, secure, and high-performance systems within Agile/Scrum environments.',
  skills: {
    backend: ['C#', '.NET 8 / .NET Core', 'ASP.NET Core (MVC, Web API)', 'REST APIs'],
    frontend: ['Angular', 'React', 'JavaScript', 'HTML', 'CSS', 'Bootstrap'],
    databases: ['SQL Server', 'Sybase', 'Stored Procedures', 'Query Optimization'],
    cloud: ['AWS', 'Docker', 'CI/CD', 'Jenkins', 'Git', 'Bitbucket'],
    architecture: ['Clean Architecture', 'SOLID', 'OOP', 'Agile/Scrum', 'TDD', 'Swagger'],
  },
  experience: [
    {
      role: 'Software Engineer',
      company: 'Cognizant Technology Solutions',
      location: 'India',
      period: 'Apr 2022 - Apr 2025',
      points: [
        'Designed and developed enterprise applications using ASP.NET Core Web APIs and Angular to support complex insurance workflows.',
        'Built algorithm-driven premium calculation modules, improving accuracy and operational efficiency.',
        'Implemented RESTful APIs with robust error handling, data validation, and transformation logic.',
        'Developed a custom data migration tool to enable seamless transfer of data between systems.',
        'Ensured ADA and WCAG compliance across UI components.',
        'Designed dynamic reports and generated business-critical PDF documents.',
        'Actively participated in application modernization and migration initiatives.',
      ],
      tech: 'ASP.NET Core, Web API, SQL Server, Angular, Docker, AWS, Git',
    },
    {
      role: 'Technology Analyst',
      company: 'Infosys Limited',
      location: 'India',
      period: 'Oct 2021 - Apr 2022',
      points: [
        'Supported and enhanced enterprise applications by analyzing production issues and implementing fixes.',
        'Assisted in system migration and knowledge transfer activities.',
        'Collaborated with stakeholders to gather and refine business requirements.',
        'Managed batch job scheduling and monitored system health.',
      ],
      tech: 'C#, SQL Server, Web Services',
    },
    {
      role: 'Associate Professional Product Developer',
      company: 'DXC Technology',
      location: 'India',
      period: 'Dec 2019 - Oct 2021',
      points: [
        'Developed and maintained web applications using ASP.NET MVC and Web APIs.',
        'Contributed to real-time policy quoting and endorsement features.',
        'Participated in large-scale system migration efforts.',
        'Worked closely with QA and deployment teams to promote code across environments.',
      ],
    },
    {
      role: 'Product Engineer',
      company: 'Satnav Technologies Pvt. Ltd',
      location: 'India',
      period: 'Oct 2017 - Nov 2019',
      points: [
        'Delivered features in Agile development cycles using ASP.NET and SQL Server.',
        'Designed database objects including stored procedures and triggers.',
        'Developed a mobile application using Xamarin for a Helpdesk module.',
        'Performed unit and system testing to ensure application quality.',
      ],
    },
  ],
  certification: 'AWS Certified Cloud Practitioner',
  education: 'Bachelor of Technology (B.Tech), Jawaharlal Nehru University, 2016',
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function createResumePdfBlob(resume) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const marginX = 54
  const maxWidth = 487
  const pageHeight = 842
  let cursorY = 60

  const ensurePage = (spaceNeeded) => {
    if (cursorY + spaceNeeded > pageHeight - 60) {
      doc.addPage()
      cursorY = 60
    }
  }

  const writeWrapped = (text, size = 10.5, gapAfter = 7) => {
    doc.setFont('times', 'normal')
    doc.setFontSize(size)
    const lines = doc.splitTextToSize(text, maxWidth)
    const lineHeight = size + 2.2
    const blockHeight = lines.length * lineHeight
    ensurePage(blockHeight + gapAfter)
    doc.text(lines, marginX, cursorY)
    cursorY += blockHeight + gapAfter
  }

  const writeHeading = (text) => {
    ensurePage(24)
    doc.setFont('times', 'bold')
    doc.setFontSize(11.2)
    doc.text(text.toUpperCase(), marginX, cursorY)
    cursorY += 8
    doc.setDrawColor(0, 0, 0)
    doc.setLineWidth(0.6)
    doc.line(marginX, cursorY, marginX + maxWidth, cursorY)
    cursorY += 12
  }

  const writeBullets = (items) => {
    items.forEach((item) => {
      doc.setFont('times', 'normal')
      doc.setFontSize(10.2)
      const lines = doc.splitTextToSize(item, maxWidth - 14)
      const blockHeight = lines.length * 12.4
      ensurePage(blockHeight + 4)
      doc.text('-', marginX, cursorY)
      doc.text(lines, marginX + 12, cursorY)
      cursorY += blockHeight + 3
    })
  }

  doc.setFont('times', 'bold')
  doc.setFontSize(18)
  doc.text(resume.name, marginX, cursorY)
  cursorY += 16

  doc.setFont('times', 'bold')
  doc.setFontSize(11)
  doc.text(`${resume.role} | ${resume.location}`, marginX, cursorY)
  cursorY += 14
  doc.setFont('times', 'normal')
  doc.setFontSize(10)
  doc.text(`${resume.email} | ${resume.phone}`, marginX, cursorY)
  cursorY += 11
  doc.text(`${resume.links.linkedin} | ${resume.links.github}`, marginX, cursorY)
  cursorY += 14
  doc.setDrawColor(0, 0, 0)
  doc.setLineWidth(0.9)
  doc.line(marginX, cursorY, marginX + maxWidth, cursorY)
  cursorY += 12

  writeHeading('Professional Summary')
  writeWrapped(resume.summary, 10.3, 9)

  writeHeading('Technical Skills')
  resume.skillSections.forEach((section) => {
    writeWrapped(`${section.title}: ${section.items.join(', ')}`, 10.1, 6)
  })

  writeHeading('Experience')
  resume.experience.forEach((job) => {
    ensurePage(22)
    doc.setFont('times', 'bold')
    doc.setFontSize(10.8)
    const titleLine = `${job.role} | ${job.company}`
    doc.text(titleLine, marginX, cursorY)
    doc.setFont('times', 'normal')
    doc.setFontSize(10)
    doc.text(`${job.period} | ${job.location}`, marginX, cursorY + 11)
    cursorY += 20
    writeBullets(job.points)
    if (job.tech) {
      writeWrapped(`Technologies: ${job.tech}`, 10, 7)
    }
    cursorY += 1
  })

  writeHeading('Education and Certification')
  writeWrapped(`Certification: ${resume.certification}`, 10.2, 6)
  writeWrapped(`Education: ${resume.education}`, 10.2, 0)

  return doc.output('blob')
}

function createResumeWordHtml(resume) {
  const skillRows = resume.skillSections
    .map((section) => `<p><strong>${escapeHtml(section.title)}:</strong> ${escapeHtml(section.items.join(', '))}</p>`)
    .join('')

  const experienceRows = resume.experience
    .map((job) => {
      const bullets = job.points.map((point) => `<li>${escapeHtml(point)}</li>`).join('')
      const tech = job.tech ? `<p><strong>Tech:</strong> ${escapeHtml(job.tech)}</p>` : ''
      return `
        <section>
          <h4>${escapeHtml(job.role)} - ${escapeHtml(job.company)}</h4>
          <p><strong>${escapeHtml(job.period)}</strong> | ${escapeHtml(job.location)}</p>
          <ul>${bullets}</ul>
          ${tech}
        </section>
      `
    })
    .join('')

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>${escapeHtml(resume.name)} Resume</title>
        <style>
          body { font-family: "Times New Roman", Times, serif; color: #000000; margin: 0.75in; line-height: 1.25; font-size: 11pt; }
          h1 { margin: 0; font-size: 18pt; font-weight: 700; }
          .role { margin: 4px 0 0; font-size: 11pt; font-weight: 700; }
          .contacts { margin: 3px 0; font-size: 10.5pt; }
          hr { border: 0; border-top: 1px solid #000; margin: 10px 0 10px; }
          h2 { margin: 12px 0 6px; font-size: 11pt; font-weight: 700; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 2px; }
          h4 { margin: 9px 0 2px; font-size: 11pt; font-weight: 700; }
          p { margin: 0 0 5px; }
          ul { margin: 0 0 6px 18px; padding: 0; }
          li { margin-bottom: 3px; }
          section { margin: 0; }
        </style>
      </head>
      <body>
        <h1>${escapeHtml(resume.name)}</h1>
        <p class="role">${escapeHtml(resume.role)} | ${escapeHtml(resume.location)}</p>
        <p class="contacts">${escapeHtml(resume.email)} | ${escapeHtml(resume.phone)}</p>
        <p class="contacts">${escapeHtml(resume.links.linkedin)} | ${escapeHtml(resume.links.github)}</p>
        <hr />

        <h2>Professional Summary</h2>
        <p>${escapeHtml(resume.summary)}</p>

        <h2>Technical Skills</h2>
        ${skillRows}

        <h2>Experience</h2>
        ${experienceRows}

        <h2>Education and Certification</h2>
        <p><strong>Certification:</strong> ${escapeHtml(resume.certification)}</p>
        <p><strong>Education:</strong> ${escapeHtml(resume.education)}</p>
      </body>
    </html>
  `
}

function downloadBlob(blob, fileName) {
  const blobUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = blobUrl
  link.download = fileName
  document.body.append(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(blobUrl)
}

function App() {
  const resume = useMemo(() => {
    const skillSections = [
      { title: 'Backend', items: portfolioData.skills.backend },
      { title: 'Frontend', items: portfolioData.skills.frontend },
      { title: 'Databases', items: portfolioData.skills.databases },
      { title: 'Cloud and DevOps', items: portfolioData.skills.cloud },
      { title: 'Architecture and Practices', items: portfolioData.skills.architecture },
    ]

    return {
      ...portfolioData,
      skillSections,
    }
  }, [])

  const downloadPdfResume = () => {
    const pdfBlob = createResumePdfBlob(resume)
    downloadBlob(pdfBlob, 'Mrudula_Popuri_Resume.pdf')
  }

  const viewPdfResume = () => {
    const pdfBlob = createResumePdfBlob(resume)
    const pdfUrl = URL.createObjectURL(pdfBlob)
    window.open(pdfUrl, '_blank', 'noopener,noreferrer')
    setTimeout(() => {
      URL.revokeObjectURL(pdfUrl)
    }, 60000)
  }

  const downloadWordResume = () => {
    const wordHtml = createResumeWordHtml(resume)
    const wordDocBlob = new Blob([wordHtml], { type: 'application/msword' })
    downloadBlob(wordDocBlob, 'Mrudula_Popuri_Resume.doc')
  }

  const viewWordResume = () => {
    const wordHtml = createResumeWordHtml(resume)
    const wordHtmlBlob = new Blob([wordHtml], { type: 'text/html' })
    const wordViewUrl = URL.createObjectURL(wordHtmlBlob)
    window.open(wordViewUrl, '_blank', 'noopener,noreferrer')
    setTimeout(() => {
      URL.revokeObjectURL(wordViewUrl)
    }, 60000)
  }

  return (
    <div className="site-wrap">
      <header className="hero" id="home">
        <nav className="main-nav">
          <p className="brand">mrudulapopuri.com</p>
          <div className="nav-links">
            <a href="#resume-center">Resume</a>
            <a href="#summary">Summary</a>
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <section className="hero-grid">
          <div>
            <p className="eyebrow">{resume.role}</p>
            <h1>{resume.name}</h1>
            <p className="hero-copy">
              {resume.summary}
            </p>
            <div className="hero-actions">
              <a className="btn-primary" href={`mailto:${resume.email}`}>
                {resume.email}
              </a>
            </div>
          </div>
          <aside className="hero-card">
            <h2>Snapshot</h2>
            <ul>
              <li>7+ years in enterprise application development</li>
              <li>.NET 8, ASP.NET Core, Web APIs, Angular</li>
              <li>API-driven and microservices-based systems</li>
              <li>{resume.location}</li>
            </ul>
          </aside>
        </section>
      </header>

      <main>
        <section className="section" id="resume-center">
          <div className="resume-actions">
            <button type="button" className="btn-secondary" onClick={viewPdfResume}>
              View PDF
            </button>
            <button type="button" className="btn-primary" onClick={downloadPdfResume}>
              Download PDF
            </button>
            <button type="button" className="btn-secondary" onClick={viewWordResume}>
              View Word
            </button>
            <button type="button" className="btn-primary" onClick={downloadWordResume}>
              Download Word
            </button>
          </div>
        </section>

        <section className="section" id="summary">
          <div className="section-head">
            <h2>Professional Summary</h2>
            <button type="button" className="mini-link mini-button" onClick={downloadPdfResume}>
              Download PDF Resume
            </button>
          </div>
          <p>{resume.summary}</p>
        </section>

        <section className="section" id="skills">
          <div className="section-head">
            <h2>Technical Skills</h2>
          </div>
          <div className="skill-columns">
            <article>
              <h3>Backend</h3>
              <p>{resume.skills.backend.join(' · ')}</p>
            </article>
            <article>
              <h3>Frontend</h3>
              <p>{resume.skills.frontend.join(' · ')}</p>
            </article>
            <article>
              <h3>Databases</h3>
              <p>{resume.skills.databases.join(' · ')}</p>
            </article>
            <article>
              <h3>Cloud and DevOps</h3>
              <p>{resume.skills.cloud.join(' · ')}</p>
            </article>
            <article>
              <h3>Architecture and Practices</h3>
              <p>{resume.skills.architecture.join(' · ')}</p>
            </article>
          </div>
        </section>

        <section className="section" id="experience">
          <div className="section-head">
            <h2>Experience</h2>
          </div>
          <div className="timeline">
            {resume.experience.map((job) => (
              <article className="timeline-item" key={`${job.role}-${job.company}`}>
                <div className="timeline-top">
                  <h3>
                    {job.role} - {job.company}
                  </h3>
                  <span>{job.period}</span>
                </div>
                <p className="stack">{job.location}</p>
                <ul>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {job.tech ? <p className="stack">Tech: {job.tech}</p> : null}
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="education">
          <div className="section-head">
            <h2>Certifications and Education</h2>
          </div>
          <div className="skill-columns">
            <article>
              <h3>Certification</h3>
              <p>{resume.certification}</p>
            </article>
            <article>
              <h3>Education</h3>
              <p>{resume.education}</p>
            </article>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="section-head">
            <h2>Get In Touch</h2>
          </div>
          <p>
            Open to full-time opportunities and contract roles in .NET full stack development.
          </p>
          <div className="contact-links">
            <a
              href={resume.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              LinkedIn
            </a>
            <a href={resume.links.github} target="_blank" rel="noreferrer" className="btn-secondary">
              GitHub
            </a>
            <a href={`mailto:${resume.email}`} className="btn-secondary">
              {resume.email}
            </a>
            <a href={`tel:${resume.phone.replace(/\s+/g, '')}`} className="btn-secondary">
              {resume.phone}
            </a>
            <button type="button" className="btn-primary" onClick={downloadPdfResume}>
              Download PDF Resume
            </button>
            <button type="button" className="btn-primary" onClick={downloadWordResume}>
              Download Word Resume
            </button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Mrudula Popuri</p>
      </footer>
    </div>
  )
}

export default App
