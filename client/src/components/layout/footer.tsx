import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
        <div className="container-luxury section-padding">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* brand */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <span className="font-heading text-2xl font-bold">Lumière</span>
                        <span className="text-gold text-sm font-medium tracking-widest uppercase">
                            Hotel
                        </span>
                    </div>
                    <p className="text-primary-foreground/70 text-sm leading-relaxed">
                        Experience unparalleled luxury and comfort at Lumière Hotel. Where every stay becomes a cherished memory.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-gold transition-colors">
                            <Instagram className="h-4 w-4" />
                        </a>
                        <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-gold transition-colors">
                            <Facebook className="h-4 w-4" />
                        </a>
                        <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-gold transition-colors">
                            <Twitter className="h-4 w-4" />
                        </a>
                    </div>
                </div>

                {/* quick links */}
                <div>
                    <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-3">
                        {['Rooms & Suites', 'Dining', 'Spa & Wellness', 'Events', 'Special Offers'].map((item) => (
                            <li key={item}>
                                <Link
                                    to="/rooms"
                                    className="text-primary-foreground/70 hover:text-gold transition-colors text-sm"
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* contact info */}
                <div>
                    <h4 className="font-heading text-lg font-semibold mb-4">Contact</h4>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <MapPin className="h-4 w-4 mt-1 text-gold" />
                            <span className="text-primary-foreground/70 text-sm">123 Luxury Street, City, Country</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Phone className="h-4 w-4 text-gold" />
                            <span className="text-primary-foreground/70 text-sm">+1 (555) 123-4567</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Mail className="h-4 w-4 text-gold" />
                            <span className="text-primary-foreground/70 text-sm">info@lumierehotel.com</span>
                        </li>
                    </ul>
                </div>

                {/* newsletter */}
                <div>
                    <h4 className="font-heading text-lg font-semibold mb-4">Newsletter</h4>
                    <p className="text-primary-foreground/70 text-sm mb-4">
                        Subscribe to our newsletter for exclusive offers and updates.
                    </p>
                    <form className="space-y-3">
                        <Input
                            type="email"
                            placeholder="Your email address"
                            className="w-full px-4 py-2 rounded-md bg-primary-foreground/10 border border-primary-foreground/20 focus:outline-none focus:ring-2 focus:ring-gold text-sm"
                        />
                        <Button
                            type="submit"
                            className="w-full bg-gold hover:bg-gold/90 text-primary font-medium py-2 rounded-md transition-colors"
                        >
                            Subscribe
                        </Button>
                    </form>
                </div>
            </div>

            {/* copyright */}
            <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-primary-foreground/50 text-sm">
                    © 2025 Lumière Hotel. All rights reserved.
                </p>
                <div className="flex gap-6">
                    <Link to="/privacy-policy" className="text-primary-foreground/70 hover:text-gold transition-colors">
                        Privacy Policy
                    </Link>
                    <Link to="/terms-of-service" className="text-primary-foreground/70 hover:text-gold transition-colors">
                        Terms of Service
                    </Link>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer
