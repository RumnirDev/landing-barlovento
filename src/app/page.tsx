"use client"
import { useState, useEffect } from 'react';
import { ShoppingCart, Shield, Layout, ArrowRight } from 'lucide-react';
import ImagesCarrousel from '@/components/imagesCarrousel';
import "./globals.css";

interface FeatureCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
}

type TestimonialProps = {
    company: string;
    quote: string;
}

// Componente de tarjeta de característica
const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
    return (
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg z-10">
            <div className="p-3 mb-4 text-sky-600 text-opacity-80 bg-sky-100 rounded-full">
                <Icon size={24} />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-800">{title}</h3>
            <p className="text-center text-gray-800">{description}</p>
        </div>
    );
};

function BarloventoBackground() {
    const [wavePosition, setWavePosition] = useState(0);
    const [waveDirection, setWaveDirection] = useState(1);

    // Animación de las olas
    useEffect(() => {
        const interval = setInterval(() => {
            setWavePosition((prevPosition) => {
                if (prevPosition >= 100 && waveDirection === 1) {
                    setWaveDirection(-1);
                } else if (prevPosition <= 0 && waveDirection === -1) {
                    setWaveDirection(1);
                }
                return prevPosition + waveDirection;
            });
        }, 80);

        return () => clearInterval(interval);
    }, [waveDirection]);


    return (
        <div className="absolute w-full h-screen overflow-hidden bg-blue-50 z-0">
            {/* Cielo y sol */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-blue-200">
                <div className="absolute top-24 left-24 w-16 h-16 rounded-full bg-yellow-200 opacity-80 blur-md"></div>
            </div>

            {/* Olas del mar - tres capas con diferentes velocidades */}
            <div
                className="absolute bottom-0 w-full h-48 bg-blue-300 opacity-30"
                style={{
                    transform: 'rotate(180deg)',
                    maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' class='shape-fill'%3E%3C/path%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' class='shape-fill'%3E%3C/path%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' class='shape-fill'%3E%3C/path%3E%3C/svg%3E")`,
                    maskSize: '200% 100%',
                    maskPosition: `${-wavePosition}% 0`,
                    maskRepeat: 'repeat-x',
                    backgroundColor: 'rgba(147, 197, 253, 0.6)'
                }}
            ></div>

            <div
                className="absolute bottom-0 w-full h-40 bg-blue-400 opacity-40 z-5"
                style={{
                    transform: 'rotate(180deg)',
                    maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' class='shape-fill'%3E%3C/path%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' class='shape-fill'%3E%3C/path%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' class='shape-fill'%3E%3C/path%3E%3C/svg%3E")`,
                    maskSize: '190% 100%',
                    maskPosition: `${wavePosition * 0.3}% 0`,
                    maskRepeat: 'repeat-x',
                    backgroundColor: 'rgba(96, 165, 250, 0.6)'
                }}
            ></div>

            <div
                className="absolute bottom-0 w-full h-32 bg-blue-500 opacity-50"
                style={{
                    maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' class='shape-fill'%3E%3C/path%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' class='shape-fill'%3E%3C/path%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' class='shape-fill'%3E%3C/path%3E%3C/svg%3E")`,
                    maskSize: '150% 100%',
                    maskPosition: `${-wavePosition * 0.2}% 0`,
                    maskRepeat: 'repeat-x',
                    backgroundColor: 'rgba(59, 130, 246, 0.6)'
                }}
            ></div>

            {/* Siluetas de barco grande */}
            <div className="absolute bottom-12 right-[10%] transform -translate-x-1/2 w-max h-max opacity-70 animate-wave-slow z-4">
                <img src="/icons/logoNegroSinFondo.svg" alt="Barco grande" className="size-40" />
            </div>

            {/* Siluetas de barcos pequeños */}
            <div className="absolute bottom-28 left-1/4 transform -translate-x-1/2 w-max h-max opacity-45 animate-wave-slow z-4">
                <img src="/icons/barcopequeño.svg" alt="Barco pequeño" className="size-8" />
            </div>

            <div className="absolute bottom-24 left-1/3 transform -translate-x-1/2 w-max h-max opacity-60 animate-wave-medium z-4">
                <img src="/icons/barcopequeño.svg" alt="Barco pequeño" className="size-10" />
            </div>

            <div className="absolute bottom-28 right-1/2 transform -translate-x-1/2 w-max h-max opacity-45 animate-wave-medium z-4">
                <img src="/icons/barcopequeño.svg" alt="Barco pequeño" className="size-6" />
            </div>

            <div className="absolute bottom-14 left-[4%] transform -translate-x-1/2 w-max h-max opacity-60 animate-wave-fast z-4">
                <img src="/icons/barcopequeño.svg" alt="Barco pequeño" className="size-12" />
            </div>

            <div className="absolute bottom-8 left-[55%] transform -translate-x-1/2 w-max h-max opacity-60 animate-wave-medium z-4">
                <img src="/icons/barcopequeño.svg" alt="Barco pequeño" className="size-[70px]" />
            </div>

            <div className="absolute bottom-5 left-1/4 transform -translate-x-1/2 w-max h-max opacity-65 animate-wave-fast z-4">
                <img src="/icons/barcopequeño.svg" alt="Barco pequeño" className="size-[78px]" />
            </div>

            <div className="absolute bottom-[120px] left-[12%] transform -translate-x-1/2 w-max h-max opacity-50 animate-wave-slow z-4">
                <img src="/icons/barcopequeño.svg" alt="Barco pequeño" className="size-7" />
            </div>

            <div className="absolute bottom-16 left-[42%] transform -translate-x-1/2 w-max h-max opacity-60 animate-wave-slow z-4">
                <img src="/icons/barcopequeño.svg" alt="Barco pequeño" className="size-10" />
            </div>

            <div className="absolute bottom-16 left-[15%] transform -translate-x-1/2 w-max h-max opacity-55 animate-wave-medium z-4">
                <img src="/icons/barcopequeño.svg" alt="Barco pequeño" className="size-12" />
            </div>

            <div className="absolute bottom-12 right-1/3 transform -translate-x-1/2 w-max h-max opacity-55 animate-wave-slow z-4">
                <img src="/icons/barcopequeño.svg" alt="Barco pequeño" className="size-[44px]" />
            </div>

            <div className="absolute bottom-28 right-[28%] transform -translate-x-1/2 w-max h-max opacity-55 animate-wave-slow z-4">
                <img src="/icons/barcopequeño.svg" alt="Barco pequeño" className="size-6" />
            </div>
        </div>
    );
}

const Testimonial = ({ company, quote }: TestimonialProps) => {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md text-center h-max">
        <p className="text-md italic text-gray-700 mb-4">"{quote}"</p>
        <h3 className="text-md text-center font-semibold text-gray-900">{company}</h3>
      </div>
    );
  };

{/* Testimonials/Brands Section */}
const testimonials: TestimonialProps[] = [
    { company: "Pesacadería Pablito", quote: "Gracias a Barlovento, logramos resultados que antes solo imaginábamos" },
    { company: "Peluquería La Fogata", quote: "Con Barlovento sentimos que por fin encontramos un aliado de verdad." },
    { company: "Panadería De La Esquina", quote: "Barlovento transformó por completo nuestra forma de trabajar: más ágil, más clara, más efectiva." },
    { company: "Bar Manolo", quote: "Profesionalismo, cercanía y resultados: eso es Barlovento." },
    { company: "Entre copas", quote: "Es la primera vez que sentimos que una plataforma realmente está pensada para los negocios pequeños como el nuestro." },
    { company: "Big Bang Multiprecios", quote: "Barlovento nos devolvió la ilusión de competir en igualdad de condiciones." },
    { company: "Hamburguesería Sesamo", quote: "Una herramienta fácil, clara y cercana. Justo lo que necesitábamos para crecer." },
    { company: "Frutería Manuel", quote: "Barlovento nos ayudó a digitalizar nuestro negocio sin complicaciones." },
    { company: "Librería Rebeca", quote: "Gracias a Barlovento, nuestros clientes usan los bonos del ayuntamiento directamente desde la plataforma. ¡Y vuelven por más!" },
    { company: "Pastelería Ramón", quote: "Lo mejor de Barlovento es que conecta a los comercios con iniciativas locales como el cashback municipal. Es un verdadero impulso." }
];

const TestimonialCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 5) % testimonials.length);
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 5);

    return (
        <section className="flex py-12">
            <div className="flex flex-col px-6 mx-auto z-30">
                <h2 className="mb-8 text-xl text-center text-gray-500 uppercase">Empresas que ya confían en nosotros</h2>
                <div className="flex flex-wrap justify-center gap-4 items-center">
                    {visibleTestimonials.map((testimonial, index) => (
                        <Testimonial key={index} company={testimonial.company} quote={testimonial.quote} />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Componente principal
const EcommerceLanding: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = (): void => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    
    const  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                console.log('Correo enviado con éxito');
            } else {
                console.error('Error:', data.error);
            }
        } catch (error) {
            console.error('Error en la petición:', error);
        }
        
        setEmail('');
    }
    return (
        <div className="relative w-full overflow-hidden bg-[#a3ccfd]">
            <BarloventoBackground />

            {/* Header */}

            {/* Hero Section */}
            <section className="relative h-screen w-screen pt-[30vh] text-center text-white z-10">
                <div className="container px-6 mx-auto">
                    <div className='mb-4 flex flex-wrap items-end gap-5 justify-center'>
                        <h1 className="text-5xl font-bold leading-tight md:text-6xl text-black">
                            Explora nuevos horizontes con
                        </h1>
                        <img src="/icons/logoTextoSinFondoVino.svg" alt="Logo Barlovento" className='h-[72px]' />
                    </div>
                    <p className="mb-10 w-1/2 mx-auto text-xl text-gray-600">
                        Más de 10,000 emprendedores en todo el país confían en nuestra plataforma.
                    </p>

                    {/* Email signup form */}
                    <div className="w-1/2 mx-auto mb-16">
                        <form className="flex max-w-xl overflow-hidden rounded-2xl shadow-md mx-auto" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Dirección de correo electrónico"
                                className="flex-grow px-5 py-3 text-sm text-gray-800 placeholder-gray-400 bg-white border-none focus:outline-none"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 bg-sky-600 bg-opacity-70 hover:bg-sky-500"
                            >
                                Comenzar prueba gratis
                            </button>
                        </form>

                        <p className="mt-2 text-sm w-full text-gray-500">
                            Empieza a vender en Barlovento, gratis por 14 días sin necesidad de pago.
                        </p>
                    </div>
                </div>
            </section>

            {/* Sobre nosotros */}
            <section className="relative w-[1000px] p-[2%] mt-20 z-10 bg-white rounded-lg h-max mx-auto shadow-lg">
                <div className="container py-6 px-6 mx-auto">
                    <h2 className="mb-10 text-4xl font-bold text-center text-gray-800">Nuestra misión</h2>
                    <div className="flex items-center flex-row justify-end overflow-visible">
                        <div className='absolute top-1/2 left-0 max-h-[490px] h-[80%] aspect-square -translate-x-1/2 -translate-y-1/2 bg-[#a3ccfd] p-[4%] rounded-full items-center justify-center'>
                            <img src="/icons/logoNegroSinFondo.svg" alt="Logo Barlovento" className='h-full w-full aspect-square'/>
                        </div>
                        <p className="text-gray-600 min-ml-[165px] ml-[20%] w-[80%] text-justify">
                            Barlovento es un innovador marketplace digital orientado a impulsar el comercio de proximidad, diseñado para servir de punto de encuentro entre ayuntamientos, pequeños comercios y ciudadanos. A través de la digitalización de bonos de consumo municipales mediante un sistema de cashback accesible, la plataforma incentiva la compra local apoyando la economía de cada municipio. De este modo, las pequeñas empresas pueden digitalizar sus negocios sin esfuerzo, poner a la venta sus productos o servicios en línea y competir de igual a igual frente a las grandes plataformas, beneficiándose de un escaparate digital propio. Los usuarios disfrutan de la comodidad de recoger sus pedidos en la tienda local o recibirlos en casa, con la logística de entrega gestionada directamente por los propios comercios. La iniciativa adopta el nombre Barlovento en homenaje a la histórica flota que protegía las rutas comerciales del Imperio Español. Del mismo modo que aquella armada velaba por los tesoros del pasado, hoy nuestra misión es resguardar y fortalecer el comercio local con el mismo espíritu de defensa y compromiso.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="flex pt-20 w-[75%] z-10 mx-auto">
                <div className="flex flex-col px-6 mx-auto">
                    <h2 className="mb-16 text-4xl font-bold text-center text-gray-800 z-50">Todo lo que necesitas para vender online</h2>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <FeatureCard
                            icon={Layout}
                            title="Interfaz limpia"
                            description="Diseños creados para que cada producto sea diferente y único. Personaliza tu tienda online con facilidad."
                        />
                        <FeatureCard
                            icon={ShoppingCart}
                            title="Todo en uno"
                            description="Barlovento se encarga de todo, tu pequeño comercio online estará disponible en minutos."
                        />
                        <FeatureCard
                            icon={Shield}
                            title="Una plataforma segura y eficiente"
                            description="Protección frente a grandes empresas y amenazas de seguridad. Tu tienda online estará siempre a salvo."
                        />
                    </div>
                </div>
            </section>
            
            <h2 className="my-20 mb-16 text-4xl font-bold text-center text-gray-800 z-50">Galería de imágenes de la plataforma</h2>

            {/* Image Section */}
            <section className="flex z-10 mb-20">
                <div className="flex flex-col">
                    <ImagesCarrousel images={[
                        "/images/image1.png",
                        "/images/image2.png",
                        "/images/image3.png",
                        "/images/image4.png",
                        "/images/image5.png",
                        "/images/image6.png",
                        "/images/image7.png"
                    ]} />
                </div>
            </section>


            {/* CTA Section */}
            <section className="relative w-[65%] flex flex-col py-12 px-16 text-white rounded-lg z-20 mx-auto bg-white shadow-lg">
                <div className="px-6 mx-auto text-center z-30">
                <h2 className="mb-10 text-4xl font-bold text-center text-gray-800">Nuestro compromiso con los ayuntamientos</h2>
                        <p className="mx-auto mb-8 text-md text-justify text-gray-800">
                            En Barlovento, entendemos que los ayuntamientos son actores clave en el desarrollo económico local. Por eso, nuestra plataforma nace como una herramienta aliada para impulsar el comercio de proximidad de forma eficiente, digital y accesible. A través de un sistema inteligente de cashback, los municipios pueden sustituir los tradicionales bonos de consumo por un mecanismo más justo y sostenible: por cada tres compras realizadas, el ciudadano recibe el reembolso de la media de lo gastado en las tres compras. Esto garantiza que el presupuesto municipal llegue a más vecinos y estimule un consumo continuado y equitativo. Nuestra misión es proteger al pequeño comercio local frente a la competencia desleal de grandes plataformas. Desde una librería de barrio hasta una panadería artesanal, cada negocio obtiene visibilidad en un entorno digital moderno y adaptado a sus capacidades, sin necesidad de grandes inversiones en marketing o logística. Con Barlovento, los ayuntamientos no solo fomentan el consumo local, sino que digitalizan el tejido comercial, ofrecen valor real a sus ciudadanos y fortalecen la identidad económica de su municipio.
                        </p>
                    <button onClick={() => window.location.href = "https://mail.google.com/mail/?view=cm&to=barlovento@gmail.com&su=Comenzar%20a%20fomentar%20el%20comercio%20local%20con%20Barlovento"} className="inline-flex items-center px-6 py-3 font-medium text-gray-800 transition-colors duration-300 rounded-md border-[1px] border-gray-800 hover:bg-gray-200">
                        Ponte en contacto con nosotros a través de barlovento@gmail.com<ArrowRight className="ml-2" size={18} />
                    </button>
                </div>
            </section>

            <TestimonialCarousel />
            
        </div>
    );
};

export default EcommerceLanding;