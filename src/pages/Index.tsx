import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const translations = {
  en: {
    nav: { home: 'HOME', about: 'ABOUT', projects: 'CODE & PROJECTS', contact: 'CONTACT' },
    hero: {
      slogans: ['Efficient', 'Creative', 'Innovative', 'Immersive', 'Advanced'],
      title: 'Creations',
      subtitle: "I'm Khall, a developer building innovative systems & immersive scripts for Garry's Mod.",
      cta1: 'View Projects',
      cta2: 'Contact me'
    },
    about: {
      title: 'About Me',
      subtitle: 'Developer & Creator',
      bio1: "I'm a developer and creator driven by a passion for immersive roleplay. With over 5 years of experience in Garry's Mod, I specialize in building performance-oriented systems, unique gameplay mechanics, and sleek UI/UX design.",
      bio2: "My work isn't just about code — it's about crafting experiences that enhance creativity, community, and immersion.",
      stats: [
        { value: '5+', label: 'YEARS EXPERIENCE' },
        { value: '20+', label: 'INNOVATIVE FEATURES CREATED' },
        { value: '3', label: 'SERVERS CURRENTLY IN DEVELOPMENT' }
      ],
      skills: ['Lua', 'Helix Framework', 'Systems & Mechanics', 'UI/UX', 'Ease-of-Use Systems']
    },
    projects: {
      title: 'Code & Projects',
      tabs: { projects: 'PROJECTS', plugins: 'PLUGINS' },
      items: [
        {
          id: 'hl-a',
          title: 'Project: Résonance HL:A',
          desc: 'An immersive Half-Life Alyx inspired roleplay experience.',
          category: 'project'
        },
        {
          id: 'sw-tor',
          title: 'Project: Résonance SW:TOR',
          desc: 'A Star Wars: The Old Republic inspired immersive roleplay server.',
          category: 'project'
        },
        {
          id: 'scp',
          title: 'Project: Résonance SCP',
          desc: 'An immersive SCP roleplay project with advanced containment systems.',
          category: 'project'
        },
        {
          id: 'apocalypse',
          title: 'Apocalypse RP (Old)',
          desc: 'An old unfinished post-apocalyptic roleplay server.',
          category: 'project'
        },
        {
          id: 'network',
          title: 'RESONANCE.NETWORK',
          desc: 'Community network and infrastructure project.',
          category: 'plugin',
          link: true
        },
        {
          id: 'trex',
          title: 'Trex SCP RP (Old)',
          desc: 'An early SCP roleplay server concept.',
          category: 'project'
        }
      ]
    },
    contact: {
      title: 'Get In Touch',
      status: 'Currently Unavailable',
      statusDesc: "I'm not taking commissions at the moment, but feel free to reach out if you have questions or just want to connect.",
      methods: [
        { icon: 'MessageCircle', title: 'Discord', value: 'khall___', link: 'https://discord.com' },
        { icon: 'Mail', title: 'Email', value: 'khalldevg@gmail.com', link: 'mailto:khalldevg@gmail.com' },
        { icon: 'Github', title: 'GitHub', value: 'github.com/khallG', link: 'https://github.com/khallG' },
        { icon: 'Gamepad2', title: 'Steam', value: 'khall', link: 'https://steamcommunity.com' }
      ]
    },
    footer: '© 2025 Khall — Designed & Built with passion.'
  },
  fr: {
    nav: { home: 'ACCUEIL', about: 'À PROPOS', projects: 'CODE & PROJETS', contact: 'CONTACT' },
    hero: {
      slogans: ['Efficace', 'Créative', 'Innovante', 'Immersive', 'Avancée'],
      title: 'Créations',
      subtitle: "Je suis Khall, un développeur créant des systèmes innovants et des scripts immersifs pour Garry's Mod.",
      cta1: 'Voir les Projets',
      cta2: 'Me Contacter'
    },
    about: {
      title: 'À Propos',
      subtitle: 'Développeur & Créateur',
      bio1: "Je suis un développeur et créateur animé par une passion pour le jeu de rôle immersif. Avec plus de 5 ans d'expérience dans Garry's Mod, je me spécialise dans la création de systèmes orientés performance, de mécaniques de jeu uniques et de design UI/UX élégant.",
      bio2: "Mon travail ne se limite pas au code — il s'agit de créer des expériences qui améliorent la créativité, la communauté et l'immersion.",
      stats: [
        { value: '5+', label: "ANNÉES D'EXPÉRIENCE" },
        { value: '20+', label: 'FONCTIONNALITÉS INNOVANTES CRÉÉES' },
        { value: '3', label: 'SERVEURS EN DÉVELOPPEMENT' }
      ],
      skills: ['Lua', 'Framework Helix', 'Systèmes & Mécaniques', 'UI/UX', "Systèmes d'Utilisation Facile"]
    },
    projects: {
      title: 'Code & Projets',
      tabs: { projects: 'PROJETS', plugins: 'PLUGINS' },
      items: [
        {
          id: 'hl-a',
          title: 'Projet: Résonance HL:A',
          desc: 'Une expérience de jeu de rôle immersive inspirée de Half-Life Alyx.',
          category: 'project'
        },
        {
          id: 'sw-tor',
          title: 'Projet: Résonance SW:TOR',
          desc: 'Un serveur de jeu de rôle immersif inspiré de Star Wars: The Old Republic.',
          category: 'project'
        },
        {
          id: 'scp',
          title: 'Projet: Résonance SCP',
          desc: 'Un projet de jeu de rôle SCP immersif avec des systèmes de confinement avancés.',
          category: 'project'
        },
        {
          id: 'apocalypse',
          title: 'Apocalypse RP (Ancien)',
          desc: 'Un ancien serveur de jeu de rôle post-apocalyptique inachevé.',
          category: 'project'
        },
        {
          id: 'network',
          title: 'RESONANCE.NETWORK',
          desc: 'Projet de réseau communautaire et infrastructure.',
          category: 'plugin',
          link: true
        },
        {
          id: 'trex',
          title: 'Trex SCP RP (Ancien)',
          desc: 'Un concept précoce de serveur de jeu de rôle SCP.',
          category: 'project'
        }
      ]
    },
    contact: {
      title: 'Me Contacter',
      status: 'Actuellement Indisponible',
      statusDesc: "Je ne prends pas de commissions pour le moment, mais n'hésitez pas à me contacter si vous avez des questions ou si vous voulez simplement échanger.",
      methods: [
        { icon: 'MessageCircle', title: 'Discord', value: 'khall___', link: 'https://discord.com' },
        { icon: 'Mail', title: 'Email', value: 'khalldevg@gmail.com', link: 'mailto:khalldevg@gmail.com' },
        { icon: 'Github', title: 'GitHub', value: 'github.com/khallG', link: 'https://github.com/khallG' },
        { icon: 'Gamepad2', title: 'Steam', value: 'khall', link: 'https://steamcommunity.com' }
      ]
    },
    footer: '© 2025 Khall — Conçu et construit avec passion.'
  }
};

export default function Index() {
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [projectTab, setProjectTab] = useState<'project' | 'plugin'>('project');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [imageIndex, setImageIndex] = useState(0);

  const t = translations[lang];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % t.hero.slogans.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [t.hero.slogans.length]);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredProjects = t.projects.items.filter((p: any) => p.category === projectTab);

  const projectImages = [
    'https://cdn.poehali.dev/files/6cdaff67-1fa3-459f-9683-e6ead3300d3e.png',
    'https://cdn.poehali.dev/files/09aa4887-ae45-4ebf-8737-be45564db4f0.png',
    'https://cdn.poehali.dev/files/2644125f-53c4-42ad-b226-22070632cfe4.png'
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 w-full bg-background/90 backdrop-blur-sm z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Khall</h1>
            <p className="text-xs text-muted-foreground">Developer & Creator</p>
          </div>
          
          <div className="flex items-center gap-8">
            {Object.entries(t.nav).map(([key, label]) => (
              <button
                key={key}
                onClick={() => scrollToSection(key)}
                className={`text-sm font-medium transition-all hover:text-primary ${
                  activeSection === key ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {label}
              </button>
            ))}
            
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted hover:bg-accent transition-all"
            >
              <span className="text-xl">{lang === 'en' ? '🇺🇸' : '🇫🇷'}</span>
            </button>
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center max-w-4xl">
          <h2 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="text-primary inline-block transition-all duration-500 animate-fade-in">
              {t.hero.slogans[currentSlogan]}
            </span>{' '}
            <span>{t.hero.title}</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-6 text-lg hover-scale"
            >
              {t.hero.cta1}
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              variant="outline"
              className="px-8 py-6 text-lg hover-scale"
            >
              {t.hero.cta2}
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4">
            {t.about.title.split(' ')[0]} <span className="text-primary">{t.about.title.split(' ')[1] || t.about.title.split(' ')[0]}</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-16"></div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-8 hover-scale">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                  <Icon name="User" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Khall</h3>
                  <p className="text-primary">{t.about.subtitle}</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">
                {t.about.bio1}
              </p>
              <p className="text-muted-foreground mb-6">
                {t.about.bio2}
              </p>
              
              <div className="grid grid-cols-3 gap-4">
                {t.about.stats.map((stat: any, idx: number) => (
                  <div key={idx} className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Card>
            
            <div className="space-y-4">
              {t.about.skills.map((skill: string, idx: number) => (
                <Card
                  key={idx}
                  className="p-6 hover:border-primary transition-all hover-scale"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                      <Icon
                        name={idx === 0 ? 'Code2' : idx === 1 ? 'Puzzle' : idx === 2 ? 'Gamepad2' : idx === 3 ? 'Palette' : 'Users'}
                        size={24}
                      />
                    </div>
                    <h3 className="text-xl font-bold">{skill}</h3>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4">
            Code & <span className="text-primary">Projects</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-12"></div>
          
          <div className="flex justify-center gap-4 mb-12">
            <Button
              onClick={() => setProjectTab('project')}
              variant={projectTab === 'project' ? 'default' : 'outline'}
              className="px-8 py-6 text-lg hover-scale"
            >
              <Icon name="Globe" size={20} className="mr-2" />
              {t.projects.tabs.projects} <Badge className="ml-2">8</Badge>
            </Button>
            <Button
              onClick={() => setProjectTab('plugin')}
              variant={projectTab === 'plugin' ? 'default' : 'outline'}
              className="px-8 py-6 text-lg hover-scale"
            >
              <Icon name="Code2" size={20} className="mr-2" />
              {t.projects.tabs.plugins} <Badge className="ml-2">12</Badge>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {filteredProjects.map((project: any) => (
              <Card
                key={project.id}
                onClick={() => !project.link && setSelectedProject(project)}
                className="hover:border-primary transition-all cursor-pointer group overflow-hidden hover-scale"
              >
                <div className="aspect-video bg-muted flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-all"></div>
                  {!project.link ? (
                    <Icon name="Play" size={64} className="text-primary group-hover:scale-110 transition-transform" />
                  ) : (
                    <Icon name="Package" size={64} className="text-primary" />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.desc}</p>
                  {project.link && (
                    <Button variant="outline" className="mt-4 w-full">
                      Learn more
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-12"></div>
          
          <Card className="p-8 mb-8 border-primary/30">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
              <span className="font-bold">{t.contact.status}</span>
            </div>
            <p className="text-center text-muted-foreground">{t.contact.statusDesc}</p>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-4">
            {t.contact.methods.map((method: any, idx: number) => (
              <a
                key={idx}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="hover:border-primary transition-all p-6 cursor-pointer group hover-scale">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        idx === 0 ? 'bg-[#5865F2]' : idx === 1 ? 'bg-primary' : idx === 2 ? 'bg-foreground text-background' : 'bg-[#171A21]'
                      }`}>
                        <Icon name={method.icon} size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold">{method.title}</h3>
                        <p className="text-sm text-muted-foreground">{method.value}</p>
                      </div>
                    </div>
                    <Icon name="ArrowRight" className="text-primary opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-muted-foreground">
        {t.footer}
      </footer>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl">
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform z-50"
          >
            <Icon name="X" size={24} />
          </button>
          
          {selectedProject && (
            <>
              <div className="aspect-video bg-muted rounded-lg mb-4 relative overflow-hidden">
                <img
                  src={projectImages[imageIndex]}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <button
                    onClick={() => setImageIndex((imageIndex - 1 + projectImages.length) % projectImages.length)}
                    className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Icon name="ChevronLeft" size={24} />
                  </button>
                  <div className="flex gap-2">
                    {projectImages.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full ${
                          idx === imageIndex ? 'bg-primary' : 'bg-white/30'
                        }`}
                      ></div>
                    ))}
                  </div>
                  <button
                    onClick={() => setImageIndex((imageIndex + 1) % projectImages.length)}
                    className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Icon name="ChevronRight" size={24} />
                  </button>
                </div>
              </div>
              
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-primary">
                  {selectedProject.title}
                </DialogTitle>
              </DialogHeader>
              
              <p className="text-muted-foreground">
                {selectedProject.desc} This project was an ambitious attempt to create a complete {selectedProject.title.toLowerCase()}-themed RP framework for Helix. Despite solid foundations, the project was never fully released due to a lack of time and motivation.
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
