import './GalleryRow.css'
import Sever from '../../assets/images/Sever.jpg';
import { useState, useEffect  } from 'react';

function GalleryRow () {
    const [isOpen, setIsOpen] = useState(false);
    const [lightbox, setLightbox] = useState({ open: false, index: 0 });

    
    const eventData = {
        title: "Северная ночь",
        date: "28.02.2026",
        previewImages: [Sever, Sever, Sever, Sever, Sever], 
        fullImages: 
        [
            Sever, Sever, Sever, Sever, Sever, 
            Sever, Sever, Sever, Sever, Sever,
            Sever, Sever, Sever, Sever, Sever,
            Sever, Sever, Sever, Sever, Sever,
            Sever, Sever, Sever, Sever, Sever,
            Sever, Sever, Sever, Sever, Sever,
            Sever, Sever, Sever, Sever, Sever, 
            Sever, Sever, Sever, Sever, Sever,
            Sever, Sever, Sever, Sever, Sever,
            Sever, Sever, Sever, Sever, Sever,
            Sever, Sever, Sever, Sever, Sever,
            Sever, Sever, Sever, Sever, Sever
        ] 
    };

    const allImages = eventData.fullImages;

    useEffect(() => {
        document.body.classList.toggle('no-scroll', isOpen);
        return () => {
            document.body.classList.remove('no-scroll');
    };
    }, [isOpen]);
    return(
        <>
        <section className="gallery_row">
            <div className="gallery_row-topbar">
                <h3 className="gallery_row-title">title</h3>
                <p className="gallery_row-date">date</p>
            </div>
            {isOpen && <div className="gallery_row-items-overlay" onClick={() => setIsOpen(false)}/>}
            <div className="gallery_row-modal">
            <div className={`gallery_row-items-closebtn ${isOpen ? 'gallery_row-closebtn-open' : 'gallery_row-closebtn-closed'}`} onClick={(e) => { e.stopPropagation(); setIsOpen(false)}}>
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.5 1.5L1.5 21.5M1.50002 1.5L21.5 21.5" stroke="#2B2B2B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                <div className={`gallery_row-items ${isOpen ? 'gallery_row-items-open' : 'gallery_row-items-closed'}`} onClick={() => setIsOpen(true)}>
                    {eventData.previewImages.map((img, index) => (
                        <img key={index} src={img} alt="" />
                    ))}
                </div>
                {isOpen && (
                    <div className="gallery_row-full-images">
                        {eventData.fullImages.map((img, index) => (
                            <img key={`full-${index}`} src={img} alt="" onClick={() => setLightbox({ open: true, index })}/>
                        ))}
                    </div>
                )}
                {lightbox.open && (
                    <div className="lightbox-overlay" onClick={() => setLightbox({ open: false })}>
                        <button 
                            className="lightbox-prev"
                            onClick={(e) => {
                                e.stopPropagation();
                                setLightbox(prev => ({
                                    open: true,
                                    index: prev.index === 0 ? allImages.length - 1 : prev.index - 1
                                }));
                            }}
                        >
                            ‹
                        </button>
                        
                        <img 
                            src={allImages[lightbox.index]} 
                            alt={`Фото ${lightbox.index + 1}`}
                            className="lightbox-image"
                        />
                        
                        <div className="lightbox-counter">
                            {lightbox.index + 1} / {allImages.length}
                        </div>
                        
                        <button 
                            className="lightbox-next"
                            onClick={(e) => {
                                e.stopPropagation();
                                setLightbox(prev => ({
                                    open: true,
                                    index: prev.index === allImages.length - 1 ? 0 : prev.index + 1
                                }));
                            }}
                        >
                            ›
                        </button>
                        
                        <button 
                            className="lightbox-close"
                            onClick={(e) => {
                                e.stopPropagation();
                                setLightbox({ open: false });
                            }}
                        >
                            ×
                        </button>
                    </div>
                )}

            </div>
        </section>
        </>
    )
}

export default GalleryRow;
