import { Link } from "react-router-dom"

const NotFoundPage = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center my-4 gap-4">
            <h1>Page not Found</h1>
            <div className="not-found ">
                <img className="img-fluid" src="/assets/images/404.svg" alt="not found"/>
            </div>
            {/* <div className="w-26">
                <img className="img-fluid" src="/assets/images/warning.svg" alt="not found"/>
            </div> */}
            <Link to="/" className="btn btn-primary">
                Go to Home 
            </Link>
        </div>
        
        
    )
}

export default NotFoundPage;