import { useState } from 'react';
import './Gallery.css';
import Sever from '../../assets/images/Sever.jpg'
import GalleryRow from '../../components/GalleryRow/GalleryRow.jsx';
import GalleryDialog from '../../components/GalleryDialog/GalleryDialog.jsx';

function Gallery(){
    const galleryRows = [
        {
            id: 1,
            title: "Северная ночь",
            date: "28.02.2026",
            previewImages: [Sever, Sever, Sever, Sever, Sever],
            fullImages: Array(105).fill(Sever) 
        },
        {
            id: 2,
            title: "Зимний вечер", 
            date: "15.01.2026",
            previewImages: [Sever, Sever, Sever, Sever, Sever],
            fullImages: Array(20).fill(Sever)
        },
        {
            id: 3,
            title: "Вечеринка в DeFAQto",
            date: "04.03.2026", 
            previewImages: [Sever, Sever, Sever, Sever, Sever],
            fullImages: Array(30).fill(Sever)
        }
    ];
    const [dialogData, setDialogData] = useState(null);

    const handleRowClick = (rowData) => setDialogData(rowData);
    const closeDialog = () => setDialogData(null);
    return(
        <>
        <main className="gallery">
        {galleryRows.map(row => (
                <GalleryRow 
                    key={row.id}
                    title={row.title}
                    date={row.date}
                    previewImages={row.previewImages}
                    fullImages={row.fullImages}
                    onOpen={() => handleRowClick(row)}
                />
            ))}
            {dialogData && (
                <GalleryDialog 
                    eventData={dialogData} 
                    isOpen={!!dialogData} 
                    setIsOpen={closeDialog} 
                />
            )}
        </main>
        </>
    )
}
export default Gallery;