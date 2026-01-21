import { motion } from "framer-motion";
import { Award, Users, Heart, Clock } from "lucide-react";


const About = () => {
  const stats = [
    { icon: Award, value: '25%', label: 'Years of Excellence' },
    { icon: Users, value: '50k+', label: 'Happy Guests' },
    { icon: Heart, value: '98%', label: 'Satisfaction Rate' },
    { icon: Clock, value: '24/7', label: 'Conceirge Service' }
  ]  

  return (
    <div className="min-h-screen">
      {/* hero section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/70" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            Our Story  
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y:0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
          >
            A legacy of luxury hospitality since 1998
          </motion.p>  
        </div>
      </section>
      
      {/* stats */}
      <section className="py-16 bg-muted/30">
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"  
                >
                  <stat.icon className="h-8 w-8 text-gold mx-auto mb-3" />
                  <div className="font-heading text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.value}  
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
            ))}  
          </div>  
        </div>
      </section>

      {/* story */}
      <section className="py-20">
        <div className="container-luxury">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}  
            >
            
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6">
                Where Elegance Meets Comfort  
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 1998, Lumière Hotel has been a beacon of luxury hospitality 
                  in the heart of the city. Our commitment to excellence has made us 
                  the preferred choice for discerning travelers from around the world.
                </p>
                <p>
                  Every detail at Lumière has been carefully curated to provide an 
                  unparalleled experience. From our meticulously designed rooms to 
                  our world-class dining, we ensure that every moment of your stay 
                  is nothing short of extraordinary.
                </p>
                <p>
                  Our dedicated team of hospitality professionals is committed to 
                  anticipating your every need, ensuring that your stay with us 
                  becomes a cherished memory.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-2xl overflow-hidden" 
            >
               <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-primary/20 rounded-2xl" />
               <div className="absolute inset-4 border border-gold/30 rounded-xl" />
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="text-center">
                   <span className="font-heading text-6xl font-bold text-gold">L</span>
                   <p className="text-sm tracking-widest text-muted-foreground">EST. 1998</p>    
                 </div>   
               </div>     
            </motion.div>  
          </div>  
        </div>
      </section>

      {/* values */}
      <section className="py-20 bg-primary text-white">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Excellence',
                description: 'We strive for perfection in every detail, ensuring an exceptional experience for our guests.',
              },
              {
                title: 'Warmth',
                description: 'Our genuine hospitality creates a welcoming atmosphere that feels like home.',
              },
              {
                title: 'Innovation',
                description: 'We continuously evolve to exceed expectations while honoring our timeless traditions.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-white/5 border border-white/10"
              >
                <h3 className="font-heading text-xl font-semibold text-gold mb-3">
                  {value.title}
                </h3>
                <p className="text-white/70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
