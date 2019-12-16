import React, { FC, useEffect, useState, useRef } from 'react';
import './audio-player.css';
import ReactCardFlip from 'react-card-flip';
import NoteSvg from '../note-svg/note-svg';
import { initAudioPlayer } from '../../../../utils/player';
import { TRACKS } from '../../../../content/Header/models/models';
import { ITrack } from '../../../../content/Header/models/models.types';

type Props = {
    color: string;
    setColor: any;
}

const AudioPlayer: FC<Props> = ({ color, setColor }) => {

    const canvas: React.RefObject<HTMLCanvasElement> = useRef(null)
    const [isFlipped, setFlipped] = useState(false);
    const [track, setTrack] = useState(null as ITrack | null);

    useEffect(() => {
        if (track && track.src) {
            initAudioPlayer(track.src, canvas, setColor)
            setTimeout(() => {
                setFlipped(true);
                setTimeout(() => setFlipped(false), 2000);
            }, 2000);
        } else {
            let current = TRACKS[Math.floor(Math.random() * TRACKS.length)];
            setTrack(current)
        }
    }, [track, setColor]);

    const handleClick = (e: any) => {
        e.preventDefault();
        setFlipped(isFlipped => !isFlipped);
    }

    return (
        track &&
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" >
            <div className="player" onClick={handleClick}>
                <div className="music-title" style={{ color }}>My top music today</div>
                <canvas ref={canvas} />
            </div>
            <div className="player" onClick={handleClick}>
                <div className="back-side-flip">
                    <div className="music-title" style={{ color }}>Author: {track!.author}</div>
                    <div className="music-title" style={{ color }}>Title: "{track!.title}"</div>
                    <NoteSvg color={color} />
                </div>
            </div>
        </ReactCardFlip>
    );
}

export default AudioPlayer;

