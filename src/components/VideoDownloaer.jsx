/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import { TailSpin, InfinitySpin } from 'react-loader-spinner';
import VideoDownloadDetails from './VideoDownloadDetails';
import {AiOutlineDownload} from 'react-icons/ai'

//Download highest quality video
const VideoDownloaer = () => {

  const itags = [133, 134, 135, 136, 137, 138, 160, 264, 266, 298, 299, 399, 400, 401, 402]
  const [link, setLink] = useState('');
  const [busy, setBusy] = useState(false);
  const[videoDetails, setVideoDetails] = useState(null);
  const [videoFormats, setVideoFormats] = useState([]);
  const [videoType, setVideoType] = useState('') //mp4, webm
  const [downloading, setDownloading] = useState(false);
  const [option, setOption] = useState(1);


      //Download complete
      const downloadComplete = () => {
        // setLink('')
        // setVideoDetails('');
        // setBusy(false);
        // setVideoDetails(null);
        // setVideoFormats([]);
        // setVideoType('');
        setDownloading(false)
      }
  
      const changeOption = (number) => {
        setLink('')
        setVideoDetails('');
        setBusy(false);
        setVideoDetails(null);
        setVideoFormats([]);
        setVideoType('');
        setDownloading(false);
        setOption(number);
      }



    //Analyze video url
    const analyzeVideo = async () =>{

      try{
        
        setVideoType('')
        setVideoFormats([]);
        setVideoDetails(null);
        console.log("IN ANALYZE VIDEO")
        setBusy(true);
        const apiUrl = import.meta.env.VITE_ANALYZE_VIDEO
        const videoUrl = link
        const response = await axios({
          method:'put',
          url: apiUrl,
          data:{
            videoUrl: videoUrl
          }
        })
        setVideoDetails(response?.data?.data)
        setBusy(false)
        //console.log(videoDetails)



        //download options
        if(option === 1) {
          try{

            const downloadApiUrl = import.meta.env.VITE_DOWNLOAD_OPTIONS
  
            const downloadInfo = await axios({
              method:'put',
              url:downloadApiUrl,
              data: {
                videoUrl:videoUrl
              }
            })
            //console.log(downloadInfo?.data?.data.adaptiveFormats)
            
            const formatInfo = downloadInfo?.data?.data.adaptiveFormats.filter(format => itags.includes(format.itag))
  
            setVideoFormats(formatInfo);
          }
          catch(err) {
            console.log(err)
          }

        }
        else if(option === 2) {
          console.log(2);
          try{

            const downloadApiUrl = import.meta.env.VITE_DOWNLOAD_OPTIONS
  
            const downloadInfo = await axios({
              method:'put',
              url:downloadApiUrl,
              data: {
                videoUrl:videoUrl
              }
            })
            //console.log(downloadInfo?.data?.data.adaptiveFormats)
            
            const formatInfo = downloadInfo?.data?.data.adaptiveFormats
  
            setVideoFormats(formatInfo);
          }
          catch(err) {
            console.log(err)
          }

        }
        else if(option === 3) {

          try{

            const link = import.meta.env.VITE_DOWNLOAD_MP3
  
            const response = await axios({
              method: 'put',
              url: link,
              data:{
                videoUrl: videoUrl,
              },
              responseType: 'blob'
            })
    
            const videoBlob = new Blob([response.data], {type: 'audio/mp3'});
    
            const videoURL = URL.createObjectURL(videoBlob);
            const downloadLink = document.createElement('a');
            downloadLink.href = videoURL;
            const name = videoDetails.title + 'yuten.mp3';
            downloadLink.setAttribute('download', name);
            console.log("Before on change");
            console.log('After on change');
            downloadLink.click();
            changeOption(3)
          }
          catch(err) {
            console.log(err)
          }

        }


      }catch(err) {
        console.log(err);
      }
    }




    //Download vdieo in highest quality
    const downloadHighestQualityVideo = async () => {
        console.log("HELLO")
        const apiUrl = import.meta.env.VITE_DOWNLOAD_HIGHEST_QUALITY;
        const videoUrl = link
        const response = await axios({
            method:'post',
            url:apiUrl,
            data:{
                videoUrl: videoUrl
            },
            responseType: 'blob'
        })
        const videoBlob = new Blob([response.data], {type: 'video/mp4'});
        setBusy(false)

        const videoURL = URL.createObjectURL(videoBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = videoURL;
        const name = 'Konosuba.mp4';
        downloadLink.setAttribute('download', name);
        downloadLink.click();

        // Clean up the temporary link element and URL
        URL.revokeObjectURL(videoURL);
        console.log(response.data);
    }
  

    //Handle download of a particular resolution
    const particularResolutionDownloading = () =>{
      console.log("ON CHANGE!!!")
      console.log("Before if satement: ", downloading)
      if(downloading === true) {
        setDownloading(false)
      }
      else if(downloading === false) {
        setDownloading(true)
      }
      console.log("After if statement: ", downloading)
    }

  useEffect(()=>{
    console.log("[]")
    console.log(downloading)
  }, [downloading])


  useEffect(()=>{

  }, [link, videoDetails, videoFormats, busy])
    

  return (
    <main className='w-full min-h-[85vh] flex justify-center py-3'>
      <div className='w-11/12'>
        <h1 className='text-3xl lg:mt-9 text-center font-medium'>
          Free YouTube video downloader
        </h1>
        <h2 className='text-xl text-center text-slate-600/75 my-3'>Download YouTube videos, thumbnail, convert to mp3</h2>
        <div className='flex w-full  justify-center items-center text-lg p-1 my-3 mb-7'>
          <div className='flex w-full md:w-1/2 lg:w-1/3 justify-between p-2 lg:p-3 items-center border border-black/25 rounded-full'>
            <div className={`${option === 1 ? "bg-[#9220D3] text-white rounded-full" : ""} p-1 px-3 cursor-pointer`} onClick={()=>changeOption(1)}>Video & audio</div>
            <div className={`${option === 2 ? "bg-[#9220D3] text-white rounded-full" : ""} p-1 px-3 cursor-pointer`} onClick={()=>changeOption(2)}>Only video</div>
            <div className={`${option === 3 ? "bg-[#9220D3] text-white rounded-full" : ""} p-1 px-3 cursor-pointer`} onClick={()=>changeOption(3)}>mp3</div>
          </div>
        </div>
        <div className='w-full flex justify-center lg:my-5'>
          <div className='bg-slate-400/20 w-full lg:w-1/2 p-2 lg:p-5 lg:py-7 rounded-md flex justify-center lg:items-center
          flex-col lg:flex-row border border-black/30 gap-2'>
            <input onChange={(e)=>setLink(e.target.value)} value={link}
            className='h-10 p-2 px-3 lg:w-[80%] outline-none rounded-sm lg:text-xl' placeholder='Paste link here...' type="text" />
            <button disabled={busy} onClick={analyzeVideo} className='bg-[#9220D3] lg:w-[15%] mt-3 lg:mt-0 rounded-sm text-center 
            p-2 text-white font-medium hover:cursor-pointer'>
              {
                busy ? (<div className='flex justify-center'> <TailSpin
                  height="24"
                  width="24"
                  color="#fff"
                  ariaLabel="tail-spin-loading"
                  radius="1"

                  visible={true}
                /> </div>) : (<p>Analyze link</p>)
              }
            </button>
          </div>
        </div>
        <div className='w-full flex flex-col md:flex-row lg:gap-9 justify-center mt-7'>
          {
            videoDetails === null ? (<div></div>) :
            (
              <>
                <div className='w-full md:w-1/3 lg:mt-[3.45rem]'>
                  <div className='flex flex-col gap-2 items-center py-3 justify-center border border-black/30 rounded-sm sticky top-5'>
                    <img className='w-11/12 rounded-md'
                    src={videoDetails.thumbnails[videoDetails.thumbnails.length - 1].url} alt="Thumbnail" />
                    <p className='text-md font-medium text-center text-black/75 px-2'>{videoDetails.title}</p>
                    <p className='text-black/75 text-sm gap-1 flex'><p>Duration:</p> 
                    <p className={`${Math.floor(videoDetails.lengthSeconds/60) === 0 ? "hidden" : ""}`}>{Math.floor(videoDetails.lengthSeconds/60)} mins</p>
                    {videoDetails.lengthSeconds%60}s</p>
                    <p className='text-slate-800/80 text-sm'>
                      Channel: 
                      <a className=' ml-1 text-blue-500/80 hover:underline'
                      href={videoDetails.ownerProfileUrl} target='blank'>{videoDetails.ownerChannelName}</a>
                    </p>
                  </div>
                </div>
                <div className='flex flex-col justify-center w-full md:w-2/3 min-h-20'>
                  <p className='w-full my-3 text-2xl font-medium'>
                    {
                      option === 3 ? ('Downloading...') : ('Download options')
                    }
                  </p>
                  {
                    videoFormats.length === 0 ? (
                      <div className='w-full flex justify-center'>
                        <InfinitySpin 
                          width='200'
                          color="#C175EC"
                        />
                      </div>
                    ) : (
                      <div className='w-full flex flex-col items-center justify-center border border-black/50 rounded-sm px-2 pt-2'>
                        <div className='w-full flex border-b border-black/30 pb-1'>
                          <p className='w-[30%] px-1'>Quality</p>
                          <p className='w-[30%]'>Format</p>
                          <div className='w-[40%] flex justify-center'>
                            <AiOutlineDownload className='retalive top-[0.40rem] text-xl'/>
                          </div>
                        </div>
                        {
                          videoFormats.map((format, index)=>(
                            <VideoDownloadDetails key={index} 
                            downloading={downloading} 
                            videoUrl={link}
                            option={option}
                            title={videoDetails.title}
                            onChange={particularResolutionDownloading} 
                            onComplete={downloadComplete}
                            format={format} />
                          ))
                        }
                      </div>
                    )
                  }
                </div>
              </>
            )
          }
        </div>
      </div>
    </main>
  )
}

export default VideoDownloaer