const PostPagination = () => {
    return (
        <div className="pagination-wrap">
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                            <i className="fas fa-angle-double-left"></i>
                        </button>
                    </li>
                    <li className="page-item active">
                        <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>{'1'}</button>
                    </li>
                    <li className="page-item">
                        <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>{'2'}</button>
                    </li>
                    <li className="page-item">
                        <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>{'3'}</button>
                    </li>
                    <li className="page-item">
                        <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>{'...'}</button>
                    </li>
                    <li className="page-item">
                        <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>{'10'}</button>
                    </li>
                    <li className="page-item">
                        <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                            <i className="fas fa-angle-double-right"></i>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default PostPagination;