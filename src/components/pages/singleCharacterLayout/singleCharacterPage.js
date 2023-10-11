import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import useMarvelService from '../../../services/MarvelService';

import './singleCharacterPage.scss';

const SingleCharacterPage = () => {
    const {charId} = useParams();
    console.log(charId);
    const [char, setChar] = useState({});

    const {getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        upDateChar();
    }, [charId])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const upDateChar = () => {
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const {thumbnail, name, description} = char;
    console.log(char);

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
        </div>
    )
}

export default SingleCharacterPage;