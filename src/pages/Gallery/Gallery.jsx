import './Gallery.css';
import GalleryRow from '../../components/GalleryRow/GalleryRow.jsx';

function Gallery(){
    return(
        <>
        <main className="gallery">
            <GalleryRow/>
            <GalleryRow/>
            <GalleryRow/>
            <GalleryRow/>
        </main>
        </>
    )
}
export default Gallery;