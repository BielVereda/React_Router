import { useState } from "react";
import { Link } from "react-router-dom";
import '@styles/Home.css'
import umbrellaLogo from './../assets/images/Home/umbrella-logo.png'
import residentEvilLogo from './../assets/images/Home/resident-evil-logo.png'

export default function Home() {
    const initialItems = [
        { id: 1, type: "link", label: "CHARACTERS", to: "/characters", size: "1x1", position: { col: 1, row: 1 } },
        { id: 2, type: "link", label: "GAMES", to: "/games", size: "2x1", position: { col: 2, row: 1 } },
        { id: 3, type: "link", label: "MOVIES", to: "/movies", size: "1x1", position: { col: 1, row: 2 } },
        { id: 4, type: "link", label: "DOWNLOADS", to: "/downloads", size: "2x2", position: { col: 3, row: 2 } },
        { id: 5, type: "link", label: "3D MODELS", to: "/models3d", size: "1x1", position: { col: 5, row: 1 } },
        { id: 6, type: "link", label: "ABOUT", to: "/about", size: "1x1", position: { col: 6, row: 1 } },
        { id: 7, type: "link", label: "CONTACT", to: "/contact", size: "1x1", position: { col: 6, row: 2 } },
    ];

    const [items, setItems] = useState(initialItems);
    const [dragId, setDragId] = useState(null);

    const gridCols = 6;
    const gridRows = 4;

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData("dragId", id);
        setDragId(id);
    };

    const handleDrop = (e, col, row) => {
        const dragId = e.dataTransfer.getData("dragId");
        if (!dragId) return;

        const draggedItem = items.find(i => i.id === parseInt(dragId));
        const [w, h] = draggedItem.size.split("x").map(Number);

        // Verifica colisão
        const collision = items.some(i => {
            if (i.id === draggedItem.id) return false;
            const [iw, ih] = i.size.split("x").map(Number);
            for (let cx = 0; cx < w; cx++) {
                for (let cy = 0; cy < h; cy++) {
                    const targetCol = col + cx;
                    const targetRow = row + cy;
                    if (
                        targetCol >= i.position.col &&
                        targetCol < i.position.col + iw &&
                        targetRow >= i.position.row &&
                        targetRow < i.position.row + ih
                    ) {
                        return true;
                    }
                }
            }
            return false;
        });

        // Fora do grid
        if (col + w - 1 > gridCols || row + h - 1 > gridRows) return;
        if (collision) return;

        const newItems = items.map(item =>
            item.id === parseInt(dragId)
                ? { ...item, position: { col, row } }
                : item
        );
        setItems(newItems);
        setDragId(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const invalidSlot = (col, row) => {
        if (!dragId) return false;
        const draggedItem = items.find(i => i.id === parseInt(dragId));
        if (!draggedItem) return false;
        const [w, h] = draggedItem.size.split("x").map(Number);

        if (col + w - 1 > gridCols || row + h - 1 > gridRows) return true;

        return items.some(i => {
            if (i.id === draggedItem.id) return false;
            const [iw, ih] = i.size.split("x").map(Number);
            for (let cx = 0; cx < w; cx++) {
                for (let cy = 0; cy < h; cy++) {
                    const targetCol = col + cx;
                    const targetRow = row + cy;
                    if (
                        targetCol >= i.position.col &&
                        targetCol < i.position.col + iw &&
                        targetRow >= i.position.row &&
                        targetRow < i.position.row + ih
                    ) {
                        return true;
                    }
                }
            }
            return false;
        });
    };

    const validSlot = (col, row) => {
        if (!dragId) return false;
        return !invalidSlot(col, row);
    };

    return (
        <div className="home-container">
            <header className="site-header">
                <img src={umbrellaLogo} alt="Umbrella Corporation Logo" className="umbrella-logo" />
                <img src={residentEvilLogo} alt="Resident Evil Logo" className="resident-logo" />
            </header>

            <main className="inventory-grid">
                {Array.from({ length: gridCols * gridRows }).map((_, i) => {
                    const col = (i % gridCols) + 1;
                    const row = Math.floor(i / gridCols) + 1;
                    return (
                        <div
                            key={`slot-${i}`}
                            className={`grid-slot ${invalidSlot(col, row) ? "invalid-drop" : ""} ${validSlot(col, row) ? "valid-drop" : ""}`}
                            onDrop={(e) => handleDrop(e, col, row)}
                            onDragOver={handleDragOver}
                        >
                            <span className="slot-x">X</span>
                        </div>
                    );
                })}

                {items.map(item => (
                    <div
                        key={item.id}
                        className={`grid-item size-${item.size}`}
                        style={{
                            gridColumn: `${item.position.col} / span ${parseInt(item.size.split("x")[0])}`,
                            gridRow: `${item.position.row} / span ${parseInt(item.size.split("x")[1])}`,
                        }}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item.id)}
                    >
                        <Link to={item.to}>{item.label}</Link>
                    </div>
                ))}
            </main>
        </div>
    )
}