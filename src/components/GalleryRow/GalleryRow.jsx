import './GalleryRow.css';

function GalleryRow({ title, date, previewImages, onOpen }) {
    return (
        <section className="gallery_row">
            <div className="gallery_row-topbar">
                <h3 className="gallery_row-title">{title}</h3>
                <p className="gallery_row-date">{date}</p>
            </div> 
            <div className="gallery_row-items" onClick={onOpen}>
                {previewImages.map((img, index) => (
                    <img key={index} src={img} alt="" />
                ))}
            </div>
        </section>
    );
}

export default GalleryRow;
