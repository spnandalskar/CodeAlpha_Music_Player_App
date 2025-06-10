import AlbumImage from "./albumImage";
import AlbumInfo from "./albumInfo";
import "./songCard.css";

export default function SongCard(album) {
  return (
    <div className="songCard-body">
      <AlbumImage url={album?.album?.images?.[0]?.url} />
      <AlbumInfo album={album.album} />
    </div>
  );
}
