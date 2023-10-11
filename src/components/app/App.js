import { lazy, Suspense } from 'react';
import {BrowserRouter as Router, Route, Routes, HashRouter} from 'react-router-dom'

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';
import {MainPage, ComicsPage, SingleComicLayout, SingleCharacterLayout, SinglePage} from '../pages';

const Page404 = lazy (() => import('../pages/404'));

const App = () => {

    return (
        <Router>
            <HashRouter basename="/">
                <div className="app">
                    <AppHeader/>
                    <main>
                        <Suspense fallback={<Spinner/>}> 
                            <Routes>
                                <Route path="/" element={<MainPage/>}/>
                                <Route path="/comics" element={<ComicsPage/>}/>
                                {/* <Route path="/comics/:comicId" element={<SingleComicPage />}/>
                                <Route path="/characters/:charId" element={<SingleCharacterPage/>}/> */}
                                <Route path="/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType="comic"/>}/>
                                <Route path="/characters/:id" element={<SinglePage Component={SingleCharacterLayout} dataType='character'/>}/> 
                                <Route path="*" element={<Page404/>}/>
                            </Routes>
                        </Suspense>
                    </main>
                </div>
            </HashRouter>
            
        </Router>
    )
}

export default App;