'use client'

import { LinkedInIcon, InstagramIcon, YouTubeIcon, DiscordIcon } from './SocialIcons'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'LinkedIn', icon: <LinkedInIcon />, url: 'https://www.linkedin.com/company/samcommunity-in/' },
    { name: 'Instagram', icon: <InstagramIcon />, url: 'https://www.instagram.com/samcommunity.in' },
    { name: 'YouTube', icon: <YouTubeIcon />, url: 'https://youtube.com/@samcommunityin' },
    { name: 'Discord', icon: <DiscordIcon />, url: 'https://discord.com/invite/YYJkbYUkhF' },
  ]

  return (
    <footer className="bg-darkSecondary border-t border-primary/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Connect With Samcommunity</h3>
            <div className="space-y-2 text-gray-300">
              <p>
                <span className="text-secondary font-medium">Email:</span>{' '}
                <a 
                  href="mailto:events@samcommunity.in" 
                  className="hover:text-secondary transition-colors"
                >
                  events@samcommunity.in
                </a>
              </p>
              <p>
                <span className="text-secondary font-medium">Website:</span>{' '}
                <a 
                  href="https://samcommunity.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors"
                >
                  https://samcommunity.in
                </a>
              </p>
              <p>
                <span className="text-secondary font-medium">Support:</span>{' '}
                <span className="text-gray-300">Available 9 AM - 8 PM (IST)</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="#registration" className="block text-gray-300 hover:text-secondary transition-colors">
                Register Now
              </a>
              <a href="#about-speaker" className="block text-gray-300 hover:text-secondary transition-colors">
                About Speaker
              </a>
              <a href="#what-you-learn" className="block text-gray-300 hover:text-secondary transition-colors">
                What You&apos;ll Learn
              </a>
              <a href="#faq" className="block text-gray-300 hover:text-secondary transition-colors">
                FAQ
              </a>
              
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex flex-wrap gap-4 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-darkTertiary border-2 border-primary/30 hover:border-secondary/50 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:glow-secondary"
                  aria-label={social.name}
                >
                  <div className="w-6 h-6">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
            
            {/* App Download Buttons */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Download Our App</h4>
              <a
                href="https://play.google.com/store/apps/details?id=co.robin.xgcmt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-12 w-auto hover:opacity-80 transition-opacity"
                />
              </a>
              <a
                href="https://apps.apple.com/in/app/classplus/id1324522260"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block block mt-2"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-12 w-auto hover:opacity-80 transition-opacity"
                  onError={(e) => {
                    // Fallback to a simple text button if image fails
                    e.currentTarget.style.display = 'none'
                    const parent = e.currentTarget.parentElement
                    if (parent && !parent.querySelector('.fallback-badge')) {
                      const fallback = document.createElement('div')
                      fallback.className = 'fallback-badge bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold'
                      fallback.textContent = 'Download on App Store'
                      parent.appendChild(fallback)
                    }
                  }}
                />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary/20 pt-8 text-center">
          <p className="text-gray-400 text-sm mb-2">
            Copyright © {currentYear} XYLYN SAMCOMMUNITY PRIVATE LIMITED. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">
            Registered Company | Professional Cybersecurity Training & Education
          </p>
        </div>
      </div>
    </footer>
  )
}


