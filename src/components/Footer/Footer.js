import "./Footer.css"

/**
 * 
 * @returns Footer Component
 */
const Footer = () => {
    return (
        <footer className="d-flex flex-column footer p-5 bg-dark-blue gap-4">
            <h2 className="text-white text-center">Digital Marketing Campaign</h2>
            <div className="d-flex flex-column flex-sm-row justify-content-around">
                <ul className="d-flex flex-column justify-content-center text-white">
                    <h4><i className='bx bx-support'></i> Contact</h4>
                    <li><i className='bx bx-mail-send bx-flip-horizontal' style={{color:"#ea3336"}}></i> camapaign@gmail.com
                    </li>
                    <li><i className='bx bxs-phone-call' style={{color:"#025b60"}}></i> 1004 10003</li>
                    <li><i className='bx bxs-megaphone' style={{color:"#009a4c"}}></i> Events</li>
                </ul>
                <ul className="d-flex flex-column justify-content-center text-white">
                    <h4>About</h4>
                    <li>Team</li>
                    <li>Locations</li>
                    <li>Privacy</li>
                    <li>Terms & Conditions</li>
                </ul>
                <ul className="d-flex flex-column justify-content-center text-white">
                    <h4>Company</h4>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>FAQ's</li>
                </ul>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center text-muted">
                <span>Follow us on</span>
            </div>
            <div className="d-flex justify-content-center align-items-center gap-3 text-white">
                <a href="https://www.facebook.com/"
                    className="w-2 h-2 p-3 bg-facebook rounded-circle d-flex justify-content-center align-items-center cursor-pointer">
                    <i className='bx bxl-facebook fs-footer-link'></i>
                </a>
                <a href="https://www.instagram.com/"
                    className="w-2 h-2 p-3 bg-instagram rounded-circle d-flex justify-content-center align-items-center cursor-pointer">
                    <i className='bx bxl-instagram fs-footer-link'></i>
                </a>
                <a href="https://www.linkedin.com/"
                    className="w-2 h-2 p-3 bg-linkedin rounded-circle d-flex justify-content-center align-items-center cursor-pointer">
                    <i className='bx bxl-linkedin fs-footer-link'></i>
                </a>
                <a href="https://www.twitter.com/"
                    className="w-2 h-2 p-3 bg-twitter rounded-circle d-flex justify-content-center align-items-center cursor-pointer">
                    <i className='bx bxl-twitter fs-footer-link'></i>
                </a>
            </div>
            <h6 className="text-muted text-center">Copyright &copy; 2021</h6>
        </footer>
    )
};

export default Footer; 