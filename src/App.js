import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, AlertTriangle, Mail, User, Building, ArrowRight, Loader2, RefreshCw, Menu, X, Briefcase, Users, BarChart2, Info, Phone, Star, TrendingUp, Code, Palette, Edit, Target, Zap, Handshake, Globe, TrendingDown, ChevronsRight, Building2, Rocket, Scale } from 'lucide-react';

// --- Helper Components ---
const AnimatedCard = ({ children, className, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`}>
            {children}
        </div>
    );
};

// New CSS-based background component. No JS scroll listeners.
const FixedBackground = () => (
    <div className="fixed top-0 left-0 w-full h-screen -z-10">
        <div className="absolute top-[-50px] left-[-50px] w-[200px] h-[200px] bg-blue-200/30 dark:bg-blue-900/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-[200px] right-[-50px] w-[300px] h-[300px] bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[100px] left-[50px] w-[250px] h-[250px] bg-purple-200/30 dark:bg-purple-900/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
    </div>
);


// --- Router and Page Components ---

const App = () => {
    const [page, setPage] = useState('/');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    const navigate = (path) => {
        if (page === path) return;
        setIsExiting(true);
        setTimeout(() => {
            setPage(path);
            setIsMobileMenuOpen(false);
            window.scrollTo(0, 0);
            setIsExiting(false);
        }, 300);
    };

    const renderPage = () => {
        switch (page) {
            case '/talent': return <TalentPage navigate={navigate} />;
            case '/solution': return <SolutionPage navigate={navigate} />;
            case '/audit': return <AuditPage navigate={navigate} />;
            case '/about': return <AboutPage navigate={navigate} />;
            case '/contact': return <ContactPage navigate={navigate} />;
            case '/':
            default: return <HomePage navigate={navigate} />;
        }
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen font-sans text-slate-800 dark:text-slate-200 antialiased relative">
            {page === '/' ? <FixedBackground /> : <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-br from-blue-100 via-transparent to-transparent dark:from-blue-900/30 dark:via-slate-900 dark:to-slate-900 -z-10"></div>}
            <Navbar navigate={navigate} page={page} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            <main className={`pt-24 transition-opacity duration-300 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
                {renderPage()}
            </main>
            <Footer navigate={navigate} />
        </div>
    );
};

// --- Navigation and Footer ---

const Navbar = ({ navigate, page, isMobileMenuOpen, setIsMobileMenuOpen }) => {
    const navLinks = [
        { path: '/', label: 'For Companies', icon: Briefcase },
        { path: '/talent', label: 'For Talent', icon: Users },
        { path: '/solution', label: 'Our Solution', icon: ShieldCheck },
        { path: '/audit', label: 'IR35 Audit', icon: BarChart2 },
        { path: '/about', label: 'About Us', icon: Info },
    ];

    return (
        <header className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl shadow-sm fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <button onClick={() => navigate('/')} className="text-3xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer bg-transparent border-none p-0 tracking-tighter">
                        Vantis
                    </button>
                    <nav className="hidden md:flex items-center space-x-1">
                        {navLinks.map(link => (
                            <button
                                key={link.path}
                                onClick={() => navigate(link.path)}
                                className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 cursor-pointer border-none ${
                                    page === link.path 
                                    ? 'text-blue-600 dark:text-blue-300' 
                                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                                }`}
                            >
                                {link.label}
                                {page === link.path && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-blue-500 rounded-full"></span>}
                            </button>
                        ))}
                    </nav>
                     <div className="hidden md:block">
                        <button onClick={() => navigate('/contact')} className="bg-emerald-500 text-white font-semibold py-2 px-5 rounded-lg hover:bg-emerald-600 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-emerald-500/20 transform hover:-translate-y-0.5">
                            Contact Us
                        </button>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 dark:text-slate-300 bg-transparent border-none">
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-slate-900/95 backdrop-blur-lg absolute top-full left-0 w-full pb-4 border-t border-slate-200 dark:border-slate-800">
                    <nav className="flex flex-col space-y-2 p-4">
                        {navLinks.map(link => (
                             <button
                                key={link.path}
                                onClick={() => navigate(link.path)}
                                className={`flex items-center px-4 py-3 rounded-lg text-base font-semibold transition-colors duration-200 cursor-pointer border-none text-left w-full ${
                                    page === link.path 
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' 
                                    : 'bg-transparent text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800'
                                }`}
                            >
                                <link.icon className="mr-4 text-blue-500" size={20} />
                                {link.label}
                            </button>
                        ))}
                        <button onClick={() => navigate('/contact')} className="flex items-center px-4 py-3 mt-4 rounded-lg text-base font-semibold bg-emerald-500 text-white w-full">
                            <Phone className="mr-4" size={20} />
                            Contact Us
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
};

const Footer = ({ navigate }) => (
    <footer className="bg-white dark:bg-slate-950/50 mt-16 sm:mt-24 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="col-span-2 md:col-span-1">
                    <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2 tracking-tighter">Vantis</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Connecting UK companies with elite, vetted talent from across Africa.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Navigate</h4>
                    <ul className="space-y-3">
                        <li><button onClick={() => navigate('/')} className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors bg-transparent border-none p-0 cursor-pointer text-left">For Companies</button></li>
                        <li><button onClick={() => navigate('/talent')} className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors bg-transparent border-none p-0 cursor-pointer text-left">For Talent</button></li>
                        <li><button onClick={() => navigate('/solution')} className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors bg-transparent border-none p-0 cursor-pointer text-left">Our Solution</button></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Company</h4>
                     <ul className="space-y-3">
                        <li><button onClick={() => navigate('/about')} className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors bg-transparent border-none p-0 cursor-pointer text-left">About Us</button></li>
                        <li><button onClick={() => navigate('/contact')} className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors bg-transparent border-none p-0 cursor-pointer text-left">Contact</button></li>
                        <li><button onClick={() => navigate('/audit')} className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors bg-transparent border-none p-0 cursor-pointer text-left">IR35 Audit</button></li>
                    </ul>
                </div>
                 <div className="col-span-2 md:col-span-1">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Ready to Grow?</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">De-risk your hiring and unlock a world of compliant, cost-effective talent.</p>
                    <button onClick={() => navigate('/contact')} className="w-full bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-600/30 transform hover:-translate-y-0.5">
                        Contact Sales
                    </button>
                </div>
            </div>
            <div className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-slate-500 dark:text-slate-500">
                <p className="text-sm font-semibold mb-2 text-slate-600 dark:text-slate-400">Proudly supporting UN Sustainable Development Goals</p>
                <p className="text-xs">&copy; {new Date().getFullYear()} Vantis. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

// --- Page Implementations ---

const ScrollytellingSection = () => {
    const services = [
        {icon: Star, label: 'Social Media', text: 'Amplify your brand voice. Our social media experts create engaging content that converts followers into customers.'},
        {icon: Briefcase, label: 'Virtual Assistants', text: 'Reclaim your time. Delegate administrative tasks to a dedicated VA and focus on what truly matters.'},
        {icon: Edit, label: 'Data Entry', text: 'Ensure accuracy and efficiency. Our specialists handle your data with precision, powering your business intelligence.'},
        {icon: TrendingUp, label: 'Marketing', text: 'Drive measurable growth. From strategy to execution, our marketing pros become your engine for expansion.'},
        {icon: Palette, label: 'Graphic Design', text: 'Captivate your audience. Get stunning visuals that define your brand and make a lasting impression.'},
        {icon: Code, label: 'Tech Specialists', text: 'Build with the best. Access skilled developers and tech experts to bring your digital products to life.'},
    ];
   
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef(null);

    const handleScroll = () => {
        if (!containerRef.current) return;
        const { top, height } = containerRef.current.getBoundingClientRect();
        const progress = -top / (height - window.innerHeight);
        const newIndex = Math.max(0, Math.min(services.length - 1, Math.floor(progress * services.length)));
        setActiveIndex(newIndex);
    };

    const handleClick = (index) => {
        if (!containerRef.current) return;
        const containerTop = containerRef.current.offsetTop;
        const scrollableHeight = containerRef.current.offsetHeight - window.innerHeight;
        const targetScrollY = containerTop + (scrollableHeight * (index / (services.length - 1)));
        window.scrollTo({
            top: targetScrollY,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [services.length]);

    return (
        <div ref={containerRef} className="relative hidden md:block" style={{ height: '300vh' }}>
            <div className="sticky top-0 h-screen flex items-center">
                <div className="container mx-auto grid grid-cols-2 gap-16 items-center">
                    <div className="text-left relative h-48">
                        {services.map((service, index) => (
                            <div key={index} className={`transition-opacity duration-500 absolute w-full ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                                <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{service.label}</h3>
                                <p className="text-lg text-slate-600 dark:text-slate-300">{service.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <button key={index} onClick={() => handleClick(index)} className={`bg-white/50 dark:bg-slate-800/30 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-800/50 transition-all duration-500 group text-center w-full ${activeIndex === index ? 'opacity-100 scale-105 shadow-2xl shadow-blue-500/20' : 'opacity-40 scale-95 hover:opacity-100 hover:scale-100'}`}>
                                <service.icon className={`mx-auto mb-3 h-8 w-8 transition-colors duration-500 ${activeIndex === index ? 'text-blue-500 dark:text-blue-400' : 'text-slate-500 group-hover:text-blue-500'}`} strokeWidth={1.5} /> 
                                <span className={`text-sm font-semibold transition-colors duration-500 ${activeIndex === index ? 'text-slate-700 dark:text-slate-200' : 'text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-200'}`}>{service.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


const HomePage = ({ navigate }) => {
    const handleMobileServiceClick = () => {
        const targetElement = document.getElementById('vantis-advantage');
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16">
                <section className="text-center">
                    <AnimatedCard>
                        <div className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold px-4 py-1.5 rounded-full text-sm mb-6 shadow-sm">
                            For UK Companies
                        </div>
                    </AnimatedCard>
                    <AnimatedCard delay={100}>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight tracking-tighter">
                            Increase Your Output, Not Your Payroll.
                        </h1>
                    </AnimatedCard>
                    <AnimatedCard delay={200}>
                        <p className="max-w-3xl mx-auto text-lg lg:text-xl text-slate-600 dark:text-slate-300">
                            In a hostile UK hiring market with soaring employment costs, growing your team is painfully expensive. Vantis offers a strategic, socially responsible alternative: access elite, UK-vetted African talent that is both 100% IR35 compliant and remarkably cost-effective.
                        </p>
                    </AnimatedCard>
                </section>
            </div>

            {/* Scrollytelling Section for Desktop */}
            <ScrollytellingSection />
           
            {/* Simpler Grid for Mobile */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 md:hidden">
                 <AnimatedCard className="max-w-5xl mx-auto my-16">
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-center">
                        {[
                            {icon: Star, label: 'Social Media'},
                            {icon: Briefcase, label: 'Virtual Assistants'},
                            {icon: Edit, label: 'Data Entry'},
                            {icon: TrendingUp, label: 'Marketing'},
                            {icon: Palette, label: 'Graphic Design'},
                            {icon: Code, label: 'Tech Specialists'},
                        ].map((item, index) => (
                             <button key={index} onClick={handleMobileServiceClick} className="bg-white/50 dark:bg-slate-800/30 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-800/50 w-full text-center">
                                <item.icon className="mx-auto text-blue-500 dark:text-blue-400 mb-3 h-8 w-8" strokeWidth={1.5} /> 
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item.label}</span>
                            </button>
                        ))}
                    </div>
                </AnimatedCard>
            </div>

            <div id="vantis-advantage" className="bg-white dark:bg-slate-950/50 py-24 sm:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <section className="text-center max-w-4xl mx-auto">
                        <AnimatedCard>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tighter">
                                The Vantis Advantage in Action
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-300 mb-12">
                                Partnering with Vantis isn't just a safer choice, it's a smarter financial decision. We deliver measurable results that impact your bottom line.
                            </p>
                        </AnimatedCard>
                        <div className="grid md:grid-cols-2 gap-8 text-left">
                            <AnimatedCard delay={200} className="bg-gradient-to-br from-emerald-400 to-green-600 text-white p-8 rounded-2xl shadow-2xl shadow-emerald-500/30">
                                <p className="text-6xl font-bold">60%</p>
                                <p className="text-lg font-semibold">Potential Payroll Cost Reduction</p>
                                <p className="text-sm opacity-80 mt-2">Escape crippling UK employer NI contributions and inflated salary demands. Our model provides a more sustainable path to scaling your team.</p>
                            </AnimatedCard>
                            <AnimatedCard delay={300} className="bg-gradient-to-br from-red-500 to-orange-500 text-white p-8 rounded-2xl shadow-2xl shadow-red-500/30">
                                <p className="text-6xl font-bold">100%</p>
                                <p className="text-lg font-semibold">IR35 Compliance Risk Eliminated</p>
                                <p className="text-sm opacity-80 mt-2">As the legal Employer of Record, we absorb all liability. You get the talent without the risk of devastating HMRC penalties.</p>
                            </AnimatedCard>
                        </div>
                    </section>
                </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 py-24 sm:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <section className="text-center max-w-3xl mx-auto">
                        <AnimatedCard>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tighter">
                                Ready to Build a Smarter, Safer Team?
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-300 mb-10">
                                Stop gambling with compliance and overpaying for talent. Explore our risk-free solution or assess your current setup. Your next step is clear.
                            </p>
                        </AnimatedCard>
                        <AnimatedCard delay={200} className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <button onClick={() => navigate('/audit')} className="w-full sm:w-auto bg-gradient-to-br from-red-500 to-orange-500 text-white font-bold py-4 px-8 rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-red-500/30">
                                <AlertTriangle className="mr-2" size={20} />
                                Assess Your IR35 Risk
                            </button>
                            <button onClick={() => navigate('/solution')} className="w-full sm:w-auto bg-slate-800 text-white font-bold py-4 px-8 rounded-xl hover:bg-black dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                Discover Our Solution
                            </button>
                        </AnimatedCard>
                         <AnimatedCard delay={300} className="mt-12">
                            <p className="text-slate-500 dark:text-slate-400">Are you one of Africa's top professionals?</p>
                            <button onClick={() => navigate('/talent')} className="font-semibold text-blue-600 dark:text-blue-400 hover:underline bg-transparent border-none p-0 cursor-pointer group">
                                Connect with premier UK companies <ArrowRight className="inline h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                            </button>
                        </AnimatedCard>
                    </section>
                </div>
            </div>
        </div>
    );
};

const TalentPage = ({ navigate }) => (
     <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <section className="text-center">
             <AnimatedCard>
                <div className="inline-block bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 font-semibold px-4 py-1.5 rounded-full text-sm mb-6 shadow-sm">
                    For Africa's Top Professionals
                </div>
            </AnimatedCard>
            <AnimatedCard delay={100}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight tracking-tighter">
                    Your Talent Deserves a Global Stage.
                </h1>
            </AnimatedCard>
            <AnimatedCard delay={200}>
                <p className="max-w-3xl mx-auto text-lg lg:text-xl text-slate-600 dark:text-slate-300 mb-10">
                    Don't let borders limit your career. Vantis connects exceptional, UK-vetted professionals from across Africa with exciting UK companies. We handle the legal and administrative complexities, providing you with stable, well-paid, long-term employment, so you can focus on what you do best.
                </p>
            </AnimatedCard>
             <AnimatedCard className="max-w-4xl mx-auto my-16" delay={300}>
                 <p className="text-xl font-semibold mb-6 text-slate-800 dark:text-slate-100">We are actively recruiting specialists in:</p>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-center">
                    {[
                        {icon: Star, label: 'Social Media'},
                        {icon: Briefcase, label: 'Virtual Assistants'},
                        {icon: Edit, label: 'Data Entry'},
                        {icon: TrendingUp, label: 'Marketing'},
                        {icon: Palette, label: 'Graphic Design'},
                        {icon: Code, label: 'Tech Specialists'},
                    ].map((item, index) => (
                         <div key={index} className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10 transition-all duration-300 transform hover:-translate-y-1">
                            <item.icon className="mx-auto text-green-500 dark:text-green-400 mb-3 h-8 w-8" strokeWidth={1.5} /> 
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item.label}</span>
                        </div>
                    ))}
                </div>
            </AnimatedCard>
            <AnimatedCard className="flex flex-col sm:flex-row justify-center items-center gap-4" delay={400}>
                <button onClick={() => navigate('/contact')} className="w-full sm:w-auto bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-blue-600/30">
                    Join Our Elite Talent Pool
                </button>
            </AnimatedCard>
             <AnimatedCard className="mt-16" delay={500}>
                <p className="text-slate-500 dark:text-slate-400">Are you a UK company looking to hire?</p>
                <button onClick={() => navigate('/')} className="font-semibold text-blue-600 dark:text-blue-400 hover:underline bg-transparent border-none p-0 cursor-pointer group">
                    Return to the company homepage <ArrowRight className="inline h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
            </AnimatedCard>
        </section>
    </div>
);

const SolutionPage = ({ navigate }) => (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
            <AnimatedCard>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tighter">The Vantis EOR Solution</h1>
            </AnimatedCard>
            <AnimatedCard delay={100}>
                <p className="max-w-3xl mx-auto text-lg lg:text-xl text-slate-600 dark:text-slate-300">We solve the two biggest problems facing UK hiring: soaring costs and contractor compliance risk.</p>
            </AnimatedCard>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            <AnimatedCard className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800" delay={200}>
                <h3 className="text-2xl font-bold text-red-600 dark:text-red-500 mb-6">The Old Way: The Hiring Dilemma</h3>
                <ul className="space-y-4 text-slate-600 dark:text-slate-300">
                    <li className="flex items-start"><X className="text-red-500 h-6 w-6 mr-4 mt-0.5 flex-shrink-0" /><span><strong>High UK Costs:</strong> Face crippling employer NI contributions and rising salary demands that make local hiring unsustainable for growth.</span></li>
                    <li className="flex items-start"><X className="text-red-500 h-6 w-6 mr-4 mt-0.5 flex-shrink-0" /><span><strong>Contractor Risk:</strong> Carry 100% of the liability for IR35 misclassification, exposing your business to devastating retrospective tax bills.</span></li>
                    <li className="flex items-start"><X className="text-red-500 h-6 w-6 mr-4 mt-0.5 flex-shrink-0" /><span><strong>Admin Burden:</strong> Juggle complex legal checks for every contractor, a significant drain on non-revenue-generating time.</span></li>
                    <li className="flex items-start"><X className="text-red-500 h-6 w-6 mr-4 mt-0.5 flex-shrink-0" /><span><strong>Talent Instability:</strong> Rely on transient contractors with no long-term commitment to your company's success.</span></li>
                </ul>
            </AnimatedCard>
            <div className="md:sticky md:top-32">
                <AnimatedCard className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8 rounded-2xl shadow-2xl shadow-blue-500/30" delay={300}>
                    <h3 className="text-2xl font-bold mb-6">The Vantis Way: Strategic Advantage</h3>
                     <ul className="space-y-4">
                        <li className="flex items-start"><ShieldCheck className="h-6 w-6 mr-4 mt-0.5 flex-shrink-0" /><span><strong>Cost-Effective Talent:</strong> Access an elite pool of UK-vetted African professionals at a fraction of the UK cost.</span></li>
                        <li className="flex items-start"><ShieldCheck className="h-6 w-6 mr-4 mt-0.5 flex-shrink-0" /><span><strong>Zero IR35 Risk:</strong> Vantis becomes the legal Employer of Record, completely removing your compliance burden.</span></li>
                        <li className="flex items-start"><ShieldCheck className="h-6 w-6 mr-4 mt-0.5 flex-shrink-0" /><span><strong>Ethical & Impactful:</strong> Align your hiring with your ESG goals. Every hire contributes to UN Sustainable Development Goals.</span></li>
                        <li className="flex items-start"><ShieldCheck className="h-6 w-6 mr-4 mt-0.5 flex-shrink-0" /><span><strong>A Winning Strategy:</strong> Get superior talent, total compliance, and significant cost savings in one solution.</span></li>
                    </ul>
                </AnimatedCard>
            </div>
        </div>
    </div>
);

const AboutPage = ({ navigate }) => (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto">
            <AnimatedCard className="text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tighter">Our Story</h1>
            </AnimatedCard>

            <AnimatedCard delay={100}>
                <div className="mt-8 text-center p-8 bg-white dark:bg-slate-800/50 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">The Problem We Solve</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                        UK businesses are caught in a perfect storm: a hostile domestic hiring market with soaring costs, and the ever-present legal threat of IR35 non-compliance when looking abroad. Companies need to grow, but the traditional paths are either prohibitively expensive or dangerously risky.
                    </p>
                </div>
            </AnimatedCard>

            <AnimatedCard delay={200}>
                 <div className="my-16 flex flex-col md:flex-row items-center justify-center gap-8 text-center">
                    <div className="p-6 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg text-center">
                        <h3 className="font-bold text-lg text-blue-600 dark:text-blue-400">UK Companies</h3>
                        <p className="text-sm text-slate-500">Need growth, face high costs & risk</p>
                    </div>
                     <div className="text-blue-300 dark:text-blue-700 transform md:-rotate-90">
                        <ChevronsRight size={48} className="animate-pulse" />
                    </div>
                    <div className="p-6 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg text-center">
                        <h3 className="font-bold text-lg text-green-600 dark:text-green-400">African Talent</h3>
                        <p className="text-sm text-slate-500">Elite skills, seeking global opportunities</p>
                    </div>
                </div>
            </AnimatedCard>

            <AnimatedCard delay={300}>
                <div className="p-8 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl shadow-2xl shadow-blue-500/30 text-center">
                    <h2 className="text-3xl font-bold mb-4">Our Mission: The Vantis Bridge</h2>
                    <p className="text-lg max-w-3xl mx-auto">
                        To build a direct, compliant, and powerful bridge between these two worlds. We meticulously vet every candidate and operate as the legal Employer of Record, absorbing 100% of the compliance risk. For our clients, this means confident, affordable growth. For our talent, it means stable, secure, and well-paid careers that change lives.
                    </p>
                </div>
            </AnimatedCard>

            <AnimatedCard delay={400}>
                <div className="mt-16 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 tracking-tight">Our Impact: Aligning Growth with Global Goals</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg group relative">
                            <div className="inline-flex items-center justify-center p-4 bg-blue-100 dark:bg-blue-900/50 rounded-full mb-4">
                                <Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-2">SDG 8: Decent Work</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">We provide stable, formal employment, creating decent work and fostering economic growth in African communities.</p>
                             <div className="absolute bottom-full mb-2 w-full left-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="bg-slate-800 text-white text-xs rounded py-1 px-2">Decent Work & Economic Growth</span>
                            </div>
                        </div>
                        <div className="text-center p-6 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg group relative">
                            <div className="inline-flex items-center justify-center p-4 bg-blue-100 dark:bg-blue-900/50 rounded-full mb-4">
                                <TrendingDown className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-2">SDG 10: Reduced Inequalities</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Our model reduces inequality by connecting the UK's high-value job market with Africa's professional talent pool.</p>
                             <div className="absolute bottom-full mb-2 w-full left-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="bg-slate-800 text-white text-xs rounded py-1 px-2">Reduced Inequalities</span>
                            </div>
                        </div>
                        <div className="text-center p-6 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg group relative">
                            <div className="inline-flex items-center justify-center p-4 bg-blue-100 dark:bg-blue-900/50 rounded-full mb-4">
                                <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-2">ESG: Social Responsibility</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Partnering with Vantis demonstrates a clear commitment to the 'Social' pillar of ESG through ethical, impactful hiring.</p>
                             <div className="absolute bottom-full mb-2 w-full left-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="bg-slate-800 text-white text-xs rounded py-1 px-2">Environmental, Social, Governance</span>
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedCard>
        </div>
    </div>
);

const ContactPage = ({ navigate }) => {
    const [submitted, setSubmitted] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        try {
            const response = await fetch('https://formspree.io/f/xeozdnnp', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                alert('There was an error sending your message. Please try again.');
            }
        } catch (error) {
            alert('There was a network error. Please try again.');
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="max-w-2xl mx-auto text-center">
                <AnimatedCard>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tighter">Get in Touch</h1>
                </AnimatedCard>
                <AnimatedCard delay={100}>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-10">Whether you're a company looking to hire or a professional seeking your next role, we'd love to hear from you.</p>
                </AnimatedCard>

                <AnimatedCard delay={200}>
                    {submitted ? (
                        <div className="bg-green-100 dark:bg-green-900/50 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 px-6 py-8 rounded-2xl text-center shadow-lg">
                            <h3 className="font-bold text-2xl mb-2">Thank You!</h3>
                            <p>Your message has been sent. We'll be in touch shortly.</p>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 text-left">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                                    <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow" />
                                </div>
                                 <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                                    <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow" />
                                </div>
                                <div>
                                    <label htmlFor="iam" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">I am a...</label>
                                    <select id="iam" name="role" className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow">
                                        <option>Company looking to hire</option>
                                        <option>Professional looking for a role</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                                    <textarea id="message" name="message" rows="4" required className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"></textarea>
                                </div>
                                <div className="p-4 bg-slate-100 dark:bg-slate-900/50 rounded-lg flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input id="captcha" type="checkbox" className="h-6 w-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        <label htmlFor="captcha" className="ml-3 text-sm text-slate-600 dark:text-slate-300">I'm not a robot</label>
                                    </div>
                                    <div className="text-xs text-slate-400">
                                        reCAPTCHA
                                        <div className="flex space-x-1">
                                            <span>Privacy</span> - <span>Terms</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold py-3.5 px-8 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-blue-600/30">
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </AnimatedCard>
            </div>
        </div>
    );
};


const AuditPage = ({ navigate }) => {
    // This is the IR35 Audit component we built before
    const [answers, setAnswers] = useState({});
    const [riskScore, setRiskScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', company: '' });
    const [formSubmitted, setFormSubmitted] = useState(false);

    const questions = [
        { id: 'q1', text: 'Do you direct, supervise, or control how the contractor performs their daily tasks?', weight: 3 },
        { id: 'q2', text: 'Is the contractor required to work at specific times or from a specific location (your office)?', weight: 2 },
        { id: 'q3', text: 'Does the contractor use your company\'s equipment (e.g., laptop, software) to complete their work?', weight: 2 },
        { id: 'q4', text: 'Is the contractor integrated into your team, attending regular team meetings and company events?', weight: 2 },
        { id: 'q5', text: 'Do you expect the contractor to perform the work personally, without the right to send a substitute?', weight: 3 },
        { id: 'q6', text: 'Is there an expectation of ongoing work, rather than a contract for a single, defined project?', weight: 1 },
        { id: 'q7', text: 'Are they paid a fixed hourly, daily, or monthly rate, similar to an employee?', weight: 1 },
    ];

    const handleAnswer = (questionId, answer) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const calculateRisk = async (e) => {
        e.preventDefault();
        const form = e.target;

        if (!formData.name || !formData.email) {
            const formElement = document.getElementById('get-results-audit');
            if (formElement && !formElement.querySelector('.form-error')) {
                const error = document.createElement('p');
                error.className = 'form-error text-red-500 mt-2';
                error.textContent = 'Please enter your name and email to see the results.';
                formElement.querySelector('form').prepend(error);
            }
            return;
        }

        setIsCalculating(true);
        setFormSubmitted(true);

        // Send form data to Formspree
        try {
            const formSpreeData = new FormData(form);
            await fetch('https://formspree.io/f/mnnzrwyn', {
                method: 'POST',
                body: formSpreeData,
                headers: {
                    'Accept': 'application/json'
                }
            });
        } catch (error) {
            console.error('Error submitting to Formspree:', error);
            // Optionally, inform the user that their details couldn't be sent but still show the results.
        }

        // Calculate and show results after a delay
        let score = 0;
        questions.forEach(q => {
            if (answers[q.id] === true) {
                score += q.weight;
            }
        });
        setTimeout(() => {
            setRiskScore(score);
            setShowResults(true);
            setIsCalculating(false);
            const resultsElement = document.getElementById('results-section-audit');
            if (resultsElement) {
                resultsElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 1500);
    };
   
    const handleReset = () => {
        setAnswers({});
        setRiskScore(0);
        setShowResults(false);
        setFormSubmitted(false);
        setFormData({ name: '', email: '', company: '' });
        const quizElement = document.getElementById('risk-audit-start');
        if (quizElement) {
            quizElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const getRiskLevel = () => {
        const totalWeight = questions.reduce((sum, q) => sum + q.weight, 0);
        const percentage = (riskScore / totalWeight) * 100;
        if (percentage > 65) return { 
            level: 'CRITICAL RISK', 
            color: 'text-red-500', 
            bgColor: 'bg-red-500/10 dark:bg-red-900/20', 
            borderColor: 'border-red-500/20 dark:border-red-500/30', 
            description: "Your responses indicate a high probability of non-compliance. From HMRC's perspective, your contractors are likely 'disguised employees.' You are exposed to immediate and significant financial liability for back-taxes, National Insurance, and fines of up to 100% of the tax owed. <strong>You need to take action.</strong>" 
        };
        if (percentage > 35) return { 
            level: 'DANGEROUS AMBIGUITY', 
            color: 'text-amber-500', 
            bgColor: 'bg-amber-500/10 dark:bg-amber-900/20', 
            borderColor: 'border-amber-500/20 dark:border-amber-500/30', 
            description: "You are operating in the IR35 grey zone where HMRC investigations thrive. Your arrangements contain multiple red flags that could easily be interpreted as employment, leaving you vulnerable to a costly and time-consuming legal challenge." 
        };
        return { 
            level: 'POTENTIAL EXPOSURE', 
            color: 'text-green-500', 
            bgColor: 'bg-green-500/10 dark:bg-green-900/20', 
            borderColor: 'border-green-500/20 dark:border-green-500/30', 
            description: "While your arrangements show some signs of compliance, IR35 is notoriously complex. Even a single contract change or shift in working practices could unknowingly move you into a higher risk category. Complacency is your biggest enemy." 
        };
    };

    const riskInfo = getRiskLevel();
    const allQuestionsAnswered = Object.keys(answers).length === questions.length;

    const QuizQuestion = ({ question, answer, onAnswer }) => (
        <div className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300">
            <p className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-5">{question}</p>
            <div className="flex items-center space-x-4">
                <button onClick={() => onAnswer(true)} className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 text-base shadow-md ${answer === true ? 'bg-blue-600 text-white ring-2 ring-blue-300 dark:ring-blue-500 scale-105' : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-600'}`}>Yes</button>
                <button onClick={() => onAnswer(false)} className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 text-base shadow-md ${answer === false ? 'bg-red-600 text-white ring-2 ring-red-300 dark:ring-red-500 scale-105' : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-slate-600'}`}>No</button>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <section id="risk-audit-start" className="mb-16 sm:mb-24">
                <div className="text-center mb-12">
                     <AnimatedCard>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tighter">The HMRC Compliance Stress Test</h1>
                    </AnimatedCard>
                    <AnimatedCard delay={100}>
                        <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">These aren't our questions; they're based on HMRC's own checklist. If you answer 'Yes' to most of these, you are likely operating outside the rules and are already at high risk of an investigation.</p>
                    </AnimatedCard>
                </div>
                <div className="max-w-3xl mx-auto grid grid-cols-1 gap-8">
                    {questions.map((q, index) => (
                        <AnimatedCard key={q.id} delay={200 + index * 50}>
                            <QuizQuestion question={`${index + 1}. ${q.text}`} answer={answers[q.id]} onAnswer={(answer) => handleAnswer(q.id, answer)} />
                        </AnimatedCard>
                    ))}
                </div>
            </section>
           
            {allQuestionsAnswered && !formSubmitted && (
                <AnimatedCard>
                <section id="get-results-audit" className="bg-white dark:bg-slate-800/50 p-8 sm:p-10 rounded-2xl shadow-2xl max-w-2xl mx-auto text-center border border-slate-200 dark:border-slate-800">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Don't Look Away. See Your Results.</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-8">Ignorance is not a defence in an HMRC investigation. Enter your details to see the unvarnished truth about your current liability.</p>
                    <form onSubmit={calculateRisk} className="space-y-5" noValidate>
                        <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" /><input type="text" name="name" placeholder="Your Name" required value={formData.name} onChange={handleInputChange} className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow" /></div>
                        <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" /><input type="email" name="email" placeholder="Work Email" required value={formData.email} onChange={handleInputChange} className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow" /></div>
                        <div className="relative"><Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" /><input type="text" name="company" placeholder="Company Name (Optional)" value={formData.company} onChange={handleInputChange} className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow" /></div>
                        <button type="submit" disabled={isCalculating} className="w-full bg-gradient-to-br from-red-500 to-orange-500 text-white font-bold py-3.5 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-red-500/30 disabled:from-red-400 disabled:to-orange-400 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-md flex items-center justify-center">{isCalculating ? <><Loader2 className="animate-spin mr-3 h-5 w-5" />Calculating...</> : "Reveal My Risk - I Understand the Stakes"}</button>
                    </form>
                </section>
                </AnimatedCard>
            )}

            {showResults && (
                 <AnimatedCard>
                <section id="results-section-audit" className="mt-16 sm:mt-24">
                    <div className={`max-w-3xl mx-auto p-8 sm:p-12 rounded-2xl border-2 shadow-2xl ${riskInfo.bgColor} ${riskInfo.borderColor}`}>
                         <div className="text-center">
                            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Your IR35 Compliance Result</h3>
                            <p className={`text-6xl sm:text-7xl font-extrabold my-4 ${riskInfo.color}`}>{riskInfo.level}</p>
                            <p className="text-lg text-slate-700 dark:text-slate-300 max-w-xl mx-auto" dangerouslySetInnerHTML={{ __html: riskInfo.description }}></p>
                        </div>
                        <div className="text-center mt-8"><button onClick={handleReset} className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-2.5 px-6 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-300 inline-flex items-center shadow-sm"><RefreshCw className="mr-2 h-4 w-4" />Start Over</button></div>
                    </div>
                    <div className="mt-12 text-center">
                        <button onClick={() => navigate('/solution')} className="bg-gradient-to-br from-green-500 to-emerald-500 text-white font-bold py-4 px-10 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 inline-block transform hover:scale-105 text-lg shadow-lg hover:shadow-xl hover:shadow-green-500/30">Learn How Vantis Eliminates This Risk</button>
                    </div>
                </section>
                </AnimatedCard>
            )}
        </div>
    );
};

export default App;
