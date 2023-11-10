import React from "react"
import "./FaceRecognition.css"

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        imageUrl ?
            <div className="image-container">
                <img id="inputimage" src={imageUrl} width={250} height={"auto"} alt="" />
                <div className="face-box"
                    style={{
                        top: box?.topRow,
                        left: box?.leftCol,
                        bottom: box?.bottomRow,
                        right: box?.rightCol
                    }}></div>
            </div>
            : <></>
    )
}

export default FaceRecognition