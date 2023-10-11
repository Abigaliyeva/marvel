import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import useMarvelService from '../../services/MarvelService';

import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        upDateChar();
    }, [props.charId])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const upDateChar = () => {
        const {charId} = props;
        if(!charId) {
            return;
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    const setContent = (process, char) => {
        switch (process) {
            case 'waiting': 
                return <Skeleton/>;
            case 'loading':
                return <Spinner/>;
            case 'confirmed':
                return <View char={char}/>;
            case 'error': 
                return  <ErrorMessage/>;
            default:
                throw new Error('Unexpected process state');
        }
    }

    return (
        <div className="char__info">
            {setContent(process, char)}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    
    let imageStyle = {
        'objectFit': 'cover'
    };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imageStyle = {'objectFit' : 'contain'};
    }

    const comicsLinkList = comics.map((item, i) => {
        const comicId = item.resourceURI.slice(43);
        // eslint-disable-next-line
        if (i > 9) return; 
        return (
            <li key={i} className="char__comics-item">
                <Link to={`/comics/${comicId}`}>{item.name}</Link>
            </li>
        )
    })

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imageStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : "There is no comics with this character"}
                {
                    comicsLinkList
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;