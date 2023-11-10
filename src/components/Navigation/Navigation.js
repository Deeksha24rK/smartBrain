import "./Navigation.css";

const Navigation = ({ onRouteChange, isSignedIn, isProfilePage, handleOnProfileClick }) => {
    return isSignedIn && isProfilePage ? (
        <nav className="nav-container">
            <p
                onClick={() => onRouteChange("Home")}
                className="f3 link dim black pa3 pointer"
            >
                Home
            </p>
            <p
                onClick={() => onRouteChange("SignIn")}
                className="f3 link dim black pa3 pointer"
            >
                Sign Out
            </p>
        </nav>
    ) :
        isSignedIn ? (
            <nav className="nav-container">
                <p
                    onClick={handleOnProfileClick}
                    className="f3 link dim black pa3 pointer"
                >
                    Profile
                </p>
                <p
                    onClick={() => onRouteChange("SignIn")}
                    className="f3 link dim black pa3 pointer"
                >
                    Sign Out
                </p>
            </nav>
        ) :
            (
                <nav className="nav-container">
                    <p
                        onClick={() => onRouteChange("SignIn")}
                        className="f3 link dim black pa3 pointer"
                    >
                        SignIn
                    </p>
                    <p
                        onClick={() => onRouteChange("Register")}
                        className="f3 link dim black pa3 pointer"
                    >
                        Register
                    </p>
                </nav>
            );
};

export default Navigation;
