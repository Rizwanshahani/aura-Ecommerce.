
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Careers', href: '#careers' },
        { label: 'Press Kit', href: '#press' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#docs' },
        { label: 'Help Center', href: '#help' },
        { label: 'Privacy Policy', href: '#privacy' }
      ]
    },
    {
      title: 'Contact',
      links: [
        { label: 'Sales', href: '#sales' },
        { label: 'Support', href: '#support' },
        { label: 'General Info', href: '#contact' }
      ]
    }
  ];

  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-1">
            <span className="text-xl font-bold text-white tracking-wide">Aura.</span>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              Building next-generation E-comerce App using MERN Stack.
            </p>
          </div>

          {/* Navigation Links Columns */}
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a 
                        href={link.href} 
                        className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Copyright Section */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} Aura. Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-slate-500">
            <a href="#terms" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#cookies" className="hover:text-slate-300 transition-colors">Cookies Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
