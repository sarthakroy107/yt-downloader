import axios from "axios";
import { useState } from "react"
import { ProgressBar } from "react-loader-spinner";

/* eslint-disable react/prop-types */
const VideoDownloadDetails = ({format, onChange, downloading, videoUrl, onComplete, option, title}) => {
    console.log(format)
    console.log('videoUrl: ' + videoUrl)
    //console.log(downloading)
    const [spinner, setSpinner] = useState(false);
    const type1 = format.mimeType.split('/')
    const type2 = type1[1].split(';')


    //download particular quality
    const particularQualityDownload = async () => {
      console.log("clicked");
      onChange();
      !downloading ? setSpinner(true) : ("");
      try{

        const link = option === 1 ? import.meta.env.VITE_DOWNLOAD_VIDEO_AUDIO : import.meta.env.VITE_DOWNLOAD_VIDEO_ONLY
        
        const response = await axios({
          method: 'put',
          url: link,
          data:{
            videoUrl: videoUrl,
            itag:format.itag
          },
          responseType: 'blob'
        })

        const videoBlob = new Blob([response.data], {type: 'video/mp4'});

        const videoURL = URL.createObjectURL(videoBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = videoURL;
        const name = title + '-yuten.mp4';
        downloadLink.setAttribute('download', name);
        console.log("Before on change");
        console.log('After on change');
        downloadLink.click();

      }
      catch(err) {
        console.log(err)  ;
      }
      setSpinner(false);
      onComplete();
    }

  return (
    <div className='w-full flex items-center text-lg font-medium text-black/75 border-b border-black/10 py-4 pb-2'>
        <p className='w-[30%] px-1 texxt-center'>{format.qualityLabel}</p>
        <p className='w-[30%] px-2'>{type2[0]}</p>
        <div className={`w-[40%] flex justify-center bg-[#9220D3] text-white p-1 rounded-md ${downloading ? "bg-opacity-50" : ""}`} >
           <button onClick={particularQualityDownload} disabled={downloading}>
            {
              spinner ? (
                <ProgressBar
                  height="28"
                  width="40"
                  borderColor = '#A622F1'
                  barColor = '#fff'
                />
              ) : (<p>Download</p>)
            }
           </button>
        </div>
    </div>
  )
}

export default VideoDownloadDetails