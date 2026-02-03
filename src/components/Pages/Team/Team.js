import React from 'react';
import TeamTwo from '../../Utilities/Team/TeamTwo';
import heroVideo from '../../../assets/img/HERO.mp4';
import { Link } from 'react-router-dom';

const Teams = () => {
    return (
        <React.Fragment>
            <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: -1
                    }}
                >
                    <source src={heroVideo} type="video/mp4" />
                </video>
                <div style={{
                    position: 'relative',
                    zIndex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    minHeight: '100vh'
                }}>
                    <section className="breadcrumb-area d-flex align-items-center" style={{background: 'transparent', padding: '0', minHeight: 'auto', margin: '0'}}>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-xl-12 col-lg-12">
                                    <div className="breadcrumb-wrap text-left">
                                        <div className="breadcrumb-title">
                                            <h2 style={{marginBottom: '5px', marginTop: '0'}}>Team</h2>
                                            <div className="breadcrumb-wrap">
                                                <nav aria-label="breadcrumb">
                                                    <ol className="breadcrumb">
                                                        <li className="breadcrumb-item">
                                                            <Link to={'/'}>{'Home'}</Link>
                                                        </li>
                                                        <li className="breadcrumb-item active" aria-current="page">Team</li>
                                                    </ol>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <TeamTwo />
                </div>
            </div>
        </React.Fragment>
    );
}

export default Teams;