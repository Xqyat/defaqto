import './GalleryDialog.css';
import { useState, useEffect } from 'react';

function GalleryDialog({ eventData, isOpen, setIsOpen }) {
    const [lightbox, setLightbox] = useState({ open: false, index: 0 });
    const allImages = eventData?.fullImages || [];

    useEffect(() => {
        document.body.classList.toggle('no-scroll', isOpen);
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <section className="gallery_dialog">
            <div className="gallery_dialog-items-overlay" onClick={() => setIsOpen(false)}/>
            <div className="gallery_dialog-items-closebtn gallery_dialog-closebtn-open" 
                 onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}>
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
                    <path d="M21.5 1.5L1.5 21.5M1.50002 1.5L21.5 21.5" stroke="#2B2B2B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>

            <div className="gallery_dialog-full-images">
                {allImages.map((img, index) => (
                    <img key={`full-${index}`} src={img} alt="" onClick={() => setLightbox({ open: true, index })}/>
                ))}
            </div>

            {lightbox.open && (
                <div className="lightbox-overlay" onClick={() => setLightbox({ open: false })}>
                    <button className="lightbox-prev" onClick={(e) => {
                        e.stopPropagation();
                        setLightbox(prev => ({
                            open: true,
                            index: prev.index === 0 ? allImages.length - 1 : prev.index - 1
                        }));
                    }}>‹</button>
                    
                    <img src={allImages[lightbox.index]} alt="" className="lightbox-image"/>
                    
                    <div className="lightbox-counter">
                        {lightbox.index + 1} / {allImages.length}
                    </div>
                    
                    <button className="lightbox-next" onClick={(e) => {
                        e.stopPropagation();
                        setLightbox(prev => ({
                            open: true,
                            index: prev.index === allImages.length - 1 ? 0 : prev.index + 1
                        }));
                    }}>›</button>
                    
                    <button className="lightbox-close" onClick={(e) => {
                        e.stopPropagation();
                        setLightbox({ open: false });
                    }}>×</button>
                </div>
            )}
        </section>
    );
}

export default GalleryDialog;
