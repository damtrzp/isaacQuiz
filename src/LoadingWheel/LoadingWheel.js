import React from "react"

class LoadingWheel extends React.Component {
    render() {
        return (
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        )
    }
}

export default LoadingWheel;