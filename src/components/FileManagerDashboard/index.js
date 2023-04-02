import "./index.css"

export default function FileManagerDashboard(props){
    const { result } = props;

    const fileResult = result.message;

    return <div className="video-file-manager-dashboard">
        <center>
            <video src={fileResult.file} controls muted style={{
                paddingTop: 120
            }}>

            </video>
        </center>
    </div>
}