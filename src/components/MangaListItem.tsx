import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
type MangaListItemProps = {
  id: string;
  type: string;
  title: string;
  description: string;
  coverUrl?: string | null;
};

const CARD_HEIGHT = 480;
const IMAGE_HEIGHT = 220;

const cardStyle: React.CSSProperties = {
  border: "1px solid #e0e0e0",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
  padding: "1.5rem",
  margin: "1rem 0",
  background: "#fff",
  maxWidth: 400,
  width: "100%",
  minHeight: CARD_HEIGHT,
  height: CARD_HEIGHT,
  transition: "box-shadow 0.2s, background 0.4s, color 0.2s",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  color: "#222",
  justifyContent: "flex-start",
  boxSizing: "border-box",
};

const cardHoverStyle: React.CSSProperties = {
  background: "linear-gradient(120deg, #fcf2f9ff 0%, #ffc5edff 50%)",
  color: "#000",
  boxShadow: "0 4px 16px rgba(21,101,192,0.15)",
};

const titleStyle: React.CSSProperties = {
  fontSize: "1.2rem",
  fontWeight: 600,
  color: "inherit",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  minHeight: "2.8em",
  maxHeight: "2.8em",
};

const descriptionStyle: React.CSSProperties = {
  fontSize: "0.95rem",
  color: "inherit",
  marginTop: "0.5rem",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
  minHeight: "4.8em",
  maxHeight: "4.8em",
};

const typeStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "inherit",
  fontStyle: "italic",
};

const idStyle: React.CSSProperties = {
  fontSize: "0.7rem",
  color: "inherit",
};
const imageContainerStyle: React.CSSProperties = {
  height: IMAGE_HEIGHT,
  width: "100%",
  overflow: "hidden",
  borderRadius: "8px",
  marginBottom: "0.5rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const imageStyle: React.CSSProperties = {
  maxHeight: "100%",
  maxWidth: "100%",
  objectFit: "cover", // puedes probar también con 'contain'
};

const MangaListItem: React.FC<MangaListItemProps> = ({
  id,
  type,
  title,
  description,
  coverUrl,
}) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/manga/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        ...cardStyle,
        ...(hover ? cardHoverStyle : {}),
        cursor: "pointer",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {coverUrl && (
        <div style={imageContainerStyle}>
          <img src={coverUrl} alt={title} style={imageStyle} />
        </div>
      )}
      <div style={titleStyle}>{title || "Sin título"}</div>
      <div>{id}</div>
      <div style={typeStyle}>{type}</div>
      <div style={descriptionStyle}>{description}</div>
    </div>
  );
};

export default MangaListItem;
