import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blogData }) => {
    return (
        <Fragment>
            {
                blogData.map(data => {
                    const { id, thumb, title, admin, date, excerpt } = data;
                    return (
                        <div className="col-lg-4 col-md-6" key={id}>
                            <div className="single-post2 mb-30 wow fadeInDown animated blog-card-hover" 
                                 data-animation="fadeInRight" 
                                 data-delay=".4s"
                                 style={{
                                     backgroundColor: 'rgba(26, 14, 34, 0.85)',
                                     border: '2px solid rgba(255, 192, 16, 0.5)',
                                     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)',
                                     transition: 'all 0.3s ease',
                                     padding: '0',
                                     borderRadius: '4px',
                                     overflow: 'hidden'
                                 }}>
                                <div className="blog-thumb2" style={{ 
                                    position: 'relative',
                                    overflow: 'hidden',
                                    height: '500px'
                                }}>
                                    <Link to={'/single-post'} style={{ display: 'block', height: '100%' }}>
                                        <img src={thumb} alt="img" style={{ 
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            display: 'block'
                                        }} />
                                        <div className="blog-content2" style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            background: 'linear-gradient(to top, rgba(26, 14, 34, 0.95) 0%, rgba(26, 14, 34, 0.8) 70%, transparent 100%)',
                                            padding: '40px 25px 25px',
                                            color: '#fff'
                                        }}>
                                            <h4 style={{ 
                                                fontSize: '20px',
                                                color: '#ffc010',
                                                marginBottom: '15px',
                                                fontWeight: '600',
                                                lineHeight: '1.4'
                                            }}>
                                                {title}
                                            </h4>
                                            <div className="b-meta" style={{ marginBottom: '12px' }}>
                                                <div className="meta-info">
                                                    <ul style={{ 
                                                        display: 'flex', 
                                                        gap: '15px',
                                                        listStyle: 'none',
                                                        padding: 0,
                                                        margin: 0,
                                                        fontSize: '12px',
                                                        flexWrap: 'wrap'
                                                    }}>
                                                        <li style={{ color: 'rgba(255, 217, 102, 0.9)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                            <i className="fal fa-user" style={{ color: 'rgba(255, 192, 16, 0.8)' }}></i>
                                                            {admin}
                                                        </li>
                                                        <li style={{ color: 'rgba(255, 217, 102, 0.9)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                            <i className="fal fa-calendar-alt" style={{ color: 'rgba(255, 192, 16, 0.8)' }}></i>
                                                            {date}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <p style={{
                                                fontSize: '14px',
                                                color: 'rgba(255, 217, 102, 0.95)',
                                                lineHeight: '1.6',
                                                margin: 0
                                            }}>{excerpt}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </Fragment>
    )
}
export default BlogCard;