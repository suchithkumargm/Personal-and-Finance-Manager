import './Container.css';

const Container = ({ left, right, innerClass }) => {
    return (
        <div className="container d-flex-center">
            <div className={`inner-container d-flex-center ${innerClass}`}>
                <div className="left-container">
                    {left}
                </div>
                <div className="right-container d-flex-center bg-gradient">
                    {right}
                </div>
            </div>
        </div>
    )
}

export default Container;