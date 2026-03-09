import './App.css'

function App() {
  const resumePath = '/assets/Mrudula_Senior_Dotnet_Resume.pdf'
  const email = 'mrudula.popuri95@gmail.com'
  const phone = '+1 571 306 8105'

  const summary =
    'Senior .NET Full Stack Developer with 7+ years of experience designing, developing, and modernizing enterprise applications using .NET 8, ASP.NET Core, Web APIs, Angular, and SQL Server. Experienced in API-driven architectures, microservices-based systems, cloud deployments, and large-scale application migrations. Strong background in building scalable, secure, and high-performance systems within Agile/Scrum environments.'

  const skills = {
    backend: ['C#', '.NET 8 / .NET Core', 'ASP.NET Core (MVC, Web API)', 'REST APIs'],
    frontend: ['Angular', 'React', 'JavaScript', 'HTML', 'CSS', 'Bootstrap'],
    databases: ['SQL Server', 'Sybase', 'Stored Procedures', 'Query Optimization'],
    cloud: ['AWS', 'Docker', 'CI/CD', 'Jenkins', 'Git', 'Bitbucket'],
    architecture: ['Clean Architecture', 'SOLID', 'OOP', 'Agile/Scrum', 'TDD', 'Swagger'],
  }

  const experience = [
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
  ]

  return (
    <div className="site-wrap">
      <header className="hero" id="home">
        <nav className="main-nav">
          <p className="brand">mrudulapopuri.com</p>
          <div className="nav-links">
            <a href="#summary">Summary</a>
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <section className="hero-grid">
          <div>
            <p className="eyebrow">Senior .NET Full Stack Developer</p>
            <h1>Mrudula Popuri</h1>
            <p className="hero-copy">
              {summary}
            </p>
            <div className="hero-actions">
              <a className="btn-primary" href={`mailto:${email}`}>
                {email}
              </a>
              <a className="btn-secondary" href={resumePath} target="_blank" rel="noreferrer">
                Open Resume
              </a>
            </div>
          </div>
          <aside className="hero-card">
            <h2>Snapshot</h2>
            <ul>
              <li>7+ years in enterprise application development</li>
              <li>.NET 8, ASP.NET Core, Web APIs, Angular</li>
              <li>API-driven and microservices-based systems</li>
              <li>United States</li>
            </ul>
          </aside>
        </section>
      </header>

      <main>
        <section className="section" id="summary">
          <div className="section-head">
            <h2>Professional Summary</h2>
            <a href={resumePath} download className="mini-link">
              Download Resume
            </a>
          </div>
          <p>{summary}</p>
        </section>

        <section className="section" id="skills">
          <div className="section-head">
            <h2>Technical Skills</h2>
          </div>
          <div className="skill-columns">
            <article>
              <h3>Backend</h3>
              <p>{skills.backend.join(' · ')}</p>
            </article>
            <article>
              <h3>Frontend</h3>
              <p>{skills.frontend.join(' · ')}</p>
            </article>
            <article>
              <h3>Databases</h3>
              <p>{skills.databases.join(' · ')}</p>
            </article>
            <article>
              <h3>Cloud and DevOps</h3>
              <p>{skills.cloud.join(' · ')}</p>
            </article>
            <article>
              <h3>Architecture and Practices</h3>
              <p>{skills.architecture.join(' · ')}</p>
            </article>
          </div>
        </section>

        <section className="section" id="experience">
          <div className="section-head">
            <h2>Experience</h2>
          </div>
          <div className="timeline">
            {experience.map((job) => (
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
              <p>AWS Certified Cloud Practitioner</p>
            </article>
            <article>
              <h3>Education</h3>
              <p>Bachelor of Technology (B.Tech), Jawaharlal Nehru University, 2016</p>
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
              href="https://www.linkedin.com/in/mridula-p-350114126/"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              LinkedIn
            </a>
            <a href="https://github.com/mrudu7" target="_blank" rel="noreferrer" className="btn-secondary">
              GitHub
            </a>
            <a href={`mailto:${email}`} className="btn-secondary">
              {email}
            </a>
            <a href={`tel:${phone.replace(/\s+/g, '')}`} className="btn-secondary">
              {phone}
            </a>
            <a href={resumePath} download className="btn-primary">
              Download Resume
            </a>
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
