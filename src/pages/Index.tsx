import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const translations = {
  en: {
    nav: { home: 'HOME', about: 'ABOUT', projects: 'PROJECTS', contact: 'CONTACT' },
    hero: {
      slogans: ['Creative', 'Innovative', 'Immersive'],
      title: 'Maps',
      subtitle: "I'm Snake, a level designer crafting immersive environments for Source Engine games.",
      cta1: 'View Projects',
      cta2: 'Contact me'
    },
    about: {
      title: 'About Me',
      subtitle: 'Level Designer & Environmental Designer',
      bio1: "I'm a level designer driven by a passion for creating atmospheric and immersive game environments. With extensive experience in Source Engine, I specialize in building detailed maps, optimizing performance, and crafting memorable player experiences.",
      bio2: "My work isn't just about geometry — it's about storytelling through environment design, lighting, and spatial composition.",
      stats: [
        { value: '10+', label: 'MAPS CREATED' },
        { value: '50K+', label: 'WORKSHOP DOWNLOADS' },
        { value: '5+', label: 'YEARS EXPERIENCE' }
      ],
      skills: ['Hammer Editor', 'Source Engine', 'Level Design', 'Lighting & Atmosphere', '3D Modeling']
    },
    projects: {
      title: 'Projects',
      items: [
        { id: '1', title: 'Industrial Complex', desc: 'A detailed industrial map with atmospheric lighting and optimized gameplay flow.' },
        { id: '2', title: 'Underground Facility', desc: 'Dark and immersive underground environment with dynamic lighting.' },
        { id: '3', title: 'City Streets', desc: 'Urban environment with detailed architecture and realistic atmosphere.' },
        { id: '4', title: 'Research Lab', desc: 'High-tech laboratory setting with attention to environmental storytelling.' },
        { id: '5', title: 'Abandoned Warehouse', desc: 'Post-apocalyptic warehouse with dramatic lighting and composition.' },
        { id: '6', title: 'Mountain Base', desc: 'Outdoor military installation with breathtaking vistas and tactical layout.' }
      ]
    },
    contact: {
      title: 'Get In Touch',
      status: 'Open for Commissions',
      statusDesc: "I'm available for commission work and collaborations. Feel free to reach out to discuss your project!",
      methods: [
        { icon: 'MessageCircle', title: 'Discord', value: 'mzmey', link: 'https://discord.com' },
        { icon: 'Palette', title: 'ArtStation', value: 'artstation.com/zmey48', link: 'https://www.artstation.com/zmey48' },
        { icon: 'Users', title: 'Discord Server', value: 'Join Community', link: 'https://discord.gg/RTxe6C88gB' },
        { icon: 'Gamepad2', title: 'Steam', value: 'Snake', link: 'https://steamcommunity.com/id/MZmey/' }
      ]
    },
    footer: '© 2025 Snake — Level Designer & Environmental Artist'
  },
  fr: {
    nav: { home: 'ACCUEIL', about: 'À PROPOS', projects: 'PROJETS', contact: 'CONTACT' },
    hero: {
      slogans: ['Créatif', 'Innovant', 'Immersif'],
      title: 'Cartes',
      subtitle: "Je suis Snake, un level designer créant des environnements immersifs pour les jeux Source Engine.",
      cta1: 'Voir les Projets',
      cta2: 'Me Contacter'
    },
    about: {
      title: 'À Propos',
      subtitle: 'Level Designer & Concepteur Environnemental',
      bio1: "Je suis un level designer animé par une passion pour la création d'environnements atmosphériques et immersifs. Avec une vaste expérience du Source Engine, je me spécialise dans la construction de cartes détaillées, l'optimisation des performances et la création d'expériences mémorables.",
      bio2: "Mon travail ne se limite pas à la géométrie — il s'agit de raconter des histoires à travers le design d'environnement, l'éclairage et la composition spatiale.",
      stats: [
        { value: '10+', label: 'CARTES CRÉÉES' },
        { value: '50K+', label: 'TÉLÉCHARGEMENTS WORKSHOP' },
        { value: '5+', label: "ANNÉES D'EXPÉRIENCE" }
      ],
      skills: ['Hammer Editor', 'Source Engine', 'Level Design', 'Éclairage & Atmosphère', 'Modélisation 3D']
    },
    projects: {
      title: 'Projets',
      items: [
        { id: '1', title: 'Complexe Industriel', desc: 'Une carte industrielle détaillée avec éclairage atmosphérique et flux de jeu optimisé.' },
        { id: '2', title: 'Installation Souterraine', desc: 'Environnement souterrain sombre et immersif avec éclairage dynamique.' },
        { id: '3', title: 'Rues de la Ville', desc: 'Environnement urbain avec architecture détaillée et atmosphère réaliste.' },
        { id: '4', title: 'Laboratoire de Recherche', desc: 'Laboratoire high-tech avec attention à la narration environnementale.' },
        { id: '5', title: 'Entrepôt Abandonné', desc: 'Entrepôt post-apocalyptique avec éclairage dramatique et composition.' },
        { id: '6', title: 'Base de Montagne', desc: 'Installation militaire extérieure avec vues époustouflantes et disposition tactique.' }
      ]
    },
    contact: {
      title: 'Me Contacter',
      status: 'Ouvert aux Commissions',
      statusDesc: "Je suis disponible pour des travaux de commission et des collaborations. N'hésitez pas à me contacter pour discuter de votre projet!",
      methods: [
        { icon: 'MessageCircle', title: 'Discord', value: 'mzmey', link: 'https://discord.com' },
        { icon: 'Palette', title: 'ArtStation', value: 'artstation.com/zmey48', link: 'https://www.artstation.com/zmey48' },
        { icon: 'Users', title: 'Serveur Discord', value: 'Rejoindre la Communauté', link: 'https://discord.gg/RTxe6C88gB' },
        { icon: 'Gamepad2', title: 'Steam', value: 'Snake', link: 'https://steamcommunity.com/id/MZmey/' }
      ]
    },
    footer: '© 2025 Snake — Level Designer & Artiste Environnemental'
  }
};

export default function Index() {
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const t = translations[lang];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const gridSize = 40;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.1)';
      ctx.lineWidth = 1;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      const gradient = ctx.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, 200);
      gradient.addColorStop(0, 'rgba(0, 255, 0, 0.3)');
      gradient.addColorStop(0.5, 'rgba(0, 255, 0, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    draw();
    const interval = setInterval(draw, 50);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [mousePos]);

  useEffect(() => {
    const currentWord = t.hero.slogans[currentSlogan];
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentWord.length) {
          setTypedText(currentWord.slice(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(typedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentSlogan((prev) => (prev + 1) % t.hero.slogans.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentSlogan, t.hero.slogans]);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  const projectImages = [
    'https://cdn.poehali.dev/files/6cdaff67-1fa3-459f-9683-e6ead3300d3e.png',
    'https://cdn.poehali.dev/files/09aa4887-ae45-4ebf-8737-be45564db4f0.png',
    'https://cdn.poehali.dev/files/2644125f-53c4-42ad-b226-22070632cfe4.png'
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      <div className="relative z-10">
        <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-primary/20">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="https://cdn.poehali.dev/files/1c9de207-5315-48fd-9ca3-1c324d4f2b1a.png" alt="Logo" className="w-12 h-12 rounded-full border-2 border-primary shadow-lg shadow-primary/50" />
              <div>
                <h1 className="text-2xl font-bold text-primary">Snake</h1>
                <p className="text-xs text-muted-foreground">Level Designer</p>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              {Object.entries(t.nav).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className={`text-sm font-medium transition-all hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform hover:after:scale-x-100 ${
                    activeSection === key ? 'text-primary after:scale-x-100' : 'text-muted-foreground'
                  }`}
                >
                  {label}
                </button>
              ))}
              
              <button
                onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/10 hover:bg-primary/20 transition-all border border-primary/30"
              >
                <span className="text-xl">{lang === 'en' ? '🇺🇸' : '🇫🇷'}</span>
              </button>
            </div>
          </div>
        </nav>

        <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="text-center max-w-4xl">
            <h2 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="text-primary inline-block">
                {typedText}<span className="animate-pulse text-primary/70">|</span>
              </span>{' '}
              <span>{t.hero.title}</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-6 text-lg hover-scale bg-primary hover:bg-primary/80 shadow-lg shadow-primary/50"
              >
                {t.hero.cta1}
              </Button>
              <Button
                onClick={() => scrollToSection('contact')}
                variant="outline"
                className="px-8 py-6 text-lg hover-scale border-primary/50 hover:bg-primary/10"
              >
                {t.hero.cta2}
              </Button>
            </div>
          </div>
        </section>

        <section id="about" className="min-h-screen py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-4">
              {t.about.title.split(' ')[0]} <span className="text-primary">{t.about.title.split(' ')[1] || ''}</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto mb-16 shadow-lg shadow-primary/50"></div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="p-8 hover-scale bg-card/50 backdrop-blur-sm border-primary/30">
                <div className="flex items-center gap-4 mb-6">
                  <img src="https://cdn.poehali.dev/files/1c9de207-5315-48fd-9ca3-1c324d4f2b1a.png" alt="Snake" className="w-20 h-20 rounded-full border-2 border-primary shadow-lg shadow-primary/50" />
                  <div>
                    <h3 className="text-2xl font-bold">Snake</h3>
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
                    <div key={idx} className="bg-primary/10 rounded-lg p-4 text-center border border-primary/30">
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
                    className="p-6 hover:border-primary transition-all hover-scale bg-card/50 backdrop-blur-sm border-primary/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/50 shadow-lg shadow-primary/30">
                        <Icon
                          name={idx === 0 ? 'Hammer' : idx === 1 ? 'Boxes' : idx === 2 ? 'Map' : idx === 3 ? 'Lightbulb' : 'Box'}
                          size={24}
                          className="text-primary"
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
              <span className="text-primary">{t.projects.title}</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto mb-12 shadow-lg shadow-primary/50"></div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {t.projects.items.map((project: any) => (
                <Card
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="hover:border-primary transition-all cursor-pointer group overflow-hidden hover-scale bg-card/50 backdrop-blur-sm border-primary/30"
                >
                  <div className="aspect-video bg-muted flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-all"></div>
                    <Icon name="Play" size={64} className="text-primary group-hover:scale-110 transition-transform drop-shadow-[0_0_15px_rgba(0,255,0,0.5)]" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.desc}</p>
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
            <div className="h-1 w-20 bg-primary mx-auto mb-12 shadow-lg shadow-primary/50"></div>
            
            <Card className="p-8 mb-8 border-primary/50 bg-card/80 backdrop-blur-sm">
              <div className="flex items-center gap-3 justify-center mb-4">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-lg shadow-primary/80"></div>
                <span className="font-bold text-primary">{t.contact.status}</span>
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
                  <Card className="hover:border-primary transition-all p-6 cursor-pointer group hover-scale bg-card/50 backdrop-blur-sm border-primary/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary/20 border border-primary/50 shadow-lg shadow-primary/30">
                          <Icon name={method.icon} size={24} className="text-primary" />
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

        <footer className="border-t border-primary/20 py-8 text-center text-muted-foreground">
          {t.footer}
        </footer>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl bg-card/95 backdrop-blur-md border-primary/50">
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform z-50 shadow-lg shadow-primary/50"
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
                    className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-primary/50"
                  >
                    <Icon name="ChevronLeft" size={24} />
                  </button>
                  <div className="flex gap-2">
                    {projectImages.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === imageIndex ? 'bg-primary w-8 shadow-lg shadow-primary/50' : 'bg-white/30'
                        }`}
                      ></div>
                    ))}
                  </div>
                  <button
                    onClick={() => setImageIndex((imageIndex + 1) % projectImages.length)}
                    className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-primary/50"
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
                {selectedProject.desc} This project showcases advanced level design techniques, optimized lighting systems, and careful attention to environmental storytelling. Built with Source Engine's Hammer Editor, it demonstrates professional-grade map creation for competitive and roleplay servers.
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
